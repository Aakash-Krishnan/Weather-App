const container = document.getElementById("container");

const celsius = document.getElementById("celsius");
const region = document.getElementById("region");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const cloudImg = document.getElementById("cloud-img");
const country = document.getElementById("country");

const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");

document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "i") searchInput.focus();
});

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

searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    getLocationDatas();
  }
});

searchBtn.addEventListener("click", () => {
  getLocationDatas();
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

const getLocationDatas = async (e) => {
  const value = searchInput.value;
  if (value.trim()) {
    try {
      const res = await searchWeatherData(value);
      revieveDataAndUpdateDom(res);
      searchInput.value = "";
    } catch (err) {
      alert("Can't find the location");
      console.log(err);
    }
  } else {
    alert("Enter a location to seach...");
  }
};

const updateDomElements = (data) => {
  celsius.innerHTML = `${data.temp}&degC`;
  region.innerText = data.name;
  humidity.innerHTML = `${data.humidity}%`;
  windSpeed.innerHTML = `${data.windSpeed} Km/h`;
  country.innerText = data.country;

  const hour = new Date(data.localTime).getHours();

  if (hour < 4 || hour >= 18) {
    // console.log("Night", cloudImg);
    container.style.background = "rgb(35,36,0)";
    container.style.background =
      "linear-gradient(153deg, rgba(35,36,0,1) 0%, rgba(0,2,14,1) 0%, rgba(0,20,46,1) 46%, rgba(0,212,255,1) 99%)";
    cloudImg.src = "./assests/moon.png";
    country.style.color = "rgb(144, 220, 245)";
  } else if (hour >= 4 || hour < 18) {
    // console.log("DAY", cloudImg);
    container.style.background = "rgb(35,36,0)";
    container.style.background =
      "linear-gradient(140deg, rgba(35,36,0,1) 0%, rgba(248,255,207,20) 0%, rgba(0,212,255,1) 99%)";
    cloudImg.src = "./assests/sun.png";
    country.style.color = "rgb(5, 62, 79)";
  }
};

window.addEventListener("load", (e) => {
  getCurrentGeoLocation()
    .then(getWeatherLocationDetails)
    .then(revieveDataAndUpdateDom)
    .catch((err) => console.log("err", err));
});

const revieveDataAndUpdateDom = (res) => {
  console.log(res);
  const humidity = res.current.humidity;
  const name = res.location.name;
  const temp = res.current.temp_c;
  const windSpeed = res.current.wind_kph;
  const localTime = res.location.localtime;
  const country = res.location.country;
  updateDomElements({ humidity, name, temp, windSpeed, localTime, country });
};
