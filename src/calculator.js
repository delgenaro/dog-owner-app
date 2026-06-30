/**
 * Diet Calculator Engine
 */
import { NATURAL_SUPPLEMENTS } from './data/natural-supplements.js'
import { getPreparation } from './data/preparation-guide.js'

// --- 1. RER ---
function calculateRER(weightKg) {
  return 70 * Math.pow(weightKg, 0.75)
}

// --- 2. Fator de fase de vida ---
function getLifeStageFactor(dog) {
  const { ageYears, neutered } = dog
  if (ageYears < 0.33) return 3.0
  if (ageYears < 1)    return 2.0
  if (ageYears >= 6) {
    return neutered ? 1.2 : 1.3
  }
  return neutered ? 1.6 : 1.8
}

// --- 3. Fator de atividade ---
const ACTIVITY_FACTORS = {
  sedentario:   0.9,
  leve:         1.0,
  moderado:     1.1,
  ativo:        1.2,
  muito_ativo:  1.3
}

// --- 4. Correcao BCS ---
function bcsCorrectionKcal(dog) {
  if (dog.bcs === 5) return 0
  const diff = dog.bcs - 5
  return diff * -9.8 * Math.pow(dog.weightKg, 0.75)
}

// --- 5. Ajuste por objetivo ---
const GOAL_FACTORS = {
  manutencao:   1.0,
  perda_peso:   0.8,
  ganho_peso:   1.2
}

// --- 6. MER final ---
function calculateMER(dog) {
  const rer = calculateRER(dog.weightKg)
  const lifeStage = getLifeStageFactor(dog)
  const activity = ACTIVITY_FACTORS[dog.activityLevel] || 1.0
  const bcsAdj = bcsCorrectionKcal(dog)
  const goal = GOAL_FACTORS[dog.goal] || 1.0
  const mer = (rer * lifeStage * activity + bcsAdj) * goal
  return Math.round(mer)
}

// --- 7. Peso total de alimento por dia ---
const DAILY_PCT = {
  cooked:       { pct: 2.5 },
  barf:         { pct: 2.5 },
  prey_model:   { pct: 2.5 },
  raw_no_bones: { pct: 2.5 }
}

const GOAL_VOLUME_ADJ = {
  manutencao: 1.0, perda_peso: 0.85, ganho_peso: 1.15
}

function dailyFoodGrams(dog) {
  const basePct = (DAILY_PCT[dog.dietType] || DAILY_PCT.cooked).pct
  const adj = GOAL_VOLUME_ADJ[dog.goal] || 1.0
  return Math.round(dog.weightKg * (basePct / 100) * adj * 1000)
}

// --- 8. Proporcoes por tipo de dieta ---
const DIET_RATIOS = {
  cooked: [
    { group: 'meat',         pct: 30, note: 'Carnes desossadas' },
    { group: 'organs',       pct: 5,  note: 'Viceras' },
    { group: 'carbs',        pct: 35, note: 'Carboidratos' },
    { group: 'vegetables',   pct: 30, note: 'Vegetais' }
  ],
  barf: [
    { group: 'muscle_meat',  pct: 70, note: 'Carne muscular' },
    { group: 'raw_bone',     pct: 10, note: 'Osso cru comestivel' },
    { group: 'liver',        pct: 5,  note: 'Figado' },
    { group: 'other_organs', pct: 5,  note: 'Outras viceras' },
    { group: 'vegetables',   pct: 7,  note: 'Vegetais' },
    { group: 'seeds',        pct: 2,  note: 'Sementes' },
    { group: 'fruits',       pct: 1,  note: 'Frutas' }
  ],
  prey_model: [
    { group: 'muscle_meat',  pct: 80, note: 'Carne muscular' },
    { group: 'raw_bone',     pct: 10, note: 'Osso cru comestivel' },
    { group: 'liver',        pct: 5,  note: 'Figado' },
    { group: 'secretory',    pct: 5,  note: 'Viceras secretoras' }
  ],
  raw_no_bones: [
    { group: 'muscle_meat',  pct: 80, note: 'Carne muscular' },
    { group: 'liver',        pct: 5,  note: 'Figado' },
    { group: 'other_organs', pct: 5,  note: 'Outras viceras' },
    { group: 'vegetables',   pct: 7,  note: 'Vegetais' },
    { group: 'seeds',        pct: 2,  note: 'Sementes' },
    { group: 'fruits',       pct: 1,  note: 'Frutas' }
  ]
}

// --- 9. Alocacao de ingredientes por grupo ---
const EGG_WEIGHT_G = 55
const EGG_EDIBLE_G = 50
const EGG_CALCIUM_MG = 2000

function allocateIngredients(dog) {
  const totalG = dailyFoodGrams(dog)
  const ratios = DIET_RATIOS[dog.dietType] || DIET_RATIOS.cooked
  const groups = {}
  const eggsPerDay = dog.eggsPerDay || 0

  for (const r of ratios) {
    let grams = totalG * (r.pct / 100)
    groups[r.group] = {
      pct: r.pct,
      grams: Math.round(grams * 10) / 10,
      note: r.note
    }
  }

  if (eggsPerDay > 0) {
    const eggTotalG = eggsPerDay * EGG_WEIGHT_G
    const eggEdibleG = eggsPerDay * EGG_EDIBLE_G
    const meatGroup = groups.muscle_meat || groups.meat
    if (meatGroup && meatGroup.grams >= eggEdibleG) {
      meatGroup.grams = Math.round((meatGroup.grams - eggEdibleG) * 10) / 10
      meatGroup.eggsReplacedG = eggEdibleG
      meatGroup.eggsCount = eggsPerDay
    }
    groups.eggs = {
      pct: Math.round(eggTotalG / totalG * 100),
      grams: Math.round(eggTotalG * 10) / 10,
      note: 'Ovo inteiro (casca incluida) â€” fonte barata de proteina e calcio',
      count: eggsPerDay,
      calciumMg: eggsPerDay * EGG_CALCIUM_MG
    }
  }

  groups._totalG = totalG
  return groups
}

// --- 10. Database de alternativas naturais ---
const SUPPLEMENT_NATURAL_MAP = {
  'Calcio': 'C\u00e1lcio',
  'Oleo de peixe (EPA/DHA)': '\u00d4mega-3 (EPA/DHA)',
  'Vitamina E': 'Vitamina E',
  'Taurina': 'Taurina',
  'Calcio da casca do ovo': 'C\u00e1lcio',
}

function getNaturalAlternatives(supplementName) {
  const key = SUPPLEMENT_NATURAL_MAP[supplementName]
  if (!key) return []
  const entry = NATURAL_SUPPLEMENTS.find(s => s.nutrient === key)
  if (!entry) return []
  return entry.foods.slice(0, 3).map(f => {
    const prep = f.prepKey ? getPreparation(f.prepKey) : null
    return {
      name: f.name,
      dosage: f.dosage,
      prep: prep ? {
        best: prep.best,
        label: prep.best === 'raw' ? 'ðŸ¥© Cru' : prep.best === 'cooked' ? 'ðŸ³ Cozido' : 'âœ… Cru ou cozido',
        summary: prep.summary
      } : null
    }
  })
}

// --- 11. Suplementacao ---
function determineSupplements(dog, groups) {
  const supplements = []
  const hasBone = (groups.raw_bone && groups.raw_bone.grams > 0)

  if (dog.dietType === 'cooked' || dog.dietType === 'raw_no_bones') {
    const alt = getNaturalAlternatives('Calcio')
    supplements.push({
      name: 'Calcio',
      dosage: '1 colher cha casca ovo / kg alimento',
      critical: true,
      reason: 'Dieta sem osso: calcio obrigatorio',
      naturalAlternatives: alt
    })
  }

  const omegaAlt = getNaturalAlternatives('Oleo de peixe (EPA/DHA)')
  supplements.push({
    name: 'Oleo de peixe (EPA/DHA)',
    dosage: Math.round(dog.weightKg * 30) + 'mg EPA+DHA/dia (~' + Math.round(dog.weightKg * 0.1) + 'ml)',
    critical: false,
    reason: 'Anti-inflamatorio, pele, pelo, cerebro',
    naturalAlternatives: omegaAlt
  })

  const vitEAlt = getNaturalAlternatives('Vitamina E')
  supplements.push({
    name: 'Vitamina E',
    dosage: Math.round(dog.weightKg * 1.5) + ' UI/dia',
    critical: false,
    reason: 'Antioxidante essencial com omega-3',
    naturalAlternatives: vitEAlt
  })

  if (dog.dietType === 'cooked') {
    const tauAlt = getNaturalAlternatives('Taurina')
    supplements.push({
      name: 'Taurina',
      dosage: 'Incluir coracao na dieta ou suplementar 250-500mg/dia',
      critical: false,
      reason: 'Calor degrada taurina dos alimentos',
      naturalAlternatives: tauAlt
    })
  }

  if (groups.eggs && groups.eggs.count > 0) {
    const caMg = groups.eggs.calciumMg
    supplements.push({
      name: 'Calcio da casca do ovo',
      dosage: groups.eggs.count + ' ovos/dia fornecem ~' + caMg + 'mg de calcio',
      critical: false,
      reason: 'Casca do ovo tem 95% de carbonato de calcio. Se a dieta ja tem osso cru, esse calcio e extra â€” nao substitui a necessidade de ajustar o osso.'
    })
  }

  return supplements
}

// --- 11. Alerts ---
function generateAlerts(dog, groups) {
  const alerts = []
  const totalG = groups._totalG

  if (groups.liver && groups.liver.grams / totalG > 0.06) {
    alerts.push({
      severity: 'warning',
      message: 'Figado acima de 5% da dieta ï¿½ risco de hipervitaminose A'
    })
  }

  if (!groups.vegetables || groups.vegetables.grams === 0) {
    alerts.push({
      severity: 'info',
      message: 'Zero vegetais ï¿½ sem fibras e antioxidantes'
    })
  }

  if (dog.ageYears >= 6) {
    alerts.push({
      severity: 'info',
      message: 'Cao senior ï¿½ considerar suplementacao articular (condroitina/glucosamina)'
    })
  }

  if ((dog.eggsPerDay || 0) > 0 && dog.dietType !== 'cooked') {
    alerts.push({
      severity: 'warning',
      message: dog.eggsPerDay + ' ovos CRUS por dia: a clara contem avidina que sequestra biotina. Com essa quantidade, o risco de deficiencia de biotina e REAL. Cozinhe os ovos ou pelo menos as claras.'
    })
  }

  return alerts
}

// --- 12. Distribuicao por refeicoes ---
function distributeMeals(dog, groups) {
  const mealCount = dog.mealCount || 2
  const meals = []

  for (let i = 0; i < mealCount; i++) {
    const meal = {
      name: i === 0 ? 'Cafe da manha' : 'Jantar',
      time: i === 0 ? '07:00' : '19:00',
      ingredients: []
    }

    for (const [group, data] of Object.entries(groups)) {
      if (group.startsWith('_')) continue
      meal.ingredients.push({
        group,
        grams: Math.round(data.grams / mealCount * 10) / 10,
        pct: data.pct,
        note: data.note,
        preparation: dog.dietType === 'cooked' ? 'cozido' : 'cru'
      })
    }

    meals.push(meal)
  }

  return meals
}

// --- MAIN ---
export function calculateDiet(dog) {
  const mer = calculateMER(dog)
  const groups = allocateIngredients(dog)
  const supplements = determineSupplements(dog, groups)
  const alerts = generateAlerts(dog, groups)
  const meals = distributeMeals(dog, groups)

  return {
    generatedAt: new Date().toISOString(),
    dog: {
      name: dog.name,
      breed: dog.breed,
      weightKg: dog.weightKg,
      ageYears: dog.ageYears,
      dietType: dog.dietType,
      goal: dog.goal
    },
    targets: {
      rerKcal: Math.round(calculateRER(dog.weightKg)),
      merKcal: mer,
      dailyFoodG: groups._totalG
    },
    meals,
    supplements,
    alerts,
    nutritionSummary: {
      totalKcal: mer,
      meetsMer: true
    }
  }
}
