import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../theme';

export default function SuccessScreen({ route, navigation }: any) {
  const { eventId, htmlLink } = route.params;

  const openInCalendar = () => {
    if (htmlLink) {
      Linking.openURL(htmlLink);
    }
  };

  const createAnother = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.successIcon}>✅</Text>
      <Text style={styles.title}>Event Created!</Text>
      <Text style={styles.message}>
        Your event has been successfully added to Google Calendar.
      </Text>

      <TouchableOpacity onPress={openInCalendar} activeOpacity={0.8}>
        <LinearGradient
          colors={theme.colors.gradient.sunset}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Open in Calendar</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} onPress={createAnother}>
        <Text style={styles.secondaryButtonText}>Create Another Event</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center'
  },
  successIcon: {
    fontSize: 80,
    marginBottom: theme.spacing.lg
  },
  title: {
    fontSize: theme.typography.sizes['3xl'],
    fontWeight: theme.typography.weights.bold,
    marginBottom: theme.spacing.base,
    textAlign: 'center',
    color: theme.colors.text
  },
  message: {
    fontSize: theme.typography.sizes.base,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing['3xl']
  },
  button: {
    padding: theme.spacing.base,
    borderRadius: theme.borderRadius.lg,
    width: '100%',
    alignItems: 'center',
    marginBottom: theme.spacing.base,
    ...theme.shadows.md
  },
  buttonText: {
    color: theme.colors.textOnGradient,
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.semibold
  },
  secondaryButton: {
    padding: theme.spacing.base,
    width: '100%',
    alignItems: 'center'
  },
  secondaryButtonText: {
    color: theme.colors.primary,
    fontSize: theme.typography.sizes.base
  }
});

