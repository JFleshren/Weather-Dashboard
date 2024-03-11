document.addEventListener("DOMContentLoaded", () => {
    const searchForm = document.getElementById("search-form");
    const cityInput = document.getElementById("city-input");
    const currentWeatherContainer = document.getElementById("current-weather");
    const forecastContainer = document.getElementById("forecast");
    const searchHistoryContainer = document.getElementById("search-history");
    
    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const cityName = cityInput.value.trim();
      if (cityName) {
        fetchWeather(cityName);
        cityInput.value = "";
      }
    });
  
