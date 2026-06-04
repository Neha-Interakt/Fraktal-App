export type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  RoleSelect: undefined;
  App: undefined;
  PropertyDetail: { id: string };
  AddProperty: undefined;
  EditProperty: { id: string };
  Chat: { id?: string; tenant?: string };
  ChatsList: undefined;
};

export type AppTabParamList = {
  Home: undefined;
  Properties: undefined;
  Finance: undefined;
  Maintenance: undefined;
  Profile: undefined;
};
