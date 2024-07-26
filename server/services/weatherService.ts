import * as httpRequest from "../configs/httpRequest";
import { IResponseAutoComplete, IResponseGetCurrentWeather, ITemperatureChart, IWeatherInDay } from '../utils/type';

export const getAutoComplete = async (city: string): Promise<IResponseAutoComplete> => {
    if (!city) {
        throw new Error('City is required');
    }
    try {
        const response = await httpRequest.get(`/search.json?key=${process.env.WEATHER_FORECAST_API_KEY}&q=${city}`);

        return response.data?.map((item: IResponseAutoComplete) => ({
            id: item?.id,
            name: item?.name,
            country: item?.country,
            lat: item?.lat,
            lon: item?.lon
        }));
    } catch (error) {
        console.error('Error fetching auto complete:', error);
        throw error;
    }
};

export const getCurrentWeather = async (city: string): Promise<IResponseGetCurrentWeather> => {
    if (!city) {
        throw new Error('City is required');
    }

    try {
        const response = await httpRequest.get(`/current.json?key=${process.env.WEATHER_FORECAST_API_KEY}&q=${city}`);
        const currentWeatherRes: IResponseGetCurrentWeather = {
            location: {
                country: response?.data?.location?.country,
                lat: response?.data?.location?.lat,
                lon: response?.data?.location?.lon,
                localtime: response?.data?.location?.localtime,
                name: response?.data?.location?.name,
                region: response?.data?.location?.region
            },
            current: {
                last_updated: response?.data?.current?.last_updated,
                is_day: response?.data?.current?.is_day,
                condition: {
                    icon: response?.data?.current?.condition?.icon,
                    text: response?.data?.current?.condition?.text
                },
                feelslike_c: response?.data?.current?.feelslike_c,
                humidity: response?.data?.current?.humidity,
                precip_mm: response?.data?.current?.precip_mm,
                temp_c: response?.data?.current?.temp_c,
                uv: response?.data?.current?.uv,
                vis_km: response?.data?.current?.vis_km,
                wind_dir: response?.data?.current?.wind_dir,
                wind_kph: response?.data?.current?.wind_kph
            }
        };
        return currentWeatherRes;
    } catch (error) {
        console.error('Error fetching current weather:', error);
        throw error;
    }
};

export const getWeatherForecast = async (city: string, day: number): Promise<IResponseGetCurrentWeather> => {
    if (!city) {
        throw new Error('City is required');
    }

    try {
        const response = await httpRequest.get(`/forecast.json?key=${process.env.WEATHER_FORECAST_API_KEY}&q=${city}&days=${day}`);
        const currentWeatherRes: IResponseGetCurrentWeather = {
            forecast: {
                forecastday: response.data?.forecast?.forecastday?.filter((item: IWeatherInDay, index: number) => index !== 0)?.map((item: IWeatherInDay) => ({
                    date: item?.date,
                    day: {
                        condition: {
                            text: item?.day?.condition?.text,
                            icon: item?.day?.condition?.icon
                        },
                        maxtemp_c: item?.day?.maxtemp_c,
                        mintemp_c: item?.day?.mintemp_c,
                        maxwind_kph: item?.day?.maxwind_kph,
                        avghumidity: item?.day?.avghumidity
                    }
                }))
            }
        };

        return currentWeatherRes;
    } catch (error) {
        console.error('Error fetching current weather:', error);
        throw error;
    }
};

export const getWeatherData = async (city: string): Promise<ITemperatureChart[]> => {
    try {
        const response = await httpRequest.get(`/forecast.json?key=${process.env.WEATHER_FORECAST_API_KEY}&q=${city}&days=1`);
        const currentWeatherRes: ITemperatureChart[] = response.data?.forecast?.forecastday[0]?.hour.map((item: ITemperatureChart) => (
            {
                time: item?.time,
                temp_c: item?.temp_c,
                condition: {
                    text: item?.condition?.text,
                    icon: item?.condition?.icon
                },
                wind_kph: item?.wind_kph,
                humidity: item?.humidity
            }
        ))

        return currentWeatherRes;
    } catch (error) {
        console.error('Error fetching current weather:', error);
        throw error;
    }
};
