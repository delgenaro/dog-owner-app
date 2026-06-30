import { useState, useMemo } from 'react'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Share } from 'react-native'
import { colors, spacing, fontSize, borderRadius } from '../constants/theme'
import { SUGGESTED_INGREDIENTS, GROUP_LABELS } from '../constants/ingredients'
import { calculateDiet } from '../calculator'

const DIET_LABELS = {
  cooked: 'AN Cozida', barf: 'BARF', prey_model: 'Prey Model', raw_no_bones: 'AN Crua sem osso',
}

const DURATIONS = [
  { label: '15 dias', value: 15 },
  { label: '30 dias', value: 30 },
]

export default function PremiumMealPlanScreen({ route }) {
  const { profile } = route.params
  const plan = useMemo(() => calculateDiet(profile), [profile])
  const [step, setStep] = useState(1)
  const [duration, setDuration] = useState(15)
  const [selections, setSelections] = useState({})

  const dailyMeal = plan.meals[0]
  const activeGroups = dailyMeal.ingredients.map(i => i.group).filter(g => g !== '_totalG')
  const mealsPerDay = profile.mealCount || 2

  const toggleIngredient = (group, value) => {
    setSelections(prev => {
      const current = prev[group] || []
      const next = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value]
      return { ...prev, [group]: next.length ? next : [value] }
    })
  }

  const selectAllForGroup = (group) => {
    const opts = SUGGESTED_INGREDIENTS[group] || []
    setSelections(prev => ({ ...prev, [group]: opts.map(o => o.value) }))
  }

  const calculatePlan = () => {
    const result = { groups: [], totalKg: 0, grocery: [], supplements: [] }

    for (const ing of dailyMeal.ingredients) {
      const group = ing.group
      const dailyG = ing.grams * mealsPerDay
      const totalG = dailyG * duration
      const chosen = selections[group] || []
      const opts = SUGGESTED_INGREDIENTS[group]
      const items = chosen.length
        ? chosen.map(v => ({ value: v, label: (opts?.find(o => o.value === v)?.label || v), grams: totalG / chosen.length }))
        : [{ value: group, label: GROUP_LABELS[group] || group, grams: totalG }]

      const groupTotal = totalG
      result.groups.push({
        name: GROUP_LABELS[group] || group,
        dailyG: Math.round(dailyG),
        totalG: Math.round(totalG),
        totalKg: Math.round(totalG / 100) / 10,
        items,
      })
      result.totalKg += totalG / 1000

      for (const item of items) {
        const existing = result.grocery.find(g => g.label === item.label)
        if (existing) existing.grams += item.grams
        else result.grocery.push({ label: item.label, grams: item.grams, group })
      }
    }

    for (const sup of plan.supplements) {
      const dailyDose = sup.dosage
      result.supplements.push({
        name: sup.name,
        daily: dailyDose,
        totalForPeriod: `${duration} dias Ã— dose diÃ¡ria`,
        critical: sup.critical,
      })
    }

    result.grocery = result.grocery.map(g => ({
      ...g,
      kg: Math.round(g.grams / 100) / 10,
      label: g.label,
    }))

    return result
  }

  const result = useMemo(() => {
    if (step < 3) return null
    return calculatePlan()
  }, [step, duration, selections])

  const handleShare = async () => {
    if (!result) return
    let text = `ðŸ“‹ Lista de Compras - ${duration} dias\n`
    text += `ðŸ• ${profile.name} (${profile.breed}, ${profile.weightKg}kg)\n\n`
    for (const item of result.grocery) {
      text += `â€¢ ${item.label}: ${item.kg}kg\n`
    }
    text += `\nðŸ’Š Suplementos:\n`
    for (const s of result.supplements) {
      text += `â€¢ ${s.name}: ${s.totalForPeriod}\n`
    }
    text += `\nTotal: ${Math.round(result.totalKg * 10) / 10}kg de alimento`
    try { await Share.share({ message: text }) } catch {}
  }

  const allSelectionsComplete = activeGroups.every(g => {
    if (!SUGGESTED_INGREDIENTS[g] || SUGGESTED_INGREDIENTS[g].length === 0) return true
    return (selections[g] || []).length > 0
  })

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.steps}>
          {[1, 2, 3].map((s) => (
            <TouchableOpacity key={s} style={[styles.step, step >= s && styles.stepActive]} onPress={() => s < step && setStep(s)}>
              <Text style={[styles.stepNum, step >= s && styles.stepNumActive]}>{s}</Text>
              <Text style={[styles.stepLabel, step >= s && styles.stepLabelActive]}>{s === 1 ? 'DuraÃ§Ã£o' : s === 2 ? 'Ingredientes' : 'Lista'}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {step === 1 && (
        <View>
          <Text style={styles.sectionTitle}>Por quantos dias deseja preparar?</Text>
          <View style={styles.durationRow}>
            {DURATIONS.map(d => (
              <TouchableOpacity key={d.value} style={[styles.durationCard, duration === d.value && styles.durationActive]} onPress={() => setDuration(d.value)}>
                <Text style={[styles.durationNum, duration === d.value && styles.durationNumActive]}>{d.value}</Text>
                <Text style={[styles.durationLabel, duration === d.value && styles.durationLabelActive]}>{d.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Resumo</Text>
            <Text style={styles.infoText}>Dieta: {DIET_LABELS[profile.dietType]}</Text>
            <Text style={styles.infoText}>MER: {plan.targets.merKcal} kcal/dia</Text>
            <Text style={styles.infoText}>Alimento: ~{plan.targets.dailyFoodG}g/dia</Text>
            <Text style={styles.infoText}>Preparo para {duration} dias: ~{Math.round(plan.targets.dailyFoodG * duration / 100) / 10}kg total</Text>
          </View>
          <TouchableOpacity style={styles.primaryButton} onPress={() => setStep(2)}>
            <Text style={styles.primaryButtonText}>Escolher Ingredientes</Text>
          </TouchableOpacity>
        </View>
      )}

      {step === 2 && (
        <View>
          <Text style={styles.sectionTitle}>Escolha os ingredientes para cada grupo</Text>
          <Text style={styles.sectionSub}>Selecione ao menos 1 por grupo. Deixe em branco para usar valor genÃ©rico.</Text>
          {activeGroups.map((group) => {
            const opts = SUGGESTED_INGREDIENTS[group]
            if (!opts || opts.length === 0) return null
            const dailyIng = dailyMeal.ingredients.find(i => i.group === group)
            return (
              <View key={group} style={styles.ingredientGroup}>
                <View style={styles.ingredientGroupHeader}>
                  <Text style={styles.ingredientGroupName}>{GROUP_LABELS[group]}</Text>
                  <Text style={styles.ingredientGroupGrams}>{dailyIng ? `${dailyIng.grams * mealsPerDay}g/dia` : ''}</Text>
                </View>
                <TouchableOpacity style={styles.selectAll} onPress={() => selectAllForGroup(group)}>
                  <Text style={styles.selectAllText}>Selecionar todos</Text>
                </TouchableOpacity>
                {opts.map(opt => {
                  const selected = (selections[group] || []).includes(opt.value)
                  return (
                    <TouchableOpacity key={opt.value} style={[styles.ingredientOption, selected && styles.ingredientSelected]} onPress={() => toggleIngredient(group, opt.value)}>
                      <View style={[styles.checkbox, selected && styles.checkboxChecked]}>
                        {selected && <Text style={styles.checkmark}>âœ“</Text>}
                      </View>
                      <Text style={[styles.ingredientLabel, selected && styles.ingredientLabelSelected]}>{opt.label}</Text>
                    </TouchableOpacity>
                  )
                })}
              </View>
            )
          })}
          <TouchableOpacity
            style={[styles.primaryButton, !allSelectionsComplete && styles.buttonDisabled]}
            disabled={!allSelectionsComplete}
            onPress={() => setStep(3)}
          >
            <Text style={styles.primaryButtonText}>Gerar Lista de Compras</Text>
          </TouchableOpacity>
        </View>
      )}

      {step === 3 && result && (
        <View>
          <View style={styles.summaryHeader}>
            <View style={styles.summaryBadge}>
              <Text style={styles.summaryBadgeText}>{duration} dias</Text>
            </View>
            <Text style={styles.summaryTitle}>Lista de Compras</Text>
            <Text style={styles.summarySub}>Para {profile.name}, {profile.breed} Â· {profile.weightKg}kg</Text>
          </View>

          <View style={styles.totalCard}>
            <Text style={styles.totalKg}>{Math.round(result.totalKg * 10) / 10} kg</Text>
            <Text style={styles.totalLabel}>Total de alimento</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Alimentos por grupo</Text>
            {result.groups.map((g, i) => (
              <View key={i}>
                <View style={styles.groupSummary}>
                  <Text style={styles.groupName}>{g.name}</Text>
                  <Text style={styles.groupGrams}>{g.totalKg}kg ({g.dailyG}g/dia)</Text>
                </View>
                {g.items.map((item, j) => (
                  <View key={j} style={styles.itemRow}>
                    <Text style={styles.itemLabel}>{item.label}</Text>
                    <Text style={styles.itemGrams}>{Math.round(item.grams)}g</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>ðŸ›’ Lista de Compras</Text>
            {result.grocery.map((item, i) => {
              const kg = Math.round(item.grams / 100) / 10
              return (
                <View key={i} style={styles.groceryRow}>
                  <View style={styles.groceryBullet} />
                  <Text style={styles.groceryItem}>{item.label}</Text>
                  <Text style={styles.groceryQty}>{kg}kg</Text>
                </View>
              )
            })}
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>ðŸ’Š Suplementos</Text>
            {result.supplements.map((s, i) => (
              <View key={i} style={styles.suppRow}>
                <View style={styles.suppHeader}>
                  <Text style={styles.suppName}>{s.name}</Text>
                  {s.critical && <Text style={styles.suppCritical}>OBRIGATÃ“RIO</Text>}
                </View>
                <Text style={styles.suppDesc}>Dose diÃ¡ria: {s.daily} Â· {s.totalForPeriod}</Text>
              </View>
            ))}
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>ðŸ“‹ InstruÃ§Ãµes de Preparo</Text>
            <Text style={styles.instructionText}>
              1. Distribua os ingredientes em porÃ§Ãµes diÃ¡rias individuais (ziplock ou pote){'\n'}
              2. Carnes e ossos: manter congelados, descongelar na geladeira{'\n'}
              3. Vegetais e carboidratos: cozinhar (se AN Cozida) ou servir crus processados{'\n'}
              4. Adicionar suplementos no momento de servir{'\n'}
              5. Higienizar bem vegetais e frutas antes do preparo
            </Text>
          </View>

          <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
            <Text style={styles.shareButtonText}>Compartilhar Lista</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={() => setStep(2)}>
            <Text style={styles.secondaryButtonText}>â† Alterar Ingredientes</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={{ height: 40 }} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md },

  header: { marginBottom: spacing.md },
  steps: { flexDirection: 'row', justifyContent: 'center', gap: spacing.lg },
  step: { alignItems: 'center', opacity: 0.4 },
  stepActive: { opacity: 1 },
  stepNum: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#E0E0E0', textAlign: 'center', lineHeight: 28, fontSize: fontSize.sm, fontWeight: '700', color: '#888', overflow: 'hidden' },
  stepNumActive: { backgroundColor: colors.primary, color: colors.white },
  stepLabel: { fontSize: fontSize.xs, color: '#888', marginTop: 2 },
  stepLabelActive: { color: colors.primary, fontWeight: '600' },

  sectionTitle: { fontSize: fontSize.lg, fontWeight: '700', color: colors.text, marginBottom: spacing.sm },
  sectionSub: { fontSize: fontSize.sm, color: colors.textSecondary, marginBottom: spacing.md },

  durationRow: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.md },
  durationCard: {
    flex: 1, backgroundColor: colors.white, borderRadius: borderRadius.md, padding: spacing.lg,
    alignItems: 'center', borderWidth: 2, borderColor: colors.border,
  },
  durationActive: { borderColor: colors.primary, backgroundColor: '#EBF3FC' },
  durationNum: { fontSize: fontSize.xxl, fontWeight: '800', color: colors.text },
  durationNumActive: { color: colors.primary },
  durationLabel: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: 4 },
  durationLabelActive: { color: colors.primary, fontWeight: '600' },

  infoBox: { backgroundColor: '#EBF3FC', borderRadius: borderRadius.md, padding: spacing.md, marginBottom: spacing.md },
  infoTitle: { fontSize: fontSize.md, fontWeight: '700', color: colors.primary, marginBottom: spacing.xs },
  infoText: { fontSize: fontSize.sm, color: colors.text, marginBottom: 2 },

  ingredientGroup: { backgroundColor: colors.white, borderRadius: borderRadius.md, padding: spacing.md, marginBottom: spacing.md },
  ingredientGroupHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm },
  ingredientGroupName: { fontSize: fontSize.md, fontWeight: '700', color: colors.text },
  ingredientGroupGrams: { fontSize: fontSize.sm, color: colors.primary, fontWeight: '600' },
  selectAll: { marginBottom: spacing.sm },
  selectAllText: { fontSize: fontSize.xs, color: colors.primary, fontWeight: '600' },

  ingredientOption: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: 10,
    borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  ingredientSelected: { backgroundColor: '#F5FAFF' },
  checkbox: { width: 20, height: 20, borderRadius: 4, borderWidth: 2, borderColor: colors.border, justifyContent: 'center', alignItems: 'center', marginRight: spacing.sm },
  checkboxChecked: { backgroundColor: colors.primary, borderColor: colors.primary },
  checkmark: { color: colors.white, fontWeight: '700', fontSize: 13 },
  ingredientLabel: { fontSize: fontSize.md, color: colors.text },
  ingredientLabelSelected: { fontWeight: '600' },

  primaryButton: { backgroundColor: colors.primary, paddingVertical: 16, borderRadius: borderRadius.md, alignItems: 'center', marginTop: spacing.md },
  primaryButtonText: { color: colors.white, fontSize: fontSize.md, fontWeight: '700' },
  buttonDisabled: { opacity: 0.5 },

  summaryHeader: { alignItems: 'center', marginBottom: spacing.md },
  summaryBadge: { backgroundColor: colors.primaryDark, paddingHorizontal: spacing.md, paddingVertical: 6, borderRadius: 20, marginBottom: spacing.sm },
  summaryBadgeText: { color: colors.white, fontWeight: '700', fontSize: fontSize.sm },
  summaryTitle: { fontSize: fontSize.xl, fontWeight: '800', color: colors.text },
  summarySub: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: 2 },

  totalCard: { backgroundColor: colors.primary, borderRadius: borderRadius.md, padding: spacing.lg, alignItems: 'center', marginBottom: spacing.md },
  totalKg: { fontSize: fontSize.xxl, fontWeight: '800', color: colors.white },
  totalLabel: { fontSize: fontSize.sm, color: '#C9E4FF', marginTop: 2 },

  card: { backgroundColor: colors.white, borderRadius: borderRadius.md, padding: spacing.md, marginBottom: spacing.md },
  cardTitle: { fontSize: fontSize.md, fontWeight: '700', color: colors.text, marginBottom: spacing.sm },

  groupSummary: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: colors.border },
  groupName: { fontSize: fontSize.md, fontWeight: '600', color: colors.text },
  groupGrams: { fontSize: fontSize.sm, color: colors.primary, fontWeight: '600' },

  itemRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4, paddingLeft: spacing.md },
  itemLabel: { fontSize: fontSize.sm, color: colors.text },
  itemGrams: { fontSize: fontSize.sm, color: colors.textSecondary },

  groceryRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.border },
  groceryBullet: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary, marginRight: spacing.sm },
  groceryItem: { flex: 1, fontSize: fontSize.md, color: colors.text },
  groceryQty: { fontSize: fontSize.md, fontWeight: '700', color: colors.primary },

  suppRow: { paddingVertical: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.border },
  suppHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  suppName: { fontSize: fontSize.md, fontWeight: '600', color: colors.text },
  suppCritical: { fontSize: fontSize.xs, color: colors.white, backgroundColor: colors.danger, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, fontWeight: '700' },
  suppDesc: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: 2 },

  instructionText: { fontSize: fontSize.sm, color: colors.text, lineHeight: 22 },

  shareButton: { backgroundColor: colors.success, paddingVertical: 14, borderRadius: borderRadius.md, alignItems: 'center', marginBottom: spacing.sm },
  shareButtonText: { color: colors.white, fontSize: fontSize.md, fontWeight: '700' },
  secondaryButton: { paddingVertical: 14, borderRadius: borderRadius.md, alignItems: 'center' },
  secondaryButtonText: { color: colors.primary, fontSize: fontSize.md, fontWeight: '600' },
})
