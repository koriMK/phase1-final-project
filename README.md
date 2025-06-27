Tiki's Weather App - README
## Table of Contents
1.Project Overview

2.Features

3.Technologies Used

4.Installation

5.API Integration

6.Database Setup

7.Project Structure

8.Usage

9.Contributing

10.License

## Project Overview

Tiki's Weather App is a modern, responsive web application that provides real-time weather information for locations worldwide. The app features:

Current weather conditions

5-day forecasts

Location search

Favorite locations system

Beautiful UI with weather animations

## Features
Real-time Weather Data: Get up-to-date weather information

Global Coverage: Search any location worldwide

Favorites System: Save your frequently checked locations

Responsive Design: Works on all devices

Detailed Forecasts: Temperature, humidity, wind speed, and more

Weather Alerts: Severe weather notifications

##  Technologies Used
Frontend
HTML5, CSS3, JavaScript

Font Awesome (icons)

OpenWeatherMap API

Backend
JSON Server (for local development)

RESTful API architecture

## Installation
Clone the repository:

bash
git clone https://github.com/koriMK/phase1-final-project.git
cd tikis-weather-app
Install dependencies:

bash
npm install
Start the development server:

bash
npm start
Start the JSON server (in a separate terminal):

bash
json-server --watch db.json --port 3001
Open the app in your browser:

text
http://localhost:3001

## API Integration
The app uses the OpenWeatherMap API for weather data. To set up:

Get a free API key from OpenWeatherMap

Replace the API key in script.js:

javascript
const API_KEY = 'your-api-key-here';

## Database Setup

The app uses a local JSON server for storing favorites:

Create a db.json file in your project root:

json
{
  "favorites": []
}
The server runs on http://localhost:3001 by default

## Project Structure
text
tikis-weather-app/
├── index.html          # Main HTML file
├── style.css           # All CSS styles
├── script.js           # Main JavaScript file
├── db.json             # Database for favorites
├── assets/             # Static assets
│   ├── images/         # App images
│   └── icons/          # Weather icons
├── README.md           # This file
└── package.json        # Project configuration


## Usage

Search for a location:

Type a city name in the search bar

Press Enter or click the search button

View weather details:

Current temperature

Weather conditions

Humidity

Wind speed

Atmospheric pressure

Save favorites:

Click the star icon on any weather card

View your favorites in the Favorites section

Toggle temperature units:

Switch between Celsius and Fahrenheit (coming soon)

## Contributing
Contributions are welcome! Please follow these steps:

Fork the project

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

## License

Distributed under the MIT License. See LICENSE for more information.
 ## Author: 
 Joseph Mwangi,
