import { useEffect, useState } from "react";

function App() {

    const defaultCity = 'Copenhagen';
    const params = new URLSearchParams(window.location.search);
    const newCity = params.get('city') || defaultCity;

    const [city, setCity] = useState(newCity);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        const handlePopState = () => {
            const params = new URLSearchParams(window.location.search);
            const newCity = params.get('city') || defaultCity;
            setCity(newCity);
            setSearchInput('')
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    const onSearch = (e: React.FormEvent) => {
        e.preventDefault();

        const newCity = searchInput || defaultCity;
        setCity(newCity);
        setSearchInput('');
        params.set('city', newCity);
        window.history.pushState({}, '', `?city=${encodeURIComponent(newCity)}`);
    }

    return (
        <div className="widget" style={{
            margin: "30px auto",
            width: "300px"
        }}>
            <div className="panel panel-info">
                <div className="panel-heading">Weather in <b>{city}</b></div>
                <ul className="list-group">
                    <li className="list-group-item">Temperature: <b>5°C</b></li>
                    <li className="list-group-item">Humidity: <b>65</b></li>
                    <li className="list-group-item">Wind: <b>11 m/s Øst</b></li>
                    <li className="list-group-item">
                        <form className="form-inline" onSubmit={onSearch}>
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
