import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Accelerometer, Gyroscope, Magnetometer } from 'expo-sensors';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { Spacing, Typography, BorderRadius } from '../../constants';
import { Button, Card } from '../../components';

interface SensorData {
  x: number;
  y: number;
  z: number;
}

export default function SensorsScreen() {
  const { colors } = useTheme();
  const [accelData, setAccelData] = useState<SensorData>({ x: 0, y: 0, z: 0 });
  const [gyroData, setGyroData] = useState<SensorData>({ x: 0, y: 0, z: 0 });
  const [magData, setMagData] = useState<SensorData>({ x: 0, y: 0, z: 0 });
  const [accelSub, setAccelSub] = useState<ReturnType<typeof Accelerometer.addListener> | null>(null);
  const [gyroSub, setGyroSub] = useState<ReturnType<typeof Gyroscope.addListener> | null>(null);
  const [magSub, setMagSub] = useState<ReturnType<typeof Magnetometer.addListener> | null>(null);

  const toggleAccelerometer = () => {
    if (accelSub) {
      accelSub.remove();
      setAccelSub(null);
    } else {
      const sub = Accelerometer.addListener((data) => setAccelData(data));
      setAccelSub(sub);
      Accelerometer.setUpdateInterval(100);
    }
  };

  const toggleGyroscope = () => {
    if (gyroSub) {
      gyroSub.remove();
      setGyroSub(null);
    } else {
      const sub = Gyroscope.addListener((data) => setGyroData(data));
      setGyroSub(sub);
      Gyroscope.setUpdateInterval(100);
    }
  };

  const toggleMagnetometer = () => {
    if (magSub) {
      magSub.remove();
      setMagSub(null);
    } else {
      const sub = Magnetometer.addListener((data) => setMagData(data));
      setMagSub(sub);
      Magnetometer.setUpdateInterval(100);
    }
  };

  const triggerHaptics = async (type: 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error') => {
    switch (type) {
      case 'light':
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        break;
      case 'medium':
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        break;
      case 'heavy':
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        break;
      case 'success':
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        break;
      case 'warning':
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        break;
      case 'error':
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        break;
    }
  };

  useEffect(() => {
    return () => {
      accelSub?.remove();
      gyroSub?.remove();
      magSub?.remove();
    };
  }, []);

  const renderSensorCard = (
    title: string,
    icon: keyof typeof Ionicons.glyphMap,
    data: SensorData,
    isActive: boolean,
    onToggle: () => void,
    color: string
  ) => (
    <Card style={{ marginHorizontal: Spacing.lg, marginBottom: Spacing.md }}>
      <View style={styles.sensorHeader}>
        <View style={styles.sensorTitleContainer}>
          <View style={[styles.sensorIcon, { backgroundColor: color + '15' }]}>
            <Ionicons name={icon} size={20} color={color} />
          </View>
          <Text style={[Typography.h4, { color: colors.text }]}>{title}</Text>
        </View>
        <Button
          title={isActive ? '停止' : '开始'}
          variant={isActive ? 'danger' : 'primary'}
          size="small"
          onPress={onToggle}
        />
      </View>
      <View style={styles.axisContainer}>
        {['x', 'y', 'z'].map((axis) => (
          <View key={axis} style={styles.axisItem}>
            <Text style={[Typography.caption, { color: colors.textSecondary }]}>{axis.toUpperCase()}</Text>
            <Text style={[Typography.body, { color: colors.text, fontWeight: '600' }]}>
              {data[axis as keyof SensorData].toFixed(3)}
            </Text>
            <View style={[styles.axisBar, { backgroundColor: colors.borderLight }]}>
              <View
                style={[
                  styles.axisFill,
                  {
                    backgroundColor: color,
                    width: `${Math.min(Math.abs(data[axis as keyof SensorData]) * 20, 100)}%`,
                  },
                ]}
              />
            </View>
          </View>
        ))}
      </View>
    </Card>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[Typography.bodySmall, { color: colors.textSecondary, paddingHorizontal: Spacing.lg, marginTop: Spacing.md }]}>
        实时传感器数据与触感反馈体验
      </Text>

      {renderSensorCard('加速度计', 'speedometer', accelData, !!accelSub, toggleAccelerometer, '#FF6B6B')}
      {renderSensorCard('陀螺仪', 'sync', gyroData, !!gyroSub, toggleGyroscope, '#4ECDC4')}
      {renderSensorCard('磁力计', 'compass', magData, !!magSub, toggleMagnetometer, '#45B7D1')}

      {/* 触感反馈 */}
      <Text style={[Typography.h4, { color: colors.text, paddingHorizontal: Spacing.lg, marginTop: Spacing.lg }]}>
        触感反馈
      </Text>
      <View style={styles.hapticsGrid}>
        {[
          { type: 'light' as const, label: '轻触', color: '#74B9FF' },
          { type: 'medium' as const, label: '中等', color: '#0984E3' },
          { type: 'heavy' as const, label: '重击', color: '#6C5CE7' },
          { type: 'success' as const, label: '成功', color: '#00B894' },
          { type: 'warning' as const, label: '警告', color: '#FDCB6E' },
          { type: 'error' as const, label: '错误', color: '#D63031' },
        ].map((item) => (
          <TouchableOpacity
            key={item.type}
            style={[styles.hapticButton, { backgroundColor: item.color }]}
            onPress={() => triggerHaptics(item.type)}
            activeOpacity={0.7}
          >
            <Text style={[Typography.bodySmall, { color: '#FFFFFF', fontWeight: '600' }]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ height: Spacing.xxl }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sensorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sensorTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sensorIcon: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  axisContainer: {
    gap: Spacing.sm,
  },
  axisItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  axisBar: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  axisFill: {
    height: '100%',
    borderRadius: 3,
  },
  hapticsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.md,
    gap: Spacing.md,
  },
  hapticButton: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 90,
  },
});
