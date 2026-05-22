/**
 * Web shim for react-native-keychain.
 * Uses localStorage for web preview only — NOT cryptographically secure.
 * On native (iOS/Android), the real react-native-keychain is used.
 */

const KEY = '__fraktal_keychain__';

function read(): Record<string, { username: string; password: string }> {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}');
  } catch {
    return {};
  }
}

function persist(data: Record<string, { username: string; password: string }>) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export const ACCESSIBLE = {
  WHEN_UNLOCKED: 'AccessibleWhenUnlocked',
  AFTER_FIRST_UNLOCK: 'AccessibleAfterFirstUnlock',
  ALWAYS: 'AccessibleAlways',
} as const;

export const ACCESS_CONTROL = {
  BIOMETRY_ANY: 'BiometryAny',
  BIOMETRY_CURRENT_SET: 'BiometryCurrentSet',
  USER_PRESENCE: 'UserPresence',
} as const;

export const AUTHENTICATION_TYPE = {
  DEVICE_PASSCODE_OR_BIOMETRICS: 'AuthenticationWithBiometricsAndPasscode',
  BIOMETRICS: 'AuthenticationWithBiometrics',
} as const;

export async function setInternetCredentials(
  server: string,
  username: string,
  password: string,
): Promise<boolean> {
  const store = read();
  store[server] = { username, password };
  persist(store);
  return true;
}

export async function getInternetCredentials(
  server: string,
): Promise<{ username: string; password: string } | false> {
  const store = read();
  return store[server] ?? false;
}

export async function resetInternetCredentials(server: string): Promise<boolean> {
  const store = read();
  delete store[server];
  persist(store);
  return true;
}

export async function hasInternetCredentials(server: string): Promise<boolean> {
  const store = read();
  return Boolean(store[server]);
}

export default {
  ACCESSIBLE,
  ACCESS_CONTROL,
  AUTHENTICATION_TYPE,
  setInternetCredentials,
  getInternetCredentials,
  resetInternetCredentials,
  hasInternetCredentials,
};
