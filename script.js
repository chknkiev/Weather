// let currentWeather = [];
// const container = document.getElementById('container');
// const card = document.createElement('div');

// //Fetch data from Openweathermap API
// async function fetchWeather(location = "London") {
//   const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q= + ${location} + &APPID=93b3d1cf5fb24969e5e8bd269a7696ae`, { mode: 'cors' });
//   const weather = await response.json();
//   return weather
// };

// //Process data returned from fetch into the class
// async function a() {
//   try {
//     const result = await fetchWeather()
//     console.log(result)
//     let locName = result.name;
//     let locCountry = weather.sys.country;
//     let locIcon = weather.weather[0].icon;
//     let locTemp = weather.main.temp;
//     let locMax = weather.main.temp_max;
//     let locMin = weather.main.temp_min;
//     let locDesc = weather.weather[0].main;
  
//     currentWeather.push(new weatherObj(locName, locCountry, locIcon, locTemp, locMax, locMin, locDesc));
  
//     domElements()
//   } catch(e) {
//     console.log(e)
//   }
// }
// // fetchWeather().then(weather => {
//   // let locName = weather.name;
//   // let locCountry = weather.sys.country;
//   // let locIcon = weather.weather[0].icon;
//   // let locTemp = weather.main.temp;
//   // let locMax = weather.main.temp_max;
//   // let locMin = weather.main.temp_min;
//   // let locDesc = weather.weather[0].main;

//   // currentWeather.push(new weatherObj(locName, locCountry, locIcon, locTemp, locMax, locMin, locDesc));

//   // domElements()
// // });

// const locInput = document.getElementById('location-input');
// const locButton = document.getElementById('location-button');

// locButton.addEventListener('click', event => {
//   container.innerHTML = '';
//   fetchWeather(locInput.value);
// })

// //Class
// class weatherObj {
//   constructor(name, country, icon, temp, max, min, description) {
//     this.name = name,
//     this.country = country,
//     this.icon = icon,
//     this.temp = temp,
//     this.max = max,
//     this.min = min,
//     this.description = description
//   };
// };

// function domElements() {
//   container.appendChild(card);
 
//   let currentName = document.createElement('div');
//   currentName.innerHTML = currentWeather[0].name;
//   currentName.classList.add('name');
//   card.appendChild(currentName);

//   let currentCountry = document.createElement('div');
//   currentCountry.innerHTML = currentWeather[0].country;
//   currentCountry.classList.add('country');
//   card.appendChild(currentCountry);

//   let currentIcon = document.createElement('div');
//   currentIcon.innerHTML = currentWeather[0].icon;
//   currentIcon.classList.add('icon');
//   card.appendChild(currentIcon);

//   let currentTemp = document.createElement('div');
//   currentTemp.innerHTML = currentWeather[0].temp;
//   currentTemp.classList.add('temp');
//   card.appendChild(currentTemp);

//   let currentMax = document.createElement('div');
//   currentMax.innerHTML = currentWeather[0].max;
//   currentMax.classList.add('max');
//   card.appendChild(currentMax);

//   let currentMin = document.createElement('div');
//   currentMin.innerHTML = currentWeather[0].min;
//   currentMin.classList.add('min');
//   card.appendChild(currentMin);
// }

//Fetch data from Openweathermap API
async function fetchWeather(location) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=93b3d1cf5fb24969e5e8bd269a7696ae`,
    {
      method: "GET",
      mode: "cors",
      headers: {
        accept: "application/json"
      }
    }
  );
  return await response.json();
}

// Render data to the DOM
const renderDomElements = (data) => {
  const { name, country, icon, temp, max, min, desc } = data;

  document.getElementById("container").innerHTML = `
  <div id="card">
    <div id="name">${name}, ${country}</div>
    <div id="temp">Temp: ${temp}</div>
    <div id="max">Max: ${max}</div>
    <div id="min">Min: ${min}</div>
    <div id="desc">Description: ${desc}</div>
  </div>
  `;
};

// Fetch data based in Input box and invoke renderDomElements
async function run() {
  try {
    const locationString = document.getElementById("location").value;

    const result = await fetchWeather(locationString);

    const data = {
      name: result.name,
      country: result.sys.country,
      icon: result.weather[0].icon,
      temp: Math.round((result.main.temp - 273.15) * 1) / 1,
      max: Math.round((result.main.temp_max - 273.15) * 1) / 1,
      min: Math.round((result.main.temp_min - 273.15) * 1) / 1,
      desc: result.weather[0].main
    };

    renderDomElements(data);
  } catch (e) {
    console.log("error", e);
  }
}

// Add an event listener, so run function is invoked every time you click the button
document.getElementById("set-location").addEventListener("click", run);

function kToCelcius(num) {
  Math.round((num - 273.15) * 100) / 100;
}