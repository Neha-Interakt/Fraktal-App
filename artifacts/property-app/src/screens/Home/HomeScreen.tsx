import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Dimensions, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Path, Rect, G } from 'react-native-svg';
import { useAuth } from '@context/AuthContext';
import type { RootStackParamList } from '@navigation/types';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { AppTabParamList } from '@navigation/types';
import { PROPERTIES_DATA } from '@data/properties';

type Props = CompositeScreenProps<
  BottomTabScreenProps<AppTabParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;

const { width: W } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';
const PRIMARY = '#1a365d';
const DARK = '#00122c';
const GOLD = '#ffcb29';
const GOLD2 = '#c9a227';
const WHITE = '#ffffff';
const BG = '#e9e9e9';

function BellIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path d="M20.79 16.49C20.27 15.6 19.5 13.06 19.5 9.75C19.5 7.76 18.71 5.85 17.3 4.45C15.9 3.04 13.99 2.25 12 2.25C10.01 2.25 8.1 3.04 6.7 4.45C5.29 5.85 4.5 7.76 4.5 9.75C4.5 13.06 3.73 15.6 3.21 16.49C3.07 16.72 3 16.98 3 17.24C3 17.51 3.07 17.77 3.2 18C3.33 18.23 3.52 18.42 3.75 18.55C3.98 18.68 4.24 18.75 4.5 18.75H8.33C8.5 19.6 8.96 20.36 9.63 20.9C10.3 21.45 11.14 21.75 12 21.75C12.86 21.75 13.7 21.45 14.37 20.9C15.04 20.36 15.5 19.6 15.67 18.75H19.5C19.76 18.75 20.02 18.68 20.25 18.55C20.48 18.42 20.67 18.23 20.8 18C20.93 17.77 21 17.51 21 17.24C21 16.98 20.93 16.72 20.79 16.49Z" fill={PRIMARY} />
    </Svg>
  );
}
function BuildingOfficeIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path d="M23.25 19.5H21.75V9H17.25V4.5H3.75V19.5H2.25C2.05 19.5 1.86 19.58 1.72 19.72C1.58 19.86 1.5 20.05 1.5 20.25C1.5 20.45 1.58 20.64 1.72 20.78C1.86 20.92 2.05 21 2.25 21H23.25C23.45 21 23.64 20.92 23.78 20.78C23.92 20.64 24 20.45 24 20.25C24 20.05 23.92 19.86 23.78 19.72C23.64 19.58 23.45 19.5 23.25 19.5ZM20.25 9V19.5H17.25V9H20.25ZM5.25 4.5H15.75V19.5H13.5V15H8.25V19.5H5.25V4.5ZM12 19.5H9V15.75H12V19.5Z" fill="#F8F8F8" />
    </Svg>
  );
}
function TrendUpGoldIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path d="M22.5 5.25V11.25C22.5 11.45 22.42 11.64 22.28 11.78C22.14 11.92 21.95 12 21.75 12C21.55 12 21.36 11.92 21.22 11.78C21.08 11.64 21 11.45 21 11.25V7.06L13.28 14.78C13.21 14.85 13.13 14.91 13.04 14.94C12.95 14.98 12.85 15 12.75 15C12.65 15 12.55 14.98 12.46 14.94C12.37 14.91 12.29 14.85 12.22 14.78L9 11.56L2.78 17.78C2.64 17.92 2.45 18 2.25 18C2.05 18 1.86 17.92 1.72 17.78C1.58 17.64 1.5 17.45 1.5 17.25C1.5 17.05 1.58 16.86 1.72 16.72L8.47 9.97C8.54 9.9 8.62 9.84 8.71 9.81C8.8 9.77 8.9 9.75 9 9.75C9.1 9.75 9.2 9.77 9.29 9.81C9.38 9.84 9.46 9.9 9.53 9.97L12.75 13.19L19.94 6H15.75C15.55 6 15.36 5.92 15.22 5.78C15.08 5.64 15 5.45 15 5.25C15 5.05 15.08 4.86 15.22 4.72C15.36 4.58 15.55 4.5 15.75 4.5H21.75C21.95 4.5 22.14 4.58 22.28 4.72C22.42 4.86 22.5 5.05 22.5 5.25Z" fill={GOLD} />
    </Svg>
  );
}
function PlusCircleIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path d="M12 2.25C6.62 2.25 2.25 6.62 2.25 12C2.25 17.38 6.62 21.75 12 21.75C17.38 21.75 21.75 17.38 21.75 12C21.75 6.62 17.38 2.25 12 2.25ZM16.5 12.75H12.75V16.5C12.75 16.91 12.41 17.25 12 17.25C11.59 17.25 11.25 16.91 11.25 16.5V12.75H7.5C7.09 12.75 6.75 12.41 6.75 12C6.75 11.59 7.09 11.25 7.5 11.25H11.25V7.5C11.25 7.09 11.59 6.75 12 6.75C12.41 6.75 12.75 7.09 12.75 7.5V11.25H16.5C16.91 11.25 17.25 11.59 17.25 12C17.25 12.41 16.91 12.75 16.5 12.75Z" fill={GOLD} />
    </Svg>
  );
}
function ChatIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path d="M12 2.25C6.62 2.25 2.25 6.62 2.25 12.03C2.25 13.82 2.72 15.54 3.61 17.05L2.27 21.11C2.2 21.34 2.19 21.58 2.25 21.81C2.32 22.03 2.44 22.24 2.62 22.4C2.8 22.56 3.02 22.65 3.25 22.67C3.48 22.69 3.72 22.63 3.91 22.5L7.98 20C9.24 20.59 10.61 20.89 12 20.89C17.38 20.89 21.75 16.53 21.75 12.03C21.75 7.52 17.38 2.25 12 2.25Z" fill={GOLD} />
    </Svg>
  );
}
function FilesIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path d="M20.03 6.22L16.28 2.47C16.21 2.4 16.13 2.34 16.04 2.31C15.95 2.27 15.85 2.25 15.75 2.25H8.25C7.85 2.25 7.47 2.41 7.19 2.69C6.91 2.97 6.75 3.35 6.75 3.75V5.25H5.25C4.85 5.25 4.47 5.41 4.19 5.69C3.91 5.97 3.75 6.35 3.75 6.75V20.25C3.75 20.65 3.91 21.03 4.19 21.31C4.47 21.59 4.85 21.75 5.25 21.75H15.75C16.15 21.75 16.53 21.59 16.81 21.31C17.09 21.03 17.25 20.65 17.25 20.25V18.75H18.75C19.15 18.75 19.53 18.59 19.81 18.31C20.09 18.03 20.25 17.65 20.25 17.25V6.75C20.25 6.65 20.23 6.55 20.19 6.46C20.16 6.37 20.1 6.29 20.03 6.22ZM15.75 20.25H5.25V6.75H12.44L15.75 10.06V20.25ZM18.75 17.25H17.25V9.75C17.25 9.65 17.23 9.55 17.19 9.46C17.16 9.37 17.1 9.29 17.03 9.22L13.28 5.47C13.21 5.4 13.13 5.34 13.04 5.31C12.95 5.27 12.85 5.25 12.75 5.25H8.25V3.75H15.44L18.75 7.06V17.25Z" fill={GOLD} />
    </Svg>
  );
}

const QUICK_ACTIONS = [
  { label: 'Add Property', icon: <PlusCircleIcon /> },
  { label: 'Financials', icon: <TrendUpGoldIcon /> },
  { label: 'Chats', icon: <ChatIcon /> },
  { label: 'Documents', icon: <FilesIcon /> },
];

const ACTIVITIES = [
  { title: 'Rent Received', property: 'Prestige Lakeside Habitat', amount: '₹22,000', tenant: 'Ramesh Kumar', time: '2h ago' },
  { title: 'Maintenance Req.', property: 'Sunset Apartments #402', amount: '₹3,200', tenant: 'Harish Rao', time: '1d ago' },
  { title: 'Lease Renewed', property: 'Green Park Residency', amount: '₹14,000', tenant: 'Priya Sharma', time: '3d ago' },
];

export default function HomeScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const topPad = isWeb ? 8 : insets.top > 0 ? insets.top : 12;
  const bottomPad = isWeb ? 140 : insets.bottom + 120;
  const { isNewUser, userName } = useAuth();

  const handleQuickAction = (label: string) => {
    switch (label) {
      case 'Add Property': navigation.navigate('AddProperty'); break;
      case 'Financials': navigation.navigate('App', { screen: 'Finance' }); break;
      case 'Chats': navigation.navigate('ChatsList'); break;
      default: break;
    }
  };

  return (
    <View style={s.screen}>
      <LinearGradient colors={[PRIMARY, DARK]} style={[s.header, { paddingTop: topPad }]}>
        <View style={s.navbar}>
          <View>
            <Text style={s.welcomeText}>Welcome back, {userName || 'Aditya'}!</Text>
            <View style={s.propsBadge}><Text style={s.propsBadgeText}>Total Properties: {PROPERTIES_DATA.length}</Text></View>
          </View>
          <TouchableOpacity activeOpacity={0.7} hitSlop={8}><BellIcon /></TouchableOpacity>
        </View>

        <View style={s.analyticsRow}>
          <LinearGradient colors={['rgba(255,255,255,0.12)', 'rgba(255,255,255,0.06)']} style={s.revenueCard}>
            <View style={s.analyticsIconBox}><BuildingOfficeIcon /></View>
            <View style={{ flex: 1 }}>
              <Text style={s.analyticsLabel}>Monthly Revenue</Text>
              <Text style={s.analyticsValue}>₹1,28,000</Text>
              <Text style={s.analyticsChange}>+10.5%</Text>
            </View>
          </LinearGradient>
          <View style={s.smallCardsCol}>
            {[
              { label: 'Occupancy Rate', value: '75%', sub: '3/4 Occupied' },
              { label: 'Pending Rents', value: '1', sub: 'Due this week' },
            ].map(card => (
              <LinearGradient key={card.label} colors={['rgba(255,255,255,0.12)', 'rgba(255,255,255,0.06)']} style={s.smallCard}>
                <View style={s.smallIconBox}><TrendUpGoldIcon /></View>
                <View style={{ flex: 1 }}>
                  <Text style={s.analyticsLabel}>{card.label}</Text>
                  <Text style={[s.analyticsValue, { fontSize: 16 }]}>{card.value}</Text>
                  <Text style={s.analyticsChangeSm}>{card.sub}</Text>
                </View>
              </LinearGradient>
            ))}
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.quickActionsRow}>
          {QUICK_ACTIONS.map(qa => (
            <TouchableOpacity key={qa.label} onPress={() => handleQuickAction(qa.label)} activeOpacity={0.8} style={s.quickAction}>
              <LinearGradient colors={[`${WHITE}18`, `${WHITE}0A`]} style={s.qaIconWrap}>
                {qa.icon}
              </LinearGradient>
              <Text style={s.qaLabel}>{qa.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </LinearGradient>

      <ScrollView contentContainerStyle={[s.content, { paddingBottom: bottomPad }]} showsVerticalScrollIndicator={false}>
        <View style={s.sectionHeader}>
          <Text style={s.sectionTitle}>Recent Properties</Text>
          <TouchableOpacity onPress={() => navigation.navigate('App', { screen: 'Properties' })}>
            <Text style={s.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.propScroll}>
          {PROPERTIES_DATA.slice(0, 4).map(prop => (
            <TouchableOpacity
              key={prop.id}
              style={s.propCard}
              activeOpacity={0.88}
              onPress={() => navigation.navigate('PropertyDetail', { id: prop.id })}
            >
              <Image source={{ uri: prop.images[0] }} style={s.propImage} resizeMode="cover" />
              <View style={s.propInfo}>
                <Text style={s.propName} numberOfLines={1}>{prop.name}</Text>
                <View style={s.propTenantRow}>
                  <View style={s.propAvatar} />
                  <Text style={s.propTenant} numberOfLines={1}>{prop.tenant?.name ?? 'Vacant'}</Text>
                </View>
                <Text style={s.propRent}>{prop.rent}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={[s.sectionHeader, { marginTop: 4 }]}>
          <Text style={s.sectionTitle}>Recent Activity</Text>
        </View>

        <View style={s.activityCard}>
          {ACTIVITIES.map((act, i) => (
            <View key={i}>
              <View style={s.actRow}>
                <View style={s.actIconBox} />
                <View style={s.actBody}>
                  <View style={s.actTopRow}>
                    <View style={{ flex: 1 }}>
                      <Text style={s.actTitle}>{act.title}</Text>
                      <Text style={s.actProp} numberOfLines={1}>{act.property}</Text>
                    </View>
                    <Text style={s.actAmount}>{act.amount}</Text>
                  </View>
                  <View style={s.actBottomRow}>
                    <View style={s.actTenantRow}>
                      <View style={s.actAvatar} />
                      <Text style={s.actTenant}>{act.tenant}</Text>
                    </View>
                    <Text style={s.actTime}>{act.time}</Text>
                  </View>
                </View>
              </View>
              {i < ACTIVITIES.length - 1 && <View style={s.divider} />}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: BG },
  header: { paddingHorizontal: 16, paddingBottom: 20 },
  navbar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingTop: 8, paddingBottom: 16 },
  welcomeText: { fontWeight: '700', fontSize: 18, color: WHITE, marginBottom: 6 },
  propsBadge: { backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4, alignSelf: 'flex-start' },
  propsBadgeText: { fontWeight: '500', fontSize: 12, color: WHITE },
  analyticsRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  revenueCard: { flex: 1.4, borderRadius: 14, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  analyticsIconBox: { width: 42, height: 42, backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  analyticsLabel: { fontWeight: '400', fontSize: 11, color: 'rgba(255,255,255,0.7)' },
  analyticsValue: { fontWeight: '700', fontSize: 17, color: WHITE, marginVertical: 2 },
  analyticsChange: { fontWeight: '600', fontSize: 12, color: GOLD },
  smallCardsCol: { flex: 1, gap: 8 },
  smallCard: { flex: 1, borderRadius: 12, padding: 10, flexDirection: 'row', alignItems: 'center', gap: 8, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  smallIconBox: { width: 30, height: 30, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  analyticsChangeSm: { fontWeight: '400', fontSize: 10, color: 'rgba(255,255,255,0.6)' },
  quickActionsRow: { gap: 12, paddingRight: 4 },
  quickAction: { alignItems: 'center', gap: 8 },
  qaIconWrap: { width: 52, height: 52, borderRadius: 16, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)' },
  qaLabel: { fontWeight: '500', fontSize: 11, color: 'rgba(255,255,255,0.9)', textAlign: 'center', maxWidth: 60 },
  content: { padding: 16, gap: 14 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 },
  sectionTitle: { fontWeight: '700', fontSize: 16, color: PRIMARY },
  seeAll: { fontWeight: '600', fontSize: 13, color: GOLD2 },
  propScroll: { gap: 12, paddingRight: 4 },
  propCard: { width: 180, backgroundColor: WHITE, borderRadius: 16, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 6, elevation: 3 },
  propImage: { width: '100%', height: 120 },
  propInfo: { padding: 10, gap: 6 },
  propName: { fontWeight: '600', fontSize: 13, color: DARK },
  propTenantRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  propAvatar: { width: 20, height: 20, borderRadius: 10, backgroundColor: '#d3d3d3' },
  propTenant: { fontWeight: '400', fontSize: 12, color: '#555', flex: 1 },
  propRent: { fontWeight: '700', fontSize: 14, color: PRIMARY },
  activityCard: { backgroundColor: WHITE, borderRadius: 16, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 3 },
  actRow: { flexDirection: 'row', alignItems: 'flex-start', padding: 14, gap: 12 },
  actIconBox: { width: 38, height: 38, borderRadius: 10, backgroundColor: '#edf2f7' },
  actBody: { flex: 1, gap: 8 },
  actTopRow: { flexDirection: 'row', justifyContent: 'space-between' },
  actTitle: { fontWeight: '600', fontSize: 14, color: '#1a1a1a' },
  actProp: { fontWeight: '400', fontSize: 12, color: '#718096', marginTop: 2 },
  actAmount: { fontWeight: '700', fontSize: 14, color: PRIMARY },
  actBottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  actTenantRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  actAvatar: { width: 18, height: 18, borderRadius: 9, backgroundColor: '#d3d3d3' },
  actTenant: { fontWeight: '400', fontSize: 12, color: '#555' },
  actTime: { fontWeight: '400', fontSize: 11, color: '#a0aec0' },
  divider: { height: 1, backgroundColor: '#f0f0f0', marginLeft: 64 },
});
