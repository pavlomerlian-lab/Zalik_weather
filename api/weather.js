const API_KEY = '7d5807736284989e9bd01d371ebee7f8';
const BASE_URL = 'https://api.openweathermap.org';

export const fetchWeatherByCity = async (city) => {
  const response = await fetch(
    `${BASE_URL}/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ua`
  );
  const data = await response.json();
  if (data.cod !== 200) throw new Error('Місто не знайдено');
  return data;
};

export const fetchCitySuggestions = async (query) => {
  if (!query || query.length < 2) return [];
  const response = await fetch(
    `${BASE_URL}/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
  );
  const data = await response.json();
  return data.map((item) => ({
    name: item.local_names?.uk || item.name,
    country: item.country,
    state: item.state || '',
    lat: item.lat,
    lon: item.lon,
  }));
};

export const getWeatherIconUrl = (icon) =>
  `https://openweathermap.org/img/wn/${icon}@2x.png`;