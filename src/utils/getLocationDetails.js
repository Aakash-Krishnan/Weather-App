export async function getLocationDetails(search = "") {
  let type;
  if (search !== "") {
    type = `${search}`;
  } else {
    const { lat, long } = await getLatAndLong();
    type = `${lat},${long}`;
  }
  const url = `https://api.weatherapi.com/v1/current.json?key=95f4d3f7b64944a3a6b143731240305&q=${type}&aqi=no`;
  try {
    const data = await fetch(url);
    const res = await data.json();
    return res;
  } catch (err) {
    return err;
  }
}

const getLatAndLong = () => {
  return new Promise((res, rej) => {
    window.navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const lat = coords.latitude;
        const long = coords.longitude;
        res({ lat, long });
      },
      ({ message }) => {
        rej(message);
      }
    );
  });
};
