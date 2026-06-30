import { useState, useEffect, useCallback } from 'react'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { colors, spacing, fontSize, borderRadius } from '../constants/theme'
import { subscribe, loadDogs } from '../store/dogs'

const DIET_LABELS = {
  cooked: 'AN Cozida', barf: 'BARF', prey_model: 'Prey Model', raw_no_bones: 'AN Crua sem osso',
}

export default function HomeScreen({ navigation }) {
  const [dogs, setDogs] = useState([])

  useFocusEffect(useCallback(() => {
    loadDogs().then(setDogs)
    const unsub = subscribe(setDogs)
    return unsub
  }, []))

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Text style={styles.heroIcon}>ðŸ•</Text>
        <Text style={styles.heroTitle}>Dog Owner App</Text>
        <Text style={styles.heroSub}>NutriÃ§Ã£o natural inteligente para seu cÃ£o</Text>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Meus CÃ£es</Text>
        <TouchableOpacity onPress={() => navigation.navigate('DogRegistration')}>
          <Text style={styles.addText}>+ Adicionar</Text>
        </TouchableOpacity>
      </View>

      {dogs.length === 0 && (
        <TouchableOpacity style={styles.emptyCard} onPress={() => navigation.navigate('DogRegistration')}>
          <Text style={styles.emptyIcon}>+</Text>
          <Text style={styles.emptyTitle}>Cadastrar primeiro cÃ£o</Text>
          <Text style={styles.emptyDesc}>Calcule a dieta ideal para o seu cÃ£o</Text>
        </TouchableOpacity>
      )}

      {dogs.map(dog => (
        <TouchableOpacity
          key={dog.id}
          style={styles.dogCard}
          onPress={() => navigation.navigate('DogProfile', { dogId: dog.id })}
        >
          {dog.photoUri ? (
            <Image source={{ uri: dog.photoUri }} style={styles.dogPhoto} />
          ) : (
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{dog.name[0]}</Text>
            </View>
          )}
          <View style={styles.dogInfo}>
            <Text style={styles.dogName}>{dog.name}</Text>
            <Text style={styles.dogBreed}>{dog.breed} Â· {dog.weightKg}kg Â· {dog.ageYears} anos</Text>
            <Text style={styles.dogDiet}>{DIET_LABELS[dog.dietType]}{dog.eggsPerDay > 0 ? ` Â· ${dog.eggsPerDay} ovos` : ''}</Text>
          </View>
          <Text style={styles.arrow}>â€º</Text>
        </TouchableOpacity>
      ))}

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Ferramentas</Text>
      </View>

      <TouchableOpacity style={styles.toolCard} onPress={() => navigation.navigate('BreedCatalog')}>
        <Text style={styles.toolIcon}>ðŸ“–</Text>
        <View style={styles.toolBody}>
          <Text style={styles.toolTitle}>CatÃ¡logo de RaÃ§as</Text>
          <Text style={styles.toolDesc}>68 raÃ§as com peso, altura, temperamento e saÃºde</Text>
        </View>
        <Text style={styles.arrow}>â€º</Text>
      </TouchableOpacity>

      <View style={styles.footerCard}>
        <Text style={styles.footerTitle}>ðŸš€ Premium</Text>
        <Text style={styles.footerDesc}>
          ApÃ³s definir a refeiÃ§Ã£o ideal, receba a lista de compras para 15 ou 30 dias com quantidades exatas de cada ingrediente.
        </Text>
      </View>

      <Text style={styles.version}>v1.0.0</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md },

  hero: { alignItems: 'center', paddingVertical: spacing.md },
  heroIcon: { fontSize: 48, marginBottom: spacing.xs },
  heroTitle: { fontSize: fontSize.xl, fontWeight: '800', color: colors.text },
  heroSub: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: 2 },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.md, marginBottom: spacing.sm },
  sectionTitle: { fontSize: fontSize.md, fontWeight: '700', color: colors.text },
  addText: { fontSize: fontSize.md, color: colors.primary, fontWeight: '600' },

  emptyCard: {
    backgroundColor: colors.white, borderRadius: borderRadius.md, padding: spacing.lg,
    alignItems: 'center', borderWidth: 2, borderColor: colors.border, borderStyle: 'dashed', marginBottom: spacing.sm,
  },
  emptyIcon: { fontSize: 36, color: colors.textSecondary, fontWeight: '300', marginBottom: spacing.xs },
  emptyTitle: { fontSize: fontSize.md, fontWeight: '700', color: colors.text },
  emptyDesc: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: 2 },

  dogCard: {
    backgroundColor: colors.white, borderRadius: borderRadius.md, padding: spacing.md,
    flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 4, elevation: 2,
  },
  dogPhoto: { width: 44, height: 44, borderRadius: 22, borderWidth: 2, borderColor: colors.primary, marginRight: spacing.md },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center', marginRight: spacing.md },
  avatarText: { fontSize: fontSize.lg, fontWeight: '700', color: colors.white },
  dogInfo: { flex: 1 },
  dogName: { fontSize: fontSize.md, fontWeight: '700', color: colors.text },
  dogBreed: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: 1 },
  dogDiet: { fontSize: fontSize.xs, color: colors.primary, fontWeight: '600', marginTop: 1 },
  arrow: { fontSize: 24, color: colors.textSecondary, fontWeight: '300' },

  toolCard: {
    backgroundColor: colors.white, borderRadius: borderRadius.md, padding: spacing.md,
    flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm,
    borderLeftWidth: 4, borderLeftColor: '#5CB85C',
  },
  toolIcon: { fontSize: 24, marginRight: spacing.md },
  toolBody: { flex: 1 },
  toolTitle: { fontSize: fontSize.md, fontWeight: '700', color: colors.text },
  toolDesc: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: 1 },

  footerCard: {
    backgroundColor: '#EBF3FC', borderRadius: borderRadius.md, padding: spacing.md,
    marginTop: spacing.sm, borderWidth: 1, borderColor: '#C9E4FF',
  },
  footerTitle: { fontSize: fontSize.md, fontWeight: '700', color: colors.primaryDark, marginBottom: spacing.xs },
  footerDesc: { fontSize: fontSize.sm, color: colors.text, lineHeight: 20 },

  version: { textAlign: 'center', color: colors.textSecondary, fontSize: fontSize.xs, marginTop: spacing.xl },
})
