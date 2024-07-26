import { Request, Response } from 'express';
import * as weatherService from '../services/weatherService';
import { formatResponse } from '../utils/responseFormatter';

export const getAutoComplete = async (req: Request, res: Response): Promise<void> => {
    const city = req.query.city as string;
    try {
        const autoComplete = await weatherService.getAutoComplete(city);
        res.json(formatResponse('success', 'Weather data fetched successfully', autoComplete));
    }
    catch (error) {
        res.status(500).json(formatResponse('error', 'Failed to fetch weather data', (error as Error).message));
    }
};

export const getCurrentWeather = async (req: Request, res: Response): Promise<void> => {
    const city = req.query.city as string;
    try {
        const weatherData = await weatherService.getCurrentWeather(city);
        res.json(formatResponse('success', 'Weather data fetched successfully', weatherData));
    } catch (error) {
        res.status(500).json(formatResponse('error', 'Failed to fetch weather current', (error as Error).message));
    }
};

export const getWeatherForecast = async (req: Request, res: Response): Promise<void> => {
    const city = req.query.city as string;
    const day = parseInt(req.query.day as string);
    try {
        const forecastData = await weatherService.getWeatherForecast(city, day);
        res.json(formatResponse('success', 'Weather data fetched successfully', forecastData));
    } catch (error) {
        res.status(500).json(formatResponse('error', 'Failed to fetch weather forecast', (error as Error).message));
    }
};

export const getTemperatureChart = async (req: Request, res: Response): Promise<void> => {
    const city = req.query.city as string;
    try {
        const temperatureChart = await weatherService.getWeatherData(city);

        res.json(formatResponse('success', 'Weather data fetched successfully', temperatureChart));
    } catch (error) {
        res.status(500).json(formatResponse('error', 'Failed to fetch temperature data', (error as Error).message));
    }
};