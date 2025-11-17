import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, Alert } from 'react-native';
import { Pattern } from '../types';

interface PatternManagerProps {
  currentPattern: Pattern;
  savedPatterns: Pattern[];
  onSavePattern: (name: string) => void;
  onLoadPattern: (pattern: Pattern) => void;
  onDeletePattern: (patternId: string) => void;
}

export const PatternManager: React.FC<PatternManagerProps> = ({
  currentPattern,
  savedPatterns,
  onSavePattern,
  onLoadPattern,
  onDeletePattern,
}) => {
  const [patternName, setPatternName] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSave = () => {
    if (!patternName.trim()) {
      Alert.alert('Error', 'Please enter a pattern name');
      return;
    }
    onSavePattern(patternName);
    setPatternName('');
  };

  const handleDelete = (pattern: Pattern) => {
    Alert.alert(
      'Delete Pattern',
      `Are you sure you want to delete "${pattern.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => onDeletePattern(pattern.id) },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <Text style={styles.title}>My Patterns ({savedPatterns.length})</Text>
        <Text style={styles.expandIcon}>{isExpanded ? '▼' : '▶'}</Text>
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.content}>
          <View style={styles.saveSection}>
            <TextInput
              style={styles.input}
              placeholder="Pattern name"
              placeholderTextColor="#666"
              value={patternName}
              onChangeText={setPatternName}
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save Current</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.patternsList}>
            {savedPatterns.length === 0 ? (
              <Text style={styles.emptyText}>No saved patterns yet</Text>
            ) : (
              savedPatterns.map((pattern) => (
                <View key={pattern.id} style={styles.patternItem}>
                  <TouchableOpacity
                    style={styles.patternInfo}
                    onPress={() => onLoadPattern(pattern)}
                  >
                    <Text style={styles.patternName}>{pattern.name}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDelete(pattern)}
                  >
                    <Text style={styles.deleteButtonText}>🗑️</Text>
                  </TouchableOpacity>
                </View>
              ))
            )}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  expandIcon: {
    color: '#fff',
    fontSize: 16,
  },
  content: {
    padding: 16,
    paddingTop: 0,
  },
  saveSection: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    backgroundColor: '#2a2a3e',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#3a3a4e',
  },
  saveButton: {
    backgroundColor: '#4ECDC4',
    paddingHorizontal: 20,
    borderRadius: 8,
    justifyContent: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  patternsList: {
    maxHeight: 200,
  },
  emptyText: {
    color: '#666',
    textAlign: 'center',
    padding: 16,
  },
  patternItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a3e',
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#3a3a4e',
  },
  patternInfo: {
    flex: 1,
    padding: 12,
  },
  patternName: {
    color: '#fff',
    fontSize: 16,
  },
  deleteButton: {
    padding: 12,
  },
  deleteButtonText: {
    fontSize: 20,
  },
});
