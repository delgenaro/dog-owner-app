/**
 * Test suite for the diet calculator engine.
 * Run: node src/__tests__/calculator.test.js
 */
import { calculateDiet } from '../calculator.js'

let passed = 0
let failed = 0
const errors = []

function assert(condition, label, detail) {
  if (condition) {
    passed++
    console.log(`  âœ“ ${label}`)
  } else {
    failed++
    errors.push({ label, detail })
    console.log(`  âœ— ${label}${detail ? ' â€” ' + detail : ''}`)
  }
}

function assertApprox(a, b, tolerance, label) {
  const diff = Math.abs(a - b)
  assert(diff <= tolerance, label, `expected ${b} Â±${tolerance}, got ${a}`)
}

// â”€â”€â”€ Profiles â”€â”€â”€
const profiles = {
  adult: {
    name: 'Thor', breed: 'Pitbull', weightKg: 32, ageYears: 5,
    sex: 'macho', neutered: true, bcs: 5, activityLevel: 'moderado',
    goal: 'manutencao', dietType: 'barf', mealCount: 2, eggsPerDay: 0, conditions: []
  },
  smallDog: {
    name: 'Luna', breed: 'Shih Tzu', weightKg: 6, ageYears: 3,
    sex: 'femea', neutered: true, bcs: 5, activityLevel: 'leve',
    goal: 'manutencao', dietType: 'barf', mealCount: 2, eggsPerDay: 0, conditions: []
  },
  puppy: {
    name: 'Bolt', breed: 'Labrador', weightKg: 8, ageYears: 0.3,
    sex: 'macho', neutered: false, bcs: 5, activityLevel: 'moderado',
    goal: 'manutencao', dietType: 'barf', mealCount: 3, eggsPerDay: 0, conditions: []
  },
  senior: {
    name: 'Rex', breed: 'Golden', weightKg: 34, ageYears: 10,
    sex: 'macho', neutered: true, bcs: 6, activityLevel: 'leve',
    goal: 'manutencao', dietType: 'cooked', mealCount: 2, eggsPerDay: 0, conditions: ['renal']
  },
  obese: {
    name: 'Bolinha', breed: 'Beagle', weightKg: 18, ageYears: 4,
    sex: 'macho', neutered: true, bcs: 8, activityLevel: 'leve',
    goal: 'perda_peso', dietType: 'cooked', mealCount: 2, eggsPerDay: 0, conditions: []
  },
  giant_breed: {
    name: 'Titan', breed: 'Mastiff', weightKg: 70, ageYears: 2,
    sex: 'macho', neutered: false, bcs: 5, activityLevel: 'leve',
    goal: 'manutencao', dietType: 'prey_model', mealCount: 2, eggsPerDay: 0, conditions: []
  },
  with_eggs: {
    name: 'Thor Eggs', breed: 'Pitbull', weightKg: 32, ageYears: 5,
    sex: 'macho', neutered: true, bcs: 5, activityLevel: 'moderado',
    goal: 'manutencao', dietType: 'barf', mealCount: 2, eggsPerDay: 4, conditions: []
  },
  raw_no_bones: {
    name: 'NoBones', breed: 'SRD', weightKg: 15, ageYears: 2,
    sex: 'femea', neutered: false, bcs: 5, activityLevel: 'ativo',
    goal: 'manutencao', dietType: 'raw_no_bones', mealCount: 2, eggsPerDay: 0, conditions: []
  },
  active_underweight: {
    name: 'Speed', breed: 'Border Collie', weightKg: 18, ageYears: 2,
    sex: 'macho', neutered: false, bcs: 3, activityLevel: 'muito_ativo',
    goal: 'ganho_peso', dietType: 'barf', mealCount: 3, eggsPerDay: 2, conditions: []
  },
}

// â”€â”€â”€ 1. RER â”€â”€â”€
console.log('\nâ•â•â• 1. RER (Repouso) â•â•â•')
for (const [key, dog] of Object.entries(profiles)) {
  const plan = calculateDiet(dog)
  const expectedRER = 70 * Math.pow(dog.weightKg, 0.75)
  assertApprox(plan.targets.rerKcal, Math.round(expectedRER), 1,
    `${key}: RER ${dog.weightKg}kg = ${Math.round(expectedRER)} kcal`)
}

// â”€â”€â”€ 2. MER â”€â”€â”€
console.log('\nâ•â•â• 2. MER (MetabÃ³lico) â•â•â•')
for (const [key, dog] of Object.entries(profiles)) {
  const plan = calculateDiet(dog)
  assert(plan.targets.merKcal >= plan.targets.rerKcal * 0.8,
    `${key}: MER >= 80% RER (${plan.targets.merKcal} >= ${Math.round(plan.targets.rerKcal * 0.8)})`)
  assert(plan.targets.merKcal <= plan.targets.rerKcal * 3.5,
    `${key}: MER <= 350% RER (${plan.targets.merKcal} <= ${Math.round(plan.targets.rerKcal * 3.5)})`)
}

// â”€â”€â”€ 3. Comida diÃ¡ria â”€â”€â”€
console.log('\nâ•â•â• 3. Gramas/dia â•â•â•')
for (const [key, dog] of Object.entries(profiles)) {
  const plan = calculateDiet(dog)
  const gPerKg = plan.targets.dailyFoodG / dog.weightKg
  assert(gPerKg >= 10, `${key}: >= 10g/kg (${Math.round(gPerKg)}g/kg)`)
  assert(gPerKg <= 50, `${key}: <= 50g/kg (${Math.round(gPerKg)}g/kg)`)
}

// â”€â”€â”€ 4. ProporÃ§Ãµes da dieta â”€â”€â”€
console.log('\nâ•â•â• 4. ProporÃ§Ãµes dos grupos alimentares â•â•â•')
for (const [key, dog] of Object.entries(profiles)) {
  const plan = calculateDiet(dog)
  const meal = plan.meals[0]
  const totalPct = meal.ingredients.reduce((s, i) => s + i.pct, 0)
  const eggPct = meal.ingredients.find(i => i.group === 'eggs')?.pct || 0
  // Ovos adicionam % extra sobre os 100% dos grupos originais
  const basePct = totalPct - eggPct
  assertApprox(basePct, 100, 1, `${key}: grupos base (s/ovos) = 100% (${Math.round(basePct)}%)`)
}

// â”€â”€â”€ 5. RefeiÃ§Ãµes â”€â”€â”€
console.log('\nâ•â•â• 5. DistribuiÃ§Ã£o por refeiÃ§Ãµes â•â•â•')
for (const [key, dog] of Object.entries(profiles)) {
  const plan = calculateDiet(dog)
  assert(plan.meals.length === dog.mealCount,
    `${key}: ${dog.mealCount} refeiÃ§Ãµes (tem ${plan.meals.length})`)
}

// â”€â”€â”€ 6. Suplementos â”€â”€â”€
console.log('\nâ•â•â• 6. Suplementos â•â•â•')

// Dieta cozida: deve ter CÃ¡lcio + Taurina
const cookedPlan = calculateDiet(profiles.senior)
const cookedNames = cookedPlan.supplements.map(s => s.name)
assert(cookedNames.includes('Calcio'), 'Cozida: tem Calcio')
assert(cookedNames.includes('Taurina'), 'Cozida: tem Taurina')
assert(cookedNames.some(n => n.includes('Oleo de peixe')), 'Cozida: tem Ã”mega-3')
assert(cookedNames.some(n => n.includes('Vitamina E')), 'Cozida: tem Vitamina E')

// BARF: nÃ£o deve ter Taurina, nÃ£o deve ter CÃ¡lcio (tem osso)
const barfPlan = calculateDiet(profiles.adult)
const barfNames = barfPlan.supplements.map(s => s.name)
assert(!barfNames.includes('Taurina'), 'BARF: sem Taurina')
assert(!barfNames.includes('Calcio'), 'BARF: sem CÃ¡lcio (tem osso)')
assert(barfNames.some(n => n.includes('Oleo de peixe')), 'BARF: tem Ã”mega-3')

// RAW_NO_BONES: deve ter CÃ¡lcio (sem osso)
const rnbPlan = calculateDiet(profiles.raw_no_bones)
const rnbNames = rnbPlan.supplements.map(s => s.name)
assert(rnbNames.includes('Calcio'), 'Raw sem osso: tem CÃ¡lcio')
assert(!rnbNames.includes('Taurina'), 'Raw sem osso: sem Taurina (crua)')

// Com ovos: deve ter Calcio da casca
const eggPlan = calculateDiet(profiles.with_eggs)
const eggNames = eggPlan.supplements.map(s => s.name)
assert(eggNames.some(n => n.includes('casca do ovo')), 'Com ovos: tem CÃ¡lcio da casca')

// â”€â”€â”€ 7. Alternativas naturais â”€â”€â”€
console.log('\nâ•â•â• 7. Alternativas naturais â•â•â•')
for (const [key, dog] of Object.entries(profiles)) {
  const plan = calculateDiet(dog)
  for (const s of plan.supplements) {
    if (s.naturalAlternatives) {
      for (const alt of s.naturalAlternatives) {
        assert(!!alt.name, `${key}/${s.name}: alternativa tem nome (${alt.name || '(vazio)'})`)
        assert(!!alt.dosage, `${key}/${s.name}: alternativa tem dosagem (${alt.name})`)
        if (alt.prep) {
          assert(['raw','cooked','both'].includes(alt.prep.best),
            `${key}/${s.name}: prep.best vÃ¡lido (${alt.prep.best}) em ${alt.name}`)
        }
      }
    }
  }
}

// â”€â”€â”€ 8. Ovos substituem carne â”€â”€â”€
console.log('\nâ•â•â• 8. Ovos substituem carne â•â•â•')
const noEggPlan = calculateDiet(profiles.adult)
const eggMeatPlan = calculateDiet(profiles.with_eggs)
const noEggMeat = noEggPlan.meals[0].ingredients.find(i => i.group === 'muscle_meat')
const withEggMeat = eggMeatPlan.meals[0].ingredients.find(i => i.group === 'muscle_meat')
assert(noEggMeat && withEggMeat, 'Ambos tÃªm grupo muscle_meat')
assert(withEggMeat.grams < noEggMeat.grams,
  `Com ovos: carne reduzida (${withEggMeat.grams}g < ${noEggMeat.grams}g)`)

// â”€â”€â”€ 9. Alertas â”€â”€â”€
console.log('\nâ•â•â• 9. Alertas â•â•â•')
// Obeso em perda de peso
assert(cookedPlan.alerts.length > 0, `Senior cozida: tem alertas (${cookedPlan.alerts.length})`)
// BARF com ovos crus: alerta de clara
const eggAlerts = eggPlan.alerts.filter(a => a.message.includes('ovos CRUS'))
assert(eggAlerts.length > 0, 'BARF + 4 ovos: alerta de clara crua')

// â”€â”€â”€ 10. BCS correction â”€â”€â”€
console.log('\nâ•â•â• 10. CorreÃ§Ã£o BCS â•â•â•')
const obesePlan = calculateDiet(profiles.obese)
const normalPlan = calculateDiet({ ...profiles.obese, bcs: 5, goal: 'manutencao' })
// BCS 8 = superÃ¡vit calÃ³rico reduzido + restriÃ§Ã£o de perda de peso
assert(obesePlan.targets.merKcal < normalPlan.targets.merKcal,
  `BCS 8 + perda_peso: MER menor (${obesePlan.targets.merKcal} < ${normalPlan.targets.merKcal})`)

// â”€â”€â”€ 11. Puppet tem fatores mais altos â”€â”€â”€
console.log('\nâ•â•â• 11. Filhote â•â•â•')
const puppyPlan = calculateDiet(profiles.puppy)
assert(puppyPlan.targets.merKcal > calculateDiet({ ...profiles.puppy, ageYears: 3 }).targets.merKcal,
  `Filhote: MER maior que adulto (${puppyPlan.targets.merKcal} vs adulto)`)
assert(puppyPlan.meals.length === 3, 'Filhote: 3 refeiÃ§Ãµes')

// â”€â”€â”€ 12. Gande porte â”€â”€â”€
console.log('\nâ•â•â• 12. RaÃ§as gigantes â•â•â•')
const giantPlan = calculateDiet(profiles.giant_breed)
assert(giantPlan.targets.dailyFoodG > 1000,
  `Mastiff 70kg: > 1000g/dia (${giantPlan.targets.dailyFoodG}g)`)
assert(giantPlan.targets.merKcal > 1500,
  `Mastiff 70kg: MER > 1500 kcal (${giantPlan.targets.merKcal})`)

// â”€â”€â”€ 13. Muito ativo + ganho de peso + ovos â”€â”€â”€
console.log('\nâ•â•â• 13. Caso combinado â•â•â•')
const activePlan = calculateDiet(profiles.active_underweight)
assert(activePlan.meals.length === 3, '3 refeiÃ§Ãµes')
const hasEggsGroup = activePlan.meals[0].ingredients.some(i => i.group === 'eggs')
assert(hasEggsGroup, 'Tem grupo eggs')

// â”€â”€â”€ 14. Small dog prefix check â”€â”€â”€
console.log('\nâ•â•â• 14. CÃ£o pequeno â•â•â•')
const smallPlan = calculateDiet(profiles.smallDog)
assert(smallPlan.targets.dailyFoodG < 300,
  `Shih Tzu 6kg: < 300g/dia (${smallPlan.targets.dailyFoodG}g)`)
assert(smallPlan.targets.merKcal < 500,
  `Shih Tzu 6kg: MER < 500 kcal (${smallPlan.targets.merKcal})`)

const smallSupplements = smallPlan.supplements
for (const s of smallSupplements) {
  if (s.naturalAlternatives) {
    for (const alt of s.naturalAlternatives) {
      if (alt.prep?.smallDogRisk) {
        assert(typeof alt.prep.smallDogRisk === 'string' && alt.prep.smallDogRisk.length > 0,
          `Small dog risk presente em ${alt.name}: ${alt.prep.smallDogRisk}`)
      }
    }
  }
}

// â”€â”€â”€ Report â”€â”€â”€
console.log(`\nâ•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•`)
console.log(`${passed} passed, ${failed} failed`)
if (failed > 0) {
  console.log('\nErrors:')
  for (const e of errors) {
    console.log(`  â€¢ ${e.label}: ${e.detail || ''}`)
  }
  process.exit(1)
} else {
  console.log('All tests passed!')
}
