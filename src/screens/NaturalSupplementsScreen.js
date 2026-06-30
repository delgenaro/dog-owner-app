import { useState, useMemo } from 'react'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import { colors, spacing, fontSize, borderRadius } from '../constants/theme'
import { NATURAL_SUPPLEMENTS, getSupplementsByCriticality } from '../data/natural-supplements'

export default function NaturalSupplementsScreen() {
  const [selected, setSelected] = useState(null)
  const byCriticality = useMemo(getSupplementsByCriticality, [])

  const tabs = [
    { key: 'critical', label: 'CrÃ­ticos', icon: 'ðŸ”´', data: byCriticality.critical },
    { key: 'recommended', label: 'Recomendados', icon: 'ðŸŸ¡', data: byCriticality.recommended },
    { key: 'optional', label: 'Opcionais', icon: 'ðŸŸ¢', data: byCriticality.optional },
  ]

  const allSupplements = selected
    ? NATURAL_SUPPLEMENTS.filter(s => s.nutrient === selected)
    : NATURAL_SUPPLEMENTS

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.hero}>Alternativas naturais para suplementar a dieta do seu cÃ£o sem produtos industrializados.</Text>

      {selected ? (
        <View>
          <TouchableOpacity onPress={() => setSelected(null)} style={styles.backBtn}>
            <Text style={styles.backText}>â† Todas as categorias</Text>
          </TouchableOpacity>
          {allSupplements.map((sup, i) => (
            <SupplementCard key={i} sup={sup} />
          ))}
        </View>
      ) : (
        tabs.map((tab, i) => (
          <View key={i}>
            <View style={styles.tabHeader}>
              <Text style={styles.tabIcon}>{tab.icon}</Text>
              <Text style={styles.tabTitle}>{tab.label}</Text>
              <Text style={styles.tabCount}>{tab.data.length}</Text>
            </View>
            {tab.data.map((sup, j) => (
              <TouchableOpacity key={j} style={styles.card} onPress={() => setSelected(sup.nutrient)}>
                <Text style={styles.cardIcon}>{sup.icon}</Text>
                <View style={styles.cardBody}>
                  <Text style={styles.cardNutrient}>{sup.nutrient}</Text>
                  <Text style={styles.cardFunction} numberOfLines={2}>{sup.function}</Text>
                </View>
                <Text style={styles.arrow}>â€º</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))
      )}
    </ScrollView>
  )
}

function SupplementCard({ sup }) {
  const [expanded, setExpanded] = useState(null)

  return (
    <View style={styles.detailCard}>
      <View style={styles.detailHeader}>
        <Text style={styles.detailIcon}>{sup.icon}</Text>
        <View style={styles.detailHeaderBody}>
          <Text style={styles.detailNutrient}>{sup.nutrient}</Text>
          {sup.critical && <Text style={styles.criticalBadge}>CRÃTICO</Text>}
        </View>
      </View>

      <Text style={styles.detailFunction}>{sup.function}</Text>

      <View style={styles.sectionBox}>
        <Text style={styles.sectionLabel}>DeficiÃªncia causa:</Text>
        <Text style={styles.sectionText}>{sup.deficiency}</Text>
      </View>

      <Text style={styles.sectionLabel}>Fontes naturais:</Text>
      {sup.foods.map((f, i) => (
        <TouchableOpacity key={i} style={styles.foodRow} onPress={() => setExpanded(expanded === i ? null : i)}>
          <View style={styles.foodHeader}>
            <Text style={styles.foodName}>{f.name}</Text>
            <Text style={styles.foodArrow}>{expanded === i ? 'â–²' : 'â–¼'}</Text>
          </View>
          <Text style={styles.foodDosage}>{f.dosage}</Text>
          {expanded === i && f.note && <Text style={styles.foodNote}>{f.note}</Text>}
        </TouchableOpacity>
      ))}

      {sup.tip && (
        <View style={styles.tipBox}>
          <Text style={styles.tipLabel}>ðŸ’¡ Dica</Text>
          <Text style={styles.tipText}>{sup.tip}</Text>
        </View>
      )}

      {sup.caution && (
        <View style={styles.cautionBox}>
          <Text style={styles.cautionLabel}>âš ï¸ Cuidado</Text>
          <Text style={styles.cautionText}>{sup.caution}</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md },

  hero: { fontSize: fontSize.sm, color: colors.textSecondary, lineHeight: 20, marginBottom: spacing.md, textAlign: 'center' },

  tabHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm, marginTop: spacing.sm },
  tabIcon: { fontSize: 16, marginRight: spacing.xs },
  tabTitle: { fontSize: fontSize.md, fontWeight: '700', color: colors.text, flex: 1 },
  tabCount: { fontSize: fontSize.xs, color: colors.textSecondary, backgroundColor: '#E8E8E8', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10, fontWeight: '600' },

  card: {
    backgroundColor: colors.white, borderRadius: borderRadius.md, padding: spacing.md,
    flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xs,
    shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 3, elevation: 1,
  },
  cardIcon: { fontSize: 28, marginRight: spacing.md },
  cardBody: { flex: 1 },
  cardNutrient: { fontSize: fontSize.md, fontWeight: '700', color: colors.text },
  cardFunction: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: 2, lineHeight: 18 },
  arrow: { fontSize: 22, color: colors.textSecondary, fontWeight: '300' },

  backBtn: { marginBottom: spacing.sm },
  backText: { fontSize: fontSize.md, color: colors.primary, fontWeight: '600' },

  detailCard: { backgroundColor: colors.white, borderRadius: borderRadius.md, padding: spacing.md, marginBottom: spacing.md },
  detailHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
  detailIcon: { fontSize: 32, marginRight: spacing.md },
  detailHeaderBody: { flex: 1 },
  detailNutrient: { fontSize: fontSize.lg, fontWeight: '800', color: colors.text },
  criticalBadge: { backgroundColor: colors.danger, color: colors.white, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4, fontSize: fontSize.xs, fontWeight: '700', alignSelf: 'flex-start', marginTop: 2, overflow: 'hidden' },
  detailFunction: { fontSize: fontSize.md, color: colors.text, lineHeight: 22, marginBottom: spacing.md },

  sectionBox: { backgroundColor: '#FCF8E3', borderRadius: borderRadius.sm, padding: spacing.sm, marginBottom: spacing.md },
  sectionLabel: { fontSize: fontSize.sm, fontWeight: '700', color: colors.text, marginBottom: spacing.xs },
  sectionText: { fontSize: fontSize.sm, color: colors.text, lineHeight: 20 },

  foodRow: { paddingVertical: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.border },
  foodHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  foodName: { fontSize: fontSize.md, fontWeight: '600', color: colors.text, flex: 1 },
  foodArrow: { fontSize: fontSize.xs, color: colors.textSecondary },
  foodDosage: { fontSize: fontSize.sm, color: colors.primary, fontWeight: '500', marginTop: 2 },
  foodNote: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: 4, lineHeight: 18, fontStyle: 'italic' },

  tipBox: { backgroundColor: '#DFF0D8', borderRadius: borderRadius.sm, padding: spacing.sm, marginTop: spacing.md },
  tipLabel: { fontSize: fontSize.sm, fontWeight: '700', color: '#3C763D', marginBottom: 2 },
  tipText: { fontSize: fontSize.sm, color: colors.text, lineHeight: 20 },

  cautionBox: { backgroundColor: '#F2DEDE', borderRadius: borderRadius.sm, padding: spacing.sm, marginTop: spacing.sm },
  cautionLabel: { fontSize: fontSize.sm, fontWeight: '700', color: '#A94442', marginBottom: 2 },
  cautionText: { fontSize: fontSize.sm, color: colors.text, lineHeight: 20 },
})
