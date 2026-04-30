import { useState, useEffect } from 'react'
import './App.css'
function App() {
 const[city, setCity]=useState("london");
 const[weather, setWeather]=useState(null)
 const [searchCity, setSearchCity] = useState("london")

 useEffect(()=>{
 
  if (searchCity.trim() === "") return;
 

  async function getWeather() {
    const reponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=614ea14e4b00443e3ffc1cf5392019e9&units=metric`);
    const data = await reponse.json();
    if (data.cod !== 200) return; 
    setWeather(data);
    
  }

  getWeather();

 },[searchCity])

 return (
  <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 rounded-2xl p-8 w-96 text-white text-center shadow-2xl">
          
          <h1 className="text-3xl font-bold mb-6">Weather App</h1>

          <div className="flex gap-2 mb-6">
              <input
                  value={city}
                  onChange={(e) => {
                      setCity(e.target.value);
                      if (e.target.value.trim() === "") setWeather(null);
                  }}
                  placeholder="Enter city..."
                  className="flex-1 bg-gray-700 text-white rounded-xl px-4 py-2 outline-none"
              />

<button
    onClick={() => setSearchCity(city)}
    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold"
>
    Search
</button>
          </div>

          {weather && (
              <div>
                  <h2 className="text-4xl font-bold">{weather.name}</h2>
                  <p className="text-7xl font-thin my-4">{Math.round(weather.main.temp)}°C</p>
                  <p className="text-gray-400 capitalize text-lg">{weather.weather[0].description}</p>
                  <div className="flex justify-around mt-6 text-gray-400">
                      <div>
                          <p className="text-white font-bold">{weather.main.humidity}%</p>
                          <p className="text-sm">Humidity</p>
                      </div>
                      <div>
                          <p className="text-white font-bold">{Math.round(weather.wind.speed * 3.6)} km/h</p>
                          <p className="text-sm">Wind</p>
                      </div>
                  </div>
              </div>
          )}

      </div>
  </div>
)
}

export default App
