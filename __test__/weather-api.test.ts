import { describe, beforeEach, vi, it, expect } from 'vitest';
import { fetchWeather } from '../api/weather';

describe('fetchWeather', () => {

    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it('throws WeatherApiError with NOT_FOUND when city is invalid', async () => {
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ status: 404, ok: false }));

        await expect(fetchWeather('invalid_city')).rejects.toMatchObject({
            code: 'NOT_FOUND'
        });
    });

    it('throws WeatherApiError with NETWORK_ERROR on network failure', async () => {
        vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network failure')));

        await expect(fetchWeather('London')).rejects.toMatchObject({
            code: 'NETWORK_ERROR'
        });
    });

});