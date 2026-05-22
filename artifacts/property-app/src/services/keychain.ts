/**
 * Keychain service — wraps react-native-keychain with a typed API.
 * All sensitive auth state is persisted here instead of AsyncStorage.
 */
import Keychain from 'react-native-keychain';

const AUTH_SERVER = 'com.fraktal.app.auth';

export interface AuthCredentials {
  hasOnboarded: boolean;
  isLoggedIn: boolean;
  role: 'owner' | 'tenant' | 'manager' | null;
  userName: string;
}

const DEFAULT_CREDENTIALS: AuthCredentials = {
  hasOnboarded: false,
  isLoggedIn: false,
  role: null,
  userName: '',
};

export async function saveAuthCredentials(data: AuthCredentials): Promise<void> {
  await Keychain.setInternetCredentials(
    AUTH_SERVER,
    'fraktal_user',
    JSON.stringify(data),
  );
}

export async function loadAuthCredentials(): Promise<AuthCredentials> {
  const result = await Keychain.getInternetCredentials(AUTH_SERVER);
  if (!result) return DEFAULT_CREDENTIALS;
  try {
    return { ...DEFAULT_CREDENTIALS, ...JSON.parse(result.password) };
  } catch {
    return DEFAULT_CREDENTIALS;
  }
}

export async function clearAuthCredentials(): Promise<void> {
  await Keychain.resetInternetCredentials(AUTH_SERVER);
}
