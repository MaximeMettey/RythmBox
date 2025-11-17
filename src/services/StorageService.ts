import AsyncStorage from '@react-native-async-storage/async-storage';
import { Pattern } from '../types';

const PATTERNS_KEY = '@rythmbox_patterns';
const SETTINGS_KEY = '@rythmbox_settings';

export class StorageService {
  async savePattern(pattern: Pattern): Promise<void> {
    try {
      const existing = await this.loadPatterns();
      const updated = existing.filter(p => p.id !== pattern.id);
      updated.push(pattern);
      await AsyncStorage.setItem(PATTERNS_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to save pattern:', error);
      throw error;
    }
  }

  async loadPatterns(): Promise<Pattern[]> {
    try {
      const data = await AsyncStorage.getItem(PATTERNS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to load patterns:', error);
      return [];
    }
  }

  async deletePattern(patternId: string): Promise<void> {
    try {
      const existing = await this.loadPatterns();
      const updated = existing.filter(p => p.id !== patternId);
      await AsyncStorage.setItem(PATTERNS_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to delete pattern:', error);
      throw error;
    }
  }

  async saveTempo(tempo: number): Promise<void> {
    try {
      const settings = await this.loadSettings();
      settings.tempo = tempo;
      await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error('Failed to save tempo:', error);
    }
  }

  async loadSettings(): Promise<{ tempo: number }> {
    try {
      const data = await AsyncStorage.getItem(SETTINGS_KEY);
      return data ? JSON.parse(data) : { tempo: 120 };
    } catch (error) {
      console.error('Failed to load settings:', error);
      return { tempo: 120 };
    }
  }
}

export const storageService = new StorageService();
