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

const getLocationDetails = async ({ lat, long }) => {
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

const updateDomElements = (data) => {
  console.log(data);
};

window.addEventListener("load", (e) => {
  getCurrentGeoLocation()
    .then(getLocationDetails)
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
