import AsyncStorage from '@react-native-async-storage/async-storage'

const STORAGE_KEY = '@dogs'

let dogs = []
let listeners = []

function notify() {
  for (const fn of listeners) fn([...dogs])
}

export function subscribe(fn) {
  listeners.push(fn)
  return () => { listeners = listeners.filter(l => l !== fn) }
}

export async function loadDogs() {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY)
    dogs = raw ? JSON.parse(raw) : []
  } catch {
    dogs = []
  }
  notify()
  return [...dogs]
}

export async function saveDogs() {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dogs))
  } catch {}
}

export function getDogs() {
  return [...dogs]
}

export function getDog(id) {
  return dogs.find(d => d.id === id) || null
}

export async function addDog(profile) {
  const dog = {
    ...profile,
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    createdAt: new Date().toISOString(),
  }
  dogs.push(dog)
  await saveDogs()
  notify()
  return dog
}

export async function removeDog(id) {
  dogs = dogs.filter(d => d.id !== id)
  await saveDogs()
  notify()
}

export async function updateDog(id, updates) {
  const idx = dogs.findIndex(d => d.id === id)
  if (idx === -1) return null
  dogs[idx] = { ...dogs[idx], ...updates }
  await saveDogs()
  notify()
  return dogs[idx]
}
