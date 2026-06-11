import { OpenWeatherResponse } from '../types/weather';

export const mockOpenWeatherResponse: OpenWeatherResponse = {
    name: 'London',
    sys: {
        country: 'GB'
    },
    main: {
        temp: 15,
        humidity: 72
    },
    wind: {
        speed: 5,
        deg: 90
    }
};