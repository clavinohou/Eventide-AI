import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';

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

      <TouchableOpacity style={styles.button} onPress={openInCalendar}>
        <Text style={styles.buttonText}>Open in Calendar</Text>
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
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center'
  },
  successIcon: {
    fontSize: 80,
    marginBottom: 20
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center'
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600'
  },
  secondaryButton: {
    padding: 16,
    width: '100%',
    alignItems: 'center'
  },
  secondaryButtonText: {
    color: '#007AFF',
    fontSize: 16
  }
});

