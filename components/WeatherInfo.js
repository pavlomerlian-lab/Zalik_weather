import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { COLORS } from '../styles/theme';
import { getWeatherIconUrl } from '../api/weather';

export default function WeatherInfo({ data }) {
  if (!data) return null;

  const { name, sys, main, weather } = data;
  const icon = weather[0].icon;
  const description = weather[0].description;

  return (
    <View style={styles.container}>
      <Text style={styles.city}>
        {name}, {sys.country}
      </Text>
      <Image
        style={styles.icon}
        source={{ uri: getWeatherIconUrl(icon) }}
      />
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.temp}>
        {Math.round(main.temp)}°C
      </Text>
      <Text style={styles.feelsLike}>
        Відчувається як {Math.round(main.feels_like)}°C
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  city: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  icon: {
    width: 110,
    height: 110,
  },
  description: {
    fontSize: 18,
    color: COLORS.textMuted,
    textTransform: 'capitalize',
    marginBottom: 6,
  },
  temp: {
    fontSize: 72,
    fontWeight: 'bold',
    color: COLORS.primary,
    lineHeight: 80,
  },
  feelsLike: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginTop: 4,
  },
});