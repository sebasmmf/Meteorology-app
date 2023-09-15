//ID API
const apiId = "469f37dfbf9a754e35eea5e1d31575d1";
const url_base = 'https://api.openweathermap.org/data/2.5/';

//Longitude and Latitude Variables
let lon = "";
let lat = "";

//Function gets the longitude and latitude from the navigator to get the current weather in these location
window.addEventListener("load",() => {

  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition((position) =>{

      lon = position.coords.longitude;
      lat = position.coords.latitude;

      const autoCheckWeather = async() =>{
        try{
          const response = await fetch(url_base + 'weather?' +'lat='+ lat + '&lon='+ lon + '&appid=' + apiId + '&units=metric');

          if(response.status === 200){
          const data = await response.json();
            let city = data.name;
            let icon = data.weather[0].icon;
            let summary = data.weather[0].description;
            let temp = Math.round(data.main.temp);
            
            let card = document.getElementById("result");
            let Html = `
              <div class="card__content --card__style">
                <h2 class="city_name">${city}</h2>
                <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="icon" class="icons"> 
                <h2 class="temperature">${temp}°C</h2>
                <h3 class="summary">${summary}</h3>
              </div>
              `;            
            card.innerHTML = Html;
          }

        } 
        catch(error){
            console.error;
        }
      }
      autoCheckWeather();
    });
  };
});

//Function gets the longitude and latitude from the navigator to get the weather forecast in these location (IN PRODUCTION)
window.addEventListener("load",() => {

  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition((position) =>{

      lon = position.coords.longitude;
      lat = position.coords.latitude;

      const checkForecast = async() =>{
        try{
          const response = await fetch(url_base + 'forecast?' +'lat='+ lat + '&lon='+ lon + '&appid=' + apiId + '&units=metric');
          console.log(response);

          if(response.status === 200){
            const data = await response.json();
            console.log(data);

            let date = data.list[0].dt_txt;
            let description = data.list[0].weather[0].description;
            let icon = data.list[0].weather[0].icon;
            let tempMax = Math.round(data.list[0].main.temp_max);
            let tempMin = Math.round(data.list[0].main.temp_min);
            
            let card = document.getElementById("table");
            let Html = `
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>icon</th>
                    <th>temp max</th>
                    <th>temp min</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>${date}</th>
                    <th>${description}</th>
                    <th><img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="icon" class="table_icons"></th>
                    <th>${tempMax}°C</th>
                    <th>${tempMin}°C</th>
                  </tr>
                </tbody>
              </table>
              `;            
            card.innerHTML = Html;
          }
        } 
       catch(error){
            console.error;
        }
      }
      checkForecast();
    });
  };
});

//Function to search the weather according the city
async function searchWeather(city){
  try{
    const response = await fetch(url_base +'weather?'+ 'q='+ city + '&appid=' + apiId + '&units=metric');

    if(response.status == 200){
      const data = await response.json();
      console.log(data);          
      let city = data.name;
      let icon = data.weather[0].icon;
      let summary = data.weather[0].description;
      let temp = Math.round(data.main.temp);
      
      let card = document.getElementById("find_weather");
      let Html = `
        <div class="card__content --card__style">
          <h2 class="city_name">${city}</h2>
          <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="icon" class="icons"> 
          <h2 class="temperature">${temp}°C</h2>
          <h3 class="summary">${summary}</h3>
        </div>
        `;            
      card.innerHTML = Html;

    }else if(response.status == 404){
      alert("city not founded");
    }
  } 
  catch(error){
    console.error;
  }

};

//SearchWeather Function is executed according the input value
const searchBox = document.getElementById("search");
const searchBtn = document.getElementById("send");

searchBtn.addEventListener("click",() =>{
  searchWeather(searchBox.value);
  document.getElementById("weatherResult").classList.add('visible');
});

//Show the currentWeather Card
const locationBtn = document.getElementById("location");

locationBtn.addEventListener("click",() =>{
  document.getElementById("currentWeather").classList.add('visible');
});

//Hide the weatherResult Card
const closedCardSearch = document.getElementById("btnClosedSearch");

closedCardSearch.addEventListener("click",() =>{
  document.getElementById("weatherResult").classList.remove('visible');
});

//Hide the currentWeather Card
const closedCardCurrent = document.getElementById("btnClosedCurrent");

closedCardCurrent.addEventListener("click",() =>{
  document.getElementById("currentWeather").classList.remove('visible');
});