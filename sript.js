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