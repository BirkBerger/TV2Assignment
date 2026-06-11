import { useEffect, useState } from "react";
import { WeatherData } from '../types/weather';
import weatherService from '../services/weather-service';

function App() {

    const [weatherData, setWeatherData] = useState<WeatherData | undefined | null>(undefined);
    const [searchInput, setSearchInput] = useState('');

    const setCityFromURL = (fallbackCity?: string) => {
        const params = new URLSearchParams(window.location.search);
        const cityParam = params.get('city');

        if (!cityParam && fallbackCity) {
            // Add fallback to browser history
            replaceCityInURL(fallbackCity)
            fetchWeatherData(fallbackCity);
        } else {
            fetchWeatherData(cityParam);
        }
    };

    // Set city on mount
    useEffect(() => {
        setCityFromURL('Copenhagen');
    }, []);

    // Update city on browser navigation
    useEffect(() => {
        const handlePopState = () => setCityFromURL();
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    const onSearchClick = (e: React.FormEvent) => {
        e.preventDefault();
        putCityInURL(searchInput);
        fetchWeatherData(searchInput);
    }

    const replaceCityInURL = (city: string) => {
        window.history.replaceState({}, '', `?city=${encodeURIComponent(city)}`);
    }

    const putCityInURL = (city: string | null) => {
        window.history.pushState({}, '', city ? `?city=${encodeURIComponent(city)}` : window.location.pathname);
    }

    const fetchWeatherData = (city: string | null) => {
        setWeatherData(undefined);
        setSearchInput('');

        weatherService.getWeather(city).then((rsp) => {
            setWeatherData(rsp.data);
        });
    }

    return (
        <div className="widget" style={{
            margin: "30px auto",
            width: "300px"
        }}>
            <div className="panel panel-info">
                <div className="panel-heading">Weather in <b>{weatherData?.city || '–'}</b></div>
                <ul className="list-group">
                    <li className="list-group-item">Temperature: <b>{weatherData ? `${weatherData.temperature}°C` : '–'}</b></li>
                    <li className="list-group-item">Humidity: <b>{weatherData?.humidity || '–'}</b></li>
                    <li className="list-group-item">Wind: <b>{weatherData ? `${weatherData.windSpeed} m/s ${weatherData.windDirection}` : '–'}</b></li>
                    <li className="list-group-item">
                        <form className="form-inline" onSubmit={onSearchClick}>
                            <div className="form-group">
                                <input type="text" className="form-control" id="city" placeholder="City" value={searchInput} onChange={e => setSearchInput(e.target.value)} />
                            </div>
                            <button type="submit" className="btn btn-default">Search</button>
                        </form>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default App
