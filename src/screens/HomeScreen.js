import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import { colors, spacing, fontSize, borderRadius } from '../constants/theme'

const FEATURES = [
  {
    icon: 'ðŸ¥©',
    title: 'Calcular Dieta',
    desc: 'Plano alimentar personalizado com RER/MER, proporÃ§Ãµes e suplementaÃ§Ã£o',
    route: 'DogRegistration',
    color: '#4A90D9',
  },
  {
    icon: 'ðŸ“–',
    title: 'CatÃ¡logo de RaÃ§as',
    desc: '68 raÃ§as com peso, altura, temperamento, energia e saÃºde',
    route: 'BreedCatalog',
    color: '#5CB85C',
  },
  {
    icon: 'ðŸ¥š',
    title: 'Economize com Ovos',
    desc: 'Substitua parte da carne por ovos â€” mais barato e igualmente nutritivo',
    route: 'DogRegistration',
    color: '#F0AD4E',
  },
]

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Text style={styles.heroIcon}>ðŸ•</Text>
        <Text style={styles.heroTitle}>Dog Owner App</Text>
        <Text style={styles.heroSub}>NutriÃ§Ã£o natural inteligente para seu cÃ£o</Text>
      </View>

      {FEATURES.map((f, i) => (
        <TouchableOpacity
          key={i}
          style={[styles.card, { borderLeftColor: f.color }]}
          onPress={() => navigation.navigate(f.route)}
        >
          <Text style={styles.cardIcon}>{f.icon}</Text>
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>{f.title}</Text>
            <Text style={styles.cardDesc}>{f.desc}</Text>
          </View>
          <Text style={styles.cardArrow}>â€º</Text>
        </TouchableOpacity>
      ))}

      <View style={styles.footerCard}>
        <Text style={styles.footerTitle}>ðŸš€ VersÃ£o Premium</Text>
        <Text style={styles.footerDesc}>
          Defina os ingredientes e receba a lista de compras completa para 15 ou 30 dias com quantidades exatas.
        </Text>
      </View>

      <Text style={styles.version}>v1.0.0</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md },

  hero: { alignItems: 'center', paddingVertical: spacing.xl },
  heroIcon: { fontSize: 56, marginBottom: spacing.sm },
  heroTitle: { fontSize: fontSize.xxl, fontWeight: '800', color: colors.text },
  heroSub: { fontSize: fontSize.md, color: colors.textSecondary, marginTop: 4 },

  card: {
    backgroundColor: colors.white, borderRadius: borderRadius.md, padding: spacing.md,
    marginBottom: spacing.sm, flexDirection: 'row', alignItems: 'center',
    borderLeftWidth: 4, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 4, elevation: 2,
  },
  cardIcon: { fontSize: 28, marginRight: spacing.md },
  cardBody: { flex: 1 },
  cardTitle: { fontSize: fontSize.md, fontWeight: '700', color: colors.text },
  cardDesc: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: 2, lineHeight: 18 },
  cardArrow: { fontSize: 24, color: colors.textSecondary, fontWeight: '300' },

  footerCard: {
    backgroundColor: '#EBF3FC', borderRadius: borderRadius.md, padding: spacing.md,
    marginTop: spacing.sm, borderWidth: 1, borderColor: '#C9E4FF',
  },
  footerTitle: { fontSize: fontSize.md, fontWeight: '700', color: colors.primaryDark, marginBottom: spacing.xs },
  footerDesc: { fontSize: fontSize.sm, color: colors.text, lineHeight: 20 },

  version: { textAlign: 'center', color: colors.textSecondary, fontSize: fontSize.xs, marginTop: spacing.xl },
})
