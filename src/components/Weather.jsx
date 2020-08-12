import React, { useState } from 'react'
import './weather_style.css'
import "weather-icons/css/weather-icons.css";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

function calCelsius(temp) {
    let cell = Math.floor(temp - 273.15);
    return cell;
}

const Weather = (props) => {
    const [city, setCity] = useState('');
    const [weatherInfo, setWeatherInfo] = useState([]);

    //spread || rest
    function deleteWeather(index) {
        const newArray = [...weatherInfo]
        newArray.splice(index, 1)
        setWeatherInfo([...newArray])
    }


    async function AddCity(city, Api_Key = '52f43f33f04cda68c2f40d5073dea18c') {
        await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Api_Key}`, {
            method: "post",
        })
            .then((res) => res.json())
            .then((response) => {
                if (response.cod === 200) {
                    setWeatherInfo([...weatherInfo, { name: response.name, weather: calCelsius(response.main.temp), icon: response.weather[0].icon }])

                }
                else {
                    MySwal.fire('Такого города не существует!((')
                }

            })
    }
    return (
        <div className='weather_app'>
            <h3>Узнайте свою погоду!</h3>
            <div className="myform">
                <input id="myInput" placeholder="write your city" type='text'
                    onChange={(e) => {
                        setCity(e.target.value);
                        console.log(e.target)
                    }
                    } />
                <button className="btn btn-success" onClick={() => AddCity(city)} >Add</button>
                <button className="btn btn-danger" onClick={() => {
                    let l = document.getElementById('myInput')
                    setCity('')
                    l.value = ''
                }} >Clear</button>
            </div >

            <div className="dashboard">
                {weatherInfo.length > 0 ? (
                    weatherInfo.map((item, index) => {
                        return (
                            <div className='weather'>
                                <h3>{item.name}</h3>
                                <div>{item.weather ? (
                                    <h1 className="py-2">{item.weather}&deg;</h1>
                                ) : null}</div>
                                <img src={`http://openweathermap.org/img/w/${item.icon}.png`} />
                                <div className='weather__delete' onClick={() => deleteWeather(index)}>Delete</div>
                            </div>
                        )
                    })
                ) :
                    <div className="weatherr">Dashboard is empty</div>
                }

            </div>
        </div >
    )
}

export default Weather;