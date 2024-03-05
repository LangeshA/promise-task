

fetch(`https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=in&max=10&apikey=50f3d675245bfa385f0cd9cd4b0b03c4`)
  .then((response) => response.json())
  .then((data) => {
    displayNewsData(data);
  })
  .catch((error) => {
    console.log("Error fetching news data:", error);
  });


fetch("https://api.coincap.io/v2/assets")
  .then((response) => response.json())
  .then((data) => {
    displayCoinData(data);
  })
  .catch((error) => {
    console.log("Error fetching coin data:", error);
  });

let capitalNames = [];
let flagNames = [];


fetch("https://restcountries.com/v3.1/all")
  .then((response) => response.json())
  .then((countries) => {
    

    capitalNames = countries.map((country) => country.capital);
    flagNames = countries.map((country) => country.flags.png);
    let id = 0;
    for (i = 0; i < capitalNames.length; i++) {
      let city = capitalNames[i] && capitalNames[i][0];
      let flag = flagNames[i];
      const apiKeyWeather = "eb1c3a568d58f0c9854cfd72f5d5cc1c";

      

      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&limit=5&appid=${apiKeyWeather}`
      )
        .then((response) => response.json())
        .then((data) => {
          id++;
          displayWeatherData(data, id, flag);
        })
        .catch((error) => {
          console.log("Error fetching weather data:", error);
        });
    }
  })
  .catch((error) => {
    console.log("Error fetching data:", error);
  });



function displayNewsData(data) {
  const newsDataContainer = document.getElementById("newsData");
  console.log(data)
  const articles = data.articles; 

  for(i=0;i<articles.length;i++) {
    
    if (
      articles[i].urlToImage !== null &&
      articles[i].title !== null &&
      articles[i].description !== null &&
      articles[i].url !== null
    ) {
      newsDataContainer.innerHTML += `
    <div class="col-12 col-sm-6  col-lg-4 ">
           <div class="card m-2 p-4 d-flex flex-column justify-content-center align-items-center cardstyle">
               <img class="imagestyle" src="${articles[i].image}" />
                 <h6 class="card-title">${articles[i].title.slice(0, 60)}...</h6>
                  <p class="card-text">${articles[i].description.slice(0,100)}...</p>
                   <button class="buttonstyle"><a href=${articles[i].url} target="_blank">view detailes</a></button>
                   </div> 
           </div>
       `;
    }
  }
}



function displayCoinData(data) {
  const coins = data.data;
  const coinDataContainer = document.getElementById("coinData");

  for (let i = 0; i <coins.length ; i++) {
    const coin = coins[i];

    coinDataContainer.innerHTML += `
    <div class="col-12 col-sm-6 col-lg-4 " >
      <div class="card  m-2 p-4 d-flex flex-column justify-content-center align-items-center cardstyle1">
      <h4>${coin.rank}.${coin.name}( ${coin.symbol})</h4>
      <ul>    
      <li> Current Price is ${Number(coin.priceUsd * 83.09).toFixed(2)} INR</li>
      <li>  Market Cap is ${Number(coin.marketCapUsd * 83.09).toFixed(
        2
      )} INR</li>
      <li>  Volume per 24Hr is ${Number(coin.volumeUsd24Hr * 83.09).toFixed(
        2
      )} INR</li>
      <li>  ChangePercent per 24Hr is ${Number(
        coin.changePercent24Hr * 83.09
      ).toFixed(2)} INR</li>
          </ul>
      </div>
      </div>
    `;
  }
}

 

function displayWeatherData(data, id, flag) {
 
  if (data.cod === "404" || data.cod === "400") {
    console.log(
      `Error fetching weather data for ${capitalNames[id - 1]}: ${data.message}`
    );
    return;
  }

  const weatherDataContainer = document.getElementById("weatherData");
  weatherDataContainer.innerHTML += `
    <div class="col-12 col-sm-6 col-lg-4 " >
  <div class="card  m-2 p-4 d-flex flex-column justify-content-center align-items-center cardstyle1">
   <h5>${id}.${data.name}<img class="flagimage" src='${flag}' /></h5>
   <ul>
       <li> Temperature is ${Math.floor(data.main.temp - 272.15)} °C</li> 
       <li>  Feels like ${Math.floor(data.main.feels_like - 272.15)} °C , ${
    data.weather[0].description
  }</li> 
       <li>   Humidity is ${data.main.humidity}%</li> 
       <li>  windspeed is ${data.wind.speed} m/s N</li> 
  </ul>
       </div>
  </div>
       
   `;
}