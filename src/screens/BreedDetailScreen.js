import { ScrollView, View, Text, StyleSheet } from 'react-native'
import { colors, spacing, fontSize, borderRadius } from '../constants/theme'
import { getBreedById, PORTE_MAP, ENERGY_LABELS, GROOMING_LABELS } from '../data/breeds'

const RATING_LABELS = { 1: 'Muito baixo', 2: 'Baixo', 3: 'Moderado', 4: 'Alto', 5: 'Muito alto' }

function RatingBar({ value, max = 5 }) {
  return (
    <View style={dStyles.barRow}>
      <View style={dStyles.barOuter}>
        <View style={[dStyles.barInner, { width: `${(value / max) * 100}%` }]} />
      </View>
      <Text style={dStyles.barLabel}>{RATING_LABELS[value] || value}</Text>
    </View>
  )
}

function InfoRow({ label, value }) {
  return (
    <View style={dStyles.infoRow}>
      <Text style={dStyles.infoLabel}>{label}</Text>
      <Text style={dStyles.infoValue}>{value}</Text>
    </View>
  )
}

export default function BreedDetailScreen({ route }) {
  const { breedId } = route.params
  const breed = getBreedById(breedId)
  if (!breed) return <Text style={{ padding: 20 }}>RaÃ§a nÃ£o encontrada</Text>

  return (
    <ScrollView style={dStyles.container} contentContainerStyle={dStyles.content}>
      <View style={dStyles.card}>
        <Text style={dStyles.breedName}>{breed.name}</Text>
        <Text style={dStyles.breedNameEn}>{breed.name_en}</Text>
        <Text style={dStyles.breedOrigin}>{breed.origin}</Text>
        <Text style={dStyles.description}>{breed.description}</Text>
      </View>

      <View style={dStyles.card}>
        <Text style={dStyles.sectionTitle}>Medidas</Text>
        <View style={dStyles.measureRow}>
          <View style={dStyles.measureBox}>
            <Text style={dStyles.measureValue}>{breed.weight_min}-{breed.weight_max} kg</Text>
            <Text style={dStyles.measureLabel}>Peso</Text>
          </View>
          <View style={dStyles.measureBox}>
            <Text style={dStyles.measureValue}>{breed.height_min}-{breed.height_max} cm</Text>
            <Text style={dStyles.measureLabel}>Altura</Text>
          </View>
          <View style={dStyles.measureBox}>
            <Text style={dStyles.measureValue}>{breed.life_min}-{breed.life_max}</Text>
            <Text style={dStyles.measureLabel}>Expectativa de vida (anos)</Text>
          </View>
        </View>
      </View>

      <View style={dStyles.card}>
        <Text style={dStyles.sectionTitle}>ClassificaÃ§Ãµes</Text>
        <InfoRow label="Porte" value={PORTE_MAP[breed.size] || breed.size} />
        <InfoRow label="Bom com crianÃ§as" value={breed.good_with_children === true ? 'Sim' : breed.good_with_children === false ? 'NÃ£o' : 'Moderado'} />
        <InfoRow label="Bom com outros cÃ£es" value={breed.good_with_other_dogs === true ? 'Sim' : breed.good_with_other_dogs === false ? 'NÃ£o' : 'Moderado'} />
        <InfoRow label="Apto para apartamento" value={breed.apartment_friendly ? 'Sim' : 'NÃ£o'} />
      </View>

      <View style={dStyles.card}>
        <Text style={dStyles.sectionTitle}>Temperamento</Text>
        <View style={dStyles.tagRow}>
          {(breed.temperament || []).map((t, i) => (
            <Text key={i} style={dStyles.temperTag}>{t}</Text>
          ))}
        </View>
      </View>

      <View style={dStyles.card}>
        <Text style={dStyles.sectionTitle}>CaracterÃ­sticas</Text>
        <View style={dStyles.charRow}>
          <Text style={dStyles.charLabel}>Energia</Text>
          <RatingBar value={breed.energy_level} />
        </View>
        <View style={dStyles.charRow}>
          <Text style={dStyles.charLabel}>Adestrabilidade</Text>
          <RatingBar value={breed.trainability} />
        </View>
        <View style={dStyles.charRow}>
          <Text style={dStyles.charLabel}>Latido</Text>
          <RatingBar value={breed.barking_level} />
        </View>
        <View style={dStyles.charRow}>
          <Text style={dStyles.charLabel}>Pelos (manutenÃ§Ã£o)</Text>
          <RatingBar value={breed.grooming_needs} label={GROOMING_LABELS[breed.grooming_needs]} />
        </View>
        <View style={dStyles.charRow}>
          <Text style={dStyles.charLabel}>Queda de pelo</Text>
          <RatingBar value={breed.shedding_level} />
        </View>
      </View>

      <View style={dStyles.card}>
        <Text style={dStyles.sectionTitle}>SaÃºde</Text>
        <Text style={dStyles.subText}>Problemas comuns na raÃ§a:</Text>
        {(breed.health_issues || []).map((h, i) => (
          <Text key={i} style={dStyles.healthItem}>â€¢ {h}</Text>
        ))}
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  )
}

const dStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md },

  card: { backgroundColor: colors.white, borderRadius: borderRadius.md, padding: spacing.md, marginBottom: spacing.md },
  breedName: { fontSize: fontSize.xl, fontWeight: '800', color: colors.text },
  breedNameEn: { fontSize: fontSize.md, color: colors.textSecondary, fontStyle: 'italic', marginBottom: 2 },
  breedOrigin: { fontSize: fontSize.sm, color: colors.textSecondary, marginBottom: spacing.sm },
  description: { fontSize: fontSize.md, color: colors.text, lineHeight: 22 },

  sectionTitle: { fontSize: fontSize.lg, fontWeight: '700', color: colors.text, marginBottom: spacing.sm },

  measureRow: { flexDirection: 'row', justifyContent: 'space-around' },
  measureBox: { alignItems: 'center' },
  measureValue: { fontSize: fontSize.lg, fontWeight: '700', color: colors.primary },
  measureLabel: { fontSize: fontSize.xs, color: colors.textSecondary, marginTop: 2, textAlign: 'center' },

  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: colors.border },
  infoLabel: { fontSize: fontSize.md, color: colors.textSecondary },
  infoValue: { fontSize: fontSize.md, fontWeight: '600', color: colors.text },

  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  temperTag: {
    backgroundColor: '#EBF3FC', paddingHorizontal: 12, paddingVertical: 6,
    borderRadius: 16, fontSize: fontSize.sm, color: colors.primary, fontWeight: '500',
    overflow: 'hidden',
  },

  charRow: { marginBottom: spacing.sm },
  charLabel: { fontSize: fontSize.sm, fontWeight: '600', color: colors.text, marginBottom: 4 },

  barRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  barOuter: { flex: 1, height: 10, backgroundColor: '#E8E8E8', borderRadius: 5 },
  barInner: { height: 10, backgroundColor: colors.primaryLight, borderRadius: 5 },
  barLabel: { fontSize: fontSize.xs, color: colors.textSecondary, width: 100 },

  subText: { fontSize: fontSize.sm, color: colors.textSecondary, marginBottom: spacing.sm },
  healthItem: { fontSize: fontSize.md, color: colors.text, paddingVertical: 4, paddingLeft: spacing.xs },
})
