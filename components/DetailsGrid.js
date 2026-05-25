import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../styles/theme';

const DetailItem = ({ icon, label, value }) => (
  <View style={styles.item}>
    <Ionicons name={icon} size={24} color={COLORS.primary} />
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

export default function DetailsGrid({ data }) {
  if (!data) return null;

  const { main, wind, visibility } = data;

  return (
    <View style={styles.grid}>
      <DetailItem icon="water-outline" label="Вологість" value={`${main.humidity}%`} />
      <DetailItem icon="speedometer-outline" label="Тиск" value={`${main.pressure} гПа`} />
      <DetailItem icon="arrow-up-circle-outline" label="Вітер" value={`${wind.speed} м/с`} />
      <DetailItem icon="eye-outline" label="Видимість" value={`${(visibility / 1000).toFixed(1)} км`} />
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 16,
    gap: 10,
  },
  item: {
    width: '47%',
    backgroundColor: COLORS.accent,
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    gap: 6,
  },
  label: {
    fontSize: 12,
    color: COLORS.textMuted,
    textAlign: 'center',
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
});