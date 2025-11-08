import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator
} from 'react-native';
import { ApiService } from '../services/api';
import { CanonicalEvent } from '../types/event';

const apiService = new ApiService();

export default function ReviewScreen({ route, navigation }: any) {
  const { event: initialEvent } = route.params;
  const [event, setEvent] = useState<CanonicalEvent>(initialEvent);
  const [saving, setSaving] = useState(false);

  const updateField = (field: keyof CanonicalEvent, value: any) => {
    setEvent({ ...event, [field]: value });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await apiService.save(event);
      navigation.navigate('Success', { eventId: response.eventId, htmlLink: response.htmlLink });
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to save event');
    } finally {
      setSaving(false);
    }
  };

  const formatDateTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Event Details</Text>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Title *</Text>
        <TextInput
          style={styles.input}
          value={event.title}
          onChangeText={(text) => updateField('title', text)}
          placeholder="Event title"
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={event.description || ''}
          onChangeText={(text) => updateField('description', text)}
          placeholder="Event description"
          multiline
          numberOfLines={3}
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Start Time *</Text>
        <Text style={styles.dateTimeText}>{formatDateTime(event.startTime)}</Text>
        <Text style={styles.timezoneText}>Timezone: {event.timezone}</Text>
      </View>

      {event.endTime && (
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>End Time</Text>
          <Text style={styles.dateTimeText}>{formatDateTime(event.endTime)}</Text>
        </View>
      )}

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Location</Text>
        <TextInput
          style={styles.input}
          value={event.location?.name || event.location?.address || ''}
          onChangeText={(text) => updateField('location', { name: text })}
          placeholder="Event location"
        />
        {event.location?.address && (
          <Text style={styles.addressText}>{event.location.address}</Text>
        )}
      </View>

      {event.conflicts && event.conflicts.length > 0 && (
        <View style={styles.conflictContainer}>
          <Text style={styles.conflictTitle}>⚠️ Conflicts Detected</Text>
          {event.conflicts.map((conflict, index) => (
            <Text key={index} style={styles.conflictText}>
              • {conflict.title} at {formatDateTime(conflict.startTime)}
            </Text>
          ))}
        </View>
      )}

      <TouchableOpacity
        style={[styles.saveButton, saving && styles.saveButtonDisabled]}
        onPress={handleSave}
        disabled={saving || !event.title}
      >
        {saving ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.saveButtonText}>Save to Calendar</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.goBack()}
        disabled={saving}
      >
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  fieldContainer: {
    marginBottom: 20
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333'
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top'
  },
  dateTimeText: {
    fontSize: 16,
    color: '#333',
    marginTop: 4
  },
  timezoneText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4
  },
  addressText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4
  },
  conflictContainer: {
    backgroundColor: '#fff3cd',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ffc107'
  },
  conflictTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#856404'
  },
  conflictText: {
    fontSize: 14,
    color: '#856404',
    marginBottom: 4
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15
  },
  saveButtonDisabled: {
    backgroundColor: '#ccc'
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600'
  },
  cancelButton: {
    padding: 16,
    alignItems: 'center'
  },
  cancelButtonText: {
    color: '#007AFF',
    fontSize: 16
  }
});

