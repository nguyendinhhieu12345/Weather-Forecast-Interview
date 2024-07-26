import { setPageActive } from '@/features/activePage/activePageSlice';
import { AppDispatch, RootState } from '@/redux/Store';
import { ActivePageState } from '@/utils/type';
import { Bell, ClockCounterClockwise, CloudSun, Wind } from '@phosphor-icons/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const itemSideBar = [
    {
        icon: <CloudSun size={32} />,
        title: "Weather"
    },
    {
        icon: <ClockCounterClockwise size={32} />,
        title: "History"
    },
    {
        icon: <Bell size={32} />,
        title: "Subscribe"
    },
]

const Sidebar: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()

    const currentPageActive = useSelector<RootState, ActivePageState>(
        (state) => state.activePageSlice as ActivePageState
    );

    const handleSetPageActive = async (pageActive: number) => {
        await dispatch(setPageActive(pageActive))
    }

    return (
        <div className="bg-gray-100 border shadow-lg sm:mx-2 text-black w-full sm:w-20 flex flex-row sm:flex-col items-center py-2 sm:py-4 min-h-auto rounded-lg">
            <div className="mb-0 hidden sm:block sm:mb-8">
                <Wind size={32} />
            </div>
            <div className='w-full'>
                <ul className="w-full flex flex-row sm:flex-col items-center justify-center m-0">
                    {
                        itemSideBar?.map((item, index) => (
                            <li className='w-full mb-0 sm:mb-5' key={index}>
                                <button onClick={() => handleSetPageActive(index + 1)} className={`${currentPageActive?.pageActive === (index + 1) ? "opacity-100 text-blue-600 font-semibold" : "opacity-50"} w-full flex flex-col items-center justify-center text-sm transition ease-in-out delay-75`}>
                                    {item?.icon}
                                    <p>{item?.title}</p>
                                </button>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;