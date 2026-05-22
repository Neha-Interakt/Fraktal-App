/**
 * General-purpose non-sensitive storage using AsyncStorage.
 * Only store non-sensitive preferences here (theme, locale, etc.).
 * Never store auth tokens, passwords, or PII here.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function setItem<T>(key: string, value: T): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function getItem<T>(key: string, fallback: T): Promise<T> {
  const raw = await AsyncStorage.getItem(key);
  if (raw === null) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export async function removeItem(key: string): Promise<void> {
  await AsyncStorage.removeItem(key);
}

export async function clear(): Promise<void> {
  await AsyncStorage.clear();
}
