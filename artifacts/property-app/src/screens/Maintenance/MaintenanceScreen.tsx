import React, { useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Path } from 'react-native-svg';

const isWeb = Platform.OS === 'web';
const P = '#1a365d'; const WHITE = '#ffffff'; const BG = '#e9e9e9'; const GREEN = '#38a169'; const RED = '#e53e3e'; const AMBER = '#d69e2e';

function PlusIcon() { return <Svg width={20} height={20} viewBox="0 0 20 20" fill="none"><Path d="M10 4V16M4 10H16" stroke={WHITE} strokeWidth={2} strokeLinecap="round" /></Svg>; }
function WrenchIcon({ color = P }: { color?: string }) { return <Svg width={20} height={20} viewBox="0 0 24 24" fill="none"><Path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.77 3.77z" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" /></Svg>; }
function ClockIcon({ color = AMBER }: { color?: string }) { return <Svg width={14} height={14} viewBox="0 0 14 14" fill="none"><Circle cx={7} cy={7} r={6} stroke={color} strokeWidth={1.2} /><Path d="M7 4V7L9 9" stroke={color} strokeWidth={1.2} strokeLinecap="round" /></Svg>; }
function CheckIcon({ color = GREEN }: { color?: string }) { return <Svg width={14} height={14} viewBox="0 0 14 14" fill="none"><Path d="M3 7L6 10L11 4" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" /></Svg>; }

const ALL_REQUESTS = [
  { id: '1', title: 'AC not cooling', property: 'Sunset Apartments #402', tenant: 'Harish Rao', date: 'Mar 10, 2025', status: 'Open', priority: 'High', category: 'HVAC' },
  { id: '2', title: 'Ceiling fan repair', property: 'Prestige Lakeside Habitat', tenant: 'Ramesh Kumar', date: 'Feb 10, 2025', status: 'Resolved', priority: 'Medium', category: 'Electrical' },
  { id: '3', title: 'Leaky kitchen faucet', property: 'Sunset Apartments #402', tenant: 'Harish Rao', date: 'Feb 28, 2025', status: 'Resolved', priority: 'Low', category: 'Plumbing' },
  { id: '4', title: 'Door lock broken', property: 'Green Park Residency', tenant: 'Priya Sharma', date: 'Jan 5, 2025', status: 'Resolved', priority: 'High', category: 'Security' },
  { id: '5', title: 'Bathroom geyser leaking', property: 'Prestige Lakeside Habitat', tenant: 'Ramesh Kumar', date: 'Apr 2, 2025', status: 'Open', priority: 'High', category: 'Plumbing' },
  { id: '6', title: 'Wall paint peeling off', property: 'Green Park Residency', tenant: 'Priya Sharma', date: 'Mar 25, 2025', status: 'In Progress', priority: 'Low', category: 'Painting' },
  { id: '7', title: 'Lobby light not working', property: 'Prestige Lakeside Habitat', tenant: 'Ramesh Kumar', date: 'Apr 5, 2025', status: 'Open', priority: 'Medium', category: 'Electrical' },
];
const FILTERS = ['All', 'Open', 'In Progress', 'Resolved'];
const STATUS_COLOR: Record<string, string> = { Open: RED, 'In Progress': AMBER, Resolved: GREEN };
const PRIORITY_COLOR: Record<string, string> = { High: RED, Medium: AMBER, Low: GREEN };

export default function MaintenanceScreen() {
  const insets = useSafeAreaInsets();
  const bottomPad = isWeb ? 140 : insets.bottom + 120;
  const topPad = isWeb ? 8 : insets.top > 0 ? insets.top : 12;
  const [filter, setFilter] = useState('All');

  const filtered = ALL_REQUESTS.filter(r => filter === 'All' || r.status === filter);
  const counts = { open: ALL_REQUESTS.filter(r => r.status === 'Open').length, inProgress: ALL_REQUESTS.filter(r => r.status === 'In Progress').length, resolved: ALL_REQUESTS.filter(r => r.status === 'Resolved').length };

  return (
    <View style={[s.screen, { paddingTop: topPad }]}>
      <View style={s.headerBar}>
        <Text style={s.pageTitle}>Maintenance</Text>
        <TouchableOpacity style={s.addBtn} activeOpacity={0.85}>
          <PlusIcon />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={[s.content, { paddingBottom: bottomPad }]} showsVerticalScrollIndicator={false}>
        <View style={s.statsRow}>
          {[{ label: 'Open', count: counts.open, color: RED }, { label: 'In Progress', count: counts.inProgress, color: AMBER }, { label: 'Resolved', count: counts.resolved, color: GREEN }].map(stat => (
            <View key={stat.label} style={[s.statCard, { borderTopWidth: 3, borderTopColor: stat.color }]}>
              <Text style={[s.statCount, { color: stat.color }]}>{stat.count}</Text>
              <Text style={s.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <View style={s.filterRow}>
          {FILTERS.map(f => (
            <Pressable key={f} onPress={() => setFilter(f)} style={[s.filterChip, f === filter && s.filterChipActive]}>
              <Text style={[s.filterText, f === filter && s.filterTextActive]}>{f}</Text>
            </Pressable>
          ))}
        </View>

        <View style={s.listCard}>
          {filtered.map((req, i) => (
            <View key={req.id}>
              <View style={s.reqRow}>
                <View style={[s.reqIcon, { backgroundColor: `${STATUS_COLOR[req.status]}18` }]}>
                  <WrenchIcon color={STATUS_COLOR[req.status]} />
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={s.reqTitle} numberOfLines={1}>{req.title}</Text>
                    <View style={[s.statusBadge, { backgroundColor: `${STATUS_COLOR[req.status]}18` }]}>
                      {req.status === 'Resolved' ? <CheckIcon color={STATUS_COLOR[req.status]} /> : <ClockIcon color={STATUS_COLOR[req.status]} />}
                      <Text style={[s.statusText, { color: STATUS_COLOR[req.status] }]}>{req.status}</Text>
                    </View>
                  </View>
                  <Text style={s.reqProp} numberOfLines={1}>{req.property}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 }}>
                    <View style={[s.priorityBadge, { backgroundColor: `${PRIORITY_COLOR[req.priority]}18` }]}>
                      <Text style={[s.priorityText, { color: PRIORITY_COLOR[req.priority] }]}>{req.priority}</Text>
                    </View>
                    <Text style={s.reqDate}>{req.category} · {req.date}</Text>
                  </View>
                </View>
              </View>
              {i < filtered.length - 1 && <View style={s.divider} />}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: BG },
  headerBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 12, backgroundColor: WHITE, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 2 },
  pageTitle: { fontWeight: '700', fontSize: 22, color: P },
  addBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: P, alignItems: 'center', justifyContent: 'center' },
  content: { padding: 16, gap: 14 },
  statsRow: { flexDirection: 'row', gap: 10 },
  statCard: { flex: 1, backgroundColor: WHITE, borderRadius: 14, padding: 14, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  statCount: { fontWeight: '700', fontSize: 22, marginBottom: 2 },
  statLabel: { fontSize: 11, color: '#718096', fontWeight: '500' },
  filterRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  filterChip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: WHITE, borderWidth: 1.2, borderColor: '#e2e8f0' },
  filterChipActive: { backgroundColor: P, borderColor: P },
  filterText: { fontSize: 13, fontWeight: '500', color: '#718096' },
  filterTextActive: { color: WHITE },
  listCard: { backgroundColor: WHITE, borderRadius: 16, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 },
  reqRow: { flexDirection: 'row', alignItems: 'flex-start', padding: 14 },
  reqIcon: { width: 42, height: 42, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  reqTitle: { fontWeight: '600', fontSize: 14, color: '#1a1a1a', flex: 1, marginRight: 8 },
  reqProp: { fontSize: 12, color: '#718096', marginTop: 2 },
  statusBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  statusText: { fontSize: 11, fontWeight: '600' },
  priorityBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  priorityText: { fontSize: 11, fontWeight: '600' },
  reqDate: { fontSize: 11, color: '#a0aec0' },
  divider: { height: 1, backgroundColor: '#f0f0f0', marginLeft: 68 },
});
