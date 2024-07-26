import { useEffect, useState } from "react"
import * as weatherApi from "@/api/weatherApi"
import { BaseResponseApi, IResponseGetCurrentWeather, KeySearchState } from "@/utils/type"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/redux/Store"
import { setHistorySearch } from "@/features/historySearch/historySearchSlice"
import useLoading from "@/customHook/useLoading"

interface IResponseCurrentWeather extends BaseResponseApi {
    data: IResponseGetCurrentWeather
}

function CurrentWeather() {
    const [currentWeather, setCurrentWeather] = useState<IResponseCurrentWeather>()
    const currentKeySearch = useSelector<RootState, KeySearchState>(
        (state) => state.keySearchSlice as KeySearchState
    );

    const dispatch = useDispatch<AppDispatch>()
    const { isLoading, startLoading, stopLoading } = useLoading()

    const getCurrentWeather = async () => {
        if (currentKeySearch?.keySearch?.trim() !== "") {
            startLoading()
            const data = await weatherApi.getCurrentWeather(currentKeySearch?.keySearch as string)
            if (data?.status === "success") {
                setCurrentWeather(data)
                stopLoading()
                await dispatch(setHistorySearch(data?.data))
            }
        }
    }

    useEffect(() => {
        getCurrentWeather()
    }, [currentKeySearch]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            {isLoading ?
                <p className="flex items-center justify-center text-center"><img loading='lazy' className="w-5 h-5 animate-spin mr-3" src="https://www.svgrepo.com/show/474682/loading.svg" alt="Loading icon" /></p>
                :
                <div className="shadow-lg border text-center lg:text-left p-4 rounded-lg">
                    <div className="text-sm text-gray-500">{currentWeather?.data?.location?.localtime}</div>
                    <h2 className="text-2xl font-bold">{currentWeather?.data?.location?.name} - {currentWeather?.data?.location?.country}</h2>
                    <div className="flex items-center justify-center lg:hidden text-center">
                        <img src={currentWeather?.data?.current?.condition?.icon} loading='lazy' alt="icon weather" className="w-24 h-2w-24" />
                    </div>
                    <div className="flex flex-col lg:flex-row items-center mt-2">
                        <div className="text-5xl font-bold">{currentWeather?.data?.current?.temp_c}°C</div>
                        <div className="lg:ml-10">
                            <div>Feels like {currentWeather?.data?.current?.feelslike_c}°C. {currentWeather?.data?.current?.condition?.text}</div>
                            <div className="flex items-center mt-1">
                                <span className="mr-4">{currentWeather?.data?.current?.precip_mm}mm</span>
                                <span>{currentWeather?.data?.current?.wind_kph}km/h {currentWeather?.data?.current?.wind_dir}</span>
                            </div>
                            <div className="flex items-center mt-1">
                                <span>Humidity: {currentWeather?.data?.current?.humidity}%</span>
                                <span className="ml-4">UV: {currentWeather?.data?.current?.uv}</span>
                            </div>
                            <div className="flex items-center mt-1">
                                <span>Visibility: {currentWeather?.data?.current?.vis_km}km</span>
                            </div>
                        </div>
                        <div className="hidden lg:block">
                            <img src={currentWeather?.data?.current?.condition?.icon} loading='lazy' alt="icon weather" className="ml-4 w-28 h-28" />
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default CurrentWeather