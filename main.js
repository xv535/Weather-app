"use strict";

const api = {
    key: "752acc1ee491d68ff1c7dd2db4faaf44",
    base: "http://api.openweathermap.org/data/2.5/",
};

const searchBox = document.querySelector('.search-box');


searchBox.addEventListener("keypress", setQuery, true);

function setQuery(evt) {
    if (evt.keyCode === 13) {
        getResult(searchBox.value);
    }
}

function getResult(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(weather => {
            return weather.json();
        })
        .then(displayResults);
}

function displayResults(weather) {
    console.log(weather);
    const city = document.querySelector('.city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    const date = document.querySelector('.location .date');
    let nowDate = new Date();
    let options = {
        day: 'numeric',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
    };
    date.innerText = `${nowDate.toLocaleString("ru", options)}`;

    const temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)} <span>°c</span>`;

    const hiLow = document.querySelector('.current .hi-low');
    hiLow.innerHTML = `${Math.round(weather.main.temp_max)} <span>°c</span> / ${Math.round(weather.main.temp_min)} <span>°c</span>`;

    const nowWeather = document.querySelector('.current .weather');
    nowWeather.innerText = `${weather.weather[0].main}`;
}

// kyiv