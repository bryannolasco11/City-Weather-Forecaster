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
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=526fc11b10a27117543151b1de2f92b6";

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

var displayCity = function(data, citySearchTerm) {
    console.log(data);
    console.log(citySearchTerm);

    // clear old content
    cityContainerEl.textContent = "";
    citySearchTerm.textContent = citySearchTerm;

    //display info
    var newCityTemp = Number(data.main.temp);
    console.log(newCityTemp);
    //how do I get the date?
    var dateTemp = Number(data.dt);
    console.log(dateTemp);
    var newHumidity = Number(data.main.humidity);
    console.log(newHumidity);
    var newWindSpeed = Number(data.wind.speed);
    console.log(newWindSpeed);
    var newIcon = src=" http://openweathermap.org/img/wn/" +data.weather[0].icon;
    console.log(newIcon);
    var newLat = Number(data.coord.lat);
    console.log(newLat);
    var newLon = Number(data.coord.lon);
    console.log(newLon);

    

};

userFormEl.addEventListener("submit", formSubmitHandler);