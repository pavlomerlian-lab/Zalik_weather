import React, { useState } from 'react';
import {
  StyleSheet, View, Text, ActivityIndicator,
  SafeAreaView, ScrollView, StatusBar,
  KeyboardAvoidingView, Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import SearchInput from './components/SearchInput';
import WeatherInfo from './components/WeatherInfo';
import DetailsGrid from './components/DetailsGrid';
import { fetchWeatherByCity } from './api/weather';
import { getGradient } from './styles/theme';

export default function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (city) => {
    if (!city.trim()) return;
    setLoading(true);
    setError('');
    setWeather(null);
    try {
      const data = await fetchWeatherByCity(city);
      setWeather(data);
    } catch (e) {
      setError('Місто не знайдено. Спробуйте ще раз.');
    }
    setLoading(false);
  };

  const gradient = getGradient(weather?.weather?.[0]?.main);

  return (
    <LinearGradient colors={gradient} style={styles.gradient}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safe}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled={true}
          >
            <Text style={styles.title}>⛅ Погода</Text>

            <SearchInput onCitySelect={handleSearch} />

            {loading && (
              <ActivityIndicator size="large" color="#4A90E2" style={{ marginTop: 40 }} />
            )}

            {error !== '' && (
              <View style={styles.errorBox}>
                <Ionicons name="alert-circle-outline" size={22} color="#ff6b6b" />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            {weather && !loading && (
              <View style={styles.card}>
                <WeatherInfo data={weather} />
                <DetailsGrid data={weather} />
              </View>
            )}

            {!weather && !loading && error === '' && (
              <View style={styles.placeholder}>
                <Ionicons name="cloud-outline" size={80} color="#4A90E2" />
                <Text style={styles.placeholderText}>
                  Введіть назву міста{'\n'}щоб дізнатись погоду
                </Text>
              </View>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safe: {
    flex: 1,
  },
  scroll: {
    padding: 20,
    paddingTop: 50,
    alignItems: 'center',
    flexGrow: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 24,
    textAlign: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: 'rgba(22, 33, 62, 0.8)',
    borderRadius: 24,
    padding: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'rgba(74, 144, 226, 0.3)',
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 107, 107, 0.15)',
    borderRadius: 12,
    padding: 14,
    marginTop: 20,
    gap: 8,
    borderWidth: 1,
    borderColor: '#ff6b6b',
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 15,
  },
  placeholder: {
    alignItems: 'center',
    marginTop: 60,
    gap: 16,
  },
  placeholderText: {
    color: '#aaa',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
});