﻿var OpenWeatherAppKey = "2c24436d9d9a44bc6d9eae99d7835bb9"; //5bb30b963a0d79993 b96acd6ce552b0c 
function getWeatherWithCityName() {
    var cityName = $('#city-name-input').val();
    var queryString =
        'http://api.openweathermap.org/data/2.5/weather?q='
        + cityName + '&appid=' + OpenWeatherAppKey; 
    $.getJSON(queryString, function (results) {
        showWeatherData(results);
    }).fail(function (jqXHR) {
        $('#error-msg').show();
        $('#error-msg').text("Error retrieving data. " + jqXHR.statusText);
    });
    return false;
}
function showWeatherData(results) {
    if (results.weather.length) {
        $('#error-msg').hide();
        $('#weather-data').show();
        $('#title').text(results.name);
        $('#temperature').text(Math.round(results.main.temp - 273.15));
        $('#wind').text(results.wind.speed);
        $('#humidity').text(results.main.humidity);
        $('#visibility').text(results.weather[0].main);
        var sunriseDate = new Date(results.sys.sunrise * 1000);
        $('#sunrise').text(sunriseDate.toLocaleTimeString());
        var sunsetDate = new Date(results.sys.sunset * 1000);
        $('#sunset').text(sunsetDate.toLocaleTimeString());
    } else {
        $('#weather-data').hide();
        $('#error-msg').show();
        $('#error-msg').text("Error retrieving data. ");
    }
}

function showWeatherWithGeolocationData(results){
    if (results.weather.length) {
        $('#error-msg').hide();
        $('#weather-data').show();
        $('#title').text(results.name);
        $('#temperature').text(Math.round((results.main.temp - 32)*5/9));
        $('#wind').text(results.wind.speed);
        $('#humidity').text(results.main.humidity);
        $('#visibility').text(results.weather[0].main);
        var sunriseDate = new Date(results.sys.sunrise * 1000);
        $('#sunrise').text(sunriseDate.toLocaleTimeString());
        var sunsetDate = new Date(results.sys.sunset * 1000);
        $('#sunset').text(sunsetDate.toLocaleTimeString());
    } else {
        $('#weather-data').hide();
        $('#error-msg').show();
        $('#error-msg').text("Error retrieving data. ");
    }
}

//export
    function getWeatherWithGeoLocation() {
    //Метод getCurrentPosition вика Cordova Geolocation API

    navigator.geolocation.getCurrentPosition(onGetLocationSuccess, onGetLocationError,
        { enableHighAccuracy: true });
    $('#error-msg').show();
    $('#error-msg').text('Determining your current location ...');
    $('#get-weather-btn').prop('disabled', true);
}

function onGetLocationSuccess(position) {
    //Изтегляне на информация за локацията на устройството от обекта position
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var queryString = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude
        + '&lon=' + longitude + '&appid=' + OpenWeatherAppKey + '&units=imperial';
    $('#get-weather-btn').prop('disabled', false);
    $.getJSON(queryString, function (results) {
        showWeatherWithGeolocationData(results);
    }).fail(function (jqXHR) {
        $('#error-msg').show();
        $('#error-msg').text("Error retrieving data. " + jqXHR.statusText);
    });
}

function onGetLocationError(error) {
    $('#error-msg').text('Error getting location');
    $('#get-weather-btn').prop('disabled', false);
}