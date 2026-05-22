import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import CustomTabBar from '@components/navigation/CustomTabBar';
import FinanceScreen from '@screens/Finance/FinanceScreen';
import HomeScreen from '@screens/Home/HomeScreen';
import MaintenanceScreen from '@screens/Maintenance/MaintenanceScreen';
import ProfileScreen from '@screens/Profile/ProfileScreen';
import PropertiesScreen from '@screens/Properties/PropertiesScreen';
import type { AppTabParamList } from './types';

const Tab = createBottomTabNavigator<AppTabParamList>();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Properties" component={PropertiesScreen} />
      <Tab.Screen name="Finance" component={FinanceScreen} />
      <Tab.Screen name="Maintenance" component={MaintenanceScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
