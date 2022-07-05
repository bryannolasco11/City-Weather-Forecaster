var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city");
var cityContainerEl = document.getElementById("city-container");
var citySearchTerm = document.querySelector("#city-search-term");
var currentTempEl= document.querySelector("#currentTemp");
var fiveDayEl = document.querySelector(".cityFiveDay");
var newCitySearchTerm = "Brookfield";
var allCities = [];
var historyContainerEl = document.querySelector("#historyContainer");

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
    
    // make a request to the url
    fetch(apiUrl).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                console.log(data);
            displayCity(data,city);
            displayFiveDay(data, city); 
            loadCities();
            //save(city);
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
   
    var geoApiUrl = "http://api.openweathermap.org/geo/1.0/direct?q="+city+"&limit=1&appid=526fc11b10a27117543151b1de2f92b6";
    
    
    fetch(geoApiUrl).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
            
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
    if (city) {
        getCityLocation(city);
        saved(city)
    } else {
        alert("Please enter a city");
    }
};

var displayCity = function(data, citySearchTerm) {
        

    // clear old content
     cityContainerEl.textContent = "";
     newCitySearchTerm.textContent = citySearchTerm;

    //display info
     
    //icon
    var todayIcon = data.current.weather[0].icon;
    var currentIconEl = document.createElement("img");
    currentIconEl.setAttribute("src", "http://openweathermap.org/img/wn/"+todayIcon+"@2x.png");
    cityContainerEl.appendChild(currentIconEl);
     // display city name and date
     var todayDate = moment.unix(data.current.dt).format("M/D/YY");
     var cityP = document.createElement("p");
     cityP.innerHTML = citySearchTerm + " "+todayDate;
     cityContainerEl.appendChild(cityP);
   
    // current temp
    var newCityTemp = data.current.temp;
    
    var tempP = document.createElement("p");
    tempP.innerHTML = "Current Temp: " + newCityTemp +" degrees F";
    cityContainerEl.appendChild(tempP);
//     // how do I get the date?
    
//     var dateTemp = data.dt;
//     console.log(dateTemp);
    
     // current humidity
    var newHumidity = data.current.humidity;
   
    var humidityP = document.createElement("p");
    humidityP.innerHTML = "Humdity: " +newHumidity + "%";
    cityContainerEl.appendChild(humidityP);

     // current wind speed
    var newWindSpeed = data.current.wind_speed;
    
    var windP = document.createElement("p");
    windP.innerHTML = "Wind Speed: " + newWindSpeed + " MPH"; 
    cityContainerEl.appendChild(windP);

    // UV index
    var newUV = data.current.uvi;
    
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

//need dates
var displayFiveDay = function (data, city) {
    fiveDayEl.textContent = "";
    for (var i = 1 ; i < 6 ; i++) {
        var dayDiv = document.createElement("div");
        fiveDayEl.appendChild(dayDiv);
        
        // Dates
        var dateP = document.createElement("p");
        var newDate = moment.unix(data.daily[i].dt).format("M/D/YY");
        dateP.innerHTML=newDate;
        dayDiv.appendChild(dateP);

        // icon
        var dailyIconEl = document.createElement("img");
        var dailyIcon = data.daily[i].weather[0].icon;
        dailyIconEl.setAttribute("src", "http://openweathermap.org/img/wn/"+dailyIcon+"@2x.png");
        dayDiv.appendChild(dailyIconEl);
        // low temp
        var lowP = document.createElement("p");
        var tempLow =data.daily[i].temp.min;
        lowP.innerHTML= "Low temp: "+tempLow;
        dayDiv.appendChild(lowP);
        
        //high temp
        var highP = document.createElement("p");
        var tempHigh = data.daily[i].temp.max;
        highP.innerHTML= "High temp: "+tempHigh;
        dayDiv.appendChild(highP);
        //wind speed
        var wSpeedP = document.createElement("p");
        var wSpeed = data.daily[i].wind_speed;
        wSpeedP.innerHTML= "Wind Speed: "+wSpeed;
        dayDiv.appendChild(wSpeedP);
        //humidity
        var humP = document.createElement("p");
        var humidityDaily = data.daily[i].humidity;
        humP.innerHTML= "Humidity: "+humidityDaily;
        dayDiv.appendChild(humP);
    }
}

// //var save = function (newCity) {
//     console.log(newCity);
//     if (localStorage.getItem('allCities') == null) {
//         localStorage.setItem('allCities', '[]');
//     }

//     // for (var i = 0; i < cities.length; i++) {
//     //     if (newCity == cities[i]) {
//     //         console.log("I am in the city loop");
//     //         citySearchHistory();
//     //     }
//     // }

    
//     allCities.push(newCity);
//     console.log(allCities);
//     localStorage.setItem("allCities", JSON.stringify(allCities));

// }

// var citySearchHistory = function() {
//     console.log("this is the end");
// }


var saved = function(city) {
  
    //  if (localStorage.getItem('cities')==null)  {
    //      localStorage.setItem('cities', "[]");
    //  }
     
     var oldCity = JSON.parse(localStorage.getItem('cities')) ||[];
     if (oldCity.includes(city)===false){
         oldCity.unshift(city)
         localStorage.setItem('cities', JSON.stringify(oldCity));
     }
    //  for (i=0; i <oldCity.length;i++)
    //  var eachCity=oldCity[i];
    //  console.log(eachCity);
    //  if (savedCity=eachCity) {
    //      loadCities();
    //  }
     
     
     console.log(oldCity);
    
}

var loadCities = function() {
    historyContainerEl.innerHTML="";
    cityArr = JSON.parse(localStorage.getItem("cities")) || [];
    console.log(cityArr);
    
        for (i=0; i <9; i++) {
            var eachCity = cityArr[i];
            if(eachCity != undefined){
            cityButtons(eachCity);}
        }
       
    
}

var cityButtons = function(newEachCity) {
    var ctyBtn = document.createElement("button");
    ctyBtn.innerHTML=newEachCity;
    console.log(newEachCity);
    historyContainerEl.appendChild(ctyBtn);
    ctyBtn.classList.add('cityButton');
   ctyBtn.onclick=clickAnswer;

}
function clickAnswer(e) {
    e.preventDefault;
    var clickedCity=e.target;
    console.log(clickedCity.textContent);
    
    getCityLocation(clickedCity.textContent)
}

loadCities()
userFormEl.addEventListener("submit", formSubmitHandler);
