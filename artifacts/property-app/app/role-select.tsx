import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Circle, Path, Rect } from "react-native-svg";
import { useAuth, UserRole } from "@/context/auth";

const isWeb = Platform.OS === "web";
const PRIMARY = "#1a365d";
const DARK = "#00122c";
const GOLD = "#c9a227";
const WHITE = "#ffffff";
const LIGHT_GRAY = "#edf2f7";
const BORDER = "#d1d5dc";

// ─── Role Icons ────────────────────────────────────────────────────────────────

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
      <Rect x={24} y={24} width={4} height={4} rx={1} fill={active ? PRIMARY : WHITE} opacity={active ? 0.6 : 0.8} />
      <Rect x={30} y={24} width={4} height={4} rx={1} fill={active ? PRIMARY : WHITE} opacity={active ? 0.6 : 0.8} />
      <Rect x={24} y={32} width={10} height={4} rx={1} fill={active ? GOLD : GOLD} />
    </Svg>
  );
}

function TenantIcon({ active }: { active: boolean }) {
  const c = active ? WHITE : PRIMARY;
  return (
    <Svg width={40} height={40} viewBox="0 0 40 40" fill="none">
      <Circle cx={20} cy={13} r={7} fill={c} />
      <Path d="M8 36C8 28.268 13.373 22 20 22C26.627 22 32 28.268 32 36" stroke={c} strokeWidth={2.5} strokeLinecap="round" fill="none" />
      <Circle cx={32} cy={28} r={6} fill={active ? GOLD : GOLD} />
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
      <Rect x={14} y={29} width={5} height={3} rx={1} fill={active ? PRIMARY : WHITE} opacity={active ? 0.5 : 0.6} />
      <Rect x={21} y={29} width={5} height={3} rx={1} fill={active ? PRIMARY : WHITE} opacity={active ? 0.5 : 0.6} />
      <Circle cx={32} cy={14} r={6} fill={active ? GOLD : GOLD} />
      <Path d="M32 11v6M29 14h6" stroke={active ? PRIMARY : WHITE} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

function CheckBadge() {
  return (
    <Svg width={22} height={22} viewBox="0 0 22 22" fill="none">
      <Circle cx={11} cy={11} r={11} fill={GOLD} />
      <Path d="M6.5 11L9.5 14L15.5 8" stroke={WHITE} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

// ─── Role data ─────────────────────────────────────────────────────────────────

const ROLES: { key: UserRole; label: string; desc: string; badge: string; icon: (a: boolean) => React.ReactNode }[] = [
  {
    key: "owner",
    label: "Property Owner",
    desc: "I own properties and want to manage tenants, rent and maintenance.",
    badge: "Most Popular",
    icon: (a) => <OwnerIcon active={a} />,
  },
  {
    key: "tenant",
    label: "Tenant",
    desc: "I rent a property and want to pay rent, raise requests and view documents.",
    badge: "",
    icon: (a) => <TenantIcon active={a} />,
  },
  {
    key: "manager",
    label: "Property Manager",
    desc: "I manage properties on behalf of owners and handle day-to-day operations.",
    badge: "",
    icon: (a) => <ManagerIcon active={a} />,
  },
];

export default function RoleSelectScreen() {
  const insets = useSafeAreaInsets();
  const { selectRole, userName } = useAuth();
  const [selected, setSelected] = useState<UserRole>(null);
  const [loading, setLoading] = useState(false);

  const topPad = isWeb ? 0 : insets.top + 8;
  const bottomPad = isWeb ? 32 : insets.bottom + 24;

  const handleContinue = async () => {
    if (!selected) return;
    setLoading(true);
    try {
      await selectRole(selected);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: LIGHT_GRAY }}>
      {/* Header */}
      <LinearGradient colors={[PRIMARY, "#24487a"]} style={[st.header, { paddingTop: topPad }]}>
        <Text style={st.greeting}>
          {userName ? `Hello, ${userName}! 👋` : "Welcome! 👋"}
        </Text>
        <Text style={st.headerTitle}>How will you use Fraktal?</Text>
        <Text style={st.headerSub}>Select your role to personalise your experience</Text>
      </LinearGradient>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[st.content, { paddingBottom: bottomPad }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Role cards */}
        <View style={{ gap: 14 }}>
          {ROLES.map((role) => {
            const isActive = selected === role.key;
            return (
              <TouchableOpacity
                key={role.key}
                onPress={() => setSelected(role.key)}
                activeOpacity={0.85}
              >
                {isActive ? (
                  <LinearGradient
                    colors={[PRIMARY, DARK]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={st.roleCard}
                  >
                    <RoleCardContent role={role} isActive />
                  </LinearGradient>
                ) : (
                  <View style={[st.roleCard, st.roleCardInactive]}>
                    <RoleCardContent role={role} isActive={false} />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Info tip */}
        <View style={st.tipBox}>
          <Text style={st.tipTxt}>💡 You can change your role anytime from Settings</Text>
        </View>

        {/* CTA */}
        <TouchableOpacity
          onPress={handleContinue}
          activeOpacity={0.85}
          disabled={!selected || loading}
          style={[st.ctaBtn, (!selected || loading) && { opacity: 0.45 }]}
        >
          <LinearGradient
            colors={selected ? [GOLD, "#e8b820"] : ["#ccc", "#bbb"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={st.ctaGrad}
          >
            <Text style={st.ctaTxt}>
              {loading ? "Setting up…" : "Continue →"}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

function RoleCardContent({ role, isActive }: { role: (typeof ROLES)[0]; isActive: boolean }) {
  return (
    <View style={st.cardInner}>
      {/* Icon box */}
      <View style={[st.iconBox, isActive ? st.iconBoxActive : st.iconBoxInactive]}>
        {role.icon(isActive)}
      </View>

      {/* Text */}
      <View style={{ flex: 1, gap: 4 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Text style={[st.roleLabel, isActive && { color: WHITE }]}>{role.label}</Text>
          {role.badge ? (
            <View style={st.badge}>
              <Text style={st.badgeTxt}>{role.badge}</Text>
            </View>
          ) : null}
        </View>
        <Text style={[st.roleDesc, isActive && { color: `${WHITE}85` }]}>{role.desc}</Text>
      </View>

      {/* Check */}
      {isActive && (
        <View style={{ alignSelf: "center" }}>
          <CheckBadge />
        </View>
      )}
    </View>
  );
}

const st = StyleSheet.create({
  header:        { paddingBottom: 28, paddingHorizontal: 24, gap: 4, paddingTop: 20 },
  greeting:      { fontFamily: "Inter_500Medium", fontSize: 14, color: `${"#ffffff"}80` },
  headerTitle:   { fontFamily: "Inter_700Bold", fontSize: 24, color: WHITE },
  headerSub:     { fontFamily: "Inter_400Regular", fontSize: 14, color: `${"#ffffff"}75`, marginTop: 2 },
  content:       { padding: 20, paddingTop: 20, gap: 16 },
  roleCard:      { borderRadius: 18, padding: 18, overflow: "hidden" },
  roleCardInactive: { backgroundColor: WHITE, borderWidth: 1.5, borderColor: BORDER },
  cardInner:     { flexDirection: "row", alignItems: "flex-start", gap: 14 },
  iconBox:       { width: 64, height: 64, borderRadius: 16, alignItems: "center", justifyContent: "center", flexShrink: 0 },
  iconBoxActive: { backgroundColor: `${"#ffffff"}15` },
  iconBoxInactive:{ backgroundColor: `${PRIMARY}10` },
  roleLabel:     { fontFamily: "Inter_700Bold", fontSize: 16, color: PRIMARY },
  roleDesc:      { fontFamily: "Inter_400Regular", fontSize: 13, color: "#666", lineHeight: 18 },
  badge:         { backgroundColor: `${GOLD}22`, borderRadius: 8, paddingHorizontal: 7, paddingVertical: 2 },
  badgeTxt:      { fontFamily: "Inter_600SemiBold", fontSize: 10, color: GOLD },
  tipBox:        { backgroundColor: "#fffbeb", borderRadius: 12, padding: 12, borderWidth: 1, borderColor: `${GOLD}30` },
  tipTxt:        { fontFamily: "Inter_400Regular", fontSize: 13, color: "#7a5c00", textAlign: "center" },
  ctaBtn:        { borderRadius: 16, overflow: "hidden" },
  ctaGrad:       { height: 54, alignItems: "center", justifyContent: "center" },
  ctaTxt:        { fontFamily: "Inter_700Bold", fontSize: 17, color: WHITE },
});
