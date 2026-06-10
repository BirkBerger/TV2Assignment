
function App() {
    return (
        <div className="widget" style={{
            margin: "30px auto",
            width: "300px"
        }}>
            <div className="panel panel-info">
                <div className="panel-heading">Weather in <b>Copenhagen</b></div>
                <ul className="list-group">
                    <li className="list-group-item">Temperature: <b>5°C</b></li>
                    <li className="list-group-item">Humidity: <b>65</b></li>
                    <li className="list-group-item">Wind: <b>11 m/s Øst</b></li>
                    <li className="list-group-item">
                        <form className="form-inline">
                            <div className="form-group">
                                <input type="text" className="form-control" id="city" placeholder="City" />
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
