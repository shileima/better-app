import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

// AsyncStorage 工具
const STORAGE_PREFIX = '@expodemo:';

export const Storage = {
  async set(key: string, value: unknown): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(STORAGE_PREFIX + key, jsonValue);
    } catch (e) {
      console.error('Storage set error:', e);
    }
  },

  async get<T>(key: string): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_PREFIX + key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error('Storage get error:', e);
      return null;
    }
  },

  async remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_PREFIX + key);
    } catch (e) {
      console.error('Storage remove error:', e);
    }
  },

  async getAllKeys(): Promise<string[]> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      return keys
        .filter((k: string) => k.startsWith(STORAGE_PREFIX))
        .map((k: string) => k.replace(STORAGE_PREFIX, ''));
    } catch (e) {
      console.error('Storage getAllKeys error:', e);
      return [];
    }
  },

  async clear(): Promise<void> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const appKeys = keys.filter((k: string) => k.startsWith(STORAGE_PREFIX));
      await AsyncStorage.multiRemove(appKeys);
    } catch (e) {
      console.error('Storage clear error:', e);
    }
  },
};

// SecureStore 工具（适合存储敏感信息如 token）
export const SecureStorage = {
  async set(key: string, value: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (e) {
      console.error('SecureStorage set error:', e);
    }
  },

  async get(key: string): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (e) {
      console.error('SecureStorage get error:', e);
      return null;
    }
  },

  async remove(key: string): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (e) {
      console.error('SecureStorage remove error:', e);
    }
  },
};
