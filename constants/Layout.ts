import { Dimensions, Platform, StatusBar } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const Layout = {
  screen: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  isSmallDevice: SCREEN_WIDTH < 375,
  isAndroid: Platform.OS === 'android',
  isIOS: Platform.OS === 'ios',
  statusBarHeight: Platform.select({
    ios: 44,
    android: StatusBar.currentHeight ?? 24,
  }),
  navbarHeight: 44,
};

export const TAB_BAR_HEIGHT = 83;
