import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { useAuth } from '@context/AuthContext';
import LoginScreen from '@screens/Auth/LoginScreen';
import RoleSelectScreen from '@screens/Auth/RoleSelectScreen';
import AddPropertyScreen from '@screens/AddProperty/AddPropertyScreen';
import ChatScreen from '@screens/Chat/ChatScreen';
import ChatsListScreen from '@screens/ChatsList/ChatsListScreen';
import EditPropertyScreen from '@screens/EditProperty/EditPropertyScreen';
import OnboardingScreen from '@screens/Onboarding/OnboardingScreen';
import PropertyDetailScreen from '@screens/PropertyDetail/PropertyDetailScreen';
import AppNavigator from './AppNavigator';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { loading, hasOnboarded, isLoggedIn, role } = useAuth();

  if (loading) return null;

  const getInitialRoute = (): keyof RootStackParamList => {
    if (!hasOnboarded) return 'Onboarding';
    if (!isLoggedIn) return 'Login';
    if (!role) return 'RoleSelect';
    return 'App';
  };

  return (
    <Stack.Navigator
      initialRouteName={getInitialRoute()}
      screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
    >
      <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ animation: 'fade' }} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="RoleSelect" component={RoleSelectScreen} />
      <Stack.Screen name="App" component={AppNavigator} />
      <Stack.Screen name="PropertyDetail" component={PropertyDetailScreen} />
      <Stack.Screen name="AddProperty" component={AddPropertyScreen} options={{ animation: 'slide_from_bottom' }} />
      <Stack.Screen name="EditProperty" component={EditPropertyScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="ChatsList" component={ChatsListScreen} />
    </Stack.Navigator>
  );
}
