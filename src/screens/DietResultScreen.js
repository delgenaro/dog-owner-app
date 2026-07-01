import { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import { colors, spacing, fontSize, borderRadius } from '../constants/theme'
import { calculateDiet } from '../calculator'

const GROUP_LABELS = {
  meat: 'Carnes', muscle_meat: 'Carne muscular',
  organs: 'VÃ­sceras', liver: 'FÃ­gado', other_organs: 'Outras vÃ­sceras',
  secretory: 'VÃ­sceras secretoras',
  raw_bone: 'Osso cru comestÃ­vel', carbs: 'Carboidratos',
  vegetables: 'Vegetais', fruits: 'Frutas', seeds: 'Sementes',
}

const DIET_LABELS = {
  cooked: 'AN Cozida', barf: 'BARF', prey_model: 'Prey Model', raw_no_bones: 'AN Crua sem osso',
}

export default function DietResultScreen({ route, navigation }) {
  const { profile } = route.params
  const plan = calculateDiet(profile)
  const [expandedAlt, setExpandedAlt] = useState(null)
  const isSmallDog = profile.weightKg < 10

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Resumo do CÃ£o</Text>
        <View style={styles.infoRow}><Text style={styles.infoLabel}>Nome</Text><Text style={styles.infoValue}>{plan.dog.name}</Text></View>
        <View style={styles.infoRow}><Text style={styles.infoLabel}>RaÃ§a</Text><Text style={styles.infoValue}>{plan.dog.breed}</Text></View>
        <View style={styles.infoRow}><Text style={styles.infoLabel}>Peso</Text><Text style={styles.infoValue}>{plan.dog.weightKg} kg</Text></View>
        <View style={styles.infoRow}><Text style={styles.infoLabel}>Dieta</Text><Text style={styles.infoValue}>{DIET_LABELS[plan.dog.dietType]}</Text></View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Metas Nutricionais</Text>
        <View style={styles.metaRow}>
          <View style={styles.metaBox}>
            <Text style={styles.metaValue}>{plan.targets.rerKcal}</Text>
            <Text style={styles.metaLabel}>RER (kcal)</Text>
          </View>
          <View style={styles.metaBox}>
            <Text style={styles.metaValue}>{plan.targets.merKcal}</Text>
            <Text style={styles.metaLabel}>MER (kcal)</Text>
          </View>
          <View style={styles.metaBox}>
            <Text style={styles.metaValue}>{plan.targets.dailyFoodG}g</Text>
            <Text style={styles.metaLabel}>Alimento/dia</Text>
          </View>
        </View>
        <View style={styles.portionRow}>
          <Text style={styles.portionText}>
            RefeiÃ§Ãµes: {profile.mealCount}x/dia Â· ~{Math.round(plan.targets.dailyFoodG / profile.mealCount)}g por refeiÃ§Ã£o
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>ComposiÃ§Ã£o da RefeiÃ§Ã£o â€” {DIET_LABELS[plan.dog.dietType]}</Text>
        <Text style={styles.cardSubtitle}>DistribuiÃ§Ã£o por grupos alimentares</Text>

        {plan.meals[0].ingredients.map((ing, i) => (
          <View key={i} style={styles.foodGroup}>
            <View style={styles.foodGroupHeader}>
              <Text style={styles.foodGroupName}>{GROUP_LABELS[ing.group] || ing.group}</Text>
              <View style={styles.foodGroupRight}>
                <Text style={styles.foodGroupPct}>{ing.pct}%</Text>
                <View style={styles.barOuter}>
                  <View style={[styles.barInner, { width: `${ing.pct}%` }]} />
                </View>
              </View>
            </View>
            <Text style={styles.foodGroupGrams}>{ing.grams}g por refeiÃ§Ã£o ({ing.preparation})</Text>
            {ing.note && <Text style={styles.foodGroupNote}>{ing.note}</Text>}
          </View>
        ))}
      </View>

      {plan.alerts.length > 0 && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Alertas</Text>
          {plan.alerts.map((a, i) => (
            <View key={i} style={[styles.alert, a.severity === 'critical' ? styles.alertCritical : a.severity === 'warning' ? styles.alertWarning : styles.alertInfo]}>
              <Text style={styles.alertIcon}>
                {a.severity === 'critical' ? 'ðŸ”´' : a.severity === 'warning' ? 'ðŸŸ¡' : 'â„¹ï¸'}
              </Text>
              <Text style={styles.alertText}>{a.message}</Text>
            </View>
          ))}
        </View>
      )}

      <View style={styles.card}>
        <Text style={styles.cardTitle}>SuplementaÃ§Ã£o</Text>
        {plan.supplements.map((s, i) => (
          <View key={i} style={styles.supplement}>
            <View style={styles.supplementHeader}>
              <Text style={styles.supplementName}>{s.name}</Text>
              {s.critical && <Text style={styles.criticalBadge}>OBRIGATÃ“RIO</Text>}
            </View>
            <Text style={styles.supplementDosage}>Dose: {s.dosage}</Text>
            <Text style={styles.supplementReason}>{s.reason}</Text>
            {s.naturalAlternatives && s.naturalAlternatives.length > 0 && (
              <TouchableOpacity style={styles.altToggle} onPress={() => setExpandedAlt(expandedAlt === i ? null : i)}>
                <Text style={styles.altToggleText}>
                  {expandedAlt === i ? 'â–² Alternativas naturais' : 'â–¼ Alternativas naturais'}
                </Text>
              </TouchableOpacity>
            )}
            {expandedAlt === i && s.naturalAlternatives && s.naturalAlternatives.map((alt, j) => (
              <View key={j} style={styles.altItem}>
                <View style={styles.altHeader}>
                  <Text style={styles.altName}>â†’ {alt.name}</Text>
                  {alt.prep && (
                    <View style={[
                      styles.prepBadge,
                      alt.prep.best === 'raw' ? styles.prepBadgeRaw :
                      alt.prep.best === 'cooked' ? styles.prepBadgeCooked :
                      styles.prepBadgeBoth
                    ]}>
                      <Text style={styles.prepBadgeText}>{alt.prep.label.split(' ')[1]}</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.altDosage}>{alt.dosage}</Text>
                {alt.prep && alt.prep.best !== 'both' && (
                  <Text style={styles.altPrep}>{alt.prep.summary}</Text>
                )}
                {isSmallDog && alt.prep?.smallDogRisk && (
                  <Text style={styles.smallDogAlert}>{alt.prep.smallDogRisk}</Text>
                )}
              </View>
            ))}
          </View>
        ))}
      </View>

      <View style={styles.eggCard}>
        <Text style={styles.eggTitle}>ðŸ¥š Ovo: barato e nutritivo</Text>
        <Text style={styles.eggDesc}>
          1 ovo (55g) = 78 kcal | 6,5g proteÃ­na | 5,5g gordura | casca = 2.000mg cÃ¡lcio
        </Text>
        <Text style={styles.eggDesc}>
          Para o {profile.name}, cada ovo substitui ~50g de carne. Com 4 ovos/dia vocÃª economiza na carne e ainda ganha cÃ¡lcio da casca.
        </Text>
        <View style={styles.eggAlert}>
          <Text style={styles.eggAlertText}>
            âš ï¸ Clara crua tem avidina (sequestra biotina). Cozinhe os ovos ou pelo menos as claras.
          </Text>
        </View>
      </View>

      <View style={styles.paywallCard}>
        <Text style={styles.paywallTitle}>ðŸš€ VersÃ£o Premium</Text>
        <Text style={styles.paywallDesc}>
          No plano pago, vocÃª define a refeiÃ§Ã£o ideal e o app calcula automaticamente as quantidades exatas de cada ingrediente para 15 ou 30 dias, gerando lista de compras completa.
        </Text>
        <TouchableOpacity style={styles.paywallButton} onPress={() => navigation.navigate('PremiumMealPlan', { profile })}>
          <Text style={styles.paywallButtonText">Ver Planos</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md },

  card: {
    backgroundColor: colors.white, borderRadius: borderRadius.md, padding: spacing.md,
    marginBottom: spacing.md, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
  },
  cardTitle: { fontSize: fontSize.lg, fontWeight: '700', color: colors.text, marginBottom: spacing.xs },
  cardSubtitle: { fontSize: fontSize.sm, color: colors.textSecondary, marginBottom: spacing.md },

  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: colors.border },
  infoLabel: { fontSize: fontSize.md, color: colors.textSecondary },
  infoValue: { fontSize: fontSize.md, fontWeight: '600', color: colors.text },

  metaRow: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: spacing.sm },
  metaBox: { alignItems: 'center' },
  metaValue: { fontSize: fontSize.xxl, fontWeight: '800', color: colors.primary },
  metaLabel: { fontSize: fontSize.xs, color: colors.textSecondary, marginTop: 2 },
  portionRow: { alignItems: 'center', paddingTop: spacing.sm, borderTopWidth: 1, borderTopColor: colors.border },
  portionText: { fontSize: fontSize.sm, color: colors.textSecondary },

  foodGroup: { marginBottom: spacing.md },
  foodGroupHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  foodGroupName: { fontSize: fontSize.md, fontWeight: '600', color: colors.text },
  foodGroupRight: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  foodGroupPct: { fontSize: fontSize.sm, fontWeight: '700', color: colors.primary },
  barOuter: { width: 60, height: 8, backgroundColor: '#E8E8E8', borderRadius: 4 },
  barInner: { height: 8, backgroundColor: colors.primaryLight, borderRadius: 4 },
  foodGroupGrams: { fontSize: fontSize.sm, color: colors.text, marginTop: 2 },
  foodGroupNote: { fontSize: fontSize.xs, color: colors.textSecondary, marginTop: 2, fontStyle: 'italic' },

  alert: { flexDirection: 'row', alignItems: 'flex-start', padding: spacing.sm, borderRadius: borderRadius.sm, marginBottom: spacing.sm },
  alertCritical: { backgroundColor: '#F2DEDE' },
  alertWarning: { backgroundColor: '#FCF8E3' },
  alertInfo: { backgroundColor: '#DFF0D8' },
  alertIcon: { fontSize: fontSize.md, marginRight: spacing.sm },
  alertText: { fontSize: fontSize.sm, color: colors.text, flex: 1 },

  supplement: { paddingVertical: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.border },
  supplementHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  supplementName: { fontSize: fontSize.md, fontWeight: '600', color: colors.text },
  criticalBadge: { fontSize: fontSize.xs, color: colors.white, backgroundColor: colors.danger, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, fontWeight: '700' },
  supplementDosage: { fontSize: fontSize.sm, color: colors.text, marginTop: 2 },
  supplementReason: { fontSize: fontSize.xs, color: colors.textSecondary, marginTop: 2 },
  altToggle: { marginTop: spacing.sm, paddingVertical: 4 },
  altToggleText: { fontSize: fontSize.sm, color: colors.primary, fontWeight: '600' },
  altItem: { backgroundColor: '#F5FAF0', borderRadius: borderRadius.sm, padding: spacing.sm, marginTop: spacing.xs },
  altHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  altName: { fontSize: fontSize.sm, fontWeight: '600', color: colors.text, flex: 1 },
  altDosage: { fontSize: fontSize.xs, color: colors.textSecondary, marginTop: 1 },
  altPrep: { fontSize: fontSize.xs, color: colors.textSecondary, marginTop: 4, fontStyle: 'italic', lineHeight: 16 },
  prepBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginLeft: spacing.sm },
  prepBadgeRaw: { backgroundColor: '#DFF0D8' },
  prepBadgeCooked: { backgroundColor: '#FCF8E3' },
  prepBadgeBoth: { backgroundColor: '#D9EDF7' },
  prepBadgeText: { fontSize: 11, fontWeight: '700' },
  smallDogAlert: { backgroundColor: '#FCF8E3', borderRadius: 4, padding: spacing.xs, marginTop: 4, fontSize: fontSize.xs, color: '#8A6D3B', lineHeight: 16 },

  eggCard: {
    backgroundColor: '#FFF8E1', borderRadius: borderRadius.md, padding: spacing.md,
    marginBottom: spacing.md, borderLeftWidth: 4, borderLeftColor: '#F0AD4E',
  },
  eggTitle: { fontSize: fontSize.md, fontWeight: '700', color: colors.text, marginBottom: spacing.xs },
  eggDesc: { fontSize: fontSize.sm, color: colors.text, lineHeight: 20, marginBottom: spacing.xs },
  eggAlert: { backgroundColor: '#FCF8E3', borderRadius: borderRadius.sm, padding: spacing.sm, marginTop: spacing.xs },
  eggAlertText: { fontSize: fontSize.xs, color: '#8A6D3B', lineHeight: 18 },

  paywallCard: {
    backgroundColor: colors.primaryDark, borderRadius: borderRadius.lg, padding: spacing.lg,
    marginBottom: spacing.md, alignItems: 'center',
  },
  paywallTitle: { fontSize: fontSize.xl, fontWeight: '800', color: colors.white, marginBottom: spacing.sm },
  paywallDesc: { fontSize: fontSize.sm, color: '#C9E4FF', textAlign: 'center', lineHeight: 20, marginBottom: spacing.md },
  paywallButton: { backgroundColor: colors.white, paddingHorizontal: spacing.xl, paddingVertical: 12, borderRadius: borderRadius.md },
  paywallButtonText: { fontSize: fontSize.md, fontWeight: '700', color: colors.primaryDark },
})
