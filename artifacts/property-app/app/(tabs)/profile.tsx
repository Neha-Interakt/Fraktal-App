import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path, Rect, Circle } from "react-native-svg";

const isWeb = Platform.OS === "web";
const P = "#1a365d";
const DARK = "#00122c";
const GOLD = "#ffcb29";
const GOLD2 = "#c9a227";
const BG = "#e9e9e9";
const WHITE = "#ffffff";

// ─── Status Bar Icons ─────────────────────────────────────────────────────────
function CellularIcon() {
  return (
    <Svg width={20} height={12} viewBox="0 0 20 12" fill="none">
      <Rect x={0} y={7} width={3} height={5} rx={0.5} fill="#0c0c0c" />
      <Rect x={4.25} y={5} width={3} height={7} rx={0.5} fill="#0c0c0c" />
      <Rect x={8.5} y={3} width={3} height={9} rx={0.5} fill="#0c0c0c" />
      <Rect x={12.75} y={1} width={3} height={11} rx={0.5} fill="#0c0c0c" />
      <Rect x={17} y={0} width={3} height={12} rx={0.5} fill="#0c0c0c" opacity={0.3} />
    </Svg>
  );
}
function WifiIcon() {
  return (
    <Svg width={18} height={13} viewBox="0 0 18 13" fill="none">
      <Path d="M9 10.5C9.828 10.5 10.5 11.172 10.5 12C10.5 12.828 9.828 13.5 9 13.5C8.172 13.5 7.5 12.828 7.5 12C7.5 11.172 8.172 10.5 9 10.5Z" fill="#0c0c0c" />
      <Path d="M9 6.5C10.658 6.5 12.166 7.17 13.264 8.25L14.678 6.836C13.21 5.396 11.204 4.5 9 4.5C6.796 4.5 4.79 5.396 3.322 6.836L4.737 8.25C5.834 7.17 7.342 6.5 9 6.5Z" fill="#0c0c0c" />
      <Path d="M9 2.5C11.761 2.5 14.261 3.619 16.071 5.429L17.485 4.015C15.314 1.843 12.314 0.5 9 0.5C5.686 0.5 2.686 1.843 0.515 4.015L1.929 5.429C3.739 3.619 6.239 2.5 9 2.5Z" fill="#0c0c0c" />
    </Svg>
  );
}
function BatteryIcon() {
  return (
    <Svg width={25} height={13} viewBox="0 0 25 13" fill="none">
      <Rect x={0.5} y={0.5} width={21} height={12} rx={3.5} stroke="#0c0c0c" strokeOpacity={0.35} />
      <Rect x={2} y={2} width={16} height={9} rx={2} fill="#0c0c0c" />
      <Path d="M23 4.5V8.5C23.805 8.17 24.5 7.17 24.5 6.5C24.5 5.83 23.805 4.83 23 4.5Z" fill="#0c0c0c" fillOpacity={0.4} />
    </Svg>
  );
}

// ─── Menu Icons ───────────────────────────────────────────────────────────────
function UserIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path d="M20 21V19C20 16.791 18.209 15 16 15H8C5.791 15 4 16.791 4 19V21" stroke={P} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Circle cx={12} cy={7} r={4} stroke={P} strokeWidth={1.5} />
    </Svg>
  );
}
function BellIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path d="M18 8A6 6 0 0 0 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8ZM13.73 21A2 2 0 0 1 10.27 21" stroke={P} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
function ShieldIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path d="M12 22S20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke={P} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
  );
}
function FileIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke={P} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <Path d="M14 2V8H20M16 13H8M16 17H8M10 9H8" stroke={P} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}
function HelpIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={10} stroke={P} strokeWidth={1.5} />
      <Path d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15848 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13" stroke={P} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M12 17H12.01" stroke={P} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}
function StarIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke={P} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
  );
}
function ChevronRightIcon() {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <Path d="M6 4L10 8L6 12" stroke="#aaa" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
function LogoutIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="#e53e3e" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M16 17L21 12L16 7M21 12H9" stroke="#e53e3e" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const MENU_SECTIONS = [
  {
    title: "Account",
    items: [
      { label: "Personal Information", icon: <UserIcon />, badge: null },
      { label: "Security & Privacy", icon: <ShieldIcon />, badge: null },
      { label: "Documents & KYC", icon: <FileIcon />, badge: "3 new" },
    ],
  },
  {
    title: "Preferences",
    items: [
      { label: "Notifications", icon: <BellIcon />, badge: null, toggle: true },
      { label: "Rate the App", icon: <StarIcon />, badge: null },
    ],
  },
  {
    title: "Support",
    items: [
      { label: "Help & Support", icon: <HelpIcon />, badge: null },
    ],
  },
];

const STATS = [
  { label: "Properties", value: "8" },
  { label: "Tenants", value: "6" },
  { label: "Years Active", value: "4" },
];

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const topPad = isWeb ? 8 : insets.top > 0 ? insets.top : 12;
  const bottomPad = isWeb ? 90 : insets.bottom + 80;
  const [notifications, setNotifications] = useState(true);

  return (
    <View style={s.screen}>
      {/* Status Bar */}
      <View style={[s.statusBar, { paddingTop: topPad }]}>
        <Text style={s.statusTime}>9:41</Text>
        <View style={s.statusIcons}><CellularIcon /><WifiIcon /><BatteryIcon /></View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[s.body, { paddingBottom: bottomPad }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile hero card */}
        <LinearGradient colors={[P, DARK]} style={s.heroCard}>
          {/* Avatar */}
          <View style={s.avatarWrap}>
            <LinearGradient colors={[GOLD, GOLD2]} style={s.avatar}>
              <Text style={s.avatarInitial}>A</Text>
            </LinearGradient>
            <View style={s.avatarOnline} />
          </View>
          <Text style={s.heroName}>Aditya Sharma</Text>
          <Text style={s.heroEmail}>aditya.sharma@propmanager.in</Text>
          <View style={s.heroRoleBadge}>
            <Text style={s.heroRoleTxt}>Property Owner</Text>
          </View>

          {/* Stats row */}
          <View style={s.statsRow}>
            {STATS.map((st, i) => (
              <React.Fragment key={st.label}>
                <View style={s.statItem}>
                  <Text style={s.statVal}>{st.value}</Text>
                  <Text style={s.statLabel}>{st.label}</Text>
                </View>
                {i < STATS.length - 1 && <View style={s.statDiv} />}
              </React.Fragment>
            ))}
          </View>

          {/* Edit profile button */}
          <TouchableOpacity style={s.editBtn} activeOpacity={0.8}>
            <Text style={s.editBtnTxt}>Edit Profile</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* KYC / Subscription banner */}
        <View style={s.kycBanner}>
          <View style={s.kycLeft}>
            <View style={s.kycDot} />
            <View>
              <Text style={s.kycTitle}>KYC Verified</Text>
              <Text style={s.kycSub}>Your account is fully verified</Text>
            </View>
          </View>
          <View style={s.kycBadge}>
            <Text style={s.kycBadgeTxt}>Pro Plan</Text>
          </View>
        </View>

        {/* Menu sections */}
        {MENU_SECTIONS.map((section) => (
          <View key={section.title} style={s.menuSection}>
            <Text style={s.menuSectionTitle}>{section.title}</Text>
            <View style={s.menuCard}>
              {section.items.map((item, i) => (
                <TouchableOpacity
                  key={item.label}
                  activeOpacity={0.7}
                  style={[s.menuItem, i < section.items.length - 1 && s.menuItemBorder]}
                >
                  <View style={s.menuIconWrap}>{item.icon}</View>
                  <Text style={s.menuLabel}>{item.label}</Text>
                  {item.badge && !("toggle" in item) && (
                    <View style={s.menuBadge}>
                      <Text style={s.menuBadgeTxt}>{item.badge}</Text>
                    </View>
                  )}
                  {"toggle" in item ? (
                    <Switch
                      value={notifications}
                      onValueChange={setNotifications}
                      trackColor={{ false: "#e0e0e0", true: `${P}88` }}
                      thumbColor={notifications ? P : "#f4f3f4"}
                    />
                  ) : (
                    <ChevronRightIcon />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Logout */}
        <TouchableOpacity style={s.logoutBtn} activeOpacity={0.8}>
          <LogoutIcon />
          <Text style={s.logoutTxt}>Sign Out</Text>
        </TouchableOpacity>

        <Text style={s.versionTxt}>Version 1.0.0 · Property Manager</Text>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: BG },
  statusBar: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 16, paddingBottom: 4, backgroundColor: BG },
  statusTime: { fontFamily: "Inter_400Regular", fontSize: 15, color: "#0c0c0c", letterSpacing: -0.3 },
  statusIcons: { flexDirection: "row", alignItems: "center", gap: 8 },
  body: { padding: 16, gap: 12 },

  // Hero card
  heroCard: { borderRadius: 20, padding: 20, alignItems: "center", gap: 6 },
  avatarWrap: { position: "relative", marginBottom: 4 },
  avatar: { width: 72, height: 72, borderRadius: 36, alignItems: "center", justifyContent: "center" },
  avatarInitial: { fontFamily: "Inter_700Bold", fontSize: 28, color: DARK },
  avatarOnline: { position: "absolute", bottom: 2, right: 2, width: 14, height: 14, borderRadius: 7, backgroundColor: "#48bb78", borderWidth: 2, borderColor: P },
  heroName: { fontFamily: "Inter_700Bold", fontSize: 20, color: WHITE, marginTop: 4 },
  heroEmail: { fontFamily: "Inter_400Regular", fontSize: 13, color: "rgba(255,255,255,0.6)" },
  heroRoleBadge: { backgroundColor: "rgba(255,203,41,0.2)", borderRadius: 20, paddingHorizontal: 12, paddingVertical: 4, marginTop: 2, borderWidth: 1, borderColor: `${GOLD}44` },
  heroRoleTxt: { fontFamily: "Inter_500Medium", fontSize: 12, color: GOLD },
  statsRow: { flexDirection: "row", width: "100%", marginTop: 16, backgroundColor: "rgba(255,255,255,0.08)", borderRadius: 14, paddingVertical: 12 },
  statItem: { flex: 1, alignItems: "center", gap: 2 },
  statVal: { fontFamily: "Inter_700Bold", fontSize: 20, color: WHITE },
  statLabel: { fontFamily: "Inter_400Regular", fontSize: 11, color: "rgba(255,255,255,0.55)" },
  statDiv: { width: 1, backgroundColor: "rgba(255,255,255,0.15)" },
  editBtn: { marginTop: 12, borderWidth: 1, borderColor: "rgba(255,255,255,0.3)", borderRadius: 12, paddingHorizontal: 20, paddingVertical: 8 },
  editBtnTxt: { fontFamily: "Inter_500Medium", fontSize: 13, color: WHITE },

  // KYC banner
  kycBanner: { backgroundColor: WHITE, borderRadius: 14, padding: 14, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  kycLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  kycDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: "#48bb78" },
  kycTitle: { fontFamily: "Inter_600SemiBold", fontSize: 13, color: DARK },
  kycSub: { fontFamily: "Inter_400Regular", fontSize: 11, color: "#888", marginTop: 2 },
  kycBadge: { backgroundColor: `${GOLD}22`, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 4, borderWidth: 1, borderColor: `${GOLD2}44` },
  kycBadgeTxt: { fontFamily: "Inter_600SemiBold", fontSize: 12, color: GOLD2 },

  // Menu
  menuSection: { gap: 6 },
  menuSectionTitle: { fontFamily: "Inter_500Medium", fontSize: 12, color: "#888", paddingHorizontal: 4, textTransform: "uppercase", letterSpacing: 0.5 },
  menuCard: { backgroundColor: WHITE, borderRadius: 14, overflow: "hidden" },
  menuItem: { flexDirection: "row", alignItems: "center", paddingHorizontal: 14, paddingVertical: 13, gap: 12 },
  menuItemBorder: { borderBottomWidth: 1, borderBottomColor: "#f2f2f2" },
  menuIconWrap: { width: 32, height: 32, borderRadius: 10, backgroundColor: `${P}0f`, alignItems: "center", justifyContent: "center" },
  menuLabel: { flex: 1, fontFamily: "Inter_400Regular", fontSize: 14, color: "#222" },
  menuBadge: { backgroundColor: `${P}18`, borderRadius: 10, paddingHorizontal: 8, paddingVertical: 2 },
  menuBadgeTxt: { fontFamily: "Inter_500Medium", fontSize: 11, color: P },

  // Logout
  logoutBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10, backgroundColor: "#fff0f0", borderRadius: 14, paddingVertical: 14, borderWidth: 1, borderColor: "#fecaca" },
  logoutTxt: { fontFamily: "Inter_600SemiBold", fontSize: 15, color: "#e53e3e" },
  versionTxt: { fontFamily: "Inter_400Regular", fontSize: 11, color: "#aaa", textAlign: "center", marginTop: 4 },
});
