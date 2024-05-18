const celsius = document.getElementById("celsius");
const region = document.getElementById("region");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const cloudImg = document.getElementById("cloud-img");
const container = document.getElementById("container");

const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");

const getCurrentGeoLocation = () => {
  return new Promise((resolve, reject) => {
    window.navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const lat = coords.latitude;
        const long = coords.longitude;
        resolve({ lat, long });
      },
      ({ message }) => {
        reject(message);
      }
    );
  });
};

searchBtn.addEventListener("click", async (e) => {
  const value = searchInput.value;
  if (value.trim()) {
    try {
      const res = await searchWeatherData(value);
      // console.log("SEACRH", res);

      const humidity = res.current.humidity;
      const name = res.location.name;
      const temp = res.current.temp_c;
      const windSpeed = res.current.wind_kph;
      const localTime = res.location.localtime;
      updateDomElements({ humidity, name, temp, windSpeed, localTime });
    } catch (err) {
      console.log(err);
    }
  } else {
    alert("Enter a location to seach...");
  }
});

const getWeatherLocationDetails = async ({ lat, long }) => {
  const url = `http://api.weatherapi.com/v1/current.json?key=95f4d3f7b64944a3a6b143731240305&q=${lat},${long}&aqi=no
    `;
  try {
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};

const searchWeatherData = async (search) => {
  console.log(search);
  const url = `http://api.weatherapi.com/v1/current.json?key=95f4d3f7b64944a3a6b143731240305&q=${search}&aqi=no`;
  try {
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};

const updateDomElements = (data) => {
  celsius.innerHTML = `${data.temp}&degC`;
  region.innerText = data.name;
  humidity.innerHTML = `${data.humidity}%`;
  windSpeed.innerHTML = `${data.windSpeed} Km/h`;

  const hour = new Date(data.localTime).getHours();

  if (hour < 4 || hour >= 18) {
    // console.log("Night", cloudImg);
    container.style.background = "rgb(35,36,0)";
    container.style.background =
      "linear-gradient(153deg, rgba(35,36,0,1) 0%, rgba(0,2,14,1) 0%, rgba(0,20,46,1) 46%, rgba(0,212,255,1) 99%)";
    cloudImg.src = "./assests/moon.png";
  } else if (hour >= 4 || hour < 18) {
    // console.log("DAY", cloudImg);
    container.style.background = "rgb(35,36,0)";
    container.style.background =
      "linear-gradient(140deg, rgba(35,36,0,1) 0%, rgba(248,255,207,20) 0%, rgba(0,212,255,1) 99%)";
    cloudImg.src = "./assests/sun.png";
  }
};

window.addEventListener("load", (e) => {
  getCurrentGeoLocation()
    .then(getWeatherLocationDetails)
    .then((res) => {
      const humidity = res.current.humidity;
      const name = res.location.name;
      const temp = res.current.temp_c;
      const windSpeed = res.current.wind_kph;
      const localTime = res.location.localtime;
      updateDomElements({ humidity, name, temp, windSpeed, localTime });
    })
    .catch((err) => console.log("err", err));
});
