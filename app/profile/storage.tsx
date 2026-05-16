import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Text, ScrollView, TextInput, Alert, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { Spacing, Typography, BorderRadius } from '../../constants';
import { Card, Button, ListItem } from '../../components';
import { Storage, SecureStorage } from '../../utils/storage';

interface StorageItem {
  key: string;
  value: string;
}

export default function StorageScreen() {
  const { colors } = useTheme();
  const [items, setItems] = useState<StorageItem[]>([]);
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [secureKey, setSecureKey] = useState('');
  const [secureValue, setSecureValue] = useState('');
  const [savedSecureValue, setSavedSecureValue] = useState<string | null>(null);

  const loadItems = useCallback(async () => {
    const keys = await Storage.getAllKeys();
    const loadedItems: StorageItem[] = [];
    for (const key of keys) {
      const value = await Storage.get(key);
      loadedItems.push({ key, value: JSON.stringify(value) });
    }
    setItems(loadedItems);
  }, []);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const addItem = async () => {
    if (!newKey.trim() || !newValue.trim()) {
      Alert.alert('提示', '请输入键和值');
      return;
    }
    await Storage.set(newKey, newValue);
    setNewKey('');
    setNewValue('');
    loadItems();
  };

  const removeItem = async (key: string) => {
    Alert.alert('删除', `确定要删除 "${key}" 吗？`, [
      { text: '取消', style: 'cancel' },
      {
        text: '删除',
        style: 'destructive',
        onPress: async () => {
          await Storage.remove(key);
          loadItems();
        },
      },
    ]);
  };

  const saveSecureValue = async () => {
    if (!secureKey.trim() || !secureValue.trim()) {
      Alert.alert('提示', '请输入键和值');
      return;
    }
    await SecureStorage.set(secureKey, secureValue);
    Alert.alert('成功', '已安全存储（SecureStore）');
    setSecureKey('');
    setSecureValue('');
  };

  const readSecureValue = async () => {
    if (!secureKey.trim()) {
      Alert.alert('提示', '请输入要读取的键');
      return;
    }
    const value = await SecureStorage.get(secureKey);
    setSavedSecureValue(value);
    if (!value) {
      Alert.alert('提示', '未找到该键对应的值');
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* AsyncStorage 操作 */}
      <Card style={{ marginHorizontal: Spacing.lg, marginTop: Spacing.lg }}>
        <View style={styles.sectionHeader}>
          <Ionicons name="server" size={20} color={colors.primary} />
          <Text style={[Typography.h4, { color: colors.text, marginLeft: Spacing.sm }]}>
            AsyncStorage
          </Text>
        </View>
        <Text style={[Typography.caption, { color: colors.textSecondary }]}>
          适合存储非敏感的键值对数据
        </Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
          value={newKey}
          onChangeText={setNewKey}
          placeholder="键 (Key)"
          placeholderTextColor={colors.textTertiary}
        />
        <TextInput
          style={[styles.input, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
          value={newValue}
          onChangeText={setNewValue}
          placeholder="值 (Value)"
          placeholderTextColor={colors.textTertiary}
        />
        <Button title="保存" onPress={addItem} style={{ marginTop: Spacing.sm }} />
      </Card>

      {/* 存储列表 */}
      <View style={{ paddingHorizontal: Spacing.lg, marginTop: Spacing.lg }}>
        <Text style={[Typography.h4, { color: colors.text, marginBottom: Spacing.md }]}>
          已存储的数据 ({items.length})
        </Text>
        {items.length > 0 ? (
          <Card padding="xs">
            {items.map((item, index) => (
              <View key={item.key}>
                <View style={styles.storageItem}>
                  <View style={styles.storageItemContent}>
                    <Text style={[Typography.bodySmall, { color: colors.primary, fontWeight: '600' }]}>
                      {item.key}
                    </Text>
                    <Text style={[Typography.caption, { color: colors.textSecondary }]} numberOfLines={1}>
                      {item.value}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => removeItem(item.key)} style={styles.deleteButton}>
                    <Ionicons name="trash-outline" size={18} color={colors.danger} />
                  </TouchableOpacity>
                </View>
                {index < items.length - 1 && (
                  <View style={[styles.separator, { backgroundColor: colors.borderLight }]} />
                )}
              </View>
            ))}
          </Card>
        ) : (
          <Card>
            <View style={styles.emptyContainer}>
              <Ionicons name="folder-open-outline" size={32} color={colors.textTertiary} />
              <Text style={[Typography.bodySmall, { color: colors.textTertiary, marginTop: Spacing.sm }]}>
                暂无数据
              </Text>
            </View>
          </Card>
        )}
      </View>

      {/* SecureStore 操作 */}
      <Card style={{ marginHorizontal: Spacing.lg, marginTop: Spacing.lg }}>
        <View style={styles.sectionHeader}>
          <Ionicons name="lock-closed" size={20} color={colors.success} />
          <Text style={[Typography.h4, { color: colors.text, marginLeft: Spacing.sm }]}>
            SecureStore
          </Text>
        </View>
        <Text style={[Typography.caption, { color: colors.textSecondary }]}>
          适合存储敏感数据（如 Token、密码），数据加密存储
        </Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
          value={secureKey}
          onChangeText={setSecureKey}
          placeholder="键 (Key)"
          placeholderTextColor={colors.textTertiary}
        />
        <TextInput
          style={[styles.input, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
          value={secureValue}
          onChangeText={setSecureValue}
          placeholder="值 (Value) - 将加密存储"
          placeholderTextColor={colors.textTertiary}
          secureTextEntry
        />
        <View style={styles.buttonRow}>
          <Button title="保存" onPress={saveSecureValue} style={styles.button} />
          <Button title="读取" variant="secondary" onPress={readSecureValue} style={styles.button} />
        </View>
        {savedSecureValue && (
          <View style={[styles.secureResult, { backgroundColor: colors.success + '10', borderColor: colors.success + '30' }]}>
            <Text style={[Typography.bodySmall, { color: colors.success }]}>
              读取结果: {savedSecureValue}
            </Text>
          </View>
        )}
      </Card>

      <View style={{ height: Spacing.xxl }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  input: {
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginTop: Spacing.md,
    fontSize: 14,
  },
  storageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  storageItemContent: {
    flex: 1,
  },
  deleteButton: {
    padding: Spacing.sm,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    marginLeft: Spacing.md,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: Spacing.lg,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.md,
  },
  button: {
    flex: 1,
  },
  secureResult: {
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginTop: Spacing.md,
  },
});
