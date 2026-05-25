export const COLORS = {
  primary: '#4A90E2',
  secondary: '#1a1a2e',
  card: '#16213e',
  accent: '#0f3460',
  text: '#ffffff',
  textMuted: '#aaaaaa',
  error: '#ff6b6b',
  border: '#4A90E2',
};

export const gradients = {
  clear: ['#1a1a2e', '#16213e', '#0f3460'],
  clouds: ['#2c3e50', '#3d4f61', '#4a5568'],
  rain: ['#0d1b2a', '#1b2f45', '#1e3a5f'],
  snow: ['#1a2a3a', '#2d4a6e', '#3a5f8a'],
  thunderstorm: ['#0d0d1a', '#1a1a2e', '#2d1b4e'],
  mist: ['#2c3e50', '#465666', '#596a7a'],
  default: ['#1a1a2e', '#16213e', '#0f3460'],
};

export const getGradient = (weatherMain) => {
  if (!weatherMain) return gradients.default;
  const key = weatherMain.toLowerCase();
  return gradients[key] || gradients.default;
};