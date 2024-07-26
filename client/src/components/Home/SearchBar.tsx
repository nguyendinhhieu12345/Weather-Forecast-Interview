import { useDebounce } from "@/customHook/useDebounce ";
import { useOnClickOutside } from "@/customHook/useOnClickOutside";
import { BaseResponseApi, IResponseAutoComplete } from "@/utils/type";
import { MagnifyingGlass } from "@phosphor-icons/react"
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as weatherApi from "@/api/weatherApi"
import SearchHeaderResult from "./SearchHeaderResult";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/Store";
import { setKeySeach } from "@/features/keySearch/keySearchSlice";

interface Inputs {
    dataInput: string;
}
interface ISearchHeader extends BaseResponseApi {
    data: IResponseAutoComplete[]
}

function SearchBar() {
    const [dataSearch, setDataSearch] = useState<ISearchHeader>();
    const [isFocus, setIsFocus] = useState<boolean>(false);
    const refDiv = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch<AppDispatch>()

    useOnClickOutside(refDiv, () => {
        setIsFocus(false);
    });
    const {
        register,
        handleSubmit,
        watch,
    } = useForm<Inputs>();

    const debouncedValue = useDebounce<string>(watch("dataInput"), 500);

    useEffect(() => {
        if (debouncedValue !== undefined) {
            const callApi = async () => {
                try {
                    const data = await weatherApi.getAutoCompleteSearch(debouncedValue.trim());
                    console.log(data)
                    if (data?.status === "success") {
                        setDataSearch(data);
                    }
                } catch (error) {
                    Promise.reject(error);
                }
            };
            callApi();
        }
    }, [debouncedValue]);

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        if (!data) return;
        await dispatch(setKeySeach(encodeURIComponent(data.dataInput.trim())))
        localStorage.setItem("city", encodeURIComponent(data.dataInput.trim()))
        setIsFocus(false);
    };

    return (
        <div className="w-full lg:w-2/3 lg:ml-10 relative" ref={refDiv}>
            <p className="font-medium text-base mb-3">Enter a City Name</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label
                    htmlFor="search"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only "
                >
                    Search
                </label>
                <div className="relative w-full">
                    <div
                        className="absolute inset-y-0 left-0 flex items-center pl-3 cursor-pointer z-999999"
                        onClick={handleSubmit(onSubmit)}
                    >
                        <MagnifyingGlass size={20} className="text-gray-500" />
                    </div>
                    <div className="flex items-center">
                        <input
                            {...register("dataInput")}
                            onFocus={() => setIsFocus(true)}
                            type="text"
                            placeholder="E.g., New York, London, Tokyo"
                            className="pl-10 flex-grow p-3 border border-slate-400 rounded focus:border focus:border-sky-600"
                        />
                    </div>
                </div>
            </form>
            <SearchHeaderResult
                dataSearch={dataSearch?.data as IResponseAutoComplete[]}
                setIsFocus={setIsFocus}
                isOpen={isFocus}
            />
        </div>
    )
}

export default SearchBar