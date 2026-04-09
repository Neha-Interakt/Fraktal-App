import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path, Rect } from "react-native-svg";
import Colors from "@/constants/colors";
import { PROPERTIES_DATA } from "../property-detail";

const isWeb = Platform.OS === "web";

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

// ─── App Icons ────────────────────────────────────────────────────────────────

function SearchIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
      <Path d="M16.5 16.5L12.875 12.875M14.833 8.167C14.833 11.849 11.849 14.833 8.167 14.833C4.485 14.833 1.5 11.849 1.5 8.167C1.5 4.485 4.485 1.5 8.167 1.5C11.849 1.5 14.833 4.485 14.833 8.167Z" stroke="#888" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
function PlusIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
      <Path d="M10 4V16M4 10H16" stroke="#f8f8f8" strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}
function MapPinSmIcon() {
  return (
    <Svg width={12} height={12} viewBox="0 0 12 12" fill="none">
      <Path d="M6 1C4.067 1 2.5 2.567 2.5 4.5C2.5 7 6 11 6 11C6 11 9.5 7 9.5 4.5C9.5 2.567 7.933 1 6 1ZM6 6C5.172 6 4.5 5.328 4.5 4.5C4.5 3.672 5.172 3 6 3C6.828 3 7.5 3.672 7.5 4.5C7.5 5.328 6.828 6 6 6Z" fill="#888" />
    </Svg>
  );
}
function ChevronRightIcon() {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <Path d="M6 4L10 8L6 12" stroke="#888" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

// ─── Filter chips ─────────────────────────────────────────────────────────────

const FILTERS = ["All", "Occupied", "Vacant"];

// ─── Property List Card ───────────────────────────────────────────────────────

function PropertyCard({ item }: { item: typeof PROPERTIES_DATA[0] }) {
  const isOccupied = item.status === "Occupied";

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => router.push({ pathname: "/property-detail", params: { id: item.id } })}
    >
      <View style={s.card}>
        {/* Image */}
        <View style={s.cardImageWrap}>
          <Image
            source={{ uri: item.images[0] }}
            style={s.cardImage}
            contentFit="cover"
            transition={200}
          />
          <View style={[s.statusBadge, { backgroundColor: isOccupied ? "#1a365d" : "#c9a227" }]}>
            <Text style={s.statusBadgeText}>{item.status}</Text>
          </View>
          <View style={s.ratingBadge}>
            <Text style={s.ratingStar}>★</Text>
            <Text style={s.ratingNum}>{item.rating}</Text>
          </View>
        </View>

        {/* Info */}
        <View style={s.cardBody}>
          <View style={s.cardTitleRow}>
            <Text style={s.cardName} numberOfLines={1}>{item.name}</Text>
            <ChevronRightIcon />
          </View>
          <View style={s.locationRow}>
            <MapPinSmIcon />
            <Text style={s.locationText}>{item.location}</Text>
          </View>

          {/* Specs */}
          <View style={s.specsRow}>
            <Text style={s.specText}>{item.beds} BHK</Text>
            <View style={s.specDot} />
            <Text style={s.specText}>{item.area}</Text>
          </View>

          {/* Footer */}
          <View style={s.cardFooter}>
            <View style={s.tenantInfo}>
              {isOccupied ? (
                <>
                  <View style={s.tenantAvatar} />
                  <Text style={s.tenantText} numberOfLines={1}>{item.tenant}</Text>
                </>
              ) : (
                <Text style={s.vacantText}>Available now</Text>
              )}
            </View>
            <View style={s.rentInfo}>
              <Text style={s.rentAmount}>{item.rent}</Text>
              <Text style={s.rentSuffix}>/mo</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function PropertiesScreen() {
  const insets = useSafeAreaInsets();
  const topPad = isWeb ? 8 : insets.top > 0 ? insets.top : 12;
  const bottomPad = isWeb ? 90 : insets.bottom + 80;
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = PROPERTIES_DATA.filter((p) => {
    const matchFilter = activeFilter === "All" || p.status === activeFilter;
    const matchSearch =
      search === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <View style={s.screen}>
      {/* Header */}
      <View style={s.topSection}>
        {/* Status bar */}
        <View style={[s.statusBar, { paddingTop: topPad }]}>
          <Text style={s.statusTime}>9:41</Text>
          <View style={s.statusIcons}>
            <CellularIcon /><WifiIcon /><BatteryIcon />
          </View>
        </View>

        {/* Page title */}
        <View style={s.pageHeader}>
          <View>
            <Text style={s.pageTitle}>Properties</Text>
            <Text style={s.pageSubtitle}>{PROPERTIES_DATA.length} properties listed</Text>
          </View>
          <TouchableOpacity activeOpacity={0.8} style={s.addBtn}>
            <View style={s.addBtnInner}>
              <PlusIcon />
            </View>
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View style={s.searchBar}>
          <SearchIcon />
          <TextInput
            style={s.searchInput}
            placeholder="Search by name or location..."
            placeholderTextColor="#aaa"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.filtersRow}>
          {FILTERS.map((f) => (
            <Pressable
              key={f}
              onPress={() => setActiveFilter(f)}
              style={[s.filterChip, activeFilter === f && s.filterChipActive]}
            >
              <Text style={[s.filterChipText, activeFilter === f && s.filterChipTextActive]}>{f}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* List */}
      <ScrollView
        style={s.scroll}
        contentContainerStyle={[s.scrollContent, { paddingBottom: bottomPad }]}
        showsVerticalScrollIndicator={false}
      >
        {filtered.length === 0 ? (
          <View style={s.emptyState}>
            <Text style={s.emptyTitle}>No properties found</Text>
            <Text style={s.emptySubtitle}>Try adjusting your search or filter</Text>
          </View>
        ) : (
          filtered.map((item) => <PropertyCard key={item.id} item={item} />)
        )}
      </ScrollView>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#e9e9e9" },
  topSection: { backgroundColor: "#ffffff" },
  statusBar: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 16, paddingBottom: 4 },
  statusTime: { fontFamily: "Inter_400Regular", fontSize: 15, color: "#030303", letterSpacing: -0.3 },
  statusIcons: { flexDirection: "row", alignItems: "center", gap: 8 },
  pageHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 16, paddingTop: 8, paddingBottom: 12 },
  pageTitle: { fontFamily: "Inter_700Bold", fontSize: 22, color: "#00122c", lineHeight: 28 },
  pageSubtitle: { fontFamily: "Inter_400Regular", fontSize: 13, color: "#888", marginTop: 2 },
  addBtn: { },
  addBtnInner: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#1a365d", alignItems: "center", justifyContent: "center" },
  searchBar: { flexDirection: "row", alignItems: "center", backgroundColor: "#f5f5f5", borderRadius: 12, marginHorizontal: 16, paddingHorizontal: 12, paddingVertical: 10, gap: 8, marginBottom: 12 },
  searchInput: { flex: 1, fontFamily: "Inter_400Regular", fontSize: 14, color: "#0c0c0c" },
  filtersRow: { paddingHorizontal: 16, paddingBottom: 12, gap: 8 },
  filterChip: { borderRadius: 20, paddingHorizontal: 16, paddingVertical: 6, backgroundColor: "#f0f0f0" },
  filterChipActive: { backgroundColor: Colors.primary },
  filterChipText: { fontFamily: "Inter_500Medium", fontSize: 13, color: "#555" },
  filterChipTextActive: { color: "#fff" },
  scroll: { flex: 1 },
  scrollContent: { padding: 16, gap: 14 },

  // Card
  card: { backgroundColor: "#fbfbfb", borderRadius: 16, overflow: "hidden", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 6, elevation: 2 },
  cardImageWrap: { height: 180, width: "100%", position: "relative" },
  cardImage: { width: "100%", height: "100%" },
  statusBadge: { position: "absolute", top: 10, left: 10, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  statusBadgeText: { fontFamily: "Inter_600SemiBold", fontSize: 11, color: "#fff" },
  ratingBadge: { position: "absolute", top: 10, right: 10, backgroundColor: "#fff", borderRadius: 20, paddingHorizontal: 8, paddingVertical: 3, flexDirection: "row", alignItems: "center", gap: 2 },
  ratingStar: { color: "#f0b100", fontSize: 12, lineHeight: 16 },
  ratingNum: { fontFamily: "Inter_500Medium", fontSize: 11, color: "#0a0a0a" },
  cardBody: { padding: 12, gap: 8 },
  cardTitleRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  cardName: { fontFamily: "Inter_600SemiBold", fontSize: 15, color: "#00122c", flex: 1, marginRight: 4 },
  locationRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  locationText: { fontFamily: "Inter_400Regular", fontSize: 12, color: "#888" },
  specsRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  specText: { fontFamily: "Inter_400Regular", fontSize: 12, color: "#666" },
  specDot: { width: 3, height: 3, borderRadius: 1.5, backgroundColor: "#ccc" },
  cardFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderTopWidth: 1, borderTopColor: "#f0f0f0", paddingTop: 10, marginTop: 2 },
  tenantInfo: { flexDirection: "row", alignItems: "center", gap: 6, flex: 1 },
  tenantAvatar: { width: 24, height: 24, borderRadius: 12, backgroundColor: "#d3d3d3" },
  tenantText: { fontFamily: "Inter_400Regular", fontSize: 12, color: "#555", flex: 1 },
  vacantText: { fontFamily: "Inter_500Medium", fontSize: 12, color: Colors.secondary },
  rentInfo: { flexDirection: "row", alignItems: "baseline" },
  rentAmount: { fontFamily: "Inter_700Bold", fontSize: 15, color: Colors.primary },
  rentSuffix: { fontFamily: "Inter_400Regular", fontSize: 11, color: "#888", marginLeft: 2 },
  emptyState: { alignItems: "center", justifyContent: "center", paddingVertical: 60, gap: 8 },
  emptyTitle: { fontFamily: "Inter_600SemiBold", fontSize: 16, color: "#333" },
  emptySubtitle: { fontFamily: "Inter_400Regular", fontSize: 13, color: "#888" },
});
