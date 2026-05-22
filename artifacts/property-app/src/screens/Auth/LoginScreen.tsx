import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Rect } from 'react-native-svg';
import { useAuth } from '@context/AuthContext';
import type { RootStackParamList } from '@navigation/types';
import AppInput from '@components/ui/AppInput';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const PRIMARY = '#1a365d';
const DARK = '#00122c';
const GOLD = '#c9a227';
const WHITE = '#ffffff';
const LIGHT_GRAY = '#edf2f7';

function AppLogoIcon() {
  return (
    <Svg width={52} height={52} viewBox="0 0 52 52" fill="none">
      <Rect width={52} height={52} rx={14} fill={PRIMARY} />
      <Path d="M26 12L14 19V30C14 37.4 19.2 44.4 26 46C32.8 44.4 38 37.4 38 30V19L26 12Z" fill={`${WHITE}20`} />
      <Rect x={17} y={26} width={8} height={14} rx={2} fill={WHITE} />
      <Rect x={27} y={20} width={8} height={20} rx={2} fill={GOLD} />
    </Svg>
  );
}

export default function LoginScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const { login } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');
    if (!email.trim()) { setError('Email is required'); return; }
    if (mode === 'signup' && !name.trim()) { setError('Name is required'); return; }
    setLoading(true);
    try {
      await login(name || email.split('@')[0], email);
      navigation.replace('RoleSelect');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGuest = async () => {
    await login('Aditya', 'aditya@fraktal.in');
    navigation.replace('RoleSelect');
  };

  const topPad = Platform.OS === 'web' ? 24 : insets.top + 8;

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <LinearGradient colors={[PRIMARY, DARK]} style={[s.header, { paddingTop: topPad }]}>
        <View style={s.logoRow}>
          <AppLogoIcon />
          <View style={{ marginLeft: 12 }}>
            <Text style={s.appName}>Fraktal</Text>
            <Text style={s.tagline}>Property Management</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={{ flex: 1, backgroundColor: WHITE }} contentContainerStyle={s.body} keyboardShouldPersistTaps="handled">
        <View style={s.tabs}>
          <TouchableOpacity style={[s.tab, mode === 'signin' && s.tabActive]} onPress={() => setMode('signin')}>
            <Text style={[s.tabText, mode === 'signin' && s.tabTextActive]}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[s.tab, mode === 'signup' && s.tabActive]} onPress={() => setMode('signup')}>
            <Text style={[s.tabText, mode === 'signup' && s.tabTextActive]}>Create Account</Text>
          </TouchableOpacity>
        </View>

        <View style={s.form}>
          {mode === 'signup' && (
            <AppInput label="Full Name" required value={name} onChangeText={setName} placeholder="John Doe" containerStyle={{ marginBottom: 14 }} />
          )}
          <AppInput label="Email Address" required value={email} onChangeText={setEmail} placeholder="you@example.com" keyboardType="email-address" autoCapitalize="none" containerStyle={{ marginBottom: 14 }} />
          <AppInput label="Password" required value={password} onChangeText={setPassword} placeholder="••••••••" secureToggle containerStyle={{ marginBottom: 6 }} />
          {error ? <Text style={s.errorText}>{error}</Text> : null}
        </View>

        <TouchableOpacity style={[s.submitBtn, loading && s.btnDisabled]} onPress={handleSubmit} activeOpacity={0.85} disabled={loading}>
          <LinearGradient colors={[PRIMARY, DARK]} style={s.submitGrad}>
            <Text style={s.submitText}>{loading ? 'Please wait…' : mode === 'signin' ? 'Sign In' : 'Create Account'}</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={s.dividerRow}>
          <View style={s.dividerLine} />
          <Text style={s.dividerText}>or</Text>
          <View style={s.dividerLine} />
        </View>

        <TouchableOpacity style={s.guestBtn} onPress={handleGuest} activeOpacity={0.8}>
          <Text style={s.guestText}>Continue as Guest</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  header: { paddingHorizontal: 24, paddingBottom: 32 },
  logoRow: { flexDirection: 'row', alignItems: 'center' },
  appName: { fontWeight: '700', fontSize: 22, color: '#fff', letterSpacing: 0.3 },
  tagline: { fontWeight: '400', fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 2 },
  body: { padding: 24, paddingBottom: 48 },
  tabs: { flexDirection: 'row', backgroundColor: '#edf2f7', borderRadius: 12, padding: 4, marginBottom: 28 },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 10 },
  tabActive: { backgroundColor: '#fff', shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 4, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  tabText: { fontWeight: '500', fontSize: 14, color: '#718096' },
  tabTextActive: { color: '#1a365d', fontWeight: '600' },
  form: {},
  errorText: { color: '#e53e3e', fontSize: 13, marginTop: 4 },
  submitBtn: { marginTop: 22, borderRadius: 14, overflow: 'hidden' },
  btnDisabled: { opacity: 0.6 },
  submitGrad: { paddingVertical: 15, alignItems: 'center' },
  submitText: { fontWeight: '700', fontSize: 16, color: '#fff' },
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 20, gap: 12 },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#e2e8f0' },
  dividerText: { fontWeight: '400', fontSize: 14, color: '#a0aec0' },
  guestBtn: { borderWidth: 1.5, borderColor: '#1a365d', borderRadius: 14, paddingVertical: 14, alignItems: 'center' },
  guestText: { fontWeight: '600', fontSize: 15, color: '#1a365d' },
});
