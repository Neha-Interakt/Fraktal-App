import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
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
import Svg, { Path, Rect, Circle } from "react-native-svg";
import Colors from "@/constants/colors";

const isWeb = Platform.OS === "web";

// ─── Icons ────────────────────────────────────────────────────────────────────

function ArrowLeftIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path d="M19.5 12H4.5M4.5 12L11.25 18.75M4.5 12L11.25 5.25" stroke="#1a365d" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
function ChatIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" stroke="#1a365d" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
function MapPinIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path d="M12 2C8.134 2 5 5.134 5 9C5 13.5 12 22 12 22C12 22 19 13.5 19 9C19 5.134 15.866 2 12 2ZM12 11.5C10.619 11.5 9.5 10.381 9.5 9C9.5 7.619 10.619 6.5 12 6.5C13.381 6.5 14.5 7.619 14.5 9C14.5 10.381 13.381 11.5 12 11.5Z" stroke="#111" strokeWidth={1.4} fill="none" />
    </Svg>
  );
}
function MoneyIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path d="M3 7C3 5.895 3.895 5 5 5H19C20.105 5 21 5.895 21 7V17C21 18.105 20.105 19 19 19H5C3.895 19 3 18.105 3 17V7Z" stroke="#111" strokeWidth={1.4} />
      <Path d="M12 9V15M9.5 10.5C9.5 9.672 10.172 9 11 9H13C13.828 9 14.5 9.672 14.5 10.5C14.5 11.328 13.828 12 13 12H11C10.172 12 9.5 12.672 9.5 13.5C9.5 14.328 10.172 15 11 15H13C13.828 15 14.5 14.328 14.5 13.5" stroke="#111" strokeWidth={1.4} strokeLinecap="round" />
    </Svg>
  );
}
function BedIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path d="M2 7V17M2 12H22M22 7V17M7 12V9.5C7 8.672 7.672 8 8.5 8H12M16 12V9.5C16 8.672 15.328 8 14.5 8H12M12 8V12" stroke="#1a365d" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
function BathIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path d="M4 12H20V16C20 18.209 18.209 20 16 20H8C5.791 20 4 18.209 4 16V12ZM4 12V6C4 4.895 4.895 4 6 4C7.105 4 8 4.895 8 6V12" stroke="#1a365d" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M8 20L7 22M16 20L17 22" stroke="#1a365d" strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}
function ElevatorIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Rect x={3} y={3} width={18} height={18} rx={2} stroke="#1a365d" strokeWidth={1.5} />
      <Path d="M9 3V21M15 3V21" stroke="#1a365d" strokeWidth={1.5} />
      <Path d="M12 8L9.5 11H14.5L12 8ZM12 16L9.5 13H14.5L12 16Z" fill="#1a365d" />
    </Svg>
  );
}
function PencilIcon() {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <Path d="M9.5 3.5L12.5 6.5L5 14H2V11L9.5 3.5ZM9.5 3.5L11.5 1.5L14.5 4.5L12.5 6.5" stroke="#1a365d" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
function UsersIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path d="M16 11C17.657 11 19 9.657 19 8C19 6.343 17.657 5 16 5" stroke="#f8f8f8" strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M18 21C18 18.239 15.314 16 12 16C8.686 16 6 18.239 6 21" stroke="#f8f8f8" strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M20 21C20 18.239 17.314 16 14 16" stroke="#f8f8f8" strokeWidth={1.5} strokeLinecap="round" />
      <Circle cx={12} cy={8} r={4} stroke="#f8f8f8" strokeWidth={1.5} />
    </Svg>
  );
}
function WrenchIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.77 3.77z" stroke="#f8f8f8" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
  );
}
function TrendUpIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path d="M22.5 5.25V11.25C22.5 11.449 22.421 11.64 22.28 11.78C22.14 11.921 21.949 12 21.75 12C21.551 12 21.36 11.921 21.22 11.78C21.079 11.64 21 11.449 21 11.25V7.06L13.28 14.78C13.21 14.85 13.128 14.906 13.037 14.943C12.946 14.981 12.849 15 12.75 15C12.651 15 12.554 14.981 12.463 14.943C12.372 14.906 12.289 14.85 12.219 14.78L9 11.56L2.78 17.78C2.64 17.921 2.449 18 2.25 18C2.051 18 1.86 17.921 1.719 17.78C1.579 17.64 1.5 17.449 1.5 17.25C1.5 17.051 1.579 16.86 1.719 16.719L8.469 9.969C8.539 9.9 8.622 9.844 8.713 9.807C8.804 9.769 8.901 9.749 9 9.749C9.099 9.749 9.196 9.769 9.287 9.807C9.378 9.844 9.461 9.9 9.531 9.969L12.75 13.19L19.94 6H15.75C15.551 6 15.36 5.921 15.22 5.78C15.079 5.64 15 5.449 15 5.25C15 5.051 15.079 4.86 15.22 4.719C15.36 4.579 15.551 4.5 15.75 4.5H21.75C21.949 4.5 22.14 4.579 22.28 4.719C22.421 4.86 22.5 5.051 22.5 5.25Z" fill="#FFCB29" />
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
    leaseEnd: "Mar 9, 2024",
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
    leaseEnd: "Jan 14, 2025",
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
    leaseEnd: "May 31, 2023",
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
  const topPad = isWeb ? 8 : insets.top > 0 ? insets.top : 12;
  const bottomPad = isWeb ? 24 : insets.bottom + 16;
  const [activeImg, setActiveImg] = useState(0);

  const openCount = property.maintenance.filter((m) => m.status === "Open").length;

  return (
    <View style={s.screen}>
      {/* Fixed white header */}
      <View style={[s.topHeader, { paddingTop: topPad }]}>
        {/* Navbar */}
        <View style={s.navbar}>
          <View style={s.navLeft}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()} style={s.backBtn}>
              <ArrowLeftIcon />
            </TouchableOpacity>
            <Text style={s.navTitle} numberOfLines={1}>{property.name}</Text>
          </View>
          <TouchableOpacity activeOpacity={0.7}>
            <ChatIcon />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={s.scroll}
        contentContainerStyle={[s.scrollContent, { paddingBottom: bottomPad }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Image Carousel */}
        <View style={s.carouselWrap}>
          <Image
            source={{ uri: property.images[activeImg] }}
            style={s.carouselImage}
            contentFit="cover"
            transition={250}
          />
          <View style={s.carouselBottom}>
            <Text style={s.carouselLabel}>{property.imgLabels[activeImg]}</Text>
            <View style={s.dots}>
              {property.images.map((_, i) => (
                <TouchableOpacity key={i} onPress={() => setActiveImg(i)}>
                  <View style={[s.dot, i === activeImg && s.dotActive]} />
                </TouchableOpacity>
              ))}
            </View>
            <Text style={s.carouselDate}>Updated Feb 2026</Text>
          </View>
          <TouchableOpacity style={s.editBtn} activeOpacity={0.8}>
            <Text style={s.editBtnText}>Edit</Text>
            <PencilIcon />
          </TouchableOpacity>
        </View>

        {/* Location + Rent + Status */}
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
          <View style={[s.leaseBadge, { borderColor: property.status === "Occupied" ? "#38a169" : "#c9a227" }]}>
            <Text style={[s.leaseText, { color: property.status === "Occupied" ? "#38a169" : "#c9a227" }]}>
              {property.status === "Occupied" ? "Lease Active" : "Vacant"}
            </Text>
          </View>
        </View>

        {/* Specs */}
        <View style={s.specsRow}>
          <View style={s.specItem}>
            <View style={s.specIcon}><BedIcon /></View>
            <Text style={s.specText}><Text style={s.specBold}>{property.beds}</Text>-Bed rooms</Text>
          </View>
          <View style={s.specItem}>
            <View style={s.specIcon}><BathIcon /></View>
            <Text style={s.specText}><Text style={s.specBold}>{property.baths}</Text>-Bath rooms</Text>
          </View>
          <View style={s.specItem}>
            <View style={s.specIcon}><ElevatorIcon /></View>
            <Text style={s.specText}>Lift available</Text>
          </View>
        </View>

        {/* Tenant Card */}
        <View style={s.navyCard}>
          <View style={s.cardTitleRow}>
            <View style={s.cardIconWrap}><UsersIcon /></View>
            <Text style={s.cardTitle}>Current Tenant</Text>
          </View>
          {property.status === "Occupied" ? (
            <>
              <View style={s.tenantInfoRow}>
                <View style={s.tenantAvatarLg} />
                <View style={s.tenantDetails}>
                  <Text style={s.tenantName}>{property.tenant}</Text>
                  <Text style={s.tenantSub}>Tenant since {property.tenantSince}</Text>
                </View>
                <View style={s.tenantRentBox}>
                  <Text style={s.tenantRentAmt}>{property.rent}</Text>
                  <Text style={s.tenantRentSub}>/month</Text>
                </View>
              </View>
              <View style={s.leaseRow}>
                <View style={s.leaseInfoItem}>
                  <Text style={s.leaseInfoLabel}>Lease Start</Text>
                  <Text style={s.leaseInfoVal}>{property.leaseStart}</Text>
                </View>
                <View style={s.leaseInfoDivider} />
                <View style={s.leaseInfoItem}>
                  <Text style={s.leaseInfoLabel}>Lease End</Text>
                  <Text style={s.leaseInfoVal}>{property.leaseEnd}</Text>
                </View>
                <View style={s.leaseInfoDivider} />
                <View style={s.leaseInfoItem}>
                  <Text style={s.leaseInfoLabel}>Status</Text>
                  <Text style={[s.leaseInfoVal, { color: "#68d391" }]}>{property.leaseStatus}</Text>
                </View>
              </View>
            </>
          ) : (
            <View style={s.vacantBox}>
              <Text style={s.vacantText}>No current tenant — property is available</Text>
            </View>
          )}
        </View>

        {/* Maintenance Card */}
        <View style={s.navyCard}>
          <View style={s.cardTitleRow}>
            <View style={s.cardIconWrap}><WrenchIcon /></View>
            <Text style={s.cardTitle}>Maintenance Requests</Text>
            {openCount > 0 && (
              <View style={s.badgeCount}>
                <Text style={s.badgeCountText}>{openCount}</Text>
              </View>
            )}
          </View>
          {property.maintenance.length === 0 ? (
            <View style={s.vacantBox}>
              <Text style={s.vacantText}>No maintenance requests</Text>
            </View>
          ) : (
            property.maintenance.map((m, i) => (
              <View key={i} style={s.maintenanceItem}>
                <View style={s.maintenanceLeft}>
                  <View style={[s.maintenanceDot, { backgroundColor: m.status === "Open" ? "#fc8181" : "#68d391" }]} />
                  <View>
                    <Text style={s.maintenanceLabel}>{m.label}</Text>
                    <Text style={s.maintenanceDate}>{m.date}</Text>
                  </View>
                </View>
                <View style={[s.maintenanceBadge, { borderColor: m.status === "Open" ? "#fc8181" : "#68d391" }]}>
                  <Text style={[s.maintenanceBadgeText, { color: m.status === "Open" ? "#fc8181" : "#68d391" }]}>{m.status}</Text>
                </View>
              </View>
            ))
          )}
        </View>

        {/* Analytics Card */}
        <View style={s.navyCard}>
          <View style={s.cardTitleRow}>
            <View style={s.cardIconWrap}><TrendUpIcon /></View>
            <Text style={s.cardTitle}>Rental Analytics</Text>
          </View>
          <View style={s.analyticsRow}>
            <View style={s.analyticsTile}>
              <Text style={s.analyticsTileVal}>{property.rent}</Text>
              <Text style={s.analyticsTileLabel}>Monthly Revenue</Text>
              <Text style={s.analyticsTileChange}>+2%</Text>
            </View>
            <View style={s.analyticsTile}>
              <Text style={s.analyticsTileVal}>{property.status === "Occupied" ? "100%" : "0%"}</Text>
              <Text style={s.analyticsTileLabel}>Occupancy Rate</Text>
              <Text style={s.analyticsTileChange}>{property.status}</Text>
            </View>
            <View style={s.analyticsTile}>
              <Text style={s.analyticsTileVal}>12%</Text>
              <Text style={s.analyticsTileLabel}>Total ROI</Text>
              <Text style={s.analyticsTileChange}>Since start</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#e9e9e9" },
  topHeader: { backgroundColor: "#ffffff" },
  navbar: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 16, paddingTop: 8, paddingBottom: 14 },
  navLeft: { flexDirection: "row", alignItems: "center", gap: 12, flex: 1, marginRight: 8 },
  backBtn: { padding: 2 },
  navTitle: { fontFamily: "Inter_600SemiBold", fontSize: 16, color: "#1a365d", flex: 1 },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingTop: 16, gap: 16 },
  carouselWrap: { borderRadius: 24, height: 240, overflow: "hidden", position: "relative" },
  carouselImage: { width: "100%", height: "100%" },
  carouselBottom: { position: "absolute", bottom: 0, left: 0, right: 0, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 12, paddingBottom: 10 },
  carouselLabel: { fontFamily: "Inter_400Regular", fontSize: 10, color: "#2d3748" },
  dots: { flexDirection: "row", alignItems: "center", gap: 6 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#718096" },
  dotActive: { width: 12, height: 12, borderRadius: 6, backgroundColor: "#1a365d" },
  carouselDate: { fontFamily: "Inter_400Regular", fontSize: 10, color: "#2d3748" },
  editBtn: { position: "absolute", top: 12, right: 12, flexDirection: "row", alignItems: "center", gap: 4, borderWidth: 1, borderColor: "#718096", borderRadius: 12, paddingHorizontal: 8, paddingVertical: 4, backgroundColor: "rgba(255,255,255,0.85)" },
  editBtnText: { fontFamily: "Inter_400Regular", fontSize: 12, color: "#1a365d" },
  infoRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" },
  infoLeft: { gap: 8 },
  infoLine: { flexDirection: "row", alignItems: "center", gap: 4 },
  infoText: { fontFamily: "Inter_500Medium", fontSize: 14, color: "#111" },
  leaseBadge: { borderWidth: 1, borderRadius: 16, paddingHorizontal: 10, paddingVertical: 4 },
  leaseText: { fontFamily: "Inter_400Regular", fontSize: 12 },
  specsRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#ffffff", borderRadius: 16, padding: 12 },
  specItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  specIcon: { backgroundColor: "#edf2f7", borderRadius: 24, padding: 4, alignItems: "center", justifyContent: "center" },
  specText: { fontFamily: "Inter_400Regular", fontSize: 12, color: "#111", letterSpacing: -0.3 },
  specBold: { fontFamily: "Inter_500Medium", fontSize: 14, color: "#111" },
  navyCard: { backgroundColor: "#1a365d", borderRadius: 16, padding: 14, gap: 12 },
  cardTitleRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  cardIconWrap: { backgroundColor: "#00122c", borderRadius: 10, padding: 6, alignItems: "center", justifyContent: "center" },
  cardTitle: { fontFamily: "Inter_600SemiBold", fontSize: 14, color: "#f8f8f8", flex: 1 },
  badgeCount: { backgroundColor: "#fc8181", borderRadius: 99, paddingHorizontal: 8, paddingVertical: 2 },
  badgeCountText: { fontFamily: "Inter_600SemiBold", fontSize: 12, color: "#fff" },
  tenantInfoRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  tenantAvatarLg: { width: 44, height: 44, borderRadius: 22, backgroundColor: "#d3d3d3" },
  tenantDetails: { flex: 1 },
  tenantName: { fontFamily: "Inter_600SemiBold", fontSize: 14, color: "#f8f8f8" },
  tenantSub: { fontFamily: "Inter_400Regular", fontSize: 12, color: "#a0aec0", marginTop: 2 },
  tenantRentBox: { alignItems: "flex-end" },
  tenantRentAmt: { fontFamily: "Inter_700Bold", fontSize: 15, color: "#ffcb29" },
  tenantRentSub: { fontFamily: "Inter_400Regular", fontSize: 11, color: "#a0aec0" },
  leaseRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#00122c", borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10 },
  leaseInfoItem: { alignItems: "center", flex: 1 },
  leaseInfoDivider: { width: 1, height: 28, backgroundColor: "#2d4a7a" },
  leaseInfoLabel: { fontFamily: "Inter_400Regular", fontSize: 10, color: "#a0aec0", marginBottom: 3 },
  leaseInfoVal: { fontFamily: "Inter_600SemiBold", fontSize: 12, color: "#f8f8f8" },
  vacantBox: { backgroundColor: "#00122c", borderRadius: 10, padding: 12 },
  vacantText: { fontFamily: "Inter_400Regular", fontSize: 13, color: "#a0aec0", textAlign: "center" },
  maintenanceItem: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#00122c", borderRadius: 10, padding: 10 },
  maintenanceLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  maintenanceDot: { width: 8, height: 8, borderRadius: 4 },
  maintenanceLabel: { fontFamily: "Inter_500Medium", fontSize: 13, color: "#f8f8f8" },
  maintenanceDate: { fontFamily: "Inter_400Regular", fontSize: 11, color: "#a0aec0", marginTop: 2 },
  maintenanceBadge: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 8, paddingVertical: 3 },
  maintenanceBadgeText: { fontFamily: "Inter_400Regular", fontSize: 11 },
  analyticsRow: { flexDirection: "row", justifyContent: "space-between" },
  analyticsTile: { flex: 1, alignItems: "center", backgroundColor: "#00122c", borderRadius: 10, padding: 10, marginHorizontal: 3 },
  analyticsTileVal: { fontFamily: "Inter_700Bold", fontSize: 14, color: "#ffcb29" },
  analyticsTileLabel: { fontFamily: "Inter_400Regular", fontSize: 10, color: "#a0aec0", textAlign: "center", marginTop: 4 },
  analyticsTileChange: { fontFamily: "Inter_500Medium", fontSize: 10, color: "#68d391", marginTop: 3 },
});
