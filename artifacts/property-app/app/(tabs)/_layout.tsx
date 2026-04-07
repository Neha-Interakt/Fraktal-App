import { Tabs } from "expo-router";
import React from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path, Circle, Rect } from "react-native-svg";
import Colors from "@/constants/colors";

// ── Filled Icons (active state) ────────────────────────────────────────────────

function HomeFilledIcon({ color }: { color: string }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M21.4072 10.7803L12.5322 1.90531C12.3916 1.76484 12.1999 1.68567 12.0003 1.68567C11.8007 1.68567 11.609 1.76484 11.4684 1.90531L2.59338 10.7803C2.43016 10.9412 2.34165 11.1614 2.34165 11.4034C2.34165 11.6454 2.43016 11.8656 2.61958 12.017C2.78985 12.1771 3.01665 12.263 3.25026 12.255L4.50026 12.2203V20.25C4.50026 20.6478 4.6583 21.0294 4.9396 21.3107C5.2209 21.592 5.60243 21.75 6.00026 21.75H9.00026C9.19917 21.75 9.38994 21.671 9.53059 21.5303C9.67124 21.3897 9.75026 21.1989 9.75026 21V16.5H14.2503V21C14.2503 21.1989 14.3293 21.3897 14.4699 21.5303C14.6106 21.671 14.8014 21.75 15.0003 21.75H18.0003C18.3981 21.75 18.7796 21.592 19.0609 21.3107C19.3422 21.0294 19.5003 20.6478 19.5003 20.25V12.2203L20.7503 12.255C20.9839 12.263 21.2107 12.1771 21.381 12.017C21.5512 11.8568 21.6589 11.6363 21.6589 11.4034C21.6589 11.1614 21.5704 10.9412 21.4072 10.7803Z"
        fill={color}
      />
    </Svg>
  );
}

function BuildingsFilledIcon({ color }: { color: string }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M15 3H3C2.17 3 1.5 3.67 1.5 4.5V21H10.5V16.5H13.5V21H22.5V9C22.5 8.17 21.83 7.5 21 7.5H16.5V4.5C16.5 3.67 15.83 3 15 3ZM7.5 18H5.25V15.75H7.5V18ZM7.5 13.5H5.25V11.25H7.5V13.5ZM7.5 9H5.25V6.75H7.5V9ZM12 13.5H9.75V11.25H12V13.5ZM12 9H9.75V6.75H12V9ZM20.25 18H18V15.75H20.25V18ZM20.25 13.5H18V11.25H20.25V13.5Z"
        fill={color}
      />
    </Svg>
  );
}

function DollarFilledIcon({ color }: { color: string }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2.25C6.615 2.25 2.25 6.615 2.25 12C2.25 17.385 6.615 21.75 12 21.75C17.385 21.75 21.75 17.385 21.75 12C21.75 6.615 17.385 2.25 12 2.25ZM13.5 17.25H12.75V18C12.75 18.414 12.414 18.75 12 18.75C11.586 18.75 11.25 18.414 11.25 18V17.25H10.5C9.254 17.25 8.25 16.246 8.25 15V14.25C8.25 13.836 8.586 13.5 9 13.5C9.414 13.5 9.75 13.836 9.75 14.25V15C9.75 15.414 10.086 15.75 10.5 15.75H11.25V12.75H10.5C9.254 12.75 8.25 11.746 8.25 10.5V9C8.25 7.754 9.254 6.75 10.5 6.75H11.25V6C11.25 5.586 11.586 5.25 12 5.25C12.414 5.25 12.75 5.586 12.75 6V6.75H13.5C14.746 6.75 15.75 7.754 15.75 9C15.75 9.414 15.414 9.75 15 9.75C14.586 9.75 14.25 9.414 14.25 9C14.25 8.586 13.914 8.25 13.5 8.25H12.75V11.25H13.5C14.746 11.25 15.75 12.254 15.75 13.5V15C15.75 16.246 14.746 17.25 13.5 17.25Z"
        fill={color}
      />
    </Svg>
  );
}

function WrenchFilledIcon({ color }: { color: string }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M21.8438 16.3134L13.4072 7.87969C13.9931 6.48609 13.9275 4.91672 13.2266 3.57469C12.5256 2.23266 11.2625 1.25625 9.77438 0.909375C8.28625 0.5625 6.72344 0.882188 5.47969 1.78406C5.30313 1.9125 5.19281 2.10656 5.17031 2.31844C5.14781 2.53031 5.215 2.7425 5.36063 2.90344L7.71063 5.25281C7.88344 5.42672 7.98 5.66031 7.98 5.90406C7.98 6.14781 7.88344 6.38109 7.71063 6.55469L6.55594 7.71C6.3825 7.88281 6.14891 7.97938 5.90516 7.97938C5.66141 7.97938 5.42813 7.88281 5.25469 7.71L2.90469 5.36C2.74375 5.21438 2.53188 5.14719 2.32 5.16969C2.10813 5.19219 1.91406 5.3025 1.78563 5.47906C0.883751 6.72281 0.564063 8.28563 0.910938 9.77375C1.25781 11.2619 2.23422 12.525 3.57625 13.226C4.91828 13.9269 6.48766 13.9925 7.88125 13.4066L16.3172 21.8434C16.8689 22.3943 17.6143 22.7031 18.3919 22.7027C19.1695 22.7022 19.9146 22.3927 20.4656 21.8413C21.0166 21.2898 21.3256 20.5447 21.3254 19.7671C21.3251 18.9895 21.0156 18.2446 20.4641 17.6934L21.8438 16.3134Z"
        fill={color}
      />
    </Svg>
  );
}

function UserFilledIcon({ color }: { color: string }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 12C14.4853 12 16.5 9.98528 16.5 7.5C16.5 5.01472 14.4853 3 12 3C9.51472 3 7.5 5.01472 7.5 7.5C7.5 9.98528 9.51472 12 12 12Z"
        fill={color}
      />
      <Path
        d="M12.75 13.5H11.25C8.3505 13.5 6 15.8505 6 18.75V20.25C6 20.664 6.336 21 6.75 21H17.25C17.664 21 18 20.664 18 20.25V18.75C18 15.8505 15.6495 13.5 12.75 13.5Z"
        fill={color}
      />
    </Svg>
  );
}

// ── Outline Icons (inactive state) ────────────────────────────────────────────

function HomeOutlineIcon({ color }: { color: string }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M21.4072 10.7803L12.5322 1.90531C12.3916 1.76484 12.1999 1.68567 12.0003 1.68567C11.8007 1.68567 11.609 1.76484 11.4684 1.90531L2.59338 10.7803C2.43016 10.9412 2.34165 11.1614 2.34165 11.4034C2.34165 11.6454 2.43016 11.8656 2.61958 12.017C2.78985 12.1771 3.01665 12.263 3.25026 12.255L4.50026 12.2203V20.25C4.50026 20.6478 4.6583 21.0294 4.9396 21.3107C5.2209 21.592 5.60243 21.75 6.00026 21.75H9.00026C9.19917 21.75 9.38994 21.671 9.53059 21.5303C9.67124 21.3897 9.75026 21.1989 9.75026 21V16.5H14.2503V21C14.2503 21.1989 14.3293 21.3897 14.4699 21.5303C14.6106 21.671 14.8014 21.75 15.0003 21.75H18.0003C18.3981 21.75 18.7796 21.592 19.0609 21.3107C19.3422 21.0294 19.5003 20.6478 19.5003 20.25V12.2203L20.7503 12.255C20.9839 12.263 21.2107 12.1771 21.381 12.017C21.5512 11.8568 21.6589 11.6363 21.6589 11.4034C21.6589 11.1614 21.5704 10.9412 21.4072 10.7803Z"
        fill="none"
        stroke={color}
        strokeWidth={1.5}
      />
      <Path
        d="M9.75 21V16.5H14.25V21"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
}

function BuildingsOutlineIcon({ color }: { color: string }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 21V4.5C3 3.672 3.672 3 4.5 3H15C15.828 3 16.5 3.672 16.5 4.5V7.5H19.5C20.328 7.5 21 8.172 21 9V21"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M1.5 21H22.5" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M6 7.5H9" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M6 11.25H9" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M6 15H9" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M12 15H10.5" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M12 11.25H10.5" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M17.25 12H19.5" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M17.25 15.75H19.5" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path
        d="M10.5 21V16.5H13.5V21"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function DollarOutlineIcon({ color }: { color: string }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={9.75} stroke={color} strokeWidth={1.5} />
      <Path
        d="M12 6V7.5M12 16.5V18M9 9.75C9 8.507 10.007 7.5 11.25 7.5H12.75C13.993 7.5 15 8.507 15 9.75C15 10.993 13.993 12 12.75 12H11.25C10.007 12 9 13.007 9 14.25C9 15.493 10.007 16.5 11.25 16.5H12.75C13.993 16.5 15 15.493 15 14.25"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
}

function WrenchOutlineIcon({ color }: { color: string }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.77 3.77z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

function UserOutlineIcon({ color }: { color: string }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20 21V19C20 16.791 18.209 15 16 15H8C5.791 15 4 16.791 4 19V21"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx={12} cy={7} r={4} stroke={color} strokeWidth={1.5} />
    </Svg>
  );
}

// ── Nav Config ─────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { name: "index",       label: "Home",        FilledIcon: HomeFilledIcon,     OutlineIcon: HomeOutlineIcon },
  { name: "properties",  label: "Properties",  FilledIcon: BuildingsFilledIcon, OutlineIcon: BuildingsOutlineIcon },
  { name: "finance",     label: "Finance",     FilledIcon: DollarFilledIcon,   OutlineIcon: DollarOutlineIcon },
  { name: "maintenance", label: "Maintenance", FilledIcon: WrenchFilledIcon,   OutlineIcon: WrenchOutlineIcon },
  { name: "profile",     label: "Profile",     FilledIcon: UserFilledIcon,     OutlineIcon: UserOutlineIcon },
];

// ── Custom Tab Bar ─────────────────────────────────────────────────────────────

function CustomTabBar({ state, navigation }: any) {
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === "web";

  return (
    <View
      style={[
        styles.tabBarWrapper,
        { bottom: isWeb ? 12 : insets.bottom > 0 ? insets.bottom + 4 : 12 },
      ]}
    >
      <View style={styles.tabBar}>
        {state.routes.map((route: any, index: number) => {
          const isFocused = state.index === index;
          const item = NAV_ITEMS[index];
          const color = Colors.secondary;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <Pressable key={route.key} onPress={onPress} style={styles.tabItem}>
              {isFocused ? (
                <View style={styles.activeTabItem}>
                  <item.FilledIcon color={color} />
                  <Text style={styles.activeLabel}>{item.label}</Text>
                </View>
              ) : (
                <item.OutlineIcon color={color} />
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarWrapper: {
    position: "absolute",
    left: 16,
    right: 16,
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: Colors.primary,
    borderRadius: 32,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
    minHeight: 44,
  },
  activeTabItem: {
    alignItems: "center",
    gap: 2,
  },
  activeLabel: {
    fontFamily: "Inter_500Medium",
    fontSize: 10,
    color: Colors.secondary,
    lineHeight: 14,
  },
});

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="properties" />
      <Tabs.Screen name="finance" />
      <Tabs.Screen name="maintenance" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
