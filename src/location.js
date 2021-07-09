const saveCoords = (coordsObject) => {
  localStorage.setItem('coords', JSON.stringify(coordsObject));
};

const readCoords = () => {
  return JSON.parse(localStorage.getItem('coords'));
};

const handleGeoSuccess = async (position) => {
  const {
    coords: { latitude, longitude },
  } = position;

  const response = await fetch(
    `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${longitude}&y=${latitude}`,
    {
      headers: {
        Authorization: KAKAO_API_KEY,
      },
    },
  );

  const data = await response.json();

  coordsObj = {
    latitude,
    longitude,
    address: data.documents[0].address_name,
  };

  saveCoords(coordsObj);

  window.location.reload();
};

const handleGeoError = () => {
  console.log("Can't access geo location");
};

const askForCoords = async () => {
  await navigator.geolocation.getCurrentPosition(
    handleGeoSuccess,
    handleGeoError,
  );
};

const getCoords = async () => {
  let coords = readCoords();
  if (coords === null) {
    await askForCoords();
    coords = readCoords();
  }
  return coords;
};

const getWeather = async (coords) => {
  if (coords === undefined) {
    coords = readCoords();
  }
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${OPEN_WEATHER_API_KEY}`,
  );

  const data = await response.json();

  return {
    weather: data.weather[0].main,
    temp: parseInt(Math.round(data.main.temp - 273)),
  };
};

const initLocation = async () => {
  const coords = await getCoords();
  const weather = await getWeather(coords);
};

initLocation();
