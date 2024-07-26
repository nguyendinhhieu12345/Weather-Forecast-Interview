import { useEffect, useState } from "react"
import * as weatherApi from "@/api/weatherApi"
import { BaseResponseApi, ITemperatureChart, KeySearchState } from "@/utils/type";
import WeatherChart from "./WeatherChart";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/Store";
import useLoading from "@/customHook/useLoading";

export interface IResponseTemperatureChart extends BaseResponseApi {
    data: ITemperatureChart[]
}

function HourlyForecast() {
    const [temperatureChart, setTemperatureChart] = useState<IResponseTemperatureChart>()
    const currentKeySearch = useSelector<RootState, KeySearchState>(
        (state) => state.keySearchSlice as KeySearchState
    );

    const { isLoading, startLoading, stopLoading } = useLoading()

    useEffect(() => {
        const getForecastWeather = async () => {
            if (currentKeySearch?.keySearch?.trim() !== "") {
                startLoading()
                const data = await weatherApi.getTemperatureChart(currentKeySearch?.keySearch as string)
                if (data?.status === "success") {
                    stopLoading()
                    setTemperatureChart(data)
                }
            }
        }
        getForecastWeather()
    }, [currentKeySearch?.keySearch])

    return (
        <div className="bg-white p-4 rounded-lg shadow mt-4">
            <h3 className="text-lg font-semibold mb-2">Hourly forecast</h3>
            {
                isLoading ?
                    <p className="flex items-center justify-center text-center"><img className="w-5 h-5 animate-spin mr-3" src="https://www.svgrepo.com/show/474682/loading.svg" alt="Loading icon" /></p> :
                    <div className="h-60 rounded">
                        <WeatherChart {...temperatureChart as IResponseTemperatureChart} />
                    </div>
            }
        </div>
    )
}

export default HourlyForecast