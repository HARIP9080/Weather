// import React, { useState } from 'react'
// import axios from 'axios'

// export default function Weather() {

//   let[city,setCity]=useState("")
//   let[data,setData]=useState()

//   let response=async()=>{
//        let fetch=await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=36c5291cb2d7e12375f9e9f904f60c1b`)
//        setData (fetch.data)
//        console.log(fetch.data)

//       }
      
  
//   return (
//     <div className='App'>
//       <h1 className='title'>Weather Api</h1>
//       <div className='input_container'>
//         <input type="text" className='input' value={city}

//          onChange={(e)=> setCity(e.target.value)}
//          placeholder='Enter The City Name'
//         />
//          <button onClick={response} className='button'>search</button>

//       </div>
//       <div>
//         {data && (
//           <div className='container'>
//              <h1>{data.name},{data.sys.country}</h1>
//              <div>
//               {Math.round(data.main.temp)}'C
//              </div>
//              <div>let-{data.coord.lat}</div>
//              <div>Lon-{data.coord.lon}</div>
//           </div>
//         )}
//       </div>

//     </div>
//   )
// }
import React, { useState } from 'react';
import axios from 'axios';
import './Weather.css'; // Import the CSS file for styling

export default function Weather() {
  const [city, setCity] = useState('');
  const [data, setData] = useState();
  const [forecastTime, setForecastTime] = useState(getForecastTime());
  const [errorMessage, setErrorMessage] = useState('');

  // Function to get the forecast time (Tuesday, 12:00 pm)
  function getForecastTime() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDate = new Date();
    const dayIndex = currentDate.getDay();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const period = hours >= 12 ? 'pm' : 'am';

    return `${days[dayIndex]}, ${hours % 12 || 12}:${minutes < 10 ? '0' : ''}${minutes} ${period}`;
  }

  const response = async () => {
    if (!city.trim()) {
      setErrorMessage('Please enter a city name.');
      return;
    }

    try {
      const fetch = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=36c5291cb2d7e12375f9e9f904f60c1b`
      );
      setData(fetch.data);
      setErrorMessage('');
      setCity(''); // Clear input on successful response
    } catch (error) {
      setErrorMessage('City not found. Please enter a valid city name.');
      setData('');
    }
  };

  return (
    <div className='weather-app'>
      <h1 className='title'>Weather App</h1>
      <div className='input-container'>
        <input
          type='text'
          className='input'
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder='Enter The City Name'
        />
        <button onClick={response} className='button'>
          Search
        </button>
      </div>
      {errorMessage && <p className='error-message'>{errorMessage}</p>}
      <div>
        {data && (
          <div className='weather-container'>
            <h1>
              {data.name}, {data.sys.country}
            </h1>
            <div>
              Temperature: {Math.round(data.main.temp - 273.15)}°C /{' '}
              {Math.round((data.main.temp - 273.15) * (9 / 5) + 32)}°F
            </div>
            <div>Precipitation: {data.weather[0].description}</div>
            <div>Humidity: {data.main.humidity}%</div>
            <div>Wind: {data.wind.speed} km/h</div>
            <div>Forecast: {forecastTime}</div>
          </div>
        )}
      </div>
    </div>
  );
}
