var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city");
var cityContainerEl = document.getElementById("city-container");
var citySearchTerm = document.querySelector("#city-search-term");
var currentTempEl= document.querySelector("#currentTemp");
var fiveDayEl = document.querySelector(".cityFiveDay");

//var allCities = [];
var historyContainerEl = document.querySelector("#historyContainer");
var cityQueryEl=document.querySelector(".cityQuery");





// 1)Create the search function
// 2)display current city conditions
//      name, current date, icon representative for current weather, temperature, humidity, wind speed, and UV index with color indication
//      future weather conditions for that city
// 3)5 day forecast
//      date, icon rep of weather, temp, wind speed, humidity
//4)city goes in history and is clickable

var getCityLocation = function (city) {
   
    var geoApiUrl = "https://api.openweathermap.org/geo/1.0/direct?q="+city+"&limit=1&appid=526fc11b10a27117543151b1de2f92b6";
   // if (geoApiUrl=![]) {
       
    
    fetch(geoApiUrl).then(function(response) {
        // if (geoApiUrl = []) {
        //     alert("Error: City Not Found");
        //     return;
        // } else
        if(response.ok) {
            response.json().then(function(data) {
            console.log(response);
                var newLat = data[0].lat;
                var newLon = data[0].lon;
            getCityWeather(newLon, newLat,city);
            saved(city)
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


// Fetch the api
var getCityWeather = function(lon,lat,city) {
    // format the weather api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon +"&units=imperial&appid=526fc11b10a27117543151b1de2f92b6";
    
    // make a request to the url
    fetch(apiUrl).then(function(response) {
        console.log(response);
        if(response.ok) {
            response.json().then(function(data) {
                console.log(data);
            displayCity(data,city);
            displayFiveDay(data, city); 
            loadCities();
            
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
        getCityLocation(city);
        //saved(city)
    } else {
        alert("Please enter a city");
    }
};

var displayCity = function(data, citySearchTerm) {
      console.log(data);  
    console.log(citySearchTerm);
    // clear old content
     cityContainerEl.textContent = "";
     //newCitySearchTerm.textContent = citySearchTerm;
     //console.log(newCitySearchTerm);
     cityInputEl.value = "";
    //display info
     
    //icon
    var todayIcon = data.current.weather[0].icon;
    var currentIconEl = document.createElement("img");
    currentIconEl.setAttribute("src", "https://openweathermap.org/img/wn/"+todayIcon+"@2x.png");
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
    
};

//need dates
var displayFiveDay = function (data, city) {
    fiveDayEl.textContent = "";
    //var titleP = document.createElement("h3");
    //titleP.className = "font-weight-bold text-left";
    //titleP.textContent = "Five Day Forecast:"
    //fiveDayEl.appendChild(titleP);
    for (var i = 1 ; i < 6 ; i++) {
        var dayDiv = document.createElement("div");
        dayDiv.className = "card bg-info mb-3 text-center";
        dayDiv.style= "width: 18rem;";
        fiveDayEl.appendChild(dayDiv);

        var dailyIconEl = document.createElement("img");
        var dailyIcon = data.daily[i].weather[0].icon;
        dailyIconEl.setAttribute("src", "https://openweathermap.org/img/wn/"+dailyIcon+"@2x.png");
        dayDiv.appendChild(dailyIconEl);

        var cardBodyEl = document.createElement('div');
        cardBodyEl.className="card-body";
        dayDiv.appendChild(cardBodyEl);
        // Dates
        var dateP = document.createElement("h5");
        dateP.className="card-title";
        var newDate = moment.unix(data.daily[i].dt).format("M/D/YY");
        dateP.innerHTML=newDate;
        cardBodyEl.appendChild(dateP);

        //create UL
        var listGroupEl = document.createElement("ul");
        listGroupEl.className="list-group list-group-flush";
        dayDiv.appendChild(listGroupEl);
        
        // low temp
        var lowP = document.createElement("li");
        lowP.className = "list-group-item";
        var tempLow =data.daily[i].temp.min;
        lowP.innerHTML= "Low temp: "+tempLow;
        listGroupEl.appendChild(lowP);
        
        //high temp
        var highP = document.createElement("li");
        highP.className = "list-group-item";
        var tempHigh = data.daily[i].temp.max;
        highP.innerHTML= "High temp: "+tempHigh;
        listGroupEl.appendChild(highP);
        //wind speed
        var wSpeedP = document.createElement("li");
        wSpeedP.className = "list-group-item";
        var wSpeed = data.daily[i].wind_speed;
        wSpeedP.innerHTML= "Wind Speed: "+wSpeed;
        listGroupEl.appendChild(wSpeedP);
        //humidity
        var humP = document.createElement("li");
        humP.className = "list-group-item";
        var humidityDaily = data.daily[i].humidity;
        humP.innerHTML= "Humidity: "+humidityDaily;
        listGroupEl.appendChild(humP);
    }
}

var saved = function(city) {
       
     var oldCity = JSON.parse(localStorage.getItem('cities')) ||[];
     if (oldCity.includes(city)===false){
         oldCity.unshift(city)
         localStorage.setItem('cities', JSON.stringify(oldCity));
     }
   
     
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
    ctyBtn.className = "cityButton btn-warning";
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
