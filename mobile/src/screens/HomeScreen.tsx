import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  StatusBar
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import * as Linking from 'expo-linking';
import { ApiService } from '../services/api';
import { CanonicalEvent } from '../types/event';
import { theme } from '../theme';

const apiService = new ApiService();

export default function HomeScreen({ navigation }: any) {
  const [loading, setLoading] = useState(false);
  const [textInput, setTextInput] = useState('');
  const insets = useSafeAreaInsets();

  const handleExtract = async (type: 'image' | 'url' | 'text', data: string) => {
    setLoading(true);
    try {
      // Step 1: Extract event info
      const response = await apiService.extract({ type, data });
      const event = response.event;
      
      // Step 2: Show review screen (user can edit/fill missing fields)
      navigation.navigate('Review', { event });
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to extract event');
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission Required', 'Camera permission is needed to capture flyers');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
      base64: true
    });

    if (!result.canceled && result.assets[0]) {
      const base64 = `data:image/jpeg;base64,${result.assets[0].base64}`;
      await handleExtract('image', base64);
    }
  };

  const handleShareUrl = async (url: string) => {
    await handleExtract('url', url);
  };

  const handleTextSubmit = () => {
    if (textInput.trim()) {
      handleExtract('text', textInput.trim());
      setTextInput('');
    }
  };

  // Handle deep links (for share sheet)
  React.useEffect(() => {
    const handleUrl = async (event: { url: string }) => {
      const { url } = event;
      // Only handle HTTP/HTTPS URLs, ignore exp:// and other protocols
      if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
        await handleShareUrl(url);
      }
    };

    const subscription = Linking.addEventListener('url', handleUrl);
    Linking.getInitialURL().then((url) => {
      // Only handle HTTP/HTTPS URLs, ignore exp:// and other protocols
      if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
        handleShareUrl(url);
      }
    });

    return () => subscription.remove();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.container, { paddingTop: Math.max(insets.top + theme.spacing.lg, theme.spacing['2xl'] + theme.spacing.base) }]}>
        <Text style={styles.title}>Create Event from Anything</Text>
        <Text style={styles.subtitle}>Capture a flyer, share a URL, or paste text</Text>

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loadingText}>Extracting event information...</Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={pickImage}
          disabled={loading}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={theme.colors.gradient.sunset}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>📷 Capture Flyer</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            Alert.prompt(
              'Enter URL',
              'Paste a social media or event URL',
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Extract',
                  onPress: (url) => url && handleShareUrl(url || '')
                }
              ],
              'plain-text'
            );
          }}
          disabled={loading}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={theme.colors.gradient.warm}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>🔗 Share URL</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Or paste event text here..."
          multiline
          numberOfLines={4}
          value={textInput}
          onChangeText={setTextInput}
          editable={!loading}
        />
        <TouchableOpacity
          onPress={handleTextSubmit}
          disabled={!textInput.trim() || loading}
          activeOpacity={0.8}
        >
          {!textInput.trim() ? (
            <View style={[styles.submitButton, styles.submitButtonDisabled]}>
              <Text style={styles.submitButtonText}>Extract Event</Text>
            </View>
          ) : (
            <LinearGradient
              colors={theme.colors.gradient.sunset}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.submitButton}
            >
              <Text style={styles.submitButtonText}>Extract Event</Text>
            </LinearGradient>
          )}
        </TouchableOpacity>
      </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.backgroundLight
  },
  title: {
    fontSize: theme.typography.sizes['3xl'],
    fontWeight: theme.typography.weights.bold,
    marginTop: 0,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
    color: theme.colors.text,
    letterSpacing: -0.5
  },
  subtitle: {
    fontSize: theme.typography.sizes.base,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing['3xl'],
    textAlign: 'center'
  },
  loadingContainer: {
    alignItems: 'center',
    marginVertical: theme.spacing.lg
  },
  loadingText: {
    marginTop: theme.spacing.sm,
    color: theme.colors.textSecondary
  },
  buttonContainer: {
    marginBottom: theme.spacing['2xl']
  },
  button: {
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.base,
    alignItems: 'center',
    ...theme.shadows.md
  },
  buttonText: {
    color: theme.colors.textOnGradient,
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.semibold
  },
  textInputContainer: {
    flex: 1
  },
  textInput: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.base,
    fontSize: theme.typography.sizes.base,
    minHeight: 120,
    textAlignVertical: 'top',
    marginBottom: theme.spacing.base,
    borderWidth: 1,
    borderColor: theme.colors.border,
    color: theme.colors.text
  },
  submitButton: {
    padding: theme.spacing.base,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    ...theme.shadows.sm
  },
  submitButtonDisabled: {
    backgroundColor: theme.colors.border
  },
  submitButtonText: {
    color: theme.colors.textOnGradient,
    fontSize: theme.typography.sizes.base,
    fontWeight: theme.typography.weights.semibold
  }
});

