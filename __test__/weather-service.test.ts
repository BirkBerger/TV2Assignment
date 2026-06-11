import { describe, beforeEach, vi, it, expect } from 'vitest';
import weatherService from '../services/weather-service';
import { mockOpenWeatherResponse } from './mocks';
import { OpenWeatherResponse } from '../types/weather';

describe('getWeather', () => {

    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it('returns null data and prompt message when city is null', async () => {
        const result = await weatherService.getWeather(null);
        expect(result).toEqual({
            data: null,
            message: 'Type in a city to see the weather.',
        });
    });

    it('returns mapped WeatherData on successful fetch', async () => {
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            status: 200,
            ok: true,
            json: () => Promise.resolve(mockOpenWeatherResponse),
        }));

        const result = await weatherService.getWeather('London');
        expect(result.data).toEqual({
            city: 'London',
            country: 'GB',
            temperature: 15,
            humidity: 72,
            windSpeed: 5,
            windDirection: 'Øst',
        });
        expect(result.message).toBe('');
    });

    it('returns correct user message when city is not found', async () => {
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ status: 404, ok: false }));

        const result = await weatherService.getWeather('invalid_city');
        expect(result.data).toBeNull();
        expect(result.message).toBe('We couldn\'t find that city. Please check the spelling and try again.')
    });

});

describe('degreesToDirection', () => {
 
    beforeEach(() => {
        vi.restoreAllMocks();
    });
 
    const mockResponseWithDeg = (deg: number): OpenWeatherResponse => ({
        ...mockOpenWeatherResponse,
        wind: {speed: 5, deg },
    });
 
    async function getDirection(deg: number): Promise<string | undefined> {
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            status: 200,
            ok: true,
            json: () => Promise.resolve(mockResponseWithDeg(deg)),
        }));
        const result = await weatherService.getWeather('London');
        return result.data?.windDirection;
    }
 
    it('0 degrees → Nord', async () => {
        expect(await getDirection(0)).toBe('Nord');
    });
 
    it('90 degrees → Øst', async () => {
        expect(await getDirection(90)).toBe('Øst');
    });
 
    it('180 degrees → Syd', async () => {
        expect(await getDirection(180)).toBe('Syd');
    });

    it('270 degrees → Vest', async () => {
        expect(await getDirection(270)).toBe('Vest');
    });
 
    it('360 degrees → Nord', async () => {
        expect(await getDirection(360)).toBe('Nord');
    });
 
});