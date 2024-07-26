import { resetStoreHistorySearch } from "@/features/historySearch/historySearchSlice";
import { AppDispatch, RootState } from "@/redux/Store";
import { historySearchState, IResponseGetCurrentWeather } from "@/utils/type";
import { Trash } from "@phosphor-icons/react";
import { useDispatch, useSelector } from "react-redux";

const WeatherCard: React.FC<IResponseGetCurrentWeather> = (props) => (
    <div className="bg-gray-200 bg-opacity-70 rounded-lg text-center p-4 w-48">
        <h3 className="text-lg font-semibold">{props?.location?.name}</h3>
        <p className="text-sm text-gray-600">{props?.location?.country}</p>
        <div className="flex items-center mt-2">
            <img src={props?.current?.condition?.icon} alt="Weather icon" className="w-8 h-8 mr-2" />
            <span className="text-2xl">{props?.current?.temp_c}°C</span>
        </div>
        <p className="text-sm uppercase">{props?.current?.condition?.text}</p>
        <p className="text-xs text-gray-500">Wind: ~ {props?.current?.wind_kph}km/h {props?.current?.wind_dir}</p>
        <p className="text-xs text-gray-500">Humidity: {props?.current?.humidity}%</p>
    </div>
);

function HistorySearch() {
    const historySearch = useSelector<RootState, historySearchState>(
        (state) => state.historySearchSlice as historySearchState
    );
    const dispatch = useDispatch<AppDispatch>()

    const handleClearHistory = async () => {
        await dispatch(resetStoreHistorySearch())
    }

    return (
        <div className="w-full min-h-[80vh] h-[80vh] overflow-auto">
            <div className="flex items-center h-auto mb-4">
                <h2 className="text-xl mr-1 font-bold text-black">History Search</h2>
                <button onClick={handleClearHistory}><Trash size={22} /></button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4">
                {historySearch?.historySearch?.length === 0 && <p>None history search</p>}
                {historySearch?.historySearch?.map((data, index) => (
                    <WeatherCard key={index} {...data} />
                ))}
            </div>
        </div>
    )
}

export default HistorySearch