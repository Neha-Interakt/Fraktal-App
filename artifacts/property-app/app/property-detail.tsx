import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path, Rect, Circle } from "react-native-svg";

const isWeb = Platform.OS === "web";
const PRIMARY = "#1a365d";
const DARK = "#00122c";
const GOLD = "#c9a227";
const GOLD2 = "#ffcb29";
const BG = "#e9e9e9";
const WHITE = "#ffffff";
const LIGHT_GRAY = "#edf2f7";
const MUTED = "#718096";

// ─── Icons ────────────────────────────────────────────────────────────────────

function ArrowLeftIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path d="M19.5 12H4.5M4.5 12L11.25 18.75M4.5 12L11.25 5.25" stroke={PRIMARY} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
function ChatBubbleIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path d="M21 11.5C21.003 12.82 20.695 14.12 20.1 15.3C19.394 16.712 18.31 17.899 16.967 18.729C15.625 19.559 14.078 20 12.5 20C11.18 20.003 9.878 19.695 8.7 19.1L3 21L4.9 15.3C4.305 14.12 3.997 12.82 4 11.5C4 9.922 4.44 8.375 5.271 7.033C6.101 5.69 7.288 4.606 8.7 3.9C9.878 3.305 11.18 2.997 12.5 3H13C15.084 3.115 17.053 3.995 18.529 5.471C20.005 6.947 20.885 8.916 21 11V11.5Z" stroke={PRIMARY} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
function PencilIcon() {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <Path d="M9.5 3.5L12.5 6.5L5 14H2V11L9.5 3.5ZM9.5 3.5L11.5 1.5L14.5 4.5L12.5 6.5" stroke={PRIMARY} strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
function MapPinIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Path d="M12 2C8.134 2 5 5.134 5 9C5 13.5 12 22 12 22C12 22 19 13.5 19 9C19 5.134 15.866 2 12 2ZM12 11.5C10.619 11.5 9.5 10.381 9.5 9C9.5 7.619 10.619 6.5 12 6.5C13.381 6.5 14.5 7.619 14.5 9C14.5 10.381 13.381 11.5 12 11.5Z" stroke="#555" strokeWidth={1.4} fill="none" />
    </Svg>
  );
}
function MoneyIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Path d="M3 7C3 5.895 3.895 5 5 5H19C20.105 5 21 5.895 21 7V17C21 18.105 20.105 19 19 19H5C3.895 19 3 18.105 3 17V7Z" stroke="#555" strokeWidth={1.4} />
      <Path d="M12 9V15M9.5 10.5C9.5 9.672 10.172 9 11 9H13C13.828 9 14.5 9.672 14.5 10.5C14.5 11.328 13.828 12 13 12H11C10.172 12 9.5 12.672 9.5 13.5C9.5 14.328 10.172 15 11 15H13C13.828 15 14.5 14.328 14.5 13.5" stroke="#555" strokeWidth={1.4} strokeLinecap="round" />
    </Svg>
  );
}
function BedIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path d="M2 7V17M2 12H22M22 7V17M7 12V9.5C7 8.672 7.672 8 8.5 8H12M16 12V9.5C16 8.672 15.328 8 14.5 8H12M12 8V12" stroke={PRIMARY} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
function BathIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path d="M4 12H20V16C20 18.209 18.209 20 16 20H8C5.791 20 4 18.209 4 16V12ZM4 12V6C4 4.895 4.895 4 6 4C7.105 4 8 4.895 8 6V12" stroke={PRIMARY} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M8 20L7 22M16 20L17 22" stroke={PRIMARY} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}
function ElevatorIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Rect x={3} y={3} width={18} height={18} rx={2} stroke={PRIMARY} strokeWidth={1.5} />
      <Path d="M9 3V21M15 3V21" stroke={PRIMARY} strokeWidth={1.5} />
      <Path d="M12 8L9.5 11H14.5L12 8ZM12 16L9.5 13H14.5L12 16Z" fill={PRIMARY} />
    </Svg>
  );
}
function UsersSmIcon() {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
      <Circle cx={9} cy={7} r={4} stroke="#555" strokeWidth={1.5} />
      <Path d="M3 21C3 18.239 5.686 16 9 16C12.314 16 15 18.239 15 21" stroke="#555" strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M16 11C17.657 11 19 9.657 19 8C19 6.343 17.657 5 16 5" stroke="#555" strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M20 21C20 18.794 18.21 16.938 16 16.5" stroke="#555" strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}
function WrenchLtIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.77 3.77z" stroke={PRIMARY} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
  );
}
function TrendUpGoldIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path d="M22.5 5.25V11.25C22.5 11.449 22.421 11.64 22.28 11.78C22.14 11.921 21.949 12 21.75 12C21.551 12 21.36 11.921 21.22 11.78C21.079 11.64 21 11.449 21 11.25V7.06L13.28 14.78C13.21 14.85 13.128 14.906 13.037 14.943C12.946 14.981 12.849 15 12.75 15C12.651 15 12.554 14.981 12.463 14.943C12.372 14.906 12.289 14.85 12.219 14.78L9 11.56L2.78 17.78C2.64 17.921 2.449 18 2.25 18C2.051 18 1.86 17.921 1.719 17.78C1.579 17.64 1.5 17.449 1.5 17.25C1.5 17.051 1.579 16.86 1.719 16.719L8.469 9.969C8.539 9.9 8.622 9.844 8.713 9.807C8.804 9.769 8.901 9.749 9 9.749C9.099 9.749 9.196 9.769 9.287 9.807C9.378 9.844 9.461 9.9 9.531 9.969L12.75 13.19L19.94 6H15.75C15.551 6 15.36 5.921 15.22 5.78C15.079 5.64 15 5.449 15 5.25C15 5.051 15.079 4.86 15.22 4.719C15.36 4.579 15.551 4.5 15.75 4.5H21.75C21.949 4.5 22.14 4.579 22.28 4.719C22.421 4.86 22.5 5.051 22.5 5.25Z" fill={GOLD2} />
    </Svg>
  );
}

// ─── Property data (shared) ───────────────────────────────────────────────────

export const PROPERTIES_DATA = [
  {
    id: "1",
    name: "Prestige Lakeside Habitat",
    location: "Whitefield, Bangalore",
    address: "Flat 101 · Whitefield, Bengaluru",
    tenant: "Ramesh Kumar",
    tenantSince: "Mar 2023",
    rent: "₹28,000",
    rentFull: "₹28,000/month",
    rating: "4.5",
    beds: "3",
    baths: "2",
    area: "1,450 sq.ft",
    status: "Occupied",
    leaseStart: "Mar 10, 2023",
    leaseEnd: "Mar 9, 2026",
    leaseStatus: "Renewed",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    ],
    imgLabels: ["Exterior", "Living Room", "Garden"],
    maintenance: [
      { label: "Ceiling fan repair", date: "Feb 10, 2025", status: "Resolved" },
    ],
  },
  {
    id: "2",
    name: "Sunset Apartments #402",
    location: "Koramangala, Bangalore",
    address: "Flat 402 · Whitefield, Bengaluru",
    tenant: "Harish Rao",
    tenantSince: "Jan 2024",
    rent: "₹28,000",
    rentFull: "₹28,000/month",
    rating: "4.5",
    beds: "2",
    baths: "2",
    area: "1,100 sq.ft",
    status: "Occupied",
    leaseStart: "Jan 15, 2024",
    leaseEnd: "Jan 14, 2026",
    leaseStatus: "Renewed",
    images: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    ],
    imgLabels: ["Living Room", "Exterior", "Bedroom", "Garden"],
    maintenance: [
      { label: "AC not cooling", date: "Mar 10, 2025", status: "Open" },
      { label: "Leaky kitchen faucet", date: "Feb 28, 2025", status: "Resolved" },
    ],
  },
  {
    id: "3",
    name: "Ocean View Villa",
    location: "Indiranagar, Bangalore",
    address: "Villa 7 · Indiranagar, Bengaluru",
    tenant: "—",
    tenantSince: "",
    rent: "₹45,000",
    rentFull: "₹45,000/month",
    rating: "4.8",
    beds: "4",
    baths: "3",
    area: "2,200 sq.ft",
    status: "Vacant",
    leaseStart: "—",
    leaseEnd: "—",
    leaseStatus: "Vacant",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    ],
    imgLabels: ["Exterior", "Pool"],
    maintenance: [],
  },
  {
    id: "4",
    name: "Green Park Residency",
    location: "HSR Layout, Bangalore",
    address: "Flat 5B · HSR Layout, Bengaluru",
    tenant: "Priya Sharma",
    tenantSince: "Jun 2022",
    rent: "₹18,500",
    rentFull: "₹18,500/month",
    rating: "4.2",
    beds: "1",
    baths: "1",
    area: "650 sq.ft",
    status: "Occupied",
    leaseStart: "Jun 1, 2022",
    leaseEnd: "May 31, 2026",
    leaseStatus: "Renewed",
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80",
    ],
    imgLabels: ["Exterior", "Living Room"],
    maintenance: [
      { label: "Door lock broken", date: "Jan 5, 2025", status: "Resolved" },
    ],
  },
];

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function PropertyDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const property = PROPERTIES_DATA.find((p) => p.id === id) ?? PROPERTIES_DATA[1];

  const insets = useSafeAreaInsets();
  const { width: screenWidth } = useWindowDimensions();
  const topPad = isWeb ? 8 : insets.top > 0 ? insets.top : 12;
  const bottomPad = isWeb ? 24 : insets.bottom + 16;
  const [activeImg, setActiveImg] = useState(0);
  const carouselRef = useRef<ScrollView>(null);

  const carouselWidth = screenWidth - 32;
  const openCount = property.maintenance.filter((m) => m.status === "Open").length;

  const onChatPress = () => {
    if (property.status === "Occupied") {
      router.push({ pathname: "/chat", params: { id: property.id, tenant: property.tenant } } as any);
    }
  };

  const onEditPress = () => {
    router.push({ pathname: "/edit-property", params: { id: property.id } } as any);
  };

  return (
    <View style={s.screen}>
      {/* Fixed header */}
      <View style={[s.topHeader, { paddingTop: topPad }]}>
        <View style={s.navbar}>
          <View style={s.navLeft}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()} style={s.backBtn}>
              <ArrowLeftIcon />
            </TouchableOpacity>
            <Text style={s.navTitle} numberOfLines={1}>{property.name}</Text>
          </View>
          <TouchableOpacity activeOpacity={0.7} onPress={onChatPress} style={s.chatBtn}>
            <ChatBubbleIcon />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={s.scroll}
        contentContainerStyle={[s.scrollContent, { paddingBottom: bottomPad }]}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Photo Carousel ── */}
        <View style={[s.carouselWrap, { width: carouselWidth }]}>
          <ScrollView
            ref={carouselRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onMomentumScrollEnd={(e) => {
              const idx = Math.round(e.nativeEvent.contentOffset.x / carouselWidth);
              setActiveImg(idx);
            }}
            style={{ width: carouselWidth, height: 240 }}
          >
            {property.images.map((uri, i) => (
              <Image
                key={i}
                source={{ uri }}
                style={{ width: carouselWidth, height: 240 }}
                contentFit="cover"
                transition={200}
              />
            ))}
          </ScrollView>

          {/* Bottom overlay: label + dots + date */}
          <View style={s.carouselOverlay}>
            <Text style={s.carouselLabel}>{property.imgLabels[activeImg]}</Text>
            <View style={s.dots}>
              {property.images.map((_, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => {
                    setActiveImg(i);
                    carouselRef.current?.scrollTo({ x: i * carouselWidth, animated: true });
                  }}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <View style={[s.dot, i === activeImg && s.dotActive]} />
                </TouchableOpacity>
              ))}
            </View>
            <Text style={s.carouselDate}>Updated Feb 2026</Text>
          </View>

          {/* Edit button overlay */}
          <TouchableOpacity style={s.editOverlayBtn} activeOpacity={0.85} onPress={onEditPress}>
            <Text style={s.editOverlayTxt}>Edit</Text>
            <PencilIcon />
          </TouchableOpacity>
        </View>

        {/* ── Location + Rent + Status ── */}
        <View style={s.infoRow}>
          <View style={s.infoLeft}>
            <View style={s.infoLine}>
              <MapPinIcon />
              <Text style={s.infoText}>{property.address}</Text>
            </View>
            <View style={s.infoLine}>
              <MoneyIcon />
              <Text style={s.infoText}>{property.rentFull}</Text>
            </View>
          </View>
          <View style={[s.leaseBadge, { borderColor: property.status === "Occupied" ? "#38a169" : GOLD }]}>
            <Text style={[s.leaseText, { color: property.status === "Occupied" ? "#38a169" : GOLD }]}>
              {property.status === "Occupied" ? "Lease Active" : "Vacant"}
            </Text>
          </View>
        </View>

        {/* ── Specs ── */}
        <View style={s.specsCard}>
          <View style={s.specItem}>
            <View style={s.specIcon}><BedIcon /></View>
            <Text style={s.specText}><Text style={s.specBold}>{property.beds}</Text> Bedrooms</Text>
          </View>
          <View style={s.specDivider} />
          <View style={s.specItem}>
            <View style={s.specIcon}><BathIcon /></View>
            <Text style={s.specText}><Text style={s.specBold}>{property.baths}</Text> Bathrooms</Text>
          </View>
          <View style={s.specDivider} />
          <View style={s.specItem}>
            <View style={s.specIcon}><ElevatorIcon /></View>
            <Text style={s.specText}>Lift available</Text>
          </View>
        </View>

        {/* ── Tenant Card (Figma: #edf2f7 light gray) ── */}
        {property.status === "Occupied" ? (
          <View style={s.tenantCard}>
            {/* Left */}
            <View style={s.tenantLeft}>
              {/* Avatar + name row */}
              <View style={s.tenantAvatarRow}>
                <View style={s.tenantAvatar} />
                <Text style={s.tenantNameTxt} numberOfLines={1}>
                  Tenant: {property.tenant}
                </Text>
              </View>
              {/* Info block */}
              <View style={s.tenantInfoBlock}>
                <Text style={s.tenantProfession}>Working Professional · Infosys, Bengaluru</Text>
                <View style={s.occupantsRow}>
                  <Text style={s.occupantsTxt}>Occupants living: 3</Text>
                  <UsersSmIcon />
                </View>
              </View>
            </View>
            {/* Right */}
            <View style={s.tenantRight}>
              <TouchableOpacity style={s.viewProfileBtn} activeOpacity={0.8}>
                <Text style={s.viewProfileTxt}>View Profile</Text>
              </TouchableOpacity>
              <Text style={s.expiresOnTxt}>Expires on: {property.leaseEnd}</Text>
            </View>
          </View>
        ) : (
          <View style={[s.tenantCard, { alignItems: "center", justifyContent: "center" }]}>
            <Text style={{ fontFamily: "Inter_400Regular", fontSize: 14, color: MUTED }}>
              No current tenant — property is available
            </Text>
          </View>
        )}

        {/* ── Maintenance Card (white) ── */}
        <View style={s.whiteCard}>
          <View style={s.cardHeader}>
            <View style={s.cardIconWrap}><WrenchLtIcon /></View>
            <Text style={s.cardTitle}>Maintenance Requests</Text>
            {openCount > 0 && (
              <View style={s.openBadge}>
                <Text style={s.openBadgeTxt}>{openCount} open</Text>
              </View>
            )}
          </View>
          {property.maintenance.length === 0 ? (
            <View style={s.emptyRow}>
              <Text style={s.emptyRowTxt}>No maintenance requests</Text>
            </View>
          ) : (
            property.maintenance.map((m, i) => (
              <View key={i} style={s.maintItem}>
                <View style={s.maintLeft}>
                  <View style={[s.maintDot, { backgroundColor: m.status === "Open" ? "#fc8181" : "#68d391" }]} />
                  <View>
                    <Text style={s.maintLabel}>{m.label}</Text>
                    <Text style={s.maintDate}>{m.date}</Text>
                  </View>
                </View>
                <View style={[s.maintBadge, { borderColor: m.status === "Open" ? "#fc8181" : "#68d391" }]}>
                  <Text style={[s.maintBadgeTxt, { color: m.status === "Open" ? "#fc8181" : "#68d391" }]}>
                    {m.status}
                  </Text>
                </View>
              </View>
            ))
          )}
        </View>

        {/* ── Analytics Card (white) ── */}
        <View style={s.whiteCard}>
          <View style={s.cardHeader}>
            <View style={s.cardIconWrap}><TrendUpGoldIcon /></View>
            <Text style={s.cardTitle}>Rental Analytics</Text>
          </View>
          <View style={s.analyticsRow}>
            {[
              { val: property.rent, label: "Monthly Revenue", change: "+2%" },
              { val: property.status === "Occupied" ? "100%" : "0%", label: "Occupancy Rate", change: property.status },
              { val: "12%", label: "Total ROI", change: "Since start" },
            ].map((tile, i) => (
              <View key={i} style={s.analyticsTile}>
                <Text style={s.analyticsTileVal}>{tile.val}</Text>
                <Text style={s.analyticsTileLabel}>{tile.label}</Text>
                <Text style={s.analyticsTileChange}>{tile.change}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: BG },
  topHeader: { backgroundColor: WHITE, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 3 },
  navbar: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 16, paddingTop: 8, paddingBottom: 14 },
  navLeft: { flexDirection: "row", alignItems: "center", gap: 12, flex: 1, marginRight: 8 },
  backBtn: { padding: 2 },
  navTitle: { fontFamily: "Inter_600SemiBold", fontSize: 16, color: PRIMARY, flex: 1 },
  chatBtn: { padding: 4 },

  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingTop: 16, gap: 14 },

  // Carousel
  carouselWrap: { borderRadius: 24, height: 240, overflow: "hidden", position: "relative" },
  carouselOverlay: { position: "absolute", bottom: 0, left: 0, right: 0, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 14, paddingBottom: 12, backgroundColor: "rgba(0,0,0,0.18)" },
  carouselLabel: { fontFamily: "Inter_500Medium", fontSize: 11, color: "#fff" },
  dots: { flexDirection: "row", alignItems: "center", gap: 5 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "rgba(255,255,255,0.5)" },
  dotActive: { width: 18, height: 6, borderRadius: 3, backgroundColor: WHITE },
  carouselDate: { fontFamily: "Inter_400Regular", fontSize: 10, color: "rgba(255,255,255,0.8)" },
  editOverlayBtn: { position: "absolute", top: 12, right: 12, flexDirection: "row", alignItems: "center", gap: 4, borderWidth: 1, borderColor: "rgba(255,255,255,0.6)", borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5, backgroundColor: "rgba(255,255,255,0.88)" },
  editOverlayTxt: { fontFamily: "Inter_500Medium", fontSize: 12, color: PRIMARY },

  // Info row
  infoRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" },
  infoLeft: { gap: 6, flex: 1, marginRight: 12 },
  infoLine: { flexDirection: "row", alignItems: "center", gap: 6 },
  infoText: { fontFamily: "Inter_500Medium", fontSize: 13, color: "#333" },
  leaseBadge: { borderWidth: 1, borderRadius: 16, paddingHorizontal: 10, paddingVertical: 4 },
  leaseText: { fontFamily: "Inter_500Medium", fontSize: 12 },

  // Specs
  specsCard: { backgroundColor: WHITE, borderRadius: 16, paddingHorizontal: 12, paddingVertical: 14, flexDirection: "row", alignItems: "center", justifyContent: "space-between", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 2 },
  specItem: { flexDirection: "row", alignItems: "center", gap: 6, flex: 1, justifyContent: "center" },
  specIcon: { backgroundColor: LIGHT_GRAY, borderRadius: 20, padding: 5 },
  specText: { fontFamily: "Inter_400Regular", fontSize: 12, color: "#333" },
  specBold: { fontFamily: "Inter_600SemiBold", fontSize: 13, color: PRIMARY },
  specDivider: { width: 1, height: 28, backgroundColor: "#e8e8e8" },

  // Tenant card — Figma: bg #edf2f7, layout row, space-between
  tenantCard: { backgroundColor: LIGHT_GRAY, borderRadius: 16, padding: 12, flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 2, minHeight: 87 + 24 },
  tenantLeft: { flex: 1, gap: 12, marginRight: 12 },
  tenantAvatarRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  tenantAvatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: "#c4c4c4" },
  tenantNameTxt: { fontFamily: "Inter_400Regular", fontSize: 14, color: "#000", letterSpacing: -0.3, flex: 1 },
  tenantInfoBlock: { gap: 8 },
  tenantProfession: { fontFamily: "Inter_400Regular", fontSize: 12, color: "#000" },
  occupantsRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  occupantsTxt: { fontFamily: "Inter_400Regular", fontSize: 12, color: "#000" },
  tenantRight: { height: 87, alignItems: "flex-end", justifyContent: "space-between" },
  viewProfileBtn: { backgroundColor: PRIMARY, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8 },
  viewProfileTxt: { fontFamily: "Inter_400Regular", fontSize: 14, color: WHITE, letterSpacing: -0.3 },
  expiresOnTxt: { fontFamily: "Inter_400Regular", fontSize: 10, color: PRIMARY, textAlign: "right", width: 64 },

  // White cards (maintenance + analytics)
  whiteCard: { backgroundColor: WHITE, borderRadius: 16, padding: 14, gap: 12, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 6, elevation: 3 },
  cardHeader: { flexDirection: "row", alignItems: "center", gap: 8 },
  cardIconWrap: { backgroundColor: LIGHT_GRAY, borderRadius: 10, padding: 6, alignItems: "center", justifyContent: "center" },
  cardTitle: { fontFamily: "Inter_600SemiBold", fontSize: 14, color: PRIMARY, flex: 1 },
  openBadge: { backgroundColor: "#fff0f0", borderRadius: 99, paddingHorizontal: 8, paddingVertical: 2, borderWidth: 1, borderColor: "#fecaca" },
  openBadgeTxt: { fontFamily: "Inter_600SemiBold", fontSize: 11, color: "#e53e3e" },

  // Maintenance items
  emptyRow: { backgroundColor: LIGHT_GRAY, borderRadius: 10, padding: 12 },
  emptyRowTxt: { fontFamily: "Inter_400Regular", fontSize: 13, color: MUTED, textAlign: "center" },
  maintItem: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: LIGHT_GRAY, borderRadius: 10, padding: 10 },
  maintLeft: { flexDirection: "row", alignItems: "center", gap: 10, flex: 1, marginRight: 8 },
  maintDot: { width: 8, height: 8, borderRadius: 4 },
  maintLabel: { fontFamily: "Inter_500Medium", fontSize: 13, color: "#222" },
  maintDate: { fontFamily: "Inter_400Regular", fontSize: 11, color: MUTED, marginTop: 2 },
  maintBadge: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 8, paddingVertical: 3 },
  maintBadgeTxt: { fontFamily: "Inter_400Regular", fontSize: 11 },

  // Analytics tiles
  analyticsRow: { flexDirection: "row", justifyContent: "space-between", gap: 8 },
  analyticsTile: { flex: 1, alignItems: "center", backgroundColor: LIGHT_GRAY, borderRadius: 12, padding: 10 },
  analyticsTileVal: { fontFamily: "Inter_700Bold", fontSize: 15, color: GOLD },
  analyticsTileLabel: { fontFamily: "Inter_400Regular", fontSize: 10, color: MUTED, textAlign: "center", marginTop: 4 },
  analyticsTileChange: { fontFamily: "Inter_500Medium", fontSize: 10, color: "#68d391", marginTop: 3 },
});
