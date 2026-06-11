import { fetchWeather, STATUS_CODE, WeatherApiError } from "../api/weather";
import { OpenWeatherResponse, WeatherData } from "../types/weather";

const USER_MESSAGES: Record<STATUS_CODE, string> = {
    NOT_FOUND: 'We couldn\'t find that city. Please check the spelling and try again.',
    NETWORK_ERROR: 'Something went wrong. Please check your connection and try again.',
    UNKNOWN: 'An unexpected error occurred. Please try again.',
};

class WeatherService {

    private degreesToDirection(deg: number) {
        const directions = [
            "Nord",
            "Nordøst",
            "Øst",
            "Sydøst",
            "Syd",
            "Sydvest",
            "Vest",
            "Nordvest"
        ];
        return directions[Math.round(deg / 45) % 8];
    }
    
    private mapData(data: OpenWeatherResponse): WeatherData {
        return {
            city: data.name,
            country: data.sys.country,
            temperature: Math.round(data.main.temp),
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            windDirection: this.degreesToDirection(data.wind.deg)
        };
    }
    
    public async getWeather(city: string | null): Promise<{ data: WeatherData | null, message: string }> {
        if (!city) return { data: null, message: 'Type in a city to see the weather.'};
        try {
            const rsp = await fetchWeather(city);
            return { data: this.mapData(rsp), message: '' };
        } catch (err) {
            const code = err instanceof WeatherApiError ? err.code : 'UNKNOWN'; 
            return { data: null, message: USER_MESSAGES[code] }
        }
    }
}

export default new WeatherService();