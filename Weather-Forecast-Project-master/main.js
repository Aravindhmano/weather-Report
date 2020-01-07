var rawOffset;
var dstOffset;
var sunrise;
var sunset;
var localTime;

$(document).ready(function() {
    // $(".searchButton").on('click', function()
    $(".searchBox").on('change', function() {
        var $location = $(".searchBox").val();
        // $(".searchBox").val("");

        if($location === "") {
            return;
        }

        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/weather?q=" + $location + 
            "&units=metric&APPID=d8df22d5293c881d155481528cea7dfb",
            type: "GET",
            dataType: "jsonp",
            success: function(data) {
                setCurrentDay(data);
                $(".content").css("display", "block");       
            }
        });
    });
});

// CURRENY DAY

function setCurrentDay(data) {
    var cityName = data.name;
    var country = data.sys.country;
    var lon = data.coord.lon;
    var lat = data.coord.lat;
    var timestamp = data.dt;
    var weatherID = data.weather[0].id;
    var description = data.weather[0].description; 
    var temp = data.main.temp;
    var windSpeed = data.wind.speed;
    var windDir = data.wind.deg;
    var clouds = data.clouds.all;
    var pressure = data.main.pressure;
    sunrise = data.sys.sunrise;
    sunset = data.sys.sunset;

    var date = getDate(timestamp);
    var isDay = isDayTime(localTime, sunrise, sunset);

    var weatherIcon = setWeatherIcon(weatherID, isDay);
    setBackground(weatherID, isDay);
    
    // SETTING MAIN INFO
    $("#mainLoc").html(cityName);
    $("#currentDate").html(date);
    $("#currentIcon").removeClass().addClass(weatherIcon);
    $("#mainTemp").html(Math.floor(temp) + "°C");
    $("#mainDescr").html(description);
    $("#windSpeed").html(windSpeed + " m/s");
    $("#windIcon").removeClass().addClass(getWindIcon(windDir));
    $("#pressure").html(pressure + " hPa");
    $("#clouds").html(clouds + "%");    
}

function isDayTime(localTime, sunrise, sunset) {
    
    return localTime > sunrise && localTime < sunset;
}

function getDate(timestamp) {
    var date = new Date(timestamp * 1000);
    var day = date.getDate();
    var month = +(date.getMonth()) + 1;

    if(month < 10) {
        month = "0" + month;
    }

    if(day < 10) {
        day = "0" + day;
    }

    return day + "." + month;
}

function setWeatherIcon(weatherID, isDay) {
    var weatherIcon;
    switch((weatherID.toString()).charAt(0)) {
        case "2" : 
            weatherIcon = "wi wi-thunderstorm";
            break;
        case "3" : 
            weatherIcon = "wi wi-rain";
            break;
        case "5" : 
            weatherIcon = "wi wi-rain";
            break;
        case "6" : 
            weatherIcon = "wi wi-snow";
            break;
        case "7" : 
            weatherIcon = "wi wi-dust";
            break;
        case "8" :
            if(isDay) {
                if(weatherID.toString().charAt(2) == 0) {
                    weatherIcon = "wi wi-day-sunny";
                } else if(weatherID.toString().charAt(2) == 1) {
                    weatherIcon = "wi wi-day-sunny-overcast";
                } else {
                    weatherIcon = "wi wi-cloudy";
                }
            } else {
                if(weatherID.toString().charAt(2) == 0) {
                    weatherIcon = "wi wi-night-clear";
                } else if(weatherID.toString().charAt(2) == 1) {
                    weatherIcon = "wi wi-night-partly-cloudy";
                } else {
                    weatherIcon = "wi wi-cloudy";
                }    
            } 
            break;
    }
    
    return weatherIcon;
}

function setBackground(weatherID, isDay) {
    switch((weatherID.toString()).charAt(0)) {
        case "2" : 
            $("body").css("background-image", "url(css/images/thunderstorm.jpg)");
            break;
        case "3" : 
            $("body").css("background-image", "url(css/images/rain.jpg)");
            break;
        case "5" : 
            $("body").css("background-image", "url(css/images/rain.jpg)");
            break;
        case "6" : 
            $("body").css("background-image", "url(css/images/snow.jpg)");
            break;
        case "7" : 
            $("body").css("background-image", "url(css/images/fog.jpg)");
            break;
        case "8" :
            if(isDay) {
                if(weatherID.toString().charAt(2) == 0) {
                    $("body").css("background-image", "url(css/images/sunny.jpg)");
                } else if(weatherID.toString().charAt(2) == 1) {
                    $("body").css("background-image", "url(css/images/sunny-overcast.jpg)");
                } else {
                    $("body").css("background-image", "url(css/images/cloudy.jpg)");
                }
            } else {
                if(weatherID.toString().charAt(2) == 0) {
                    $("body").css("background-image", "url(css/images/night-clear.jpg)");
                } else if(weatherID.toString().charAt(2) == 1) {
                    $("body").css("background-image", "url(css/images/night-partly-cloudy.jpg)");
                } else {
                    $("body").css("background-image", "url(css/images/night-cloudy.jpg)");
                }    
            } 
            break;
    }
}

function getWindIcon(windDir) {
    if(windDir == 0) {
        return "wi wi-direction-right";
    } else if(windDir < 90) {
        return "wi wi-direction-up-right";
    } else if(windDir == 90) {
        return "wi wi-direction-up";
    } else if(windDir < 180 ) {
        return "wi wi-direction-up-left";
    } else if(windDir == 180 ) {
        return "wi wi-direction-left";
    } else if(windDir < 270) {
        return "wi wi-direction-down-left";
    } else if(windDir == 270) {
        return "wi wi-direction-down";
    } else if(windDir > 270 ) {
        return "wi wi-direction-down-right";
    } 
}

