import * as httpRequest from "@/utils/httpRequest";

export const getAutoCompleteSearch = async (
    city: string
) => {
    try {
        const res = await httpRequest.get(
            `weather/auto-complete?city=${city}`
        );
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getCurrentWeather = async (
    city: string
) => {
    try {
        const res = await httpRequest.get(
            `weather/current?city=${city}`
        );
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getForecastWeather = async (
    city: string,
    days: number
) => {
    try {
        const res = await httpRequest.get(
            `weather/forecast?city=${city}&day=${days}`
        );
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getTemperatureChart = async (
    city: string,
) => {
    try {
        const res = await httpRequest.get(
            `weather/temperature-chart?city=${city}`
        );
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};