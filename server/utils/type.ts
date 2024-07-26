export interface IResponseAutoComplete {
    id: string,
    name: string,
    country: string,
    lat: number,
    lon: number
}

interface ICurrentWeather {
    temp_c: number,
    is_day: number,
    last_updated: string,
    condition: {
        text: string,
        icon: string
    },
    wind_kph: number,
    humidity: number,
    uv: number,
    vis_km: number,
    feelslike_c: number,
    precip_mm: number,
    wind_dir: string
}

export interface ITemperatureChart {
    time: string,
    temp_c: string,
    condition: {
        text: string,
        icon: string
    },
    wind_kph: number,
    humidity: number
}

export interface IWeatherInDay {
    date?: string,
    day?: {
        condition: {
            text: string,
            icon: string
        },
        maxtemp_c: number,
        mintemp_c: number,
        maxwind_kph: number,
        avghumidity: number
    },
    hour?: ITemperatureChart[]
}

export interface IResponseGetCurrentWeather {
    location?: {
        name: string,
        region: string,
        country: string,
        lat: number,
        lon: number,
        localtime: string
    },
    current?: ICurrentWeather,
    forecast?: {
        forecastday: IWeatherInDay[]
    }
}