import CurrentWeather from "@/components/Home/CurrentWeather";
import HourlyForecast from "@/components/Home/HourlyForecast";
import SearchBar from "@/components/Home/SearchBar";
import TimeGreeting from "@/components/Home/TimeGreeting";
import WeatherSubscription from "@/components/Subscribe/WeatherSubscription";
import WeeklyForecast from "@/components/Home/WeeklyForecast";
import Sidebar from "@/components/SideBar/SideBar";
import { AppDispatch, RootState } from "@/redux/Store";
import { ActivePageState } from "@/utils/type";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as subscriptionApi from "@/api/subscriptionApi"
import { AxiosError } from "axios";
import { setKeySeach } from "@/features/keySearch/keySearchSlice";
import HistorySearch from "@/components/HistorySearch/HistorySearch";

function Home() {
    const currentPageActive = useSelector<RootState, ActivePageState>(
        (state) => state.activePageSlice as ActivePageState
    );

    const dispatch = useDispatch<AppDispatch>()

    const renderPage = () => {
        if (currentPageActive?.pageActive === 1) {
            return (
                <div className="container mx-auto p-1 lg:p-4 scroll-auto h-auto">
                    <div className="flex flex-col lg:flex-row items-start w-full">
                        <TimeGreeting />
                        <SearchBar />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                        <div>
                            <CurrentWeather />
                            <HourlyForecast />
                        </div>
                        <div>
                            <WeeklyForecast />
                        </div>
                    </div>
                </div>
            )
        }
        else if (currentPageActive?.pageActive === 2) {
            return (
                <div className="container mx-auto p-1 lg:p-4">
                    <HistorySearch />
                </div>
            )
        }
        else {
            return (
                <div className="container mx-auto p-1 lg:p-4">
                    <WeatherSubscription />
                </div>
            )
        }
    }

    const confirmSubscription = async () => {
        const queryParams = new URLSearchParams(window.location.search);
        const codeParam = queryParams.get('code');
        const emailParam = queryParams.get('email');
        if (codeParam && emailParam) {
            try {
                const data = await subscriptionApi.postConfirmSubscription(emailParam, codeParam)
                if (data?.status === "success") {
                    window.alert(data?.message)
                    window.location.href = '/';
                }
            }
            catch (e: unknown) {
                if (e instanceof AxiosError && e.response) {
                    window.alert(e?.response?.data?.message)
                }
            }
        }
    }

    useEffect(() => {
        const getCurrentPosition = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    await dispatch(setKeySeach(`${position.coords.latitude},${position.coords.longitude}`))
                });
            } else {
                window.alert("Geolocation is not supported by this browser.");
            }
        }
        confirmSubscription()
        getCurrentPosition()
    }, [dispatch])

    return (
        <main className="flex items-center justify-between mx-2 md:mx-10 lg:h-screen">
            <div className="flex flex-col sm:flex-row border rounded-lg shadow-lg px-2 md:px-5 py-5 w-full">
                <Sidebar />
                {renderPage()}
            </div>
        </main>
    )
}

export default Home