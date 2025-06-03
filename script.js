
async function getWeather() {
  const city = document.getElementById("city").value.trim();
  const resultDiv = document.getElementById("result");

  if (!city) {
    resultDiv.innerHTML = "<p style='color:red;'>Please enter a city name.</p>";
    return;
  }

  resultDiv.innerHTML = "Loading...";

  try {
    // Step 1: Get coordinates from city name
    const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`);
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      resultDiv.innerHTML = `<p style="color:red;">City not found.</p>`;
      return;
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    // Step 2: Get weather using coordinates
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );
    const weatherData = await weatherRes.json();
    const weather = weatherData.current_weather;

    resultDiv.innerHTML = `
      <h2>${name}, ${country}</h2>
      <p><strong>Temperature:</strong> ${weather.temperature}°C</p>
      <p><strong>Wind Speed:</strong> ${weather.windspeed} km/h</p>
      <p><strong>Weather Code:</strong> ${weather.weathercode}</p>
    `;
     const localTime = new Date().toLocaleString();
    resultDiv.innerHTML += `<p><strong>Local Time:</strong> ${localTime}</p>`;
  } catch (error) {
    resultDiv.innerHTML = `<p style="color:red;">Error fetching weather data.</p>`;
    console.error(error);
  }
}
