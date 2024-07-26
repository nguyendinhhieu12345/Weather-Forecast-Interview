import { useEffect, useState } from "react";
import * as weatherApi from "@/api/weatherApi"
import { BaseResponseApi, IResponseGetCurrentWeather, IWeatherInDay, KeySearchState } from "@/utils/type";
import { getDayOfWeek } from "@/utils/helper";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/Store";
import useLoading from "@/customHook/useLoading";

interface IResponseCurrentWeather extends BaseResponseApi {
    data: IResponseGetCurrentWeather
}

const WeatherCard: React.FC<IWeatherInDay> = (props) => (
    <div className="flex flex-col items-center text-center p-2 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-semibold">{getDayOfWeek(props?.date as string)}</h2>
        <p className="text-sm text-gray-500">{props?.date}</p>
        <div className="text-5xl my-2"><img src={props?.day?.condition?.icon} alt="icon forecast" /></div>
        <p className="text-sm font-bold">{props?.day?.mintemp_c}°C - {props?.day?.maxtemp_c}°C</p>
        <p className="text-sm uppercase">{props?.day?.condition?.text}</p>
        <p className="text-xs text-gray-500">Wind: ~ {props?.day?.maxwind_kph}km/h</p>
        <p className="text-xs text-gray-500">Humidity: {props?.day?.avghumidity}%</p>
    </div>
);

function WeeklyForecast() {
    const [forecastWeather, setForecastWeather] = useState<IResponseCurrentWeather>()
    const currentKeySearch = useSelector<RootState, KeySearchState>(
        (state) => state.keySearchSlice as KeySearchState
    );

    const { isLoading, startLoading, stopLoading } = useLoading()

    const getForecastWeather = async (days: number) => {
        if (currentKeySearch?.keySearch?.trim() !== "") {
            startLoading()
            const data = await weatherApi.getForecastWeather(currentKeySearch?.keySearch as string, days)
            if (data?.status === "success") {
                stopLoading()
                setForecastWeather(data)
            }
        }
    }


    useEffect(() => {
        getForecastWeather(5)
    }, [currentKeySearch?.keySearch])

    return (
        <div className="shadow-lg border p-8 rounded-md">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold mb-6">4-Day Forecast</h1>
                    <div className="flex items-center justify-center">
                        <p className="font-medium text-base mr-2">
                            Choose days:
                        </p>
                        <select
                            onChange={(e) => {
                                getForecastWeather(parseInt(e.target.value))
                            }}
                            defaultValue="4"
                            className="bg-gray-50 w-auto border border-gray-300 text-gray-900 text-sm rounded-lg p-2">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <option value={index + 5}>{index + 4} days</option>
                            ))}
                        </select>
                    </div>
                </div>
                {isLoading ?
                    <p className="flex items-center justify-center text-center"><img className="w-5 h-5 animate-spin mr-3" src="https://www.svgrepo.com/show/474682/loading.svg" alt="Loading icon" /></p> :
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {forecastWeather?.data?.forecast?.forecastday?.map((data, index) => (
                            <WeatherCard key={index} {...data} />
                        ))}
                    </div>
                }
            </div>
        </div>
    );
}

export default WeeklyForecast