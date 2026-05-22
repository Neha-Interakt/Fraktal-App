import { NavigatorScreenParams } from '@react-navigation/native';

export type AppTabParamList = {
  Home: undefined;
  Properties: undefined;
  Finance: undefined;
  Maintenance: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  RoleSelect: undefined;
  App: NavigatorScreenParams<AppTabParamList>;
  PropertyDetail: { id: string };
  AddProperty: undefined;
  EditProperty: { id: string };
  Chat: { tenantId: string; tenantName: string };
  ChatsList: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
