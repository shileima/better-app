import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TextInput,
  Keyboard,
  ScrollView,
} from 'react-native';
import { WebView, WebViewNavigation } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { Spacing, Typography, BorderRadius } from '../../constants';

const BOOKMARKS = [
  { name: '百度', url: 'https://m.baidu.com' },
  { name: '知乎', url: 'https://www.zhihu.com' },
  { name: '掘金', url: 'https://juejin.cn' },
  { name: 'GitHub', url: 'https://github.com' },
  { name: 'Expo', url: 'https://expo.dev' },
];

export default function WebViewScreen() {
  const { colors } = useTheme();
  const webviewRef = useRef<WebView>(null);
  const [url, setUrl] = useState('https://m.baidu.com');
  const [inputUrl, setInputUrl] = useState('https://m.baidu.com');
  const [loading, setLoading] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);

  const handleNavigationStateChange = useCallback((navState: WebViewNavigation) => {
    setCanGoBack(navState.canGoBack);
    setCanGoForward(navState.canGoForward);
    setUrl(navState.url);
    setInputUrl(navState.url);
  }, []);

  const handleLoad = () => setLoading(false);
  const handleLoadStart = () => setLoading(true);

  const handleGo = () => {
    Keyboard.dismiss();
    let finalUrl = inputUrl.trim();
    if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
      finalUrl = 'https://' + finalUrl;
    }
    setUrl(finalUrl);
    setInputUrl(finalUrl);
  };

  const handleBookmarkPress = (bookmarkUrl: string) => {
    setUrl(bookmarkUrl);
    setInputUrl(bookmarkUrl);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* 地址栏 */}
      <View style={[styles.urlBar, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <View style={styles.urlInputContainer}>
          <Ionicons name="search" size={16} color={colors.textTertiary} />
          <TextInput
            style={[styles.urlInput, { color: colors.text }]}
            value={inputUrl}
            onChangeText={setInputUrl}
            onSubmitEditing={handleGo}
            returnKeyType="go"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="url"
            placeholder="输入网址..."
            placeholderTextColor={colors.textTertiary}
          />
        </View>
        <TouchableOpacity onPress={handleGo} style={styles.goButton}>
          <Text style={[Typography.bodySmall, { color: colors.primary, fontWeight: '600' }]}>
            Go
          </Text>
        </TouchableOpacity>
      </View>

      {/* 书签栏 */}
      <View style={[styles.bookmarksBar, { backgroundColor: colors.surface }]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.bookmarkScroll}>
          {BOOKMARKS.map((bookmark) => (
            <TouchableOpacity
              key={bookmark.name}
              style={[styles.bookmarkChip, { backgroundColor: colors.background }]}
              onPress={() => handleBookmarkPress(bookmark.url)}
            >
              <Text style={[Typography.caption, { color: colors.primary }]}>{bookmark.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* WebView */}
      <View style={styles.webviewContainer}>
        <WebView
          ref={webviewRef}
          source={{ uri: url }}
          onNavigationStateChange={handleNavigationStateChange}
          onLoadStart={handleLoadStart}
          onLoad={handleLoad}
          startInLoadingState={true}
          allowsBackForwardNavigationGestures={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          style={styles.webview}
        />
        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        )}
      </View>

      {/* 底部导航栏 */}
      <View style={[styles.bottomBar, { backgroundColor: colors.surface, borderTopColor: colors.borderLight }]}>
        <TouchableOpacity
          onPress={() => webviewRef.current?.goBack()}
          disabled={!canGoBack}
          style={styles.navButton}
        >
          <Ionicons
            name="chevron-back"
            size={24}
            color={canGoBack ? colors.text : colors.textTertiary}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => webviewRef.current?.goForward()}
          disabled={!canGoForward}
          style={styles.navButton}
        >
          <Ionicons
            name="chevron-forward"
            size={24}
            color={canGoForward ? colors.text : colors.textTertiary}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => webviewRef.current?.reload()}
          style={styles.navButton}
        >
          <Ionicons name="refresh" size={22} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setUrl('https://m.baidu.com');
            setInputUrl('https://m.baidu.com');
          }}
          style={styles.navButton}
        >
          <Ionicons name="home" size={22} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  urlBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  urlInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
  },
  urlInput: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 2,
  },
  goButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  bookmarksBar: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#F2F2F7',
  },
  bookmarkScroll: {
    flexDirection: 'row',
  },
  bookmarkChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    marginRight: Spacing.sm,
  },
  webviewContainer: {
    flex: 1,
    position: 'relative',
  },
  webview: {
    flex: 1,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: Spacing.sm,
    paddingBottom: Spacing.lg,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  navButton: {
    padding: Spacing.sm,
  },
});
