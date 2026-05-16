import React, { useState, useRef, useCallback } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import { WebView, WebViewNavigation } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { Spacing, Typography, BorderRadius } from '../../constants';

export default function WebViewDetailScreen() {
  const { colors } = useTheme();
  const webviewRef = useRef<WebView>(null);
  const [url, setUrl] = useState('https://expo.dev');
  const [inputUrl, setInputUrl] = useState('https://expo.dev');
  const [loading, setLoading] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const [title, setTitle] = useState('');

  const handleNavigationStateChange = useCallback((navState: WebViewNavigation) => {
    setCanGoBack(navState.canGoBack);
    setCanGoForward(navState.canGoForward);
    setUrl(navState.url);
    setInputUrl(navState.url);
    setTitle(navState.title || '');
  }, []);

  const handleGo = () => {
    Keyboard.dismiss();
    let finalUrl = inputUrl.trim();
    if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
      finalUrl = 'https://' + finalUrl;
    }
    setUrl(finalUrl);
    setInputUrl(finalUrl);
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
          <Text style={[Typography.bodySmall, { color: colors.primary, fontWeight: '600' }]}>Go</Text>
        </TouchableOpacity>
      </View>

      {/* WebView */}
      <View style={styles.webviewContainer}>
        <WebView
          ref={webviewRef}
          source={{ uri: url }}
          onNavigationStateChange={handleNavigationStateChange}
          onLoadStart={() => setLoading(true)}
          onLoad={() => setLoading(false)}
          startInLoadingState={true}
          allowsBackForwardNavigationGestures={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          style={styles.webview}
        />
        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={[Typography.bodySmall, { color: colors.textSecondary, marginTop: Spacing.md }]}>
              加载中...
            </Text>
          </View>
        )}
      </View>

      {/* 底部导航 */}
      <View style={[styles.bottomBar, { backgroundColor: colors.surface, borderTopColor: colors.borderLight }]}>
        <TouchableOpacity
          onPress={() => webviewRef.current?.goBack()}
          disabled={!canGoBack}
          style={styles.navButton}
        >
          <Ionicons name="chevron-back" size={24} color={canGoBack ? colors.text : colors.textTertiary} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => webviewRef.current?.goForward()}
          disabled={!canGoForward}
          style={styles.navButton}
        >
          <Ionicons name="chevron-forward" size={24} color={canGoForward ? colors.text : colors.textTertiary} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => webviewRef.current?.reload()}
          style={styles.navButton}
        >
          <Ionicons name="refresh" size={22} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setUrl('https://expo.dev');
            setInputUrl('https://expo.dev');
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
