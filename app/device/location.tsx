import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, Platform } from 'react-native';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { Spacing, Typography, BorderRadius } from '../../constants';
import { Button, Card, Loading } from '../../components';

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number | null;
  altitude: number | null;
  speed: number | null;
  heading: number | null;
  timestamp: number;
}

export default function LocationScreen() {
  const { colors } = useTheme();
  const [location, setLocation] = useState<LocationData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [watching, setWatching] = useState(false);
  const [subscription, setSubscription] = useState<Location.LocationSubscription | null>(null);

  const getLocation = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('位置权限被拒绝');
        setLoading(false);
        return;
      }
      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        accuracy: loc.coords.accuracy,
        altitude: loc.coords.altitude,
        speed: loc.coords.speed,
        heading: loc.coords.heading,
        timestamp: loc.timestamp,
      });
    } catch (e) {
      setErrorMsg('获取位置失败: ' + (e instanceof Error ? e.message : String(e)));
    }
    setLoading(false);
  };

  const startWatching = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('位置权限被拒绝');
        return;
      }
      const sub = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, distanceInterval: 5 },
        (loc) => {
          setLocation({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
            accuracy: loc.coords.accuracy,
            altitude: loc.coords.altitude,
            speed: loc.coords.speed,
            heading: loc.coords.heading,
            timestamp: loc.timestamp,
          });
        }
      );
      setSubscription(sub);
      setWatching(true);
    } catch (e) {
      setErrorMsg('监听位置失败');
    }
  };

  const stopWatching = () => {
    subscription?.remove();
    setSubscription(null);
    setWatching(false);
  };

  useEffect(() => {
    return () => {
      subscription?.remove();
    };
  }, []);

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.buttonGroup}>
        <Button
          title={loading ? '定位中...' : '获取当前位置'}
          onPress={getLocation}
          loading={loading}
          style={styles.button}
        />
        <Button
          title={watching ? '停止追踪' : '实时追踪'}
          variant={watching ? 'danger' : 'secondary'}
          onPress={watching ? stopWatching : startWatching}
          style={styles.button}
        />
      </View>

      {errorMsg && (
        <Card style={{ marginHorizontal: Spacing.lg }}>
          <View style={styles.errorContainer}>
            <Ionicons name="alert-circle" size={20} color={colors.danger} />
            <Text style={[Typography.bodySmall, { color: colors.danger, marginLeft: Spacing.sm }]}>
              {errorMsg}
            </Text>
          </View>
        </Card>
      )}

      {location && (
        <View style={styles.locationInfo}>
          <Card>
            <View style={styles.infoRow}>
              <Ionicons name="navigate" size={20} color={colors.primary} />
              <View style={styles.infoContent}>
                <Text style={[Typography.caption, { color: colors.textSecondary }]}>纬度</Text>
                <Text style={[Typography.body, { color: colors.text }]}>{location.latitude.toFixed(6)}</Text>
              </View>
            </View>
            <View style={[styles.infoRow, { marginTop: Spacing.md }]}>
              <Ionicons name="navigate" size={20} color={colors.primary} />
              <View style={styles.infoContent}>
                <Text style={[Typography.caption, { color: colors.textSecondary }]}>经度</Text>
                <Text style={[Typography.body, { color: colors.text }]}>{location.longitude.toFixed(6)}</Text>
              </View>
            </View>
            <View style={[styles.infoRow, { marginTop: Spacing.md }]}>
              <Ionicons name="locate" size={20} color={colors.success} />
              <View style={styles.infoContent}>
                <Text style={[Typography.caption, { color: colors.textSecondary }]}>精度</Text>
                <Text style={[Typography.body, { color: colors.text }]}>
                  {location.accuracy ? `${location.accuracy.toFixed(1)} 米` : '未知'}
                </Text>
              </View>
            </View>
            {location.altitude !== null && (
              <View style={[styles.infoRow, { marginTop: Spacing.md }]}>
                <Ionicons name="trending-up" size={20} color={colors.warning} />
                <View style={styles.infoContent}>
                  <Text style={[Typography.caption, { color: colors.textSecondary }]}>海拔</Text>
                  <Text style={[Typography.body, { color: colors.text }]}>{location.altitude.toFixed(1)} 米</Text>
                </View>
              </View>
            )}
            {location.speed !== null && (
              <View style={[styles.infoRow, { marginTop: Spacing.md }]}>
                <Ionicons name="speedometer" size={20} color={colors.info} />
                <View style={styles.infoContent}>
                  <Text style={[Typography.caption, { color: colors.textSecondary }]}>速度</Text>
                  <Text style={[Typography.body, { color: colors.text }]}>
                    {(location.speed * 3.6).toFixed(1)} km/h
                  </Text>
                </View>
              </View>
            )}
            <View style={[styles.infoRow, { marginTop: Spacing.md }]}>
              <Ionicons name="time" size={20} color={colors.textSecondary} />
              <View style={styles.infoContent}>
                <Text style={[Typography.caption, { color: colors.textSecondary }]}>时间</Text>
                <Text style={[Typography.body, { color: colors.text }]}>
                  {new Date(location.timestamp).toLocaleString('zh-CN')}
                </Text>
              </View>
            </View>
          </Card>
        </View>
      )}

      {!location && !errorMsg && !loading && (
        <View style={styles.placeholder}>
          <Ionicons name="location" size={64} color={colors.textTertiary} />
          <Text style={[Typography.body, { color: colors.textSecondary, marginTop: Spacing.lg }]}>
            点击上方按钮获取位置信息
          </Text>
        </View>
      )}

      <View style={{ height: Spacing.xxl }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonGroup: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    gap: Spacing.md,
  },
  button: {
    flex: 1,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationInfo: {
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoContent: {
    marginLeft: Spacing.md,
    flex: 1,
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
});
