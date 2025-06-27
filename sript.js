const WEATHER_API_KEY = '5f472b7acba333cd8a035ea85a0d4d4c';
        const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';
        const DB_API_URL = 'http://localhost:3001/';

        const elements = {
            searchInput: document.getElementById('locationSearch'),
            searchBtn: document.getElementById('searchBtn'),
            weatherCards: document.getElementById('weatherCards'),
            searchResults: document.getElementById('searchResults'),
            logoutBtn: document.querySelector('.logout-button')
        };
        const defaultCities = ['New York', 'London', 'Tokyo', 'Sydney', 'Paris'];
        
        let currentUser = {
            id: 1,
            name: "Tiki",
            favorites: []
        };
        async function initApp() {
           
            await loadUserData();
            
            
            loadWeatherCards();
            
            
            setupEventListeners();
        }
        async function loadUserData() {
            try {
                const response = await fetch(`${DB_API_URL}/users/${currentUser.id}`);
                const userData = await response.json();
                currentUser = userData;
                console.log("User data loaded:", currentUser);
            } catch (error) {
                console.error("Error loading user data:", error);
                currentUser.favorites = ['New York', 'London'];
            }
        }
        async function updateUserData() {
            try {
                await fetch(`${DB_API_URL}/users/${currentUser.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(currentUser)
                });
                console.log("User data updated successfully");
            } catch (error) {
                console.error("Error updating user data:", error);
            }
        }
         async function getWeatherData(cityName) {
            try {
                const url = `${WEATHER_API_URL}?q=${cityName}&appid=${WEATHER_API_KEY}`;
                const response = await fetch(url);
                
                if (!response.ok) {
                    throw new Error(`Weather data not found for ${cityName}`);
                }
                
                return await response.json();
            } catch (error) {
                console.error("Error fetching weather data:", error);
                throw error;
            }
        }
        async function loadWeatherCards() {
            elements.weatherCards.innerHTML = '';
            for (const city of currentUser.favorites) {
                try {
                    const weather = await getWeatherData(city);
                    createWeatherCard(weather, true);
                } catch (error) {
                    console.error(`Error loading ${city} weather:`, error);
                }
            }
            for (const city of defaultCities) {
                if (!currentUser.favorites.includes(city)) {
                    try {
                        const weather = await getWeatherData(city);
                        createWeatherCard(weather, false);
                    } catch (error) {
                        console.error(`Error loading ${city} weather:`, error);
                    }
                }
            }
        }
        function createWeatherCard(weatherData, isFavorite) {
            const card = document.createElement('div');
            card.className = 'weather-card';
            card.innerHTML = `
                <button class="favorite-btn ${isFavorite ? 'active' : ''}" 
                        data-city="${weatherData.name}">
                    <i class="fas fa-star"></i>
                </button>
                <h3>
                    <i class="fas fa-location-dot"></i> 
                    ${weatherData.name}, ${weatherData.sys.country}
                </h3>
                <div class="temp">${kelvinToCelsius(weatherData.main.temp)}°C</div>
                <div>
                    <img src="https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png" 
                         alt="${weatherData.weather[0].description}">
                    ${weatherData.weather[0].description}
                </div>
                <div class="weather-details">
                    <div class="detail">
                        <div class="detail-value">${weatherData.main.humidity}%</div>
                        <div class="detail-label">Humidity</div>
                    </div>
                    <div class="detail">
                        <div class="detail-value">${weatherData.wind.speed} m/s</div>
                        <div class="detail-label">Wind</div>
                    </div>
                </div>
            `;
            elements.weatherCards.appendChild(card);
            const favBtn = card.querySelector('.favorite-btn');
            favBtn.addEventListener('click', toggleFavorite);
        }
        async function displaySearchResults(cityName) {
            try {
                const weatherData = await getWeatherData(cityName);
                const isFavorite = currentUser.favorites.includes(cityName);
                
                elements.searchResults.innerHTML = `
                    <div class="weather-card">
                        <button class="favorite-btn ${isFavorite ? 'active' : ''}" 
                                data-city="${weatherData.name}">
                            <i class="fas fa-star"></i>
                        </button>
                        <h3>
                            <i class="fas fa-location-dot"></i> 
                            ${weatherData.name}, ${weatherData.sys.country}
                        </h3>
                        <div class="temp">${kelvinToCelsius(weatherData.main.temp)}°C</div>
                        <div>
                            <img src="https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png" 
                                 alt="${weatherData.weather[0].description}">
                            ${weatherData.weather[0].description}
                        </div>
                        <div class="weather-details">
                            <div class="detail">
                                <div class="detail-value">${weatherData.main.humidity}%</div>
                                <div class="detail-label">Humidity</div>
                            </div>
                            <div class="detail">
                                <div class="detail-value">${weatherData.wind.speed} m/s</div>
                                <div class="detail-label">Wind</div>
                            </div>
                            <div class="detail">
                                <div class="detail-value">${weatherData.main.pressure} hPa</div>
                                <div class="detail-label">Pressure</div>
                            </div>
                            <div class="detail">
                                <div class="detail-value">${kelvinToCelsius(weatherData.main.feels_like)}°C</div>
                                <div class="detail-label">Feels Like</div>
                            </div>
                        </div>
                    </div>
                `;
                 elements.searchResults.classList.add('active');
                const favBtn = elements.searchResults.querySelector('.favorite-btn');
                favBtn.addEventListener('click', toggleFavorite);
                
            } catch (error) {
                elements.searchResults.innerHTML = `
                    <div class="weather-card" style="background: linear-gradient(135deg, #ff6b6b, #ff8e8e);">
                        <h3><i class="fas fa-exclamation-triangle"></i> Location Not Found</h3>
                        <p>We couldn't find weather information for "${cityName}".</p>
                        <p>Please try another location.</p>
                    </div>
                `;
                elements.searchResults.classList.add('active');
            }
        }
        async function toggleFavorite(event) {
            const button = event.currentTarget;
            const city = button.getAttribute('data-city');
            button.classList.toggle('active');
            const isFavorite = button.classList.contains('active');
            if (isFavorite) {
                if (!currentUser.favorites.includes(city)) {
                    currentUser.favorites.push(city);
                }
            } else {
                currentUser.favorites = currentUser.favorites.filter(fav => fav !== city);
            }
            await updateUserData();
            loadWeatherCards();
        }
        function handleSearch() {
            const location = elements.searchInput.value.trim();
            
            if (!location) {
                alert('Please enter a location');
                return;
            }
            
            displaySearchResults(location);
        }
        
        function setupEventListeners() {
        
            elements.searchBtn.addEventListener('click', handleSearch);
            
            elements.searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') handleSearch();
            });
            elements.logoutBtn.addEventListener('click', () => {
                alert('Logout functionality would go here!');
            });
        }
