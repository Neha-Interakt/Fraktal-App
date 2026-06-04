---
name: Fraktal Expo + React Navigation setup
description: Exact config to make the Fraktal property-app render in Replit Expo web preview using React Navigation v7 (not expo-router).
---

## Working formula

**app.json** — no `plugins` array (remove expo-router/expo-font/expo-web-browser plugins), must have:
```json
"web": { "bundler": "metro", "output": "single" }
```

**package.json** — `"main": "./index.js"` (NOT `expo-router/entry`). Add to devDependencies:
- `@react-navigation/native`, `@react-navigation/native-stack`, `@react-navigation/bottom-tabs`
- `babel-plugin-module-resolver` (for `@/` path aliases)

**babel.config.js** — add module-resolver plugin after babel-preset-expo:
```js
plugins: [["module-resolver", { root: ["."], alias: { "@": "." }, extensions: [...] }]]
```
This replaces expo-router's built-in `@/` alias handling.

**metro.config.js** — keep as `getDefaultConfig(__dirname)` from `expo/metro-config`. Do NOT use `@react-native/metro-config` — that breaks web bundling.

**index.js** (entry point):
```js
import { registerRootComponent } from "expo";
import App from "./App";
registerRootComponent(App);
```

**App.tsx** — structure:
```
GestureHandlerRootView > SafeAreaProvider > AuthProvider > NavigationContainer(ref=navigationRef) > RootNavigator
```

**Auth context navigation** — use `createNavigationContainerRef` from `@react-navigation/native` exported from `navigation/navigationRef.ts`. AuthProvider imports this ref and calls `navigationRef.reset(...)` for programmatic navigation (NOT `useNavigation` hook — context is outside component tree).

**RootNavigator** — uses `useAuth()` to determine `initialRouteName` at mount. Shows ActivityIndicator while `loading` is true. Uses `createNativeStackNavigator` with `screenOptions={{ headerShown: false, animation: "none" }}`.

**TabNavigator** — uses `createBottomTabNavigator` with a custom `tabBar` prop (LinearGradient floating pill).

**Why:** expo-router v6 crashes without its plugin in app.json. The project reverted to expo-router checkpoint after working version was lost — so this exact setup must be preserved.

**How to apply:** Any new session on this project must use this setup if the workflow fails or the app reverts. The artifact has `router = "expo-domain"` in artifact.toml which injects the correct `EXPO_PACKAGER_PROXY_URL` env var for the Replit preview.
