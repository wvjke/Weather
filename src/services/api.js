export const fetchWeather = async (city) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=ua&appid=990122b9330a1e483262cfc3bdf5a9af`
  );
  const data = await res.json();
  return data;
};
