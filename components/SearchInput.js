import React, { useState, useCallback, useRef } from 'react';
import {
  View, TextInput, TouchableOpacity, Text,
  StyleSheet, FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fetchCitySuggestions } from '../api/weather';
import { COLORS } from '../styles/theme';

export default function SearchInput({ onCitySelect }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const timerRef = useRef(null);

  const handleChange = useCallback((text) => {
    setQuery(text);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(async () => {
      if (text.length >= 2) {
        const results = await fetchCitySuggestions(text);
        setSuggestions(results);
      } else {
        setSuggestions([]);
      }
    }, 400);
  }, []);

  const handleSelect = (item) => {
    setQuery(item.name);
    setSuggestions([]);
    onCitySelect(item.name);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.inputRow}>
        <Ionicons name="search" size={20} color={COLORS.textMuted} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Пошук міста..."
          placeholderTextColor={COLORS.textMuted}
          value={query}
          onChangeText={handleChange}
          onSubmitEditing={() => {
            setSuggestions([]);
            onCitySelect(query);
          }}
        />
      </View>

      {suggestions.length > 0 && (
        <FlatList
          style={styles.dropdown}
          data={suggestions}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.suggestion} onPress={() => handleSelect(item)}>
              <Ionicons name="location-outline" size={16} color={COLORS.primary} />
              <Text style={styles.suggestionText}>
                {item.name}{item.state ? `, ${item.state}` : ''}, {item.country}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    zIndex: 10,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: COLORS.text,
    fontSize: 16,
  },
  dropdown: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    marginTop: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
    maxHeight: 200,
  },
  suggestion: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.accent,
    gap: 8,
  },
  suggestionText: {
    color: COLORS.text,
    fontSize: 14,
  },
});