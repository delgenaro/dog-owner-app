import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native'
import { useState } from 'react'
import { colors, spacing, fontSize, borderRadius } from '../constants/theme'

export default function MultiSelect({ label, options, value = [], onChange }) {
  const [visible, setVisible] = useState(false)

  const toggle = (optValue) => {
    if (optValue === 'nenhuma') {
      onChange(['nenhuma'])
      return
    }
    let next = value.includes(optValue)
      ? value.filter(v => v !== optValue)
      : [...value.filter(v => v !== 'nenhuma'), optValue]
    if (next.length === 0) next = ['nenhuma']
    onChange(next)
  }

  const selectedLabels = value
    .map(v => options.find(o => o.value === v))
    .filter(Boolean)
    .map(o => o.label)
    .join(', ')

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={styles.selector} onPress={() => setVisible(true)}>
        <Text style={[styles.selectorText, !selectedLabels && styles.placeholder]} numberOfLines={1}>
          {selectedLabels || 'Selecionar...'}
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
              renderItem={({ item }) => {
                const selected = value.includes(item.value)
                return (
                  <TouchableOpacity
                    style={styles.option}
                    onPress={() => toggle(item.value)}
                  >
                    <View style={[styles.checkbox, selected && styles.checkboxChecked]}>
                      {selected && <Text style={styles.checkmark}>âœ“</Text>}
                    </View>
                    <Text style={styles.optionText}>{item.label}</Text>
                  </TouchableOpacity>
                )
              }}
            />
            <TouchableOpacity style={styles.done} onPress={() => setVisible(false)}>
              <Text style={styles.doneText}>ConcluÃ­do</Text>
            </TouchableOpacity>
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
    backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border,
    borderRadius: borderRadius.md, paddingHorizontal: spacing.md, paddingVertical: 12,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  selectorText: { fontSize: fontSize.md, color: colors.text, flex: 1 },
  placeholder: { color: colors.textSecondary },
  arrow: { fontSize: fontSize.xs, color: colors.textSecondary },
  overlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  modal: { backgroundColor: colors.white, borderRadius: borderRadius.lg, maxHeight: 400 },
  modalTitle: {
    fontSize: fontSize.lg, fontWeight: '700', color: colors.text,
    paddingHorizontal: spacing.md, paddingVertical: spacing.md,
    borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  option: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: spacing.md, paddingVertical: 14,
    borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  checkbox: {
    width: 22, height: 22, borderRadius: 4, borderWidth: 2, borderColor: colors.border,
    justifyContent: 'center', alignItems: 'center', marginRight: spacing.sm,
  },
  checkboxChecked: { backgroundColor: colors.primary, borderColor: colors.primary },
  checkmark: { color: colors.white, fontWeight: '700', fontSize: 14 },
  optionText: { fontSize: fontSize.md, color: colors.text },
  done: {
    paddingVertical: 14, alignItems: 'center',
    borderTopWidth: 1, borderTopColor: colors.border,
  },
  doneText: { fontSize: fontSize.md, fontWeight: '700', color: colors.primary },
})
