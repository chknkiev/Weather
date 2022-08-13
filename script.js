const weather = document.getElementById('weather');

fetch('http://api.openweathermap.org/data/2.5/weather?q=London&APPID=93b3d1cf5fb24969e5e8bd269a7696ae', {mode: 'cors'})
.then(function(response) {
  return response.json();
})
.then(function(response) {
  weather.innerHTML = KtoCelcius(response.main.temp);
});

function KtoCelcius(temp) {
  return (temp-273.15);
}