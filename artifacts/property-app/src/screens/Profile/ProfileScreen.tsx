import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Alert, Platform, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Path } from 'react-native-svg';
import { useAuth } from '@context/AuthContext';
import type { RootStackParamList } from '@navigation/types';

const isWeb = Platform.OS === 'web';
const P = '#1a365d'; const DARK = '#00122c'; const GOLD = '#ffcb29'; const BG = '#e9e9e9'; const WHITE = '#ffffff';

function UserIcon() { return <Svg width={20} height={20} viewBox="0 0 24 24" fill="none"><Path d="M20 21V19C20 16.791 18.209 15 16 15H8C5.791 15 4 16.791 4 19V21" stroke={P} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" /><Circle cx={12} cy={7} r={4} stroke={P} strokeWidth={1.5} /></Svg>; }
function BellIcon() { return <Svg width={20} height={20} viewBox="0 0 24 24" fill="none"><Path d="M18 8A6 6 0 0 0 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8ZM13.73 21A2 2 0 0 1 10.27 21" stroke={P} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" /></Svg>; }
function ShieldIcon() { return <Svg width={20} height={20} viewBox="0 0 24 24" fill="none"><Path d="M12 22S20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke={P} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" /></Svg>; }
function HelpIcon() { return <Svg width={20} height={20} viewBox="0 0 24 24" fill="none"><Circle cx={12} cy={12} r={10} stroke={P} strokeWidth={1.5} /><Path d="M9.09 9C9.33 8.33 9.79 7.77 10.4 7.41C11.01 7.05 11.73 6.92 12.43 7.04C13.13 7.16 13.76 7.52 14.22 8.06C14.67 8.61 14.92 9.29 14.92 10C14.92 12 11.92 13 11.92 13" stroke={P} strokeWidth={1.5} strokeLinecap="round" /><Path d="M12 17H12.01" stroke={P} strokeWidth={2} strokeLinecap="round" /></Svg>; }
function ChevronRightIcon() { return <Svg width={16} height={16} viewBox="0 0 16 16" fill="none"><Path d="M6 4L10 8L6 12" stroke="#aaa" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" /></Svg>; }
function LogoutIcon() { return <Svg width={20} height={20} viewBox="0 0 24 24" fill="none"><Path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9M16 17L21 12L16 7M21 12H9" stroke="#e53e3e" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" /></Svg>; }

const MENU_SECTIONS = [
  { title: 'Account', items: [{ icon: UserIcon, label: 'Edit Profile' }, { icon: BellIcon, label: 'Notifications' }] },
  { title: 'Security', items: [{ icon: ShieldIcon, label: 'Privacy & Security' }] },
  { title: 'Support', items: [{ icon: HelpIcon, label: 'Help & Support' }] },
];

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const bottomPad = isWeb ? 140 : insets.bottom + 120;
  const topPad = isWeb ? 8 : insets.top > 0 ? insets.top : 12;
  const { userName, role, logout } = useAuth();
  const [notif, setNotif] = useState(true);

  const initials = userName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) || 'AD';

  const handleLogout = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log Out', style: 'destructive', onPress: logout },
    ]);
  };

  return (
    <View style={[s.screen, { paddingTop: topPad }]}>
      <View style={s.headerBar}>
        <Text style={s.pageTitle}>Profile</Text>
      </View>
      <ScrollView contentContainerStyle={[s.content, { paddingBottom: bottomPad }]} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={[P, DARK]} style={s.profileCard}>
          <View style={s.avatarCircle}>
            <Text style={s.avatarText}>{initials}</Text>
          </View>
          <View style={{ marginLeft: 16 }}>
            <Text style={s.profileName}>{userName || 'Aditya'}</Text>
            <Text style={s.profileRole}>{role ? role.charAt(0).toUpperCase() + role.slice(1) : 'Owner'}</Text>
          </View>
        </LinearGradient>

        <View style={s.statsRow}>
          {[{ label: 'Properties', value: '4' }, { label: 'Tenants', value: '3' }, { label: 'ROI', value: '12%' }].map(stat => (
            <View key={stat.label} style={s.statCard}>
              <Text style={s.statValue}>{stat.value}</Text>
              <Text style={s.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {MENU_SECTIONS.map(section => (
          <View key={section.title} style={s.menuSection}>
            <Text style={s.sectionTitle}>{section.title}</Text>
            <View style={s.menuCard}>
              {section.items.map((item, i) => (
                <View key={item.label}>
                  <TouchableOpacity style={s.menuRow} activeOpacity={0.7}>
                    <View style={s.menuIcon}><item.icon /></View>
                    <Text style={s.menuLabel}>{item.label}</Text>
                    {item.label === 'Notifications' ? (
                      <Switch value={notif} onValueChange={setNotif} trackColor={{ true: P }} thumbColor={WHITE} />
                    ) : (
                      <ChevronRightIcon />
                    )}
                  </TouchableOpacity>
                  {i < section.items.length - 1 && <View style={s.divider} />}
                </View>
              ))}
            </View>
          </View>
        ))}

        <TouchableOpacity style={s.logoutBtn} onPress={handleLogout} activeOpacity={0.8}>
          <LogoutIcon />
          <Text style={s.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: BG },
  headerBar: { paddingHorizontal: 20, paddingBottom: 12, backgroundColor: WHITE, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 2 },
  pageTitle: { fontWeight: '700', fontSize: 22, color: P },
  content: { padding: 16, gap: 16 },
  profileCard: { borderRadius: 18, padding: 20, flexDirection: 'row', alignItems: 'center' },
  avatarCircle: { width: 60, height: 60, borderRadius: 30, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontWeight: '700', fontSize: 22, color: WHITE },
  profileName: { fontWeight: '700', fontSize: 18, color: WHITE, marginBottom: 4 },
  profileRole: { fontWeight: '400', fontSize: 13, color: 'rgba(255,255,255,0.75)' },
  statsRow: { flexDirection: 'row', backgroundColor: WHITE, borderRadius: 16, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 },
  statCard: { flex: 1, alignItems: 'center', paddingVertical: 16 },
  statValue: { fontWeight: '700', fontSize: 20, color: P, marginBottom: 2 },
  statLabel: { fontSize: 11, color: '#718096', fontWeight: '500' },
  menuSection: { gap: 8 },
  sectionTitle: { fontWeight: '600', fontSize: 13, color: '#718096', marginLeft: 4 },
  menuCard: { backgroundColor: WHITE, borderRadius: 16, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  menuRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14 },
  menuIcon: { width: 32, height: 32, borderRadius: 8, backgroundColor: '#edf2f7', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  menuLabel: { flex: 1, fontWeight: '500', fontSize: 15, color: '#1a1a1a' },
  divider: { height: 1, backgroundColor: '#f0f0f0', marginLeft: 60 },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, backgroundColor: WHITE, borderRadius: 16, paddingVertical: 16, borderWidth: 1.5, borderColor: '#ffc0c0' },
  logoutText: { fontWeight: '600', fontSize: 15, color: '#e53e3e' },
});
