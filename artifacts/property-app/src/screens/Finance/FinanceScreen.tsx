import React, { useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

const isWeb = Platform.OS === 'web';
const P = '#1a365d'; const DARK = '#00122c'; const GOLD = '#ffcb29'; const GOLD2 = '#c9a227'; const BG = '#e9e9e9'; const WHITE = '#ffffff'; const GREEN = '#38a169'; const RED = '#e53e3e';

function ArrowUpIcon() { return <Svg width={16} height={16} viewBox="0 0 16 16" fill="none"><Path d="M8 13V3M3 8L8 3L13 8" stroke={GREEN} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" /></Svg>; }
function ArrowDownIcon() { return <Svg width={16} height={16} viewBox="0 0 16 16" fill="none"><Path d="M8 3V13M13 8L8 13L3 8" stroke={RED} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" /></Svg>; }

const MONTHS = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const BARS = [60, 85, 70, 95, 80, 100];

function MiniBarChart() {
  return (
    <View style={ch.chartWrap}>
      {BARS.map((h, i) => (
        <View key={i} style={ch.barGroup}>
          <View style={[ch.bar, { height: h * 0.8 }]}>
            <LinearGradient colors={[GOLD, GOLD2]} style={{ flex: 1, borderRadius: 4 }} />
          </View>
          <Text style={ch.barLabel}>{MONTHS[i]}</Text>
        </View>
      ))}
    </View>
  );
}
const ch = StyleSheet.create({
  chartWrap: { flexDirection: 'row', alignItems: 'flex-end', gap: 6, height: 90, paddingHorizontal: 4 },
  barGroup: { flex: 1, alignItems: 'center', gap: 4 },
  bar: { width: '100%', borderRadius: 4, overflow: 'hidden', minHeight: 8 },
  barLabel: { fontSize: 9, color: '#aaa' },
});

const TRANSACTIONS = [
  { id: '1', name: 'Prestige Lakeside Habitat', type: 'Rent Received', amount: '+ ₹22,000', date: 'May 1, 2025', isIncome: true },
  { id: '2', name: 'Sunset Apartments #402', type: 'Rent Received', amount: '+ ₹18,500', date: 'May 1, 2025', isIncome: true },
  { id: '3', name: 'Green Park Residency', type: 'Rent Received', amount: '+ ₹14,000', date: 'Apr 30, 2025', isIncome: true },
  { id: '4', name: 'Prestige Lakeside Habitat', type: 'Maintenance', amount: '- ₹3,200', date: 'Apr 25, 2025', isIncome: false },
  { id: '5', name: 'Sunset Apartments #402', type: 'AC Service', amount: '- ₹2,800', date: 'Apr 20, 2025', isIncome: false },
  { id: '6', name: 'Ocean View Villa', type: 'Property Tax', amount: '- ₹8,500', date: 'Apr 15, 2025', isIncome: false },
];
const FILTERS = ['All', 'Income', 'Expenses'];

export default function FinanceScreen() {
  const insets = useSafeAreaInsets();
  const bottomPad = isWeb ? 140 : insets.bottom + 120;
  const topPad = isWeb ? 8 : insets.top > 0 ? insets.top : 12;
  const [filter, setFilter] = useState('All');

  const filtered = TRANSACTIONS.filter(t => filter === 'All' ? true : filter === 'Income' ? t.isIncome : !t.isIncome);

  return (
    <View style={[s.screen, { paddingTop: topPad }]}>
      <View style={s.headerBar}>
        <Text style={s.pageTitle}>Financials</Text>
      </View>
      <ScrollView contentContainerStyle={[s.content, { paddingBottom: bottomPad }]} showsVerticalScrollIndicator={false}>
        <View style={s.summaryRow}>
          {[
            { label: 'Monthly Revenue', value: '₹54,500', delta: '+12.3%', up: true },
            { label: 'Expenses', value: '₹14,500', delta: '-3.1%', up: false },
          ].map(card => (
            <View key={card.label} style={s.summaryCard}>
              <Text style={s.summaryLabel}>{card.label}</Text>
              <Text style={s.summaryValue}>{card.value}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 }}>
                {card.up ? <ArrowUpIcon /> : <ArrowDownIcon />}
                <Text style={{ fontSize: 12, color: card.up ? GREEN : RED, fontWeight: '600' }}>{card.delta}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={s.chartCard}>
          <Text style={s.sectionTitle}>Revenue Trend</Text>
          <MiniBarChart />
        </View>

        <View style={s.filterRow}>
          {FILTERS.map(f => (
            <Pressable key={f} onPress={() => setFilter(f)} style={[s.filterChip, f === filter && s.filterChipActive]}>
              <Text style={[s.filterText, f === filter && s.filterTextActive]}>{f}</Text>
            </Pressable>
          ))}
        </View>

        <View style={s.txCard}>
          <Text style={[s.sectionTitle, { marginBottom: 12 }]}>Transactions</Text>
          {filtered.map((tx, i) => (
            <View key={tx.id}>
              <View style={s.txRow}>
                <View style={[s.txDot, { backgroundColor: tx.isIncome ? `${GREEN}18` : `${RED}18` }]}>
                  {tx.isIncome ? <ArrowUpIcon /> : <ArrowDownIcon />}
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={s.txName} numberOfLines={1}>{tx.name}</Text>
                  <Text style={s.txType}>{tx.type} · {tx.date}</Text>
                </View>
                <Text style={[s.txAmount, { color: tx.isIncome ? GREEN : RED }]}>{tx.amount}</Text>
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
  headerBar: { paddingHorizontal: 20, paddingBottom: 12, backgroundColor: WHITE, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 2 },
  pageTitle: { fontWeight: '700', fontSize: 22, color: P },
  content: { padding: 16, gap: 16 },
  summaryRow: { flexDirection: 'row', gap: 12 },
  summaryCard: { flex: 1, backgroundColor: WHITE, borderRadius: 16, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 },
  summaryLabel: { fontSize: 12, color: '#718096', marginBottom: 4 },
  summaryValue: { fontWeight: '700', fontSize: 20, color: P },
  chartCard: { backgroundColor: WHITE, borderRadius: 16, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 },
  sectionTitle: { fontWeight: '700', fontSize: 15, color: P, marginBottom: 14 },
  filterRow: { flexDirection: 'row', gap: 8 },
  filterChip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: WHITE, borderWidth: 1.2, borderColor: '#e2e8f0' },
  filterChipActive: { backgroundColor: P, borderColor: P },
  filterText: { fontSize: 13, fontWeight: '500', color: '#718096' },
  filterTextActive: { color: WHITE },
  txCard: { backgroundColor: WHITE, borderRadius: 16, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 },
  txRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  txDot: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  txName: { fontWeight: '600', fontSize: 14, color: '#1a1a1a' },
  txType: { fontSize: 12, color: '#718096', marginTop: 2 },
  txAmount: { fontWeight: '700', fontSize: 14 },
  divider: { height: 1, backgroundColor: '#f0f0f0' },
});
