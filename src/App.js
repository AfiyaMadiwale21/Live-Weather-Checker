import React, { useState } from 'react';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherInfo, setWeatherInfo] = useState('');
  const [dateTime, setDateTime] = useState({ date: '', time: '' });

  const apikey = '024dbd923ea9d177871068a1ff77776b';

  const getWeather = async () => {
    const trimmedCity = city.trim();
    if (!trimmedCity) {
      setWeatherInfo('Please enter a city name');
      return;
    }

    const now = new Date();
    const date = now.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const time = now.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    setDateTime({ date, time });

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${trimmedCity}&appid=${apikey}&units=metric`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      const temperature = data.main.temp;
      const condition = data.weather[0].description;

      setWeatherInfo(
        `<h2 class='text-3xl capitalize mb-2' style='font-family: "Crete Round", serif;'>${trimmedCity}</h2>
         <p class='text-lg'><u>Temperature</u>: ${temperature}°C</p>
         <p class='text-lg'><u>Condition</u>: ${condition}</p>`
      );
    } catch (error) {
      setWeatherInfo('Error: ' + error.message);
    }
  };

  return (
    <div className="bg-indigo-300 min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-5xl" style={{ fontFamily: 'Pacifico, cursive' }}>Live Weather</h1>


      <input
        type="text"
        placeholder="Enter your city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="p-2 border-4 border-double border-black mt-8 bg-gray-300"
      />

      <button
        onClick={getWeather}
        className="hover:bg-blue-900 hover:text-amber-50 mt-5 px-2 bg-black text-white"
        style={{ fontFamily: 'Cardo, serif' }}
      >
        Get Weather
      </button>

      <div className="mt-6 text-black text-sm">
        <p>
          <strong>Date:</strong> {dateTime.date}
        </p>
        <p>
          <strong>Time:</strong> {dateTime.time}
        </p>
      </div>

      <div
        className="mt-6 text-black text-lg text-center"
        dangerouslySetInnerHTML={{ __html: weatherInfo }}
      ></div>
    </div>
  );
};

export default App;

