import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { useAuth, type UserRole } from '@context/AuthContext';
import type { RootStackParamList } from '@navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'RoleSelect'>;

const PRIMARY = '#1a365d'; const DARK = '#00122c'; const GOLD = '#c9a227'; const WHITE = '#ffffff'; const LIGHT = '#edf2f7'; const BORDER = '#d1d5dc';

function OwnerIcon({ active }: { active: boolean }) {
  const c = active ? WHITE : PRIMARY;
  return (
    <Svg width={40} height={40} viewBox="0 0 40 40" fill="none">
      <Rect x={4} y={18} width={14} height={18} rx={2} fill={c} opacity={active ? 0.9 : 0.8} />
      <Rect x={20} y={12} width={16} height={24} rx={2} fill={c} />
      <Rect x={8} y={22} width={4} height={4} rx={1} fill={active ? PRIMARY : WHITE} opacity={active ? 0.8 : 1} />
      <Rect x={14} y={22} width={4} height={4} rx={1} fill={active ? PRIMARY : WHITE} opacity={active ? 0.8 : 1} />
      <Rect x={24} y={16} width={4} height={4} rx={1} fill={active ? PRIMARY : WHITE} opacity={active ? 0.6 : 0.8} />
      <Rect x={30} y={16} width={4} height={4} rx={1} fill={active ? PRIMARY : WHITE} opacity={active ? 0.6 : 0.8} />
      <Rect x={24} y={32} width={10} height={4} rx={1} fill={GOLD} />
    </Svg>
  );
}
function TenantIcon({ active }: { active: boolean }) {
  const c = active ? WHITE : PRIMARY;
  return (
    <Svg width={40} height={40} viewBox="0 0 40 40" fill="none">
      <Circle cx={20} cy={13} r={7} fill={c} />
      <Path d="M8 36C8 28.268 13.373 22 20 22C26.627 22 32 28.268 32 36" stroke={c} strokeWidth={2.5} strokeLinecap="round" fill="none" />
      <Circle cx={32} cy={28} r={6} fill={GOLD} />
      <Path d="M30 28h4M32 26v4" stroke={active ? PRIMARY : WHITE} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}
function ManagerIcon({ active }: { active: boolean }) {
  const c = active ? WHITE : PRIMARY;
  return (
    <Svg width={40} height={40} viewBox="0 0 40 40" fill="none">
      <Rect x={8} y={16} width={24} height={18} rx={3} fill={c} />
      <Path d="M14 16V12C14 10.343 15.343 9 17 9H23C24.657 9 26 10.343 26 12V16" stroke={c} strokeWidth={2} strokeLinecap="round" fill="none" />
      <Rect x={14} y={22} width={5} height={5} rx={1} fill={active ? PRIMARY : WHITE} opacity={active ? 0.8 : 0.9} />
      <Rect x={21} y={22} width={5} height={5} rx={1} fill={active ? PRIMARY : WHITE} opacity={active ? 0.8 : 0.9} />
      <Circle cx={32} cy={14} r={6} fill={GOLD} />
      <Path d="M32 11v6M29 14h6" stroke={active ? PRIMARY : WHITE} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

const ROLES: { key: UserRole; label: string; desc: string; Icon: React.FC<{ active: boolean }> }[] = [
  { key: 'owner', label: 'Property Owner', desc: 'Manage your own properties and tenants.', Icon: OwnerIcon },
  { key: 'tenant', label: 'Tenant', desc: 'View your lease, pay rent and raise requests.', Icon: TenantIcon },
  { key: 'manager', label: 'Property Manager', desc: 'Manage multiple properties on behalf of owners.', Icon: ManagerIcon },
];

export default function RoleSelectScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const { selectRole } = useAuth();
  const [selected, setSelected] = useState<UserRole>(null);
  const [loading, setLoading] = useState(false);
  const topPad = Platform.OS === 'web' ? 24 : insets.top + 8;

  const handleContinue = async () => {
    if (!selected) return;
    setLoading(true);
    await selectRole(selected);
    navigation.replace('App', {});
  };

  return (
    <View style={[s.screen, { paddingBottom: insets.bottom + 16 }]}>
      <LinearGradient colors={[PRIMARY, DARK]} style={[s.header, { paddingTop: topPad }]}>
        <Text style={s.headerTitle}>Welcome to Fraktal</Text>
        <Text style={s.headerSub}>How will you be using the app?</Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={s.body} showsVerticalScrollIndicator={false}>
        {ROLES.map(({ key, label, desc, Icon }) => {
          const active = selected === key;
          return (
            <TouchableOpacity key={key} onPress={() => setSelected(key)} activeOpacity={0.85} style={{ marginBottom: 14 }}>
              {active ? (
                <LinearGradient colors={[PRIMARY, DARK]} style={s.card}>
                  <Icon active />
                  <View style={{ flex: 1, marginLeft: 16 }}>
                    <Text style={[s.roleLabel, { color: WHITE }]}>{label}</Text>
                    <Text style={[s.roleDesc, { color: 'rgba(255,255,255,0.75)' }]}>{desc}</Text>
                  </View>
                  <View style={s.check}><Text style={{ color: WHITE, fontSize: 14, fontWeight: '700' }}>✓</Text></View>
                </LinearGradient>
              ) : (
                <View style={[s.card, s.cardInactive]}>
                  <Icon active={false} />
                  <View style={{ flex: 1, marginLeft: 16 }}>
                    <Text style={s.roleLabel}>{label}</Text>
                    <Text style={s.roleDesc}>{desc}</Text>
                  </View>
                </View>
              )}
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity
          style={[s.continueBtn, (!selected || loading) && s.btnOff]}
          onPress={handleContinue}
          disabled={!selected || loading}
          activeOpacity={0.85}
        >
          <LinearGradient colors={selected ? [PRIMARY, DARK] : ['#a0aec0', '#a0aec0']} style={s.continueGrad}>
            <Text style={s.continueText}>{loading ? 'Please wait…' : 'Continue'}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f7fafc' },
  header: { paddingHorizontal: 24, paddingBottom: 28 },
  headerTitle: { fontWeight: '700', fontSize: 26, color: WHITE, marginBottom: 6 },
  headerSub: { fontWeight: '400', fontSize: 15, color: 'rgba(255,255,255,0.75)' },
  body: { padding: 20, paddingTop: 24 },
  card: { flexDirection: 'row', alignItems: 'center', padding: 18, borderRadius: 18 },
  cardInactive: { backgroundColor: WHITE, borderWidth: 1.5, borderColor: '#e2e8f0', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  roleLabel: { fontWeight: '700', fontSize: 16, color: PRIMARY, marginBottom: 4 },
  roleDesc: { fontWeight: '400', fontSize: 13, color: '#718096', lineHeight: 18 },
  check: { width: 28, height: 28, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  continueBtn: { marginTop: 8, borderRadius: 16, overflow: 'hidden' },
  btnOff: { opacity: 0.55 },
  continueGrad: { paddingVertical: 16, alignItems: 'center' },
  continueText: { fontWeight: '700', fontSize: 16, color: WHITE },
});
