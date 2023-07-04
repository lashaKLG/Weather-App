import React, { useState } from 'react'
import axios from 'axios'
import './style.css'

function Home() {
  const [data, setData] = useState({
    celcius: 10,
    name: 'London',
    humidity: 10,
    speed: 2,
    image: '/images/cloud.png',
  })
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const handleClick = () => {
    if (name !== '') {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=125ffbbb33ec8bdd61338ed3d8efc975&units=metric`
      axios
        .get(apiUrl)
        .then((res) => {
          let imagePath = ''
          if (res.data.weather[0].main === 'Clouds') {
            imagePath = '/images/cloud.png'
          } else if (res.data.weather[0].main === 'Clear') {
            imagePath = '/images/clear.png'
          } else if (res.data.weather[0].main === 'Rain') {
            imagePath = '/images/rain.png'
          } else if (res.data.weather[0].main === 'Drizzle') {
            imagePath = '/images/drizzle.png'
          } else if (res.data.weather[0].main === 'Mist') {
            imagePath = '/images/mist.png'
          } else {
            imagePath = '/images/cloud.png'
          }

          console.log(res.data)
          setData({
            ...data,
            celcius: res.data.main.temp,
            name: res.data.name,
            humidity: res.data.main.humidity,
            speed: res.data.wind.speed,
            image: imagePath,
          })
          setError('')
        })
        .catch((err) =>
          /*      if (err.responce.status === 404) {
            setError('Invalid City Name')
          } else {
            setError('')
          } */
          console.log(err)
        )
    }
  }

  return (
    <div className="container">
      <div className="weather">
        <div className="search">
          <input
            type="text"
            placeholder="Enter City Name"
            onChange={(e) => setName(e.target.value)}
          />
          <button>
            <img src="/images/search.png" onClick={handleClick} alt="" />
          </button>
        </div>
        <div className="error">
          <p>{error}</p>
        </div>
        <div className="weatherInfo">
          <img src={data.image} alt="cloud" />
          <h1>{Math.round(data.celcius)}°C</h1>
          <h2>{data.name}</h2>
          <div className="details">
            <div className="col">
              <img src="/images/humidity.png" alt="humidity" />
              <div className="humidity">
                <p>{Math.round(data.humidity)}%</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className="col">
              <img src="/images/wind.png" alt="wind" />
              <div className="wind">
                <p>{Math.round(data.speed)}km/h</p>
                <p>Wind</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
