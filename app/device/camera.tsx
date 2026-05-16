import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from '../../hooks/useTheme';
import { Spacing, Typography, BorderRadius } from '../../constants';
import { Button, Card } from '../../components';

export default function CameraScreen() {
  const { colors } = useTheme();
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');
  const [photo, setPhoto] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const cameraRef = useRef<CameraView>(null);

  if (!permission) return <View style={styles.container} />;

  if (!permission.granted) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }, styles.centerContent]}>
        <Ionicons name="camera" size={64} color={colors.textTertiary} />
        <Text style={[Typography.h3, { color: colors.text, marginTop: Spacing.lg }]}>
          需要相机权限
        </Text>
        <Text style={[Typography.bodySmall, { color: colors.textSecondary, marginTop: Spacing.sm, textAlign: 'center' }]}>
          请授权以使用相机拍照和扫码功能
        </Text>
        <Button title="授权相机" onPress={requestPermission} style={{ marginTop: Spacing.xl }} />
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const result = await cameraRef.current.takePictureAsync({
        quality: 0.8,
      });
      if (result) {
        setPhoto(result.uri);
      }
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.8,
    });
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const toggleFacing = () => {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* 相机预览 */}
      <View style={styles.cameraContainer}>
        <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
          <View style={styles.cameraOverlay}>
            <TouchableOpacity style={styles.flipButton} onPress={toggleFacing}>
              <Ionicons name="camera-reverse" size={28} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </CameraView>
      </View>

      {/* 拍照按钮 */}
      <View style={styles.actionBar}>
        <TouchableOpacity style={styles.galleryButton} onPress={pickImage}>
          <Ionicons name="images" size={28} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
          <View style={styles.captureInner} />
        </TouchableOpacity>
        <View style={{ width: 44 }} />
      </View>

      {/* 拍摄结果 */}
      {photo && (
        <View style={styles.resultSection}>
          <Text style={[Typography.h4, { color: colors.text }]}>拍摄结果</Text>
          <Image source={{ uri: photo }} style={styles.resultImage} />
          <Button
            title="重新拍摄"
            variant="outline"
            onPress={() => setPhoto(null)}
            style={{ marginTop: Spacing.md }}
          />
        </View>
      )}

      {/* 选取结果 */}
      {selectedImage && (
        <View style={styles.resultSection}>
          <Text style={[Typography.h4, { color: colors.text }]}>选取结果</Text>
          <Image source={{ uri: selectedImage }} style={styles.resultImage} />
          <Button
            title="重新选取"
            variant="outline"
            onPress={() => setSelectedImage(null)}
            style={{ marginTop: Spacing.md }}
          />
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
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xxl,
  },
  cameraContainer: {
    height: 350,
    borderRadius: BorderRadius.lg,
    margin: Spacing.lg,
    overflow: 'hidden',
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    padding: Spacing.md,
  },
  flipButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xxl,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  captureInner: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#FF3B30',
  },
  galleryButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultSection: {
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
  },
  resultImage: {
    width: '100%',
    height: 200,
    borderRadius: BorderRadius.md,
    marginTop: Spacing.md,
  },
});
