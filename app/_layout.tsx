import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider, useTheme } from '../context/ThemeContext';

function RootLayoutNav() {
  const { colors, isDark } = useTheme();

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.surface,
          },
          headerTintColor: colors.text,
          headerShadowVisible: false,
          headerBackTitle: '返回',
          contentStyle: {
            backgroundColor: colors.background,
          },
          headerTitleStyle: {
            fontWeight: '600',
          },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="device/camera"
          options={{ title: '相机', presentation: 'modal' }}
        />
        <Stack.Screen
          name="device/location"
          options={{ title: '位置信息' }}
        />
        <Stack.Screen
          name="device/sensors"
          options={{ title: '传感器' }}
        />
        <Stack.Screen
          name="device/clipboard"
          options={{ title: '剪贴板' }}
        />
        <Stack.Screen
          name="device/battery"
          options={{ title: '电池信息' }}
        />
        <Stack.Screen
          name="device/network"
          options={{ title: '网络状态' }}
        />
        <Stack.Screen
          name="device/device-info"
          options={{ title: '设备信息' }}
        />
        <Stack.Screen
          name="webview/index"
          options={{ title: 'H5 页面' }}
        />
        <Stack.Screen
          name="profile/settings"
          options={{ title: '设置' }}
        />
        <Stack.Screen
          name="profile/about"
          options={{ title: '关于' }}
        />
        <Stack.Screen
          name="profile/storage"
          options={{ title: '本地存储' }}
        />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootLayoutNav />
    </ThemeProvider>
  );
}
