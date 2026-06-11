export interface WeatherData {
    city: string;
    country: string;
    temperature: number;
    humidity: number;
    windSpeed: number;
    windDirection: string;
}

// Raw OpenWeatherMap API response
export interface OpenWeatherResponse {
    name: string;
    sys: {
        country: string;
    };
    main: {
        temp: number;
        humidity: number;
    };
    wind: {
        speed: number;
        deg: number;
    };
}