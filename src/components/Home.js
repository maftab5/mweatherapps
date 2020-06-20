import React, {useState, useEffect} from "react";

const Home = ({url}) => {

    const [weather, setWeather] = useState('');
    const [localWeather, setLocalWeather] = useState([]);
    const [temperature, setTemperature] = useState(0);
    const [wind, setWind] = useState(0);

    useEffect(() => {
        async function userWeatherData() {
            try {

                const response = await fetch(url);
                const result = await response.json();
                const localWeather = result.weather;
                const mains = result.main;
                const wind = result.wind.speed;
                setTemperature(mains);
                setLocalWeather(localWeather);
                setWind(wind);
                setWeather(result)
            } catch (error) {
                console.log("error", error)
            }
        }

        userWeatherData();

    }, [url]);


    return (
        <>
            <div className="row">
                <div className="col-lg-6 ml-1" style={{backgroundColor: 'whitesmoke', padding: '40px'}}>
                    <div className="col-lg-12">
                        <h1 className="text-info">{weather.name}</h1><br/>
                    </div>

                    {localWeather.map(item => (
                        <div className="col-lg-12">
                            <h2 className="text-success">
                                <img src={'https://openweathermap.org/img/w/' + item.icon + '.png'} alt="weather icon"/>
                                {Math.ceil(temperature.temp - 273)} &deg;C </h2>
                            <h4>{item.description}</h4>

                        </div>
                    ))}
                    <div className="col-lg-12">
                        <h6>{Math.ceil(temperature.temp_max - 273)} &deg;C /
                            {Math.ceil(temperature.temp_min - 273)} &deg;C

                        </h6>
                    </div>
                    <div className="col-lg-12">
                        <h6>Feels Like :{Math.ceil(temperature.feels_like - 278)} &deg;C</h6>
                    </div>
                    <div className="col-lg-12">
                        <h6>Humidity : {temperature.humidity} %</h6>
                    </div>
                    <div className="col-lg-12">
                        <h6>Wind : {wind} km/hr</h6>
                    </div>
                </div>

            </div>

        </>
    )

}

export default Home