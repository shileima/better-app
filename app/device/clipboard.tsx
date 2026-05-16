import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { Spacing, Typography, BorderRadius } from '../../constants';
import { Button, Card } from '../../components';

export default function ClipboardScreen() {
  const { colors } = useTheme();
  const [inputText, setInputText] = useState('');
  const [clipboardContent, setClipboardContent] = useState('');
  const [copyMessage, setCopyMessage] = useState('');

  const copyToClipboard = async () => {
    if (inputText.trim()) {
      await Clipboard.setStringAsync(inputText);
      setCopyMessage('已复制到剪贴板!');
      setTimeout(() => setCopyMessage(''), 2000);
    }
  };

  const pasteFromClipboard = async () => {
    const content = await Clipboard.getStringAsync();
    setClipboardContent(content);
  };

  const copyQuickText = async (text: string) => {
    await Clipboard.setStringAsync(text);
    setCopyMessage(`已复制: ${text}`);
    setTimeout(() => setCopyMessage(''), 2000);
  };

  const quickTexts = [
    'Hello World!',
    'expo-demo@example.com',
    'https://expo.dev',
    '+86 138-0000-0000',
    '北京市朝阳区',
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* 复制提示 */}
      {copyMessage ? (
        <View style={[styles.toast, { backgroundColor: colors.success }]}>
          <Ionicons name="checkmark-circle" size={16} color="#FFFFFF" />
          <Text style={[Typography.bodySmall, { color: '#FFFFFF', marginLeft: Spacing.sm }]}>
            {copyMessage}
          </Text>
        </View>
      ) : null}

      {/* 复制到剪贴板 */}
      <Card style={{ marginHorizontal: Spacing.lg, marginTop: Spacing.lg }}>
        <Text style={[Typography.h4, { color: colors.text }]}>复制到剪贴板</Text>
        <TextInput
          style={[
            styles.textInput,
            {
              backgroundColor: colors.background,
              color: colors.text,
              borderColor: colors.border,
            },
          ]}
          value={inputText}
          onChangeText={setInputText}
          placeholder="输入要复制的文本..."
          placeholderTextColor={colors.textTertiary}
          multiline
          numberOfLines={3}
        />
        <Button title="复制" onPress={copyToClipboard} style={{ marginTop: Spacing.md }} />
      </Card>

      {/* 从剪贴板粘贴 */}
      <Card style={{ marginHorizontal: Spacing.lg, marginTop: Spacing.lg }}>
        <Text style={[Typography.h4, { color: colors.text }]}>从剪贴板粘贴</Text>
        <Button
          title="读取剪贴板"
          variant="secondary"
          onPress={pasteFromClipboard}
          style={{ marginTop: Spacing.md }}
        />
        {clipboardContent ? (
          <View
            style={[
              styles.pasteResult,
              { backgroundColor: colors.background, borderColor: colors.border },
            ]}
          >
            <Text style={[Typography.body, { color: colors.text }]}>{clipboardContent}</Text>
          </View>
        ) : null}
      </Card>

      {/* 快捷复制 */}
      <View style={{ paddingHorizontal: Spacing.lg, marginTop: Spacing.lg }}>
        <Text style={[Typography.h4, { color: colors.text }]}>快捷复制</Text>
        <View style={styles.quickGrid}>
          {quickTexts.map((text, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.quickItem, { backgroundColor: colors.surface, borderColor: colors.border }]}
              onPress={() => copyQuickText(text)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={['mail', 'globe', 'call', 'location'][index] as keyof typeof Ionicons.glyphMap || 'document-text'}
                size={16}
                color={colors.primary}
              />
              <Text style={[Typography.caption, { color: colors.text, marginLeft: Spacing.sm }]} numberOfLines={1}>
                {text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={{ height: Spacing.xxl }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginTop: Spacing.md,
    textAlignVertical: 'top',
    minHeight: 80,
  },
  pasteResult: {
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginTop: Spacing.md,
  },
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginTop: Spacing.md,
  },
  quickItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
  },
});
