import { useState } from "react"
import './card.css'
import Clouds from '../../public/images/cloud.png'
import Clear from '../../public/images/clear.png'
import Mist from '../../public/images/mist.png'
import Rain from '../../public/images/rain.png'
import Snow from '../../public/images/snow.png'
import notInfo from '../../public/images/404.png'

const ApiKey = '5cdae9f0e988e00e0066748f930894ec'

const weatherTranslations = {
    "clear sky": "Cielo despejado",
    "few clouds": "Pocas nubes",
    "scattered clouds": "Nubes dispersas",
    "broken clouds": "Mayormente nublado",
    "overcast clouds": "Nublado",
    "light rain": "Lluvia ligera",
    "moderate rain": "Lluvia moderada",
    "heavy intensity rain": "Lluvia intensa",
    "snow": "Nieve",
    "mist": "Neblina",
    "smoke": "Humo",
    "haze": "Neblina ligera",
    "fog": "Niebla",
    "thunderstorm": "Tormenta eléctrica",
};

export default function Card() {
    const [searchValue, setSearchValue] = useState('')
    const [dataApi, setDataApi] = useState(null)
    const [error, setError] = useState('')
    const [imageWeather, setImageWeather] = useState(null)
    const [localTime, setLocalTime] = useState('')
    const [localDate, setLocalDate] = useState('')
    const [dayOfWeek, setDayOfWeek] = useState('')
    const [sunrise, setSunrise] = useState('')
    const [sunset, setSunset] = useState('')

    const handleSearch = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=${ApiKey}`
            )
            if (!response.ok) throw new Error('Ciudad no encontrada')
            const data = await response.json()
            setDataApi(data)
            setError('')

            const currentDate = new Date(data.dt * 1000)
            setLocalTime(currentDate.toLocaleTimeString('es-CL', {
                timeZone: 'America/Santiago',
                hour: '2-digit',
                minute: '2-digit'
            }))
            setLocalDate(currentDate.toLocaleDateString('es-CL'))
            const weekday = new Intl.DateTimeFormat('es-CL', { weekday: 'long' }).format(currentDate)
            setDayOfWeek(weekday.charAt(0).toUpperCase() + weekday.slice(1))

            const sunriseDate = new Date(data.sys.sunrise * 1000)
            const sunsetDate = new Date(data.sys.sunset * 1000)

            setSunrise(sunriseDate.toLocaleTimeString('es-CL', {
                timeZone: 'America/Santiago',
                hour: '2-digit',
                minute: '2-digit'
            }))

            setSunset(sunsetDate.toLocaleTimeString('es-CL', {
                timeZone: 'America/Santiago',
                hour: '2-digit',
                minute: '2-digit'
            }))

            // Imagen del clima
            switch (data.weather[0].main) {
                case 'Clouds':
                    setImageWeather(Clouds)
                    break
                case 'Clear':
                    setImageWeather(Clear)
                    break
                case 'Mist':
                    setImageWeather(Mist)
                    break
                case 'Rain':
                    setImageWeather(Rain)
                    break
                case 'Snow':
                    setImageWeather(Snow)
                    break
                default:
                    setImageWeather(notInfo)
                    break
            }

        } catch (err) {
            setDataApi(null)
            setError(err.message)
        }
    }

    const getTranslatedDescription = (desc) =>
        weatherTranslations[desc.toLowerCase()] || desc;

    return (
        <div>
            <div className="searchContainer">
                <form
                    onSubmit={handleSearch}
                >
                    <input
                        type="text"
                        placeholder="Ingrese ciudad"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <button onClick={handleSearch}>🔍</button>
                </form>

                {error && (
                    <div className="not-found">
                        <h3 style={{ color: "white" }}>{error}</h3>
                        <img src={notInfo} alt="No encontrado" />
                    </div>
                )}
            </div>

            {dataApi && (
                <div className="container">
                    <div className="cityAndImage">
                        <h1>{dataApi.name}</h1>
                        <img
                            src={imageWeather}
                            alt={dataApi.weather[0].description || 'Clima'}
                        />
                        <h2>{getTranslatedDescription(dataApi.weather[0].description)}</h2>
                        <h2>{Math.floor(dataApi.main.temp)} ° C</h2>
                    </div>
                    <div className="weather-box">
                        <div className="grade-info">
                            <p>
                                <strong>Max {Math.floor(dataApi.main.temp_max)} ° / Min {Math.floor(dataApi.main.temp_min)} ° </strong>
                            </p>
                            <p>
                                Sensación térmica: <strong>{Math.floor(dataApi.main.feels_like)} ° C</strong>
                            </p>
                            <strong>{dayOfWeek}, {localTime}</strong>
                        </div>
                        <div className="containerGridMoreInfo">
                            <div className="grid-item">
                                <p>💧 Humedad</p>
                                <strong>{dataApi.main.humidity} %</strong>
                            </div>
                            <div className="grid-item">
                                <p>💨 Viento</p>
                                <strong>{dataApi.wind.speed} km/h</strong>
                            </div>
                            <div className="grid-item">
                                <p>🌊 Nivel del mar</p>
                                <strong>{dataApi.main.sea_level || 'N/A'} m</strong>
                            </div>
                            <div className="grid-item">
                                <p>🗜 Presión</p>
                                <strong>{dataApi.main.pressure} mb</strong>
                            </div>
                            <div className="grid-item">
                                <p>☀️ Amanecer</p>
                                <strong>{sunrise}</strong>
                            </div>
                            <div className="grid-item">
                                <p>🌇 Atardecer</p>
                                <strong>{sunset}</strong>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
