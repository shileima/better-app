import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import * as Device from 'expo-device';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { Spacing, Typography, BorderRadius } from '../../constants';
import { Card } from '../../components';

interface DeviceInfoData {
  brand: string | null;
  manufacturer: string | null;
  modelName: string | null;
  modelId: string | null;
  deviceName: string | null;
  osName: string | null;
  osVersion: string | null;
  osBuildId: string | null;
  platformApiLevel: number | null;
  totalMemory: number | null;
  supportedCpuArchitectures: string[] | null;
  isDevice: boolean | null;
  deviceType: Device.DeviceType | null;
}

export default function DeviceInfoScreen() {
  const { colors } = useTheme();
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfoData>({
    brand: null,
    manufacturer: null,
    modelName: null,
    modelId: null,
    deviceName: null,
    osName: null,
    osVersion: null,
    osBuildId: null,
    platformApiLevel: null,
    totalMemory: null,
    supportedCpuArchitectures: null,
    isDevice: null,
    deviceType: null,
  });

  useEffect(() => {
    loadDeviceInfo();
  }, []);

  const loadDeviceInfo = async () => {
    const brand = Device.brand;
    const manufacturer = Device.manufacturer;
    const modelName = Device.modelName;
    const modelId = Device.modelId;
    const deviceName = Device.deviceName;
    const osName = Device.osName;
    const osVersion = Device.osVersion;
    const osBuildId = Device.osBuildId;
    const platformApiLevel = Device.platformApiLevel;
    const totalMemory = Device.totalMemory;
    const supportedCpuArchitectures = Device.supportedCpuArchitectures;
    const isDevice = Device.isDevice;
    const deviceType = await Device.getDeviceTypeAsync();

    setDeviceInfo({
      brand,
      manufacturer,
      modelName,
      modelId,
      deviceName,
      osName,
      osVersion,
      osBuildId,
      platformApiLevel,
      totalMemory,
      supportedCpuArchitectures,
      isDevice,
      deviceType,
    });
  };

  const formatMemory = (bytes: number | null): string => {
    if (!bytes) return '未知';
    const gb = bytes / (1024 * 1024 * 1024);
    return `${gb.toFixed(1)} GB`;
  };

  const getDeviceTypeText = (type: Device.DeviceType | null): string => {
    switch (type) {
      case Device.DeviceType.PHONE:
        return '手机';
      case Device.DeviceType.TABLET:
        return '平板';
      case Device.DeviceType.DESKTOP:
        return '桌面';
      case Device.DeviceType.TV:
        return '电视';
      default:
        return '未知';
    }
  };

  const infoItems = [
    { icon: 'phone-portrait' as const, label: '设备名称', value: deviceInfo.deviceName },
    { icon: 'logo-apple' as const, label: '品牌', value: deviceInfo.brand },
    { icon: 'construct' as const, label: '制造商', value: deviceInfo.manufacturer },
    { icon: 'phone-portrait-outline' as const, label: '型号', value: deviceInfo.modelName },
    { icon: 'barcode' as const, label: '型号ID', value: deviceInfo.modelId },
    { icon: 'layers' as const, label: '设备类型', value: getDeviceTypeText(deviceInfo.deviceType) },
    { icon: 'logo-android' as const, label: '操作系统', value: `${deviceInfo.osName} ${deviceInfo.osVersion}` },
    { icon: 'code-working' as const, label: '系统版本', value: deviceInfo.osBuildId },
    { icon: 'hardware-chip' as const, label: 'API Level', value: deviceInfo.platformApiLevel?.toString() },
    { icon: 'disc' as const, label: '总内存', value: formatMemory(deviceInfo.totalMemory) },
    {
      icon: 'hardware-chip' as const,
      label: 'CPU 架构',
      value: deviceInfo.supportedCpuArchitectures?.join(', '),
    },
    {
      icon: 'checkmark-circle' as const,
      label: '真机',
      value: deviceInfo.isDevice ? '是' : '否（模拟器）',
    },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <Card style={{ marginHorizontal: Spacing.lg, marginTop: Spacing.lg, alignItems: 'center', paddingVertical: Spacing.xxl }}>
        <Ionicons
          name={deviceInfo.deviceType === Device.DeviceType.TABLET ? 'tablet-portrait' : 'phone-portrait'}
          size={64}
          color={colors.primary}
        />
        <Text style={[Typography.h2, { color: colors.text, marginTop: Spacing.lg }]}>
          {deviceInfo.modelName || '未知设备'}
        </Text>
        <Text style={[Typography.body, { color: colors.textSecondary }]}>
          {deviceInfo.brand} · {deviceInfo.osName} {deviceInfo.osVersion}
        </Text>
      </Card>

      <View style={{ paddingHorizontal: Spacing.lg, marginTop: Spacing.lg }}>
        <Text style={[Typography.h4, { color: colors.text, marginBottom: Spacing.md }]}>
          详细信息
        </Text>
        <Card padding="xs">
          {infoItems.map((item, index) => (
            <View key={item.label}>
              <View style={styles.infoRow}>
                <Ionicons name={item.icon} size={18} color={colors.primary} />
                <Text style={[Typography.bodySmall, { color: colors.textSecondary, marginLeft: Spacing.md, width: 80 }]}>
                  {item.label}
                </Text>
                <Text style={[Typography.bodySmall, { color: colors.text, flex: 1, textAlign: 'right' }]}>
                  {item.value || '未知'}
                </Text>
              </View>
              {index < infoItems.length - 1 && (
                <View style={[styles.separator, { backgroundColor: colors.borderLight }]} />
              )}
            </View>
          ))}
        </Card>
      </View>

      <View style={{ height: Spacing.xxl }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    marginLeft: 52,
  },
});
