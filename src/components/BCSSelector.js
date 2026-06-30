import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { colors, spacing, fontSize, borderRadius } from '../constants/theme'
import { BCS_LABELS } from '../constants/options'

export default function BCSSelector({ value, onChange }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Escore de CondiÃ§Ã£o Corporal (BCS)</Text>
      <Text style={styles.subtitle}>1 (caquÃ©tico) â†’ 5 (ideal) â†’ 9 (obeso)</Text>

      <View style={styles.row}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <TouchableOpacity
            key={n}
            style={[styles.dot, value === n && styles.dotSelected, value < 5 && n === value && styles.dotThin, value > 5 && n === value && styles.dotFat]}
            onPress={() => onChange(n)}
          >
            <Text style={[styles.dotText, value === n && styles.dotTextSelected]}>{n}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {value && (
        <View style={[styles.statusBadge, value === 5 ? styles.badgeIdeal : value < 5 ? styles.badgeThin : styles.badgeFat]}>
          <Text style={styles.statusText}>
            {value === 5 ? 'âœ… Peso ideal' : value < 5 ? `âš ï¸ Abaixo do peso â€” ${BCS_LABELS[value]}` : `âš ï¸ Acima do peso â€” ${BCS_LABELS[value]}`}
          </Text>
        </View>
      )}

      <View style={styles.legend}>
        <Text style={styles.legendItem}>1-4: Abaixo</Text>
        <Text style={[styles.legendItem, { color: colors.success }]}>5: Ideal</Text>
        <Text style={styles.legendItem}>6-9: Acima</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { marginBottom: spacing.md },
  label: { fontSize: fontSize.sm, fontWeight: '600', color: colors.text, marginBottom: spacing.xs },
  subtitle: { fontSize: fontSize.xs, color: colors.textSecondary, marginBottom: spacing.sm },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  dot: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: '#E8E8E8',
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 2, borderColor: 'transparent',
  },
  dotSelected: { borderColor: colors.primary, backgroundColor: '#EBF3FC' },
  dotThin: { borderColor: colors.warning },
  dotFat: { borderColor: colors.danger },
  dotText: { fontSize: fontSize.sm, fontWeight: '600', color: '#888' },
  dotTextSelected: { color: colors.primary },
  statusBadge: {
    marginTop: spacing.sm,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.sm,
    alignItems: 'center',
  },
  badgeIdeal: { backgroundColor: '#DFF0D8' },
  badgeThin: { backgroundColor: '#FCF8E3' },
  badgeFat: { backgroundColor: '#F2DEDE' },
  statusText: { fontSize: fontSize.sm, fontWeight: '500' },
  legend: { flexDirection: 'row', justifyContent: 'center', gap: spacing.md, marginTop: spacing.xs },
  legendItem: { fontSize: fontSize.xs, color: colors.textSecondary },
})
