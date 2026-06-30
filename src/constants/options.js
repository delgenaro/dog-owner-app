export const SEX_OPTIONS = [
  { label: 'Macho', value: 'macho' },
  { label: 'FÃªmea', value: 'femea' },
]

export const NEUTERED_OPTIONS = [
  { label: 'Sim', value: true },
  { label: 'NÃ£o', value: false },
]

export const ACTIVITY_OPTIONS = [
  { label: 'SedentÃ¡rio', value: 'sedentario', desc: 'SÃ³ caminhadas curtas' },
  { label: 'Leve', value: 'leve', desc: '2-3 passeios curtos/dia' },
  { label: 'Moderado', value: 'moderado', desc: '2 passeios de 30min + brincadeiras' },
  { label: 'Ativo', value: 'ativo', desc: 'Corrida, agility, +1h exercÃ­cio' },
  { label: 'Muito ativo', value: 'muito_ativo', desc: 'Trabalho, caÃ§a, alto rendimento' },
]

export const GOAL_OPTIONS = [
  { label: 'ManutenÃ§Ã£o de peso', value: 'manutencao' },
  { label: 'Perda de peso', value: 'perda_peso' },
  { label: 'Ganho de peso', value: 'ganho_peso' },
]

export const DIET_TYPE_OPTIONS = [
  { label: 'AN Cozida', value: 'cooked', desc: 'Alimentos levemente cozidos' },
  { label: 'BARF', value: 'barf', desc: 'Crua com ossos' },
  { label: 'AN Crua sem osso', value: 'raw_no_bones', desc: 'Crua com cÃ¡lcio suplementar' },
  { label: 'Prey Model', value: 'prey_model', desc: '100% animal, sem vegetais' },
]

export const MEAL_COUNT_OPTIONS = [
  { label: '1 refeiÃ§Ã£o', value: 1 },
  { label: '2 refeiÃ§Ãµes', value: 2 },
  { label: '3 refeiÃ§Ãµes', value: 3 },
  { label: '4 refeiÃ§Ãµes', value: 4 },
]

export const BCS_LABELS = {
  1: 'CaquÃ©tico',
  2: 'Muito magro',
  3: 'Magro',
  4: 'Abaixo do peso',
  5: 'Ideal',
  6: 'Acima do peso',
  7: 'Sobrepeso',
  8: 'Obeso',
  9: 'Obesidade mÃ³rbida',
}

export const HEALTH_OPTIONS = [
  { label: 'Nenhuma condiÃ§Ã£o', value: 'nenhuma' },
  { label: 'Renal', value: 'renal' },
  { label: 'Pancreatite', value: 'pancreatite' },
  { label: 'Obesidade', value: 'obesidade' },
  { label: 'Diabetes', value: 'diabetes' },
  { label: 'Alergia alimentar', value: 'alergia_alimentar' },
  { label: 'Cardiopatia', value: 'cardiopatia' },
  { label: 'Artrite/Artrose', value: 'artrose' },
]

export const PORTE_OPTIONS = [
  { label: 'Pequeno (atÃ© 10kg)', value: 'small' },
  { label: 'MÃ©dio (10-25kg)', value: 'medium' },
  { label: 'Grande (25-44kg)', value: 'large' },
  { label: 'Gigante (45kg+)', value: 'giant' },
]
