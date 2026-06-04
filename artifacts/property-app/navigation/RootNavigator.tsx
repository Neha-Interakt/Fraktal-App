import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { ActivityIndicator, View } from "react-native";
import AddPropertyScreen from "@/app/add-property";
import ChatScreen from "@/app/chat";
import ChatsListScreen from "@/app/chats-list";
import EditPropertyScreen from "@/app/edit-property";
import LoginScreen from "@/app/login";
import OnboardingScreen from "@/app/onboarding";
import PropertyDetailScreen from "@/app/property-detail";
import RoleSelectScreen from "@/app/role-select";
import { useAuth } from "@/context/auth";
import TabNavigator from "./TabNavigator";
import type { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { loading, hasOnboarded, isLoggedIn, role } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: "#00122c", alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator color="#c9a227" size="large" />
      </View>
    );
  }

  const initialRoute: keyof RootStackParamList = !hasOnboarded
    ? "Onboarding"
    : !isLoggedIn
    ? "Login"
    : !role
    ? "RoleSelect"
    : "App";

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{ headerShown: false, animation: "none" }}
    >
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="RoleSelect" component={RoleSelectScreen} />
      <Stack.Screen name="App" component={TabNavigator} />
      <Stack.Screen name="PropertyDetail" component={PropertyDetailScreen} />
      <Stack.Screen name="AddProperty" component={AddPropertyScreen} />
      <Stack.Screen name="EditProperty" component={EditPropertyScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="ChatsList" component={ChatsListScreen} />
    </Stack.Navigator>
  );
}
