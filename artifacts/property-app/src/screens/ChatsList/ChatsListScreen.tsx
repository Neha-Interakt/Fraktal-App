import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Path } from 'react-native-svg';
import type { RootStackParamList } from '@navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'ChatsList'>;

const isWeb = Platform.OS === 'web';
const PRIMARY = '#1a365d';
const DARK = '#00122c';
const WHITE = '#ffffff';
const BG = '#e9e9e9';
const MUTED = '#718096';

function ArrowLeftIcon() { return <Svg width={24} height={24} viewBox="0 0 24 24" fill="none"><Path d="M19.5 12H4.5M4.5 12L11.25 18.75M4.5 12L11.25 5.25" stroke={PRIMARY} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" /></Svg>; }
function SearchIcon() { return <Svg width={18} height={18} viewBox="0 0 24 24" fill="none"><Circle cx={11} cy={11} r={7.5} stroke={MUTED} strokeWidth={1.8} /><Path d="M16.5 16.5L21 21" stroke={MUTED} strokeWidth={1.8} strokeLinecap="round" /></Svg>; }
function ChatFilledIcon() { return <Svg width={20} height={20} viewBox="0 0 24 24" fill="none"><Path d="M12 2.25C6.615 2.25 2.25 6.615 2.25 12.027C2.25 13.822 2.723 15.545 3.609 17.052L2.273 21.112C2.199 21.337 2.193 21.578 2.254 21.806C2.316 22.035 2.443 22.241 2.62 22.4C2.798 22.559 3.019 22.654 3.251 22.673C3.484 22.691 3.715 22.632 3.914 22.505L7.983 20.003C9.241 20.589 10.608 20.893 12 20.893C17.385 20.893 21.75 16.534 21.75 12.027C21.75 7.521 17.385 2.25 12 2.25Z" fill={PRIMARY} /></Svg>; }

type ChatItem = { id: string; tenantId: string; tenantName: string; propertyName: string; lastMessage: string; time: string; unread: number; online: boolean };

const CHATS: ChatItem[] = [
  { id: '1', tenantId: '1', tenantName: 'Ramesh Kumar', propertyName: 'Prestige Lakeside Habitat', lastMessage: 'Of course! Let me know if you need anything else 🙂', time: '10:26 AM', unread: 0, online: true },
  { id: '2', tenantId: '2', tenantName: 'Harish Rao', propertyName: 'Sunset Apartments #402', lastMessage: 'The AC is still not cooling properly, can you send someone?', time: 'Yesterday', unread: 2, online: false },
  { id: '3', tenantId: '3', tenantName: 'Priya Sharma', propertyName: 'Green Park Residency', lastMessage: 'Thank you for the quick fix on the door lock!', time: 'Mon', unread: 0, online: true },
  { id: '4', tenantId: '4', tenantName: 'Previous Tenant', propertyName: 'Ocean View Villa', lastMessage: "I've collected the keys. Thanks for everything.", time: 'Apr 28', unread: 0, online: false },
];

function ChatRow({ item, onPress }: { item: ChatItem; onPress: () => void }) {
  const initials = item.tenantName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  return (
    <TouchableOpacity style={s.chatRow} activeOpacity={0.75} onPress={onPress}>
      <View style={s.avatarWrap}>
        <View style={s.avatar}><Text style={s.avatarInitials}>{initials}</Text></View>
        {item.online && <View style={s.onlineDot} />}
      </View>
      <View style={s.chatContent}>
        <View style={s.chatTopRow}>
          <Text style={[s.tenantName, item.unread > 0 && s.tenantNameBold]} numberOfLines={1}>{item.tenantName}</Text>
          <Text style={[s.timeText, item.unread > 0 && s.timeTextUnread]}>{item.time}</Text>
        </View>
        <Text style={s.propertyTag} numberOfLines={1}>{item.propertyName}</Text>
        <View style={s.chatBottomRow}>
          <Text style={[s.lastMessage, item.unread > 0 && s.lastMessageBold]} numberOfLines={1}>{item.lastMessage}</Text>
          {item.unread > 0 && <View style={s.unreadBadge}><Text style={s.unreadCount}>{item.unread}</Text></View>}
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function ChatsListScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const topPad = isWeb ? 8 : insets.top > 0 ? insets.top : 12;
  const bottomPad = isWeb ? 24 : insets.bottom + 16;
  const [query, setQuery] = useState('');

  const filtered = CHATS.filter(c =>
    c.tenantName.toLowerCase().includes(query.toLowerCase()) ||
    c.propertyName.toLowerCase().includes(query.toLowerCase())
  );
  const unreadTotal = CHATS.reduce((sum, c) => sum + c.unread, 0);

  return (
    <View style={s.screen}>
      <View style={[s.header, { paddingTop: topPad }]}>
        <TouchableOpacity style={s.backBtn} activeOpacity={0.7} onPress={() => navigation.goBack()}><ArrowLeftIcon /></TouchableOpacity>
        <View style={s.headerCenter}>
          <Text style={s.headerTitle}>Tenant Chats</Text>
          {unreadTotal > 0 && <View style={s.headerBadge}><Text style={s.headerBadgeTxt}>{unreadTotal}</Text></View>}
        </View>
        <View style={{ width: 40 }} />
      </View>

      <View style={s.searchWrap}>
        <View style={s.searchBar}>
          <SearchIcon />
          <TextInput style={s.searchInput} value={query} onChangeText={setQuery} placeholder="Search tenants or properties…" placeholderTextColor={MUTED} underlineColorAndroid="transparent" />
        </View>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={[s.listContent, { paddingBottom: bottomPad }]} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        {filtered.length === 0 ? (
          <View style={s.emptyState}>
            <ChatFilledIcon />
            <Text style={s.emptyTitle}>No chats found</Text>
            <Text style={s.emptySub}>Try searching for a different tenant or property.</Text>
          </View>
        ) : (
          <View style={s.listCard}>
            {filtered.map((item, i) => (
              <View key={item.id}>
                <ChatRow item={item} onPress={() => navigation.navigate('Chat', { tenantId: item.tenantId, tenantName: item.tenantName })} />
                {i < filtered.length - 1 && <View style={s.divider} />}
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: BG },
  header: { backgroundColor: WHITE, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingBottom: 12, gap: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 3 },
  backBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  headerCenter: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 },
  headerTitle: { fontWeight: '700', fontSize: 18, color: PRIMARY },
  headerBadge: { backgroundColor: PRIMARY, borderRadius: 99, paddingHorizontal: 8, paddingVertical: 2 },
  headerBadgeTxt: { fontWeight: '600', fontSize: 11, color: WHITE },
  searchWrap: { paddingHorizontal: 16, paddingVertical: 12 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: WHITE, borderRadius: 14, paddingHorizontal: 14, paddingVertical: 11, gap: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 2 },
  searchInput: { flex: 1, fontSize: 14, color: '#1a1a1a' },
  listContent: { paddingHorizontal: 16 },
  listCard: { backgroundColor: WHITE, borderRadius: 18, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 6, elevation: 3 },
  chatRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, gap: 12 },
  avatarWrap: { position: 'relative' },
  avatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: PRIMARY, alignItems: 'center', justifyContent: 'center' },
  avatarInitials: { fontWeight: '600', fontSize: 16, color: WHITE },
  onlineDot: { position: 'absolute', bottom: 1, right: 1, width: 12, height: 12, borderRadius: 6, backgroundColor: '#48bb78', borderWidth: 2, borderColor: WHITE },
  chatContent: { flex: 1, gap: 2 },
  chatTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  tenantName: { fontWeight: '500', fontSize: 15, color: '#1a1a1a', flex: 1, marginRight: 8 },
  tenantNameBold: { fontWeight: '700', color: DARK },
  timeText: { fontWeight: '400', fontSize: 12, color: MUTED },
  timeTextUnread: { color: PRIMARY, fontWeight: '600' },
  propertyTag: { fontWeight: '400', fontSize: 11, color: MUTED },
  chatBottomRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 },
  lastMessage: { fontWeight: '400', fontSize: 13, color: MUTED, flex: 1, marginRight: 8 },
  lastMessageBold: { fontWeight: '500', color: '#444' },
  unreadBadge: { backgroundColor: PRIMARY, borderRadius: 99, minWidth: 20, height: 20, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 6 },
  unreadCount: { fontWeight: '700', fontSize: 11, color: WHITE },
  divider: { height: 1, backgroundColor: '#f0f0f0', marginLeft: 78 },
  emptyState: { alignItems: 'center', paddingTop: 60, gap: 12 },
  emptyTitle: { fontWeight: '600', fontSize: 16, color: '#333' },
  emptySub: { fontWeight: '400', fontSize: 13, color: MUTED, textAlign: 'center' },
});
