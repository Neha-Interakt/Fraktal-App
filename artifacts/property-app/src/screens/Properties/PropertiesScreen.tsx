import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import React, { useState } from 'react';
import { Image, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { PROPERTIES_DATA, type Property } from '@data/properties';
import type { RootStackParamList, AppTabParamList } from '@navigation/types';

type Props = CompositeScreenProps<
  BottomTabScreenProps<AppTabParamList, 'Properties'>,
  NativeStackScreenProps<RootStackParamList>
>;

const isWeb = Platform.OS === 'web';
const PRIMARY = '#1a365d';
const DARK = '#00122c';
const GOLD = '#c9a227';
const WHITE = '#ffffff';
const BG = '#e9e9e9';

function SearchIcon() { return <Svg width={18} height={18} viewBox="0 0 18 18" fill="none"><Path d="M16.5 16.5L12.875 12.875M14.833 8.167C14.833 11.849 11.849 14.833 8.167 14.833C4.485 14.833 1.5 11.849 1.5 8.167C1.5 4.485 4.485 1.5 8.167 1.5C11.849 1.5 14.833 4.485 14.833 8.167Z" stroke="#888" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" /></Svg>; }
function PlusIcon() { return <Svg width={20} height={20} viewBox="0 0 20 20" fill="none"><Path d="M10 4V16M4 10H16" stroke="#f8f8f8" strokeWidth={2} strokeLinecap="round" /></Svg>; }
function MapPinSmIcon() { return <Svg width={12} height={12} viewBox="0 0 12 12" fill="none"><Path d="M6 1C4.067 1 2.5 2.567 2.5 4.5C2.5 7 6 11 6 11C6 11 9.5 7 9.5 4.5C9.5 2.567 7.933 1 6 1ZM6 6C5.172 6 4.5 5.328 4.5 4.5C4.5 3.672 5.172 3 6 3C6.828 3 7.5 3.672 7.5 4.5C7.5 5.328 6.828 6 6 6Z" fill="#888" /></Svg>; }
function ChevronRightIcon() { return <Svg width={16} height={16} viewBox="0 0 16 16" fill="none"><Path d="M6 4L10 8L6 12" stroke="#888" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" /></Svg>; }

const FILTERS = ['All', 'Occupied', 'Vacant'];

function PropertyCard({ item, onPress }: { item: Property; onPress: () => void }) {
  const isOccupied = item.status === 'Occupied';
  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress}>
      <View style={s.card}>
        <View style={s.cardImageWrap}>
          <Image source={{ uri: item.images[0] }} style={s.cardImage} resizeMode="cover" />
          <View style={[s.statusBadge, { backgroundColor: isOccupied ? PRIMARY : GOLD }]}>
            <Text style={s.statusBadgeText}>{item.status}</Text>
          </View>
          <View style={s.ratingBadge}>
            <Text style={s.ratingStar}>★</Text>
            <Text style={s.ratingNum}>4.5</Text>
          </View>
        </View>
        <View style={s.cardBody}>
          <View style={s.cardTitleRow}>
            <Text style={s.cardName} numberOfLines={1}>{item.name}</Text>
            <ChevronRightIcon />
          </View>
          <View style={s.locationRow}>
            <MapPinSmIcon />
            <Text style={s.locationText}>{item.address}</Text>
          </View>
          <View style={s.specsRow}>
            <Text style={s.specText}>{item.beds} BHK</Text>
            <View style={s.specDot} />
            <Text style={s.specText}>{item.area}</Text>
          </View>
          <View style={s.cardFooter}>
            <View style={s.tenantInfo}>
              {isOccupied ? (
                <>
                  <View style={s.tenantAvatar} />
                  <Text style={s.tenantText} numberOfLines={1}>{item.tenant?.name}</Text>
                </>
              ) : (
                <Text style={s.vacantText}>Available now</Text>
              )}
            </View>
            <View style={s.rentInfo}>
              <Text style={s.rentAmount}>{item.rent}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function PropertiesScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const topPad = isWeb ? 8 : insets.top > 0 ? insets.top : 12;
  const bottomPad = isWeb ? 140 : insets.bottom + 120;
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = PROPERTIES_DATA.filter(p => {
    const matchFilter = activeFilter === 'All' || p.status === activeFilter;
    const matchSearch = search === '' || p.name.toLowerCase().includes(search.toLowerCase()) || p.address.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <View style={s.screen}>
      <View style={[s.topSection, { paddingTop: topPad }]}>
        <View style={s.pageHeader}>
          <View>
            <Text style={s.pageTitle}>Properties</Text>
            <Text style={s.pageSubtitle}>{PROPERTIES_DATA.length} properties listed</Text>
          </View>
          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('AddProperty')}>
            <View style={s.addBtnInner}><PlusIcon /></View>
          </TouchableOpacity>
        </View>
        <View style={s.searchBar}>
          <SearchIcon />
          <TextInput style={s.searchInput} placeholder="Search by name or location..." placeholderTextColor="#aaa" value={search} onChangeText={setSearch} underlineColorAndroid="transparent" />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.filtersRow}>
          {FILTERS.map(f => (
            <Pressable key={f} onPress={() => setActiveFilter(f)} style={[s.filterChip, activeFilter === f && s.filterChipActive]}>
              <Text style={[s.filterChipText, activeFilter === f && s.filterChipTextActive]}>{f}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={s.scroll} contentContainerStyle={[s.scrollContent, { paddingBottom: bottomPad }]} showsVerticalScrollIndicator={false}>
        {filtered.length === 0 ? (
          <View style={s.emptyState}>
            <Text style={s.emptyTitle}>No properties found</Text>
            <Text style={s.emptySubtitle}>Try adjusting your search or filter</Text>
          </View>
        ) : (
          filtered.map(item => (
            <PropertyCard key={item.id} item={item} onPress={() => navigation.navigate('PropertyDetail', { id: item.id })} />
          ))
        )}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: BG },
  topSection: { backgroundColor: WHITE },
  pageHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 8, paddingBottom: 12 },
  pageTitle: { fontWeight: '700', fontSize: 22, color: DARK, lineHeight: 28 },
  pageSubtitle: { fontWeight: '400', fontSize: 13, color: '#888', marginTop: 2 },
  addBtnInner: { width: 40, height: 40, borderRadius: 20, backgroundColor: PRIMARY, alignItems: 'center', justifyContent: 'center' },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f5f5f5', borderRadius: 12, marginHorizontal: 16, paddingHorizontal: 12, paddingVertical: 10, gap: 8, marginBottom: 12 },
  searchInput: { flex: 1, fontSize: 14, color: '#0c0c0c' },
  filtersRow: { paddingHorizontal: 16, paddingBottom: 12, gap: 8 },
  filterChip: { borderRadius: 20, paddingHorizontal: 16, paddingVertical: 6, backgroundColor: '#f0f0f0' },
  filterChipActive: { backgroundColor: PRIMARY },
  filterChipText: { fontWeight: '500', fontSize: 13, color: '#555' },
  filterChipTextActive: { color: WHITE },
  scroll: { flex: 1 },
  scrollContent: { padding: 16, gap: 14 },
  card: { backgroundColor: '#fbfbfb', borderRadius: 16, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 6, elevation: 2 },
  cardImageWrap: { height: 180, width: '100%', position: 'relative' },
  cardImage: { width: '100%', height: '100%' },
  statusBadge: { position: 'absolute', top: 10, left: 10, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  statusBadgeText: { fontWeight: '600', fontSize: 11, color: WHITE },
  ratingBadge: { position: 'absolute', top: 10, right: 10, backgroundColor: WHITE, borderRadius: 20, paddingHorizontal: 8, paddingVertical: 3, flexDirection: 'row', alignItems: 'center', gap: 2 },
  ratingStar: { color: '#f0b100', fontSize: 12, lineHeight: 16 },
  ratingNum: { fontWeight: '500', fontSize: 11, color: '#0a0a0a' },
  cardBody: { padding: 12, gap: 8 },
  cardTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardName: { fontWeight: '600', fontSize: 15, color: DARK, flex: 1, marginRight: 4 },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  locationText: { fontWeight: '400', fontSize: 12, color: '#888' },
  specsRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  specText: { fontWeight: '400', fontSize: 12, color: '#666' },
  specDot: { width: 3, height: 3, borderRadius: 1.5, backgroundColor: '#ccc' },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#f0f0f0', paddingTop: 10, marginTop: 2 },
  tenantInfo: { flexDirection: 'row', alignItems: 'center', gap: 6, flex: 1 },
  tenantAvatar: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#d3d3d3' },
  tenantText: { fontWeight: '400', fontSize: 12, color: '#555', flex: 1 },
  vacantText: { fontWeight: '500', fontSize: 12, color: GOLD },
  rentInfo: { flexDirection: 'row', alignItems: 'baseline' },
  rentAmount: { fontWeight: '700', fontSize: 15, color: PRIMARY },
  emptyState: { alignItems: 'center', justifyContent: 'center', paddingVertical: 60, gap: 8 },
  emptyTitle: { fontWeight: '600', fontSize: 16, color: '#333' },
  emptySubtitle: { fontWeight: '400', fontSize: 13, color: '#888' },
});
