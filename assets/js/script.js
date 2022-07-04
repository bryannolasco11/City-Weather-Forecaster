var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city");
var cityContainerEl = document.getElementById("city-container");
var citySearchTerm = document.querySelector("#city-search-term");
var currentTempEl= document.querySelector("#currentTemp");
var fiveDayEl = document.querySelector(".cityFiveDay");
var newCitySearchTerm = "Brookfield";
//var dayDiv = document.createElement("p");


// 1)Create the search function
// 2)display current city conditions
//      name, current date, icon representative for current weather, temperature, humidity, wind speed, and UV index with color indication
//      future weather conditions for that city
// 3)5 day forecast
//      date, icon rep of weather, temp, wind speed, humidity
//4)city goes in history and is clickable



// Fetch the api
var getCityWeather = function(lon,lat,city) {
    // format the weather api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon +"&units=imperial&appid=526fc11b10a27117543151b1de2f92b6";
    console.log(city);
    console.log(lat);
    // make a request to the url
    fetch(apiUrl).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                console.log(data);
            displayCity(data,city);
            displayFiveDay(data, city); 
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

var getCityLocation = function (city) {
   console.log("this is working");
    var geoApiUrl = "http://api.openweathermap.org/geo/1.0/direct?q="+city+"&limit=1&appid=526fc11b10a27117543151b1de2f92b6";
    console.log(city);
    
    fetch(geoApiUrl).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
            console.log(data);
                var newLat = data[0].lat;
                var newLon = data[0].lon;
            getCityWeather(newLon, newLat,city);
            });
        } else {
            alert("Error: City Not Found");
        }
    })
};

var formSubmitHandler = function(event) {
    event.preventDefault();
    
    //get value from input element
    var city = cityInputEl.value.trim();
    console.log(city);
    if (city) {
        getCityLocation(city);
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
     newCitySearchTerm.textContent = citySearchTerm;

    //display info
     // display city name
    
     
     var cityP = document.createElement("p");
     cityP.innerHTML = citySearchTerm;
     cityContainerEl.appendChild(cityP);

    // current temp
    var newCityTemp = data.current.temp;
    console.log(newCityTemp);
    var tempP = document.createElement("p");
    tempP.innerHTML = "Current Temp: " + newCityTemp +" degrees F";
    cityContainerEl.appendChild(tempP);
//     // how do I get the date?
    
//     var dateTemp = data.dt;
//     console.log(dateTemp);
    
     // current humidity
    var newHumidity = data.current.humidity;
    console.log(newHumidity);
    var humidityP = document.createElement("p");
    humidityP.innerHTML = "Humdity: " +newHumidity + "%";
    cityContainerEl.appendChild(humidityP);

     // current wind speed
    var newWindSpeed = data.current.wind_speed;
    console.log(newWindSpeed);
    var windP = document.createElement("p");
    windP.innerHTML = "Wind Speed: " + newWindSpeed + " MPH"; 
    cityContainerEl.appendChild(windP);

    // UV index
    var newUV = data.current.uvi;
    console.log(newUV);
    var uvP = document.createElement("p");
    uvP.innerHTML = "UV Index: " + newUV;
    cityContainerEl.appendChild(uvP);

    if (newUV <2) {
        uvP.setAttribute("style", "background-color: green");
    } else if ( newUV >2 && newUV < 5) {
        uvP.setAttribute("style", "background-color: yellow");
    } else {
        uvP.setAttribute("class", "background-color: red");
    }
    // // icon
    // var newIcon = data.current.weather[0].icon;
    // console.log(newIcon);
    // document.querySelector(".icon").src = "https://openweathermap.org/img/wn/"+newIcon+".png";
};

var displayFiveDay = function (data, city) {
    for (var i = 1 ; i < 5 ; i++) {
        var dayDiv = document.createElement("div");
        fiveDayEl.appendChild(dayDiv);
        // low temp
        var lowP = document.createElement("p");
        var tempLow =data.daily[i].temp.min;
        lowP.innerHTML= "Low temp: "+tempLow;
        dayDiv.appendChild(lowP);
        console.log(tempLow);

    }
}

userFormEl.addEventListener("submit", formSubmitHandler);