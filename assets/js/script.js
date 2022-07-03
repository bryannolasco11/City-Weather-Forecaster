// 1)Create the search function
// 2)display current city conditions
//      name, current date, icon representative for current weather, temperature, humidity, wind speed, and UV index with color indication
//      future weather conditions for that city
// 3)5 day forecast
//      date, icon rep of weather, temp, wind speed, humidity
//4)city goes in history and is clickable


var getCityWeather = function() {
    console.log("function was called");
    fetch("http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=d1ab203420f36de067c22f518689252f");
};

getCityWeather();