import { setKeySeach } from "@/features/keySearch/keySearchSlice";
import { AppDispatch } from "@/redux/Store";
import { IResponseAutoComplete } from "@/utils/type";
import React from "react";
import { useDispatch } from "react-redux";
interface IProps {
    isOpen: boolean;
    dataSearch: IResponseAutoComplete[];
    setIsFocus: React.Dispatch<React.SetStateAction<boolean>>;
}
const SearchHeaderResult = (props: IProps): React.ReactElement => {
    const dispatch = useDispatch<AppDispatch>()

    const handleChoosePlace = async (data: IResponseAutoComplete) => {
        props.setIsFocus(false)
        await dispatch(setKeySeach(`${data?.lat},${data?.lon}`))
    }

    return (
        <>
            {props.isOpen && (
                <div className="absolute top-[110%] bg-white rounded-md h-auto w-full px-2 z-99999 shadow-xl overflow-hidden border">
                    <div className="h-full w-full py-4 overflow-auto">
                        <div className="w-full h-full space-y-2 ">
                            <div>
                                <h5 className="text-base font-bold">Suggested Place</h5>
                            </div>
                            <div className="flex flex-col items-start w-full">
                                {props.dataSearch?.map((data, index) => {
                                    return (
                                        <button className="w-full text-start" key={index} onClick={() => handleChoosePlace(data)}>
                                            <p className="text-base overflow-hidden text-ellipsis w-full hover:bg-gray-200 py-2 px-2 rounded-lg">{data?.name} - {data?.country}</p>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SearchHeaderResult;
