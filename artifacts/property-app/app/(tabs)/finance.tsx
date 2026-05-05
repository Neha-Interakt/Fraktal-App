import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
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
const GREEN = "#38a169";
const RED = "#e53e3e";

// ─── Finance Icons ────────────────────────────────────────────────────────────
function ArrowUpIcon() {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <Path d="M8 13V3M3 8L8 3L13 8" stroke={GREEN} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
function ArrowDownIcon() {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <Path d="M8 3V13M13 8L8 13L3 8" stroke={RED} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
function MoneyBagIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path d="M12 2C10 2 8 3 8 5C8 6 8.5 6.5 9 7H7C5 9 4 11 4 13C4 17.5 7.6 21 12 21C16.4 21 20 17.5 20 13C20 11 19 9 17 7H15C15.5 6.5 16 6 16 5C16 3 14 2 12 2ZM10 14V12H8V14H10ZM14 14V12H12V14H14ZM16 14V12H14V14H16Z" fill={GOLD} opacity={0.9} />
    </Svg>
  );
}
function FilterIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
      <Path d="M2 4H16M5 9H13M7.5 14H10.5" stroke={P} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

// ─── Bar Chart (mini) ─────────────────────────────────────────────────────────
const MONTHS = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const BARS = [60, 85, 70, 95, 80, 100];

function MiniBarChart() {
  return (
    <View style={c.chartWrap}>
      {BARS.map((h, i) => (
        <View key={i} style={c.barGroup}>
          <View style={[c.bar, { height: h * 0.8 }]}>
            <LinearGradient colors={[GOLD, GOLD2]} style={{ flex: 1, borderRadius: 4 }} />
          </View>
          <Text style={c.barLabel}>{MONTHS[i]}</Text>
        </View>
      ))}
    </View>
  );
}
const c = StyleSheet.create({
  chartWrap: { flexDirection: "row", alignItems: "flex-end", gap: 6, height: 90, paddingHorizontal: 4 },
  barGroup: { flex: 1, alignItems: "center", gap: 4 },
  bar: { width: "100%", borderRadius: 4, overflow: "hidden", minHeight: 8 },
  barLabel: { fontFamily: "Inter_400Regular", fontSize: 9, color: "#aaa" },
});

// ─── Transactions ─────────────────────────────────────────────────────────────
const TRANSACTIONS = [
  { id: "1", label: "Rent — Prestige Lakeside", sub: "Ramesh Kumar · Apr 1", amount: "+₹28,000", type: "income" },
  { id: "2", label: "Rent — Sunset Apartments", sub: "Harish Rao · Apr 1", amount: "+₹28,000", type: "income" },
  { id: "3", label: "Rent — Green Park Residency", sub: "Priya Sharma · Apr 2", amount: "+₹18,500", type: "income" },
  { id: "4", label: "Maintenance — AC Repair", sub: "Sunset Apt · Mar 28", amount: "−₹3,200", type: "expense" },
  { id: "5", label: "Society Fee — Prestige", sub: "Auto-deducted · Apr 1", amount: "−₹2,000", type: "expense" },
  { id: "6", label: "Insurance Premium", sub: "LIC Property Cover · Apr 5", amount: "−₹4,500", type: "expense" },
  { id: "7", label: "Rent — Prestige Lakeside", sub: "Ramesh Kumar · Mar 1", amount: "+₹28,000", type: "income" },
  { id: "8", label: "Property Tax — Green Park", sub: "Municipal Corp · Mar 15", amount: "−₹6,000", type: "expense" },
];

// ─── Collection Rows ──────────────────────────────────────────────────────────
const COLLECTION = [
  { name: "Prestige Lakeside Habitat", tenant: "Ramesh Kumar", rent: "₹28,000", paid: true },
  { name: "Sunset Apartments #402", tenant: "Harish Rao", rent: "₹28,000", paid: true },
  { name: "Green Park Residency", tenant: "Priya Sharma", rent: "₹18,500", paid: false },
  { name: "Ocean View Villa", tenant: "Vacant", rent: "₹45,000", paid: false },
];

const TABS = ["Overview", "Transactions", "Collection"];

export default function FinanceScreen() {
  const insets = useSafeAreaInsets();
  const topPad = isWeb ? 8 : insets.top > 0 ? insets.top : 12;
  const bottomPad = isWeb ? 140 : insets.bottom + 120;
  const [tab, setTab] = useState("Overview");

  return (
    <View style={s.screen}>
      {/* Header */}
      <View style={[s.header, { paddingTop: topPad }]}>
        <View style={s.titleRow}>
          <Text style={s.title}>Finance</Text>
          <Text style={s.subtitle}>April 2026</Text>
        </View>

        {/* Summary cards */}
        <View style={s.summaryRow}>
          <LinearGradient colors={[P, DARK]} style={s.summaryCard}>
            <Text style={s.summaryLabel}>Total Income</Text>
            <Text style={s.summaryVal}>₹2,80,000</Text>
            <View style={s.summaryBadge}>
              <ArrowUpIcon />
              <Text style={[s.summaryBadgeTxt, { color: GREEN }]}>+8.4% vs last yr</Text>
            </View>
          </LinearGradient>
          <View style={s.summaryColRight}>
            <View style={s.smallSummCard}>
              <Text style={s.smallLabel}>Expenses</Text>
              <Text style={s.smallVal}>₹63,400</Text>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 2, marginTop: 2 }}>
                <ArrowDownIcon />
                <Text style={[s.smallChange, { color: RED }]}>−12% ↓</Text>
              </View>
            </View>
            <View style={[s.smallSummCard, { backgroundColor: `${P}22`, borderColor: `${P}44` }]}>
              <Text style={s.smallLabel}>Net Revenue</Text>
              <Text style={[s.smallVal, { color: P }]}>₹2,16,600</Text>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 2, marginTop: 2 }}>
                <ArrowUpIcon />
                <Text style={[s.smallChange, { color: GREEN }]}>+10.5%</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.tabsRow}>
          {TABS.map((t) => (
            <Pressable key={t} onPress={() => setTab(t)} style={[s.tabChip, tab === t && s.tabChipActive]}>
              <Text style={[s.tabChipTxt, tab === t && s.tabChipTxtActive]}>{t}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[s.body, { paddingBottom: bottomPad }]}
        showsVerticalScrollIndicator={false}
      >
        {tab === "Overview" && (
          <>
            {/* Bar Chart */}
            <View style={s.card}>
              <View style={s.cardHeaderRow}>
                <Text style={s.cardTitle}>Monthly Revenue</Text>
                <Text style={s.cardMeta}>Last 6 months</Text>
              </View>
              <MiniBarChart />
            </View>

            {/* Breakdown */}
            <View style={s.card}>
              <Text style={s.cardTitle}>Revenue Breakdown</Text>
              <View style={{ gap: 10, marginTop: 10 }}>
                <BreakdownRow label="Rental Income" value="₹2,80,000" pct={82} color={P} />
                <BreakdownRow label="Maintenance Charges" value="₹24,000" pct={7} color={GOLD2} />
                <BreakdownRow label="Misc / Other" value="₹8,400" pct={3} color="#718096" />
              </View>
            </View>

            {/* Upcoming */}
            <View style={s.card}>
              <Text style={s.cardTitle}>Upcoming Payments</Text>
              <View style={{ gap: 8, marginTop: 8 }}>
                <UpcomingRow label="Property Tax — Green Park" due="May 15" amount="₹6,000" />
                <UpcomingRow label="Insurance Renewal" due="May 20" amount="₹4,500" />
                <UpcomingRow label="Society Fee — Prestige" due="May 1" amount="₹2,000" />
              </View>
            </View>
          </>
        )}

        {tab === "Transactions" && (
          <View style={s.card}>
            <View style={s.cardHeaderRow}>
              <Text style={s.cardTitle}>All Transactions</Text>
              <View style={s.filterBtn}>
                <FilterIcon />
              </View>
            </View>
            <View style={{ gap: 0, marginTop: 8 }}>
              {TRANSACTIONS.map((tx) => (
                <TxRow key={tx.id} tx={tx} />
              ))}
            </View>
          </View>
        )}

        {tab === "Collection" && (
          <View style={s.card}>
            <Text style={s.cardTitle}>April Rent Collection</Text>
            <View style={s.collectSummary}>
              <Text style={s.collectSummTxt}><Text style={{ color: GREEN, fontFamily: "Inter_700Bold" }}>2/4</Text> properties paid</Text>
              <View style={s.collectBar}><View style={[s.collectFill, { width: "50%" }]} /></View>
            </View>
            <View style={{ gap: 0, marginTop: 4 }}>
              {COLLECTION.map((row, i) => (
                <CollectRow key={i} row={row} />
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

function BreakdownRow({ label, value, pct, color }: { label: string; value: string; pct: number; color: string }) {
  return (
    <View style={{ gap: 4 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ fontFamily: "Inter_400Regular", fontSize: 13, color: "#444" }}>{label}</Text>
        <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 13, color: DARK }}>{value}</Text>
      </View>
      <View style={s.progBar}>
        <View style={[s.progFill, { width: `${pct}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
}

function UpcomingRow({ label, due, amount }: { label: string; due: string; amount: string }) {
  return (
    <View style={s.upcomingRow}>
      <View style={s.upcomingDot} />
      <View style={{ flex: 1 }}>
        <Text style={{ fontFamily: "Inter_500Medium", fontSize: 13, color: "#222" }}>{label}</Text>
        <Text style={{ fontFamily: "Inter_400Regular", fontSize: 11, color: "#888", marginTop: 2 }}>Due {due}</Text>
      </View>
      <Text style={{ fontFamily: "Inter_700Bold", fontSize: 13, color: RED }}>{amount}</Text>
    </View>
  );
}

function TxRow({ tx }: { tx: typeof TRANSACTIONS[0] }) {
  const isIncome = tx.type === "income";
  return (
    <View style={s.txRow}>
      <View style={[s.txDot, { backgroundColor: isIncome ? `${GREEN}22` : `${RED}22` }]}>
        <Text style={{ fontSize: 12 }}>{isIncome ? "↑" : "↓"}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={s.txLabel}>{tx.label}</Text>
        <Text style={s.txSub}>{tx.sub}</Text>
      </View>
      <Text style={[s.txAmount, { color: isIncome ? GREEN : RED }]}>{tx.amount}</Text>
    </View>
  );
}

function CollectRow({ row }: { row: typeof COLLECTION[0] }) {
  return (
    <View style={s.collectRow}>
      <View style={s.collectAvatar} />
      <View style={{ flex: 1 }}>
        <Text style={s.collectProp} numberOfLines={1}>{row.name}</Text>
        <Text style={s.collectTenant}>{row.tenant}</Text>
      </View>
      <View style={{ alignItems: "flex-end", gap: 4 }}>
        <Text style={s.collectRent}>{row.rent}</Text>
        <View style={[s.collectBadge, { backgroundColor: row.paid ? `${GREEN}22` : `${RED}22` }]}>
          <Text style={[s.collectBadgeTxt, { color: row.paid ? GREEN : RED }]}>
            {row.paid ? "Paid" : row.tenant === "Vacant" ? "Vacant" : "Pending"}
          </Text>
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: BG },
  header: { backgroundColor: WHITE },
  titleRow: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 4 },
  title: { fontFamily: "Inter_700Bold", fontSize: 22, color: DARK },
  subtitle: { fontFamily: "Inter_400Regular", fontSize: 13, color: "#888", marginTop: 2 },
  summaryRow: { flexDirection: "row", gap: 10, paddingHorizontal: 16, paddingVertical: 12 },
  summaryCard: { flex: 1.3, borderRadius: 16, padding: 14, gap: 4 },
  summaryLabel: { fontFamily: "Inter_400Regular", fontSize: 12, color: "rgba(255,255,255,0.7)" },
  summaryVal: { fontFamily: "Inter_700Bold", fontSize: 20, color: WHITE, marginTop: 2 },
  summaryBadge: { flexDirection: "row", alignItems: "center", gap: 2, marginTop: 4 },
  summaryBadgeTxt: { fontFamily: "Inter_400Regular", fontSize: 11 },
  summaryColRight: { flex: 1, gap: 10 },
  smallSummCard: { flex: 1, backgroundColor: "#f5f5f5", borderRadius: 14, padding: 10, borderWidth: 1, borderColor: "#e8e8e8" },
  smallLabel: { fontFamily: "Inter_400Regular", fontSize: 11, color: "#888" },
  smallVal: { fontFamily: "Inter_700Bold", fontSize: 16, color: DARK, marginTop: 2 },
  smallChange: { fontFamily: "Inter_400Regular", fontSize: 10 },
  tabsRow: { paddingHorizontal: 16, paddingBottom: 12, gap: 8 },
  tabChip: { borderRadius: 20, paddingHorizontal: 16, paddingVertical: 6, backgroundColor: "#f0f0f0" },
  tabChipActive: { backgroundColor: P },
  tabChipTxt: { fontFamily: "Inter_500Medium", fontSize: 13, color: "#555" },
  tabChipTxtActive: { color: WHITE },
  body: { padding: 16, gap: 12 },
  card: { backgroundColor: WHITE, borderRadius: 16, padding: 16 },
  cardHeaderRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 4 },
  cardTitle: { fontFamily: "Inter_600SemiBold", fontSize: 15, color: DARK },
  cardMeta: { fontFamily: "Inter_400Regular", fontSize: 12, color: "#888" },
  filterBtn: { width: 32, height: 32, borderRadius: 10, backgroundColor: "#f0f0f0", alignItems: "center", justifyContent: "center" },
  progBar: { height: 6, backgroundColor: "#f0f0f0", borderRadius: 3, overflow: "hidden" },
  progFill: { height: "100%", borderRadius: 3 },
  upcomingRow: { flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: "#f5f5f5" },
  upcomingDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: GOLD2 },
  txRow: { flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#f5f5f5" },
  txDot: { width: 32, height: 32, borderRadius: 16, alignItems: "center", justifyContent: "center" },
  txLabel: { fontFamily: "Inter_500Medium", fontSize: 13, color: "#222" },
  txSub: { fontFamily: "Inter_400Regular", fontSize: 11, color: "#888", marginTop: 2 },
  txAmount: { fontFamily: "Inter_600SemiBold", fontSize: 13 },
  collectSummary: { marginTop: 10, gap: 6 },
  collectSummTxt: { fontFamily: "Inter_400Regular", fontSize: 13, color: "#555" },
  collectBar: { height: 6, backgroundColor: "#f0f0f0", borderRadius: 3, overflow: "hidden" },
  collectFill: { height: "100%", backgroundColor: GREEN, borderRadius: 3 },
  collectRow: { flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#f5f5f5" },
  collectAvatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: "#d0d0d0" },
  collectProp: { fontFamily: "Inter_500Medium", fontSize: 13, color: "#222" },
  collectTenant: { fontFamily: "Inter_400Regular", fontSize: 11, color: "#888", marginTop: 2 },
  collectRent: { fontFamily: "Inter_600SemiBold", fontSize: 13, color: DARK },
  collectBadge: { borderRadius: 10, paddingHorizontal: 8, paddingVertical: 2 },
  collectBadgeTxt: { fontFamily: "Inter_500Medium", fontSize: 10 },
});
