import { useState, useMemo } from 'react'
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { colors, spacing, fontSize, borderRadius } from '../constants/theme'
import { ALL_BREEDS, PORTE_MAP, ENERGY_LABELS } from '../data/breeds'

const PORTES = ['all', 'small', 'medium', 'large', 'giant']

export default function BreedCatalogScreen({ navigation }) {
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const breeds = useMemo(() => {
    let list = filter === 'all' ? ALL_BREEDS : ALL_BREEDS.filter(b => b.size === filter)
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(b => b.name.toLowerCase().includes(q) || b.name_en?.toLowerCase().includes(q))
    }
    return list
  }, [filter, search])

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar raÃ§a..."
          placeholderTextColor={colors.textSecondary}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <ScrollView horizontal style={styles.filterRow} showsHorizontalScrollIndicator={false}>
        {PORTES.map(p => (
          <TouchableOpacity
            key={p}
            style={[styles.filterChip, filter === p && styles.filterChipActive]}
            onPress={() => setFilter(p)}
          >
            <Text style={[styles.filterChipText, filter === p && styles.filterChipTextActive]}>
              {p === 'all' ? 'Todos' : PORTE_MAP[p]}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
        {breeds.length === 0 && (
          <Text style={styles.empty}>Nenhuma raÃ§a encontrada</Text>
        )}
        {breeds.map(b => (
          <TouchableOpacity
            key={b.id}
            style={styles.card}
            onPress={() => navigation.navigate('BreedDetail', { breedId: b.id })}
          >
            <View style={styles.cardBody}>
              <Text style={styles.breedName}>{b.name}</Text>
              <Text style={styles.breedNameEn}>{b.name_en}</Text>
              <View style={styles.tagRow}>
                <Text style={styles.tag}>{PORTE_MAP[b.size]}</Text>
                <Text style={styles.tag}>{b.weight_min}-{b.weight_max}kg</Text>
              </View>
              <Text style={styles.breedOrigin}>{b.origin}</Text>
              <Text style={styles.breedDesc} numberOfLines={2}>{b.description}</Text>
              <View style={styles.metaRow}>
                <Text style={styles.meta}>âš¡ {ENERGY_LABELS[b.energy_level]}</Text>
                <Text style={styles.meta}>ðŸ“ {b.height_min}-{b.height_max}cm</Text>
                <Text style={styles.meta}>â³ {b.life_min}-{b.life_max} anos</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  searchRow: { paddingHorizontal: spacing.md, paddingTop: spacing.sm },
  searchInput: {
    backgroundColor: colors.white, borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md, paddingVertical: 10,
    fontSize: fontSize.md, borderWidth: 1, borderColor: colors.border,
    color: colors.text,
  },
  filterRow: { paddingHorizontal: spacing.md, paddingVertical: spacing.sm, gap: spacing.sm },
  filterChip: {
    paddingHorizontal: spacing.md, paddingVertical: 8,
    borderRadius: 20, backgroundColor: colors.white,
    borderWidth: 1, borderColor: colors.border, marginRight: spacing.sm,
  },
  filterChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  filterChipText: { fontSize: fontSize.sm, color: colors.text, fontWeight: '500' },
  filterChipTextActive: { color: colors.white },
  list: { flex: 1 },
  listContent: { padding: spacing.md, paddingTop: 0 },
  empty: { textAlign: 'center', color: colors.textSecondary, marginTop: spacing.xl, fontSize: fontSize.md },
  card: {
    backgroundColor: colors.white, borderRadius: borderRadius.md, padding: spacing.md,
    marginBottom: spacing.sm, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
  },
  breedName: { fontSize: fontSize.lg, fontWeight: '700', color: colors.text },
  breedNameEn: { fontSize: fontSize.sm, color: colors.textSecondary, fontStyle: 'italic', marginBottom: spacing.xs },
  tagRow: { flexDirection: 'row', gap: spacing.xs, marginBottom: spacing.xs },
  tag: {
    fontSize: fontSize.xs, color: colors.primary, backgroundColor: '#EBF3FC',
    paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4, fontWeight: '600',
  },
  breedOrigin: { fontSize: fontSize.xs, color: colors.textSecondary, marginBottom: spacing.xs },
  breedDesc: { fontSize: fontSize.sm, color: colors.text, lineHeight: 20, marginBottom: spacing.sm },
  metaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  meta: { fontSize: fontSize.xs, color: colors.textSecondary },
})
