import React, {useEffect, useState} from 'react';
import '../css/App.css';
import Home from "./Home";


const App = () => {
    const [lat, setLat] = useState(0)
    const [lon, setLon] = useState(0)
    const [location, setLocation] = useState('toronto');
    const [templocation, setTempLocation] = useState('');


    useEffect(() => {
        async function location() {
            try {
                navigator.geolocation.getCurrentPosition(function (position) {
                    setLat(position.coords.latitude);
                    setLon(position.coords.longitude);
                });

            } catch (error) {
                console.log("error", error)
            }
        }

        location();
    }, [])

    let weatherUrl;
    let apikey = '2290b9f807be0574350afaa389dcd613';

    if (lat > 0) {
        weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon
            + '&appid=' + apikey
    } else {
        weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + location + '&appid=' + apikey
    }

    const handleChange = (loc) => {
        setTempLocation(loc);
    }
    const changeLocation = (e) => {
        e.preventDefault();
        setLocation(templocation);
        setLat(0);

    }

    return (
        <>
            <h1 className="text-success">Weather App</h1>
            <div className="row">

                <div className="col-lg-5 mr-1">
                    <input id="serachLocation" type="text" name="search_location" placeholder="Search location"
                           className="form-control" onChange={e => handleChange(e.target.value)}/>
                </div>
                <div className="col-lg-4">
                    <button value="Submit" className="btn btn-success" onClick={e => changeLocation(e)}>Search</button>
                </div>
            </div>
            <br/>

            <Home url={weatherUrl}/>
        </>

    );
}

export default App;
