var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city");
var cityContainerEl = document.querySelector("#city-container");
var citySearchTerm = document.querySelector("#city-search-term");
// 1)Create the search function
// 2)display current city conditions
//      name, current date, icon representative for current weather, temperature, humidity, wind speed, and UV index with color indication
//      future weather conditions for that city
// 3)5 day forecast
//      date, icon rep of weather, temp, wind speed, humidity
//4)city goes in history and is clickable



// Fetch the api
var getCityWeather = function(city) {
    // format the weather api url
    var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=d1ab203420f36de067c22f518689252f";

    // make a request to the url
    fetch(apiUrl).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
            displayCity(data, city);
          });
        } else {
            alert("Error: City Not Found");
        }
    })
    .catch(function(error) {
        // Notice this `.catch()` getting chained onto the end of the `then()` method
        alert("Unable to connect to Weather");
    });
    
};

var formSubmitHandler = function(event) {
    event.preventDefault();
    
    //get value from input element
    var city = cityInputEl.value.trim();
    console.log(city);
    if (city) {
        getCityWeather(city);
        cityInputEl = "";

    } else {
        alert("Please enter a city");
    }
};

var displayCity = function(city, searchTerm) {
    console.log(city);
    console.log(searchTerm);

    // clear old content
    cityContainerEl.textContent = "";
    citySearchTerm.textContent = searchTerm;
};

userFormEl.addEventListener("submit", formSubmitHandler);