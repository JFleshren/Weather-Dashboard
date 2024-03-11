document.addEventListener("DOMContentLoaded", () => {
    const searchForm = document.getElementById("search-form");
    const cityInput = document.getElementById("city-input");
    const currentWeatherContainer = document.getElementById("current-weather");
    const forecastContainer = document.getElementById("forecast");
    const searchHistoryContainer = document.getElementById("search-history");
  
    // Load search history from localStorage on page load
    const searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
  
    // Display initial search history
    displaySearchHistory();
  
    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const cityName = cityInput.value.trim();
      if (cityName) {
        fetchWeather(cityName);
        addToSearchHistory(cityName);
        cityInput.value = "";
      }
    });
  
    function fetchWeather(cityName) {
      const apiKey = "a21f7595752d846781989419dd3e8409";
      const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;
  
      // Fetch current weather data
      fetch(currentWeatherUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then(currentWeatherData => {
          // current weather
          displayCurrentWeather(currentWeatherData);
        })
        .catch(error => {
          console.error("There was a problem fetching the current weather data:", error);
        });
  
      // Fetch forecast data
      fetch(forecastUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then(forecastData => {
          // Display forecast data
          displayForecast(forecastData);
        })
        .catch(error => {
          console.error("There was a problem fetching the forecast data:", error);
        });
    }
  
    function displayCurrentWeather(weatherData) {
      const cityName = weatherData.name;
      const date = new Date(weatherData.dt * 1000).toLocaleDateString();
      const icon = weatherData.weather[0].icon;
      const temperature = weatherData.main.temp;
      const humidity = weatherData.main.humidity;
      const windSpeed = weatherData.wind.speed;
  
      const currentWeatherHTML = `
        <h2>Current Weather in ${cityName}</h2>
        <p>Date: ${date}</p>
        <img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">
        <p>Temperature: ${temperature}°C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
      `;
  
      currentWeatherContainer.innerHTML = currentWeatherHTML;
    }
  
    function displayForecast(forecastData) {
      const forecastItems = forecastData.list.slice(0, 5);
      let forecastHTML = '<h2>5-Day Forecast</h2>';
  
      forecastItems.forEach(item => {
        const date = new Date(item.dt * 1000).toLocaleDateString();
        const icon = item.weather[0].icon;
        const temperature = item.main.temp;
        const humidity = item.main.humidity;
        const windSpeed = item.wind.speed;
  
        forecastHTML += `
          <div class="forecast-item">
            <p>Date: ${date}</p>
            <img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">
            <p>Temperature: ${temperature}°C</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind Speed: ${windSpeed} m/s</p>
          </div>
        `;
      });
  
      forecastContainer.innerHTML = forecastHTML;
    }
  
    function addToSearchHistory(cityName) {
      // Update search history array
      if (!searchHistory.includes(cityName)) {
        searchHistory.unshift(cityName); // Add to the beginning of the array
        if (searchHistory.length > 5) {
          searchHistory.pop(); // Remove the oldest city if the array exceeds 5 cities
        }
  
        // Save updated search history to localStorage
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  
        // Display updated search history
        displaySearchHistory();
      }
    }
  
    function displaySearchHistory() {
      // Display search history as clickable buttons
      searchHistory.forEach(city => {
        const button = document.createElement("button");
        button.textContent = city;
        button.addEventListener("click", () => {
          fetchWeather(city);
        });
        searchHistoryContainer.appendChild(button);
      });
    }
  });
  