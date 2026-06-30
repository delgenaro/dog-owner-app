import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native'
import { useState } from 'react'
import { colors, spacing, fontSize, borderRadius } from '../constants/theme'

export default function PickerField({ label, options, value, onValueChange }) {
  const [visible, setVisible] = useState(false)
  const selected = options.find(o => o.value === value)

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={styles.selector} onPress={() => setVisible(true)}>
        <Text style={[styles.selectorText, !selected && styles.placeholder]}>
          {selected ? selected.label : 'Selecionar...'}
        </Text>
        <Text style={styles.arrow}>â–¼</Text>
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity style={styles.overlay} onPress={() => setVisible(false)}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>{label}</Text>
            <FlatList
              data={options}
              keyExtractor={(item) => String(item.value)}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.option, item.value === value && styles.optionSelected]}
                  onPress={() => { onValueChange(item.value); setVisible(false) }}
                >
                  <Text style={[styles.optionText, item.value === value && styles.optionTextSelected]}>
                    {item.label}
                  </Text>
                  {item.desc && <Text style={styles.optionDesc}>{item.desc}</Text>}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { marginBottom: spacing.md },
  label: { fontSize: fontSize.sm, fontWeight: '600', color: colors.text, marginBottom: spacing.xs },
  selector: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectorText: { fontSize: fontSize.md, color: colors.text },
  placeholder: { color: colors.textSecondary },
  arrow: { fontSize: fontSize.xs, color: colors.textSecondary },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  modal: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    maxHeight: 400,
    paddingVertical: spacing.md,
  },
  modalTitle: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.text,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  option: {
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  optionSelected: { backgroundColor: '#EBF3FC' },
  optionText: { fontSize: fontSize.md, color: colors.text },
  optionTextSelected: { color: colors.primary, fontWeight: '600' },
  optionDesc: { fontSize: fontSize.xs, color: colors.textSecondary, marginTop: 2 },
})
