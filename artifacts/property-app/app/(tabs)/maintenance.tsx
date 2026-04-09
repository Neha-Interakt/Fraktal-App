import React, { useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
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
const BG = "#e9e9e9";
const WHITE = "#ffffff";
const GREEN = "#38a169";
const RED = "#e53e3e";
const AMBER = "#d69e2e";

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
function PlusIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
      <Path d="M10 4V16M4 10H16" stroke={WHITE} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}
function WrenchIcon({ color = P }: { color?: string }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.77 3.77z" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
  );
}
function ClockIcon({ color = AMBER }: { color?: string }) {
  return (
    <Svg width={14} height={14} viewBox="0 0 14 14" fill="none">
      <Circle cx={7} cy={7} r={6} stroke={color} strokeWidth={1.2} />
      <Path d="M7 4V7L9 9" stroke={color} strokeWidth={1.2} strokeLinecap="round" />
    </Svg>
  );
}
function CheckIcon({ color = GREEN }: { color?: string }) {
  return (
    <Svg width={14} height={14} viewBox="0 0 14 14" fill="none">
      <Path d="M3 7L6 10L11 4" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const ALL_REQUESTS = [
  { id: "1", title: "AC not cooling", property: "Sunset Apartments #402", tenant: "Harish Rao", date: "Mar 10, 2025", status: "Open", priority: "High", category: "HVAC" },
  { id: "2", title: "Ceiling fan repair", property: "Prestige Lakeside Habitat", tenant: "Ramesh Kumar", date: "Feb 10, 2025", status: "Resolved", priority: "Medium", category: "Electrical" },
  { id: "3", title: "Leaky kitchen faucet", property: "Sunset Apartments #402", tenant: "Harish Rao", date: "Feb 28, 2025", status: "Resolved", priority: "Low", category: "Plumbing" },
  { id: "4", title: "Door lock broken", property: "Green Park Residency", tenant: "Priya Sharma", date: "Jan 5, 2025", status: "Resolved", priority: "High", category: "Security" },
  { id: "5", title: "Bathroom geyser leaking", property: "Prestige Lakeside Habitat", tenant: "Ramesh Kumar", date: "Apr 2, 2025", status: "Open", priority: "High", category: "Plumbing" },
  { id: "6", title: "Wall paint peeling off", property: "Green Park Residency", tenant: "Priya Sharma", date: "Mar 25, 2025", status: "In Progress", priority: "Low", category: "Painting" },
  { id: "7", title: "Lobby light not working", property: "Prestige Lakeside Habitat", tenant: "Ramesh Kumar", date: "Apr 5, 2025", status: "Open", priority: "Medium", category: "Electrical" },
];

const FILTERS = ["All", "Open", "In Progress", "Resolved"];

const STATUS_COLOR: Record<string, string> = {
  Open: RED,
  "In Progress": AMBER,
  Resolved: GREEN,
};
const PRIORITY_COLOR: Record<string, string> = {
  High: RED,
  Medium: AMBER,
  Low: GREEN,
};

export default function MaintenanceScreen() {
  const insets = useSafeAreaInsets();
  const topPad = isWeb ? 8 : insets.top > 0 ? insets.top : 12;
  const bottomPad = isWeb ? 90 : insets.bottom + 80;
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? ALL_REQUESTS : ALL_REQUESTS.filter((r) => r.status === filter);

  const openCount = ALL_REQUESTS.filter((r) => r.status === "Open").length;
  const inProgressCount = ALL_REQUESTS.filter((r) => r.status === "In Progress").length;
  const resolvedCount = ALL_REQUESTS.filter((r) => r.status === "Resolved").length;

  return (
    <View style={s.screen}>
      {/* Header */}
      <View style={s.header}>
        <View style={[s.statusBar, { paddingTop: topPad }]}>
          <Text style={s.statusTime}>9:41</Text>
          <View style={s.statusIcons}><CellularIcon /><WifiIcon /><BatteryIcon /></View>
        </View>
        <View style={s.titleRow}>
          <View>
            <Text style={s.title}>Maintenance</Text>
            <Text style={s.subtitle}>{ALL_REQUESTS.length} total requests</Text>
          </View>
          <TouchableOpacity activeOpacity={0.8} style={s.addBtn}>
            <PlusIcon />
          </TouchableOpacity>
        </View>

        {/* Summary tiles */}
        <View style={s.statsRow}>
          <StatTile label="Open" count={openCount} color={RED} />
          <StatTile label="In Progress" count={inProgressCount} color={AMBER} />
          <StatTile label="Resolved" count={resolvedCount} color={GREEN} />
        </View>

        {/* Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.filtersRow}>
          {FILTERS.map((f) => (
            <Pressable key={f} onPress={() => setFilter(f)} style={[s.filterChip, filter === f && s.filterChipActive]}>
              <Text style={[s.filterChipTxt, filter === f && s.filterChipTxtActive]}>{f}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Requests List */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[s.body, { paddingBottom: bottomPad }]}
        showsVerticalScrollIndicator={false}
      >
        {filtered.length === 0 ? (
          <View style={s.empty}>
            <WrenchIcon color="#ccc" />
            <Text style={s.emptyTxt}>No {filter.toLowerCase()} requests</Text>
          </View>
        ) : (
          filtered.map((req) => <RequestCard key={req.id} req={req} />)
        )}
      </ScrollView>
    </View>
  );
}

function StatTile({ label, count, color }: { label: string; count: number; color: string }) {
  return (
    <View style={[s.statTile, { borderTopColor: color }]}>
      <Text style={[s.statCount, { color }]}>{count}</Text>
      <Text style={s.statLabel}>{label}</Text>
    </View>
  );
}

function RequestCard({ req }: { req: typeof ALL_REQUESTS[0] }) {
  const statusColor = STATUS_COLOR[req.status] ?? "#888";
  const priorityColor = PRIORITY_COLOR[req.priority] ?? "#888";
  const isResolved = req.status === "Resolved";

  return (
    <TouchableOpacity activeOpacity={0.85} style={s.card}>
      <View style={s.cardTop}>
        <View style={[s.catBadge, { backgroundColor: `${P}18` }]}>
          <WrenchIcon color={P} />
          <Text style={s.catTxt}>{req.category}</Text>
        </View>
        <View style={[s.statusBadge, { backgroundColor: `${statusColor}18` }]}>
          <View style={[s.statusDot, { backgroundColor: statusColor }]} />
          <Text style={[s.statusTxt, { color: statusColor }]}>{req.status}</Text>
        </View>
      </View>

      <Text style={s.cardTitle}>{req.title}</Text>

      <View style={s.cardMeta}>
        <View style={s.metaRow}>
          <Text style={s.metaLabel}>Property</Text>
          <Text style={s.metaVal} numberOfLines={1}>{req.property}</Text>
        </View>
        <View style={s.metaRow}>
          <Text style={s.metaLabel}>Tenant</Text>
          <Text style={s.metaVal}>{req.tenant}</Text>
        </View>
        <View style={s.metaRow}>
          <Text style={s.metaLabel}>Reported</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <ClockIcon color={AMBER} />
            <Text style={s.metaVal}>{req.date}</Text>
          </View>
        </View>
      </View>

      <View style={s.cardFooter}>
        <View style={[s.priorityChip, { backgroundColor: `${priorityColor}18` }]}>
          <Text style={[s.priorityTxt, { color: priorityColor }]}>{req.priority} Priority</Text>
        </View>
        <TouchableOpacity style={[s.actionBtn, { backgroundColor: isResolved ? "#f0f0f0" : P }]} activeOpacity={0.8}>
          <Text style={[s.actionBtnTxt, { color: isResolved ? "#888" : WHITE }]}>
            {isResolved ? "View Details" : "Mark Resolved"}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: BG },
  header: { backgroundColor: WHITE },
  statusBar: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 16, paddingBottom: 4 },
  statusTime: { fontFamily: "Inter_400Regular", fontSize: 15, color: "#0c0c0c", letterSpacing: -0.3 },
  statusIcons: { flexDirection: "row", alignItems: "center", gap: 8 },
  titleRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 16, paddingTop: 8, paddingBottom: 12 },
  title: { fontFamily: "Inter_700Bold", fontSize: 22, color: DARK },
  subtitle: { fontFamily: "Inter_400Regular", fontSize: 13, color: "#888", marginTop: 2 },
  addBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: P, alignItems: "center", justifyContent: "center" },
  statsRow: { flexDirection: "row", gap: 10, paddingHorizontal: 16, paddingBottom: 12 },
  statTile: { flex: 1, backgroundColor: "#f9f9f9", borderRadius: 12, padding: 12, alignItems: "center", borderTopWidth: 3, gap: 4 },
  statCount: { fontFamily: "Inter_700Bold", fontSize: 22 },
  statLabel: { fontFamily: "Inter_400Regular", fontSize: 11, color: "#888" },
  filtersRow: { paddingHorizontal: 16, paddingBottom: 12, gap: 8 },
  filterChip: { borderRadius: 20, paddingHorizontal: 16, paddingVertical: 6, backgroundColor: "#f0f0f0" },
  filterChipActive: { backgroundColor: P },
  filterChipTxt: { fontFamily: "Inter_500Medium", fontSize: 13, color: "#555" },
  filterChipTxtActive: { color: WHITE },
  body: { padding: 16, gap: 12 },
  empty: { alignItems: "center", justifyContent: "center", paddingVertical: 60, gap: 12 },
  emptyTxt: { fontFamily: "Inter_400Regular", fontSize: 14, color: "#aaa" },
  card: { backgroundColor: WHITE, borderRadius: 16, padding: 14, gap: 10 },
  cardTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  catBadge: { flexDirection: "row", alignItems: "center", gap: 4, borderRadius: 10, paddingHorizontal: 8, paddingVertical: 4 },
  catTxt: { fontFamily: "Inter_400Regular", fontSize: 11, color: P },
  statusBadge: { flexDirection: "row", alignItems: "center", gap: 5, borderRadius: 10, paddingHorizontal: 8, paddingVertical: 4 },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusTxt: { fontFamily: "Inter_500Medium", fontSize: 11 },
  cardTitle: { fontFamily: "Inter_600SemiBold", fontSize: 15, color: DARK },
  cardMeta: { backgroundColor: "#f9f9f9", borderRadius: 10, padding: 10, gap: 6 },
  metaRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  metaLabel: { fontFamily: "Inter_400Regular", fontSize: 12, color: "#888" },
  metaVal: { fontFamily: "Inter_500Medium", fontSize: 12, color: "#222", flex: 1, textAlign: "right" },
  cardFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  priorityChip: { borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5 },
  priorityTxt: { fontFamily: "Inter_500Medium", fontSize: 12 },
  actionBtn: { borderRadius: 10, paddingHorizontal: 14, paddingVertical: 7 },
  actionBtnTxt: { fontFamily: "Inter_600SemiBold", fontSize: 13 },
});
