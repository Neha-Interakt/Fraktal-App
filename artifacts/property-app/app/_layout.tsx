import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AuthProvider, useAuth } from "@/context/auth";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function RootLayoutNav() {
  const { loading, hasOnboarded, isLoggedIn, role } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (!hasOnboarded) {
      router.replace("/onboarding" as any);
    } else if (!isLoggedIn) {
      router.replace("/login" as any);
    } else if (!role) {
      router.replace("/role-select" as any);
    } else {
      router.replace("/(tabs)/" as any);
    }
  }, [loading, hasOnboarded, isLoggedIn, role]);

  return (
    <Stack screenOptions={{ headerBackTitle: "Back" }}>
      <Stack.Screen name="onboarding"    options={{ headerShown: false, animation: "fade" }} />
      <Stack.Screen name="login"         options={{ headerShown: false, animation: "slide_from_right" }} />
      <Stack.Screen name="role-select"   options={{ headerShown: false, animation: "slide_from_right" }} />
      <Stack.Screen name="(tabs)"        options={{ headerShown: false }} />
      <Stack.Screen name="property-detail" options={{ headerShown: false, animation: "slide_from_right" }} />
      <Stack.Screen name="add-property"    options={{ headerShown: false, animation: "slide_from_bottom" }} />
      <Stack.Screen name="edit-property"  options={{ headerShown: false, animation: "slide_from_right" }} />
      <Stack.Screen name="chat"           options={{ headerShown: false, animation: "slide_from_right" }} />
    </Stack>
  );
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null;

  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <KeyboardProvider>
                <RootLayoutNav />
              </KeyboardProvider>
            </GestureHandlerRootView>
          </QueryClientProvider>
        </AuthProvider>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}
