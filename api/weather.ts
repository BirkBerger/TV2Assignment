import { OpenWeatherResponse } from "../types/weather";

const OPEN_WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/";

export type STATUS_CODE = 'NOT_FOUND' | 'NETWORK_ERROR' | 'UNKNOWN';

export class WeatherApiError {
    constructor(
        public code: STATUS_CODE,
        public message: string
    ){}
}

export async function fetchWeather(city: String): Promise<OpenWeatherResponse> {
    try {
        const rsp = await fetch(`${OPEN_WEATHER_BASE_URL}/weather?q=${city}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}&units=metric`);

        if (rsp.status === 404) {
            throw new WeatherApiError('NOT_FOUND', `Could not find city: ${city}.`);
        }

        if (!rsp.ok) {
            throw new WeatherApiError('UNKNOWN', `Failed to fetch weather data for ${city}.`);
        }

        return await rsp.json();

    } catch (err) {
        if (err instanceof WeatherApiError) throw err;
        throw new WeatherApiError('NETWORK_ERROR', `Network error: ${err}`);
    }    
}