import React, { useState } from 'react';
import * as subscriptionApi from "@/api/subscriptionApi"
import { AxiosError } from 'axios';
import useLoading from '@/customHook/useLoading';

interface IWeatherSubscription {
    email: string,
    isSubscription: boolean
}

const WeatherSubscription: React.FC = () => {
    const [dataSubscription, setDataSubscription] = useState<IWeatherSubscription>({
        email: "",
        isSubscription: true
    });
    const { isLoading, startLoading, stopLoading } = useLoading()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (dataSubscription?.isSubscription) {
            if (dataSubscription?.email.trim() !== "") {
                try {
                    startLoading()
                    const data = await subscriptionApi.postSubscription(dataSubscription?.email.trim())
                    if (data?.status === "success") {
                        stopLoading()
                        window.alert("Please check your email for confirmation.")
                    }
                }
                catch (e: unknown) {
                    if (e instanceof AxiosError && e.response) {
                        stopLoading()
                        window.alert(e?.response?.data?.message)
                    }
                }
            }
        }
        else {
            if (dataSubscription?.email.trim() !== "") {
                try {
                    startLoading()
                    const data = await subscriptionApi.postUnSubscription(dataSubscription?.email.trim())
                    if (data?.status === "success") {
                        stopLoading()
                        window.alert(data?.message)
                    }
                }
                catch (e: unknown) {
                    if (e instanceof AxiosError && e.response) {
                        stopLoading()
                        window.alert(e?.response?.data?.message)
                    }
                }
            }
        }
    };

    return (
        <div className="w-full h-[80vh] bg-[url('https://hoanghamobile.com/tin-tuc/wp-content/webp-express/webp-images/uploads/2023/08/hinh-nen-bau-troi-dem-1.jpeg.webp')] bg-no-repeat bg-cover bg-opacity-25 border shadow-lg rounded-lg px-5 xl:px-32">
            <div className="h-full flex flex-col xl:flex-row items-center justify-around text-white">
                <div className='flex flex-col items-center justify-center w-full xl:w-1/2'>
                    <img src='https://cdn.mobilecity.vn/mobilecity-vn/images/2024/05/hinh-nen-bau-troi-1.jpg.webp' loading='lazy' alt='image sky' className='w-auto h-60 rounded-xl hidden sm:block' />
                    <h1 className="mr-6 text-2xl font-bold mt-5">Subscribe Our,</h1>
                    <h1 className="mr-6 text-2xl font-bold">Newsletter For Weather Update</h1>
                    <p className='italic text-sm'>You can unsubscribe by filling in your email.</p>
                </div>

                <div className='w-full xl:w-1/2'>
                    <form onSubmit={handleSubmit} className="h-full w-full">
                        <div className="flex flex-col sm:flex-row items-center mb-4">
                            <input
                                type="email"
                                placeholder="Email"
                                value={dataSubscription?.email}
                                onChange={(e) => setDataSubscription((prev: IWeatherSubscription) => ({
                                    ...prev,
                                    email: e.target.value
                                }))}
                                className="w-full px-4 py-2 text-black bg-white rounded"
                                required
                            />
                            <select
                                onChange={(e) => setDataSubscription((prev: IWeatherSubscription) => ({
                                    ...prev,
                                    isSubscription: e.target.value === "Subscribe" ? true : false
                                }))}
                                defaultValue="Subscribe"
                                className="bg-gray-50 sm:w-auto border border-gray-300 text-gray-900 text-sm rounded-lg px-1 sm:px-2 py-3 ml-0 sm:ml-3 mt-3 w-full sm:my-0">
                                <option value="Subscribe">Subscribe</option>
                                <option value="Un Subscribe">Un Subscribe</option>
                            </select>
                        </div>
                        {isLoading ?
                            <button className='flex items-center justify-center text-center w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700' disabled>
                                <img loading='lazy' className="w-5 h-5 animate-spin mr-3" src="https://www.svgrepo.com/show/474682/loading.svg" alt="Loading icon" />
                                <p className='ml-3'>Submit</p>
                            </button>
                            :
                            <button
                                type="submit"
                                className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                            >
                                Submit
                            </button>
                        }
                    </form>
                </div>
            </div>
        </div>
    );
};

export default WeatherSubscription;