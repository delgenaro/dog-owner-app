import { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { colors, spacing, fontSize, borderRadius } from '../constants/theme'
import {
  SEX_OPTIONS, NEUTERED_OPTIONS, ACTIVITY_OPTIONS, GOAL_OPTIONS,
  DIET_TYPE_OPTIONS, MEAL_COUNT_OPTIONS, HEALTH_OPTIONS, PORTE_OPTIONS, EGG_OPTIONS
} from '../constants/options'
import FormField from '../components/FormField'
import PickerField from '../components/PickerField'
import BCSSelector from '../components/BCSSelector'
import MultiSelect from '../components/MultiSelect'
import { addDog } from '../store/dogs'

const INITIAL_STATE = {
  name: '',
  breed: '',
  photoUri: '',
  weightKg: '',
  ageYears: '',
  porte: 'large',
  sex: 'macho',
  neutered: false,
  bcs: 5,
  activityLevel: 'moderado',
  goal: 'manutencao',
  mealCount: 2,
  dietType: 'barf',
  eggsPerDay: 0,
  healthConditions: ['nenhuma'],
}

export default function DogRegistrationScreen({ navigation }) {
  const [form, setForm] = useState(INITIAL_STATE)
  const [errors, setErrors] = useState({})

  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }))

  const pickPhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      Alert.alert('PermissÃ£o necessÃ¡ria', 'Precisamos acessar sua galeria para selecionar a foto.')
      return
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    })
    if (!result.canceled) {
      update('photoUri', result.assets[0].uri)
    }
  }

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync()
    if (status !== 'granted') {
      Alert.alert('PermissÃ£o necessÃ¡ria', 'Precisamos acessar sua cÃ¢mera para tirar a foto.')
      return
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    })
    if (!result.canceled) {
      update('photoUri', result.assets[0].uri)
    }
  }

  const handlePhotoPress = () => {
    Alert.alert('Foto do cÃ£o', 'Escolha uma opÃ§Ã£o:', [
      { text: 'Tirar foto', onPress: takePhoto },
      { text: 'Galeria', onPress: pickPhoto },
      { text: 'Cancelar', style: 'cancel' },
    ])
  }

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Nome Ã© obrigatÃ³rio'
    if (!form.breed.trim()) errs.breed = 'RaÃ§a Ã© obrigatÃ³ria'
    if (!form.weightKg || Number(form.weightKg) < 0.5 || Number(form.weightKg) > 150)
      errs.weightKg = 'Peso invÃ¡lido (0.5-150 kg)'
    if (!form.ageYears || Number(form.ageYears) < 0.08 || Number(form.ageYears) > 25)
      errs.ageYears = 'Idade invÃ¡lida'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return
    const profile = {
      ...form,
      weightKg: Number(form.weightKg),
      ageYears: Number(form.ageYears),
    }
    const dog = await addDog(profile)
    Alert.alert('CÃ£o cadastrado', `${dog.name} foi adicionado com sucesso!`, [
      { text: 'Ver Perfil', onPress: () => navigation.replace('DogProfile', { dogId: dog.id }) },
    ])
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>IdentificaÃ§Ã£o</Text>
        <TouchableOpacity style={styles.photoPicker} onPress={handlePhotoPress}>
          {form.photoUri ? (
            <Image source={{ uri: form.photoUri }} style={styles.photoPreview} />
          ) : (
            <View style={styles.photoPlaceholder}>
              <Text style={styles.photoIcon}>ðŸ“·</Text>
              <Text style={styles.photoLabel}>Adicionar foto</Text>
            </View>
          )}
        </TouchableOpacity>
        <FormField label="Nome do cÃ£o" value={form.name} onChangeText={v => update('name', v)} placeholder="Ex: Thor" error={errors.name} />
        <View style={styles.row}>
          <View style={styles.rowHalf}>
            <FormField label="RaÃ§a" value={form.breed} onChangeText={v => update('breed', v)} placeholder="Ex: Pitbull" error={errors.breed} />
          </View>
          <View style={styles.rowHalf}>
            <PickerField label="Porte" options={PORTE_OPTIONS} value={form.porte} onValueChange={v => update('porte', v)} />
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Medidas</Text>
        <View style={styles.row}>
          <View style={styles.rowHalf}>
            <FormField label="Peso (kg)" value={String(form.weightKg)} onChangeText={v => update('weightKg', v)} keyboardType="decimal-pad" placeholder="Ex: 32" error={errors.weightKg} />
          </View>
          <View style={styles.rowHalf}>
            <FormField label="Idade (anos)" value={String(form.ageYears)} onChangeText={v => update('ageYears', v)} keyboardType="decimal-pad" placeholder="Ex: 8" error={errors.ageYears} />
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Perfil</Text>
        <View style={styles.row}>
          <View style={styles.rowHalf}>
            <PickerField label="Sexo" options={SEX_OPTIONS} value={form.sex} onValueChange={v => update('sex', v)} />
          </View>
          <View style={styles.rowHalf}>
            <PickerField label="Castrado" options={NEUTERED_OPTIONS} value={form.neutered} onValueChange={v => update('neutered', v)} />
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <BCSSelector value={form.bcs} onChange={v => update('bcs', v)} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Estilo de Vida</Text>
        <PickerField label="NÃ­vel de atividade" options={ACTIVITY_OPTIONS} value={form.activityLevel} onValueChange={v => update('activityLevel', v)} />
        <PickerField label="Objetivo nutricional" options={GOAL_OPTIONS} value={form.goal} onValueChange={v => update('goal', v)} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dieta</Text>
        <PickerField label="Tipo de alimentaÃ§Ã£o" options={DIET_TYPE_OPTIONS} value={form.dietType} onValueChange={v => update('dietType', v)} />
        <PickerField label="RefeiÃ§Ãµes por dia" options={MEAL_COUNT_OPTIONS} value={form.mealCount} onValueChange={v => update('mealCount', v)} />
        <PickerField label="Ovos por dia (opcional)" options={EGG_OPTIONS} value={form.eggsPerDay} onValueChange={v => update('eggsPerDay', v)} />
      </View>

      <View style={styles.section}>
        <MultiSelect label="CondiÃ§Ãµes de saÃºde" options={HEALTH_OPTIONS} value={form.healthConditions} onChange={v => update('healthConditions', v)} />
      </View>

      <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
        <Text style={styles.submitText}>Calcular Dieta</Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md },
  section: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
  },
  sectionTitle: { fontSize: fontSize.lg, fontWeight: '700', color: colors.text, marginBottom: spacing.md },

  photoPicker: { alignItems: 'center', marginBottom: spacing.md },
  photoPreview: { width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: colors.primary },
  photoPlaceholder: {
    width: 100, height: 100, borderRadius: 50, backgroundColor: '#EBF3FC',
    justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: colors.border, borderStyle: 'dashed',
  },
  photoIcon: { fontSize: 28 },
  photoLabel: { fontSize: fontSize.xs, color: colors.primary, fontWeight: '600', marginTop: 4 },

  row: { flexDirection: 'row', gap: spacing.sm },
  rowHalf: { flex: 1 },
  submit: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  submitText: { color: colors.white, fontSize: fontSize.lg, fontWeight: '700' },
})
