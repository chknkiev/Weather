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
  const { name, country, temp, max, min, desc } = data;

  document.getElementById("container").innerHTML = `
  <div id="card">
    <div id="name">${name}, ${country}</div>
    Temp: <div id="temp">${temp}</div>
    Max: <div id="max">${max}</div>
    Min: <div id="min">${min}</div>
    Description: <div id="desc">${desc}</div>
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
    document.getElementById("to-fahrenheit").disabled = false;
    renderDomElements(data);
    backgroundColor();
  } catch (e) {
    console.log("error", e);
  }
};

//Conversion of celcius to fahrenheit
const toFahrenheit = () => {
  const temp = document.getElementById('temp');
  temp.innerHTML = Math.round(((temp.textContent * 9/5) + 32) * 1) / 1;

  const max = document.getElementById('max');
  max.innerHTML = Math.round(((max.textContent * 9/5) + 32) * 1) / 1;
  
  const min = document.getElementById('min');
  min.innerHTML = Math.round(((min.textContent * 9/5) + 32) * 1) / 1;
  
  document.getElementById("to-fahrenheit").disabled = true;
}

// Add an event listener, so run function is invoked every time you click the button
document.getElementById("set-location").addEventListener("click", run);
//Add an event listener. so toFahrenheit function is invoked upon click
document.getElementById("to-fahrenheit").addEventListener("click", toFahrenheit);


const backgroundColor = () => {
  if(document.getElementById('desc').innerHTML == 'clear')
    body.backgroundColor = lightblue;
};