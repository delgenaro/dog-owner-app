import { useState, useEffect, useCallback } from 'react'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { colors, spacing, fontSize, borderRadius } from '../constants/theme'
import { getDog, removeDog } from '../store/dogs'
import { calculateDiet } from '../calculator'

const DIET_LABELS = {
  cooked: 'AN Cozida', barf: 'BARF', prey_model: 'Prey Model', raw_no_bones: 'AN Crua sem osso',
}

export default function DogProfileScreen({ route, navigation }) {
  const { dogId } = route.params
  const [dog, setDog] = useState(null)

  useFocusEffect(useCallback(() => {
    setDog(getDog(dogId))
  }, [dogId]))

  if (!dog) {
    return <Text style={{ padding: 20, color: colors.textSecondary }}>Carregando...</Text>
  }

  const plan = calculateDiet(dog)

  const handleDelete = () => {
    Alert.alert('Remover cÃ£o', `Tem certeza que deseja remover ${dog.name}?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Remover', style: 'destructive', onPress: async () => {
        await removeDog(dogId)
        navigation.goBack()
      }},
    ])
  }

  const formatDate = (iso) => {
    if (!iso) return ''
    const d = new Date(iso)
    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`
  }

  const BCS_LABELS = { 5: 'Ideal' }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.profileHeader}>
        {dog.photoUri ? (
          <Image source={{ uri: dog.photoUri }} style={styles.photo} />
        ) : (
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{dog.name[0]}</Text>
          </View>
        )}
        <Text style={styles.dogName}>{dog.name}</Text>
        <Text style={styles.dogBreed}>{dog.breed} Â· {dog.weightKg}kg Â· {dog.ageYears} anos</Text>
        <Text style={styles.dogMeta}>
          {DIET_LABELS[dog.dietType]} Â· {dog.mealCount}x/dia
          {dog.eggsPerDay > 0 ? ` Â· ${dog.eggsPerDay} ovos/dia` : ''}
        </Text>
        {dog.createdAt && <Text style={styles.dogDate}>Cadastrado em {formatDate(dog.createdAt)}</Text>}
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{plan.targets.merKcal}</Text>
          <Text style={styles.statLabel}>kcal/dia</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{plan.targets.dailyFoodG}g</Text>
          <Text style={styles.statLabel}>alimento/dia</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{Math.round(plan.targets.dailyFoodG / dog.mealCount)}g</Text>
          <Text style={styles.statLabel}>por refeiÃ§Ã£o</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.dietButton} onPress={() => navigation.navigate('DietResult', { profile: dog })}>
        <Text style={styles.dietButtonText}>Ver Plano Alimentar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.premiumButton} onPress={() => navigation.navigate('PremiumMealPlan', { profile: dog })}>
        <Text style={styles.premiumButtonText}>Lista de Compras Premium â†’</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteText}>Remover cÃ£o</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md },

  profileHeader: { alignItems: 'center', paddingVertical: spacing.lg },
  photo: { width: 96, height: 96, borderRadius: 48, borderWidth: 3, borderColor: colors.primary, marginBottom: spacing.sm },
  avatar: {
    width: 72, height: 72, borderRadius: 36, backgroundColor: colors.primary,
    justifyContent: 'center', alignItems: 'center', marginBottom: spacing.sm,
  },
  avatarText: { fontSize: fontSize.xxl, fontWeight: '800', color: colors.white },
  dogName: { fontSize: fontSize.xl, fontWeight: '800', color: colors.text },
  dogBreed: { fontSize: fontSize.md, color: colors.textSecondary, marginTop: 2 },
  dogMeta: { fontSize: fontSize.sm, color: colors.primary, fontWeight: '600', marginTop: 4 },
  dogDate: { fontSize: fontSize.xs, color: colors.textSecondary, marginTop: 4 },

  statsRow: {
    flexDirection: 'row', backgroundColor: colors.white, borderRadius: borderRadius.md,
    padding: spacing.md, marginBottom: spacing.md, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
  },
  statBox: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: fontSize.lg, fontWeight: '800', color: colors.primary },
  statLabel: { fontSize: fontSize.xs, color: colors.textSecondary, marginTop: 2 },

  dietButton: { backgroundColor: colors.primary, paddingVertical: 14, borderRadius: borderRadius.md, alignItems: 'center', marginBottom: spacing.sm },
  dietButtonText: { color: colors.white, fontSize: fontSize.md, fontWeight: '700' },
  premiumButton: { borderWidth: 1.5, borderColor: colors.primary, paddingVertical: 14, borderRadius: borderRadius.md, alignItems: 'center', marginBottom: spacing.lg },
  premiumButtonText: { color: colors.primary, fontSize: fontSize.md, fontWeight: '700' },
  deleteButton: { alignItems: 'center', paddingVertical: spacing.sm },
  deleteText: { color: colors.danger, fontSize: fontSize.sm },
})
