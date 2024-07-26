import { CloudSun, Moon, Sun } from '@phosphor-icons/react';
import React, { useState, useEffect } from 'react';

const TimeGreeting: React.FC = () => {
    const [currentTime, setCurrentTime] = useState<Date>(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const getGreeting = () => {
        const hour = currentTime.getHours();
        if (hour < 12) return <><Sun size={25} className='mr-3' />Good morning</>;
        if (hour < 18) return <><CloudSun size={23} className='mr-3' />Good afternoon</>;
        return <><Moon size={23} className='mr-3' />Good evening</>;
    };

    return (
        <div className="flex flex-col items-start w-full my-2 lg:my-0 lg:w-1/3">
            <h1 className="text-4xl font-medium text-blue-600">
                {formatTime(currentTime)}
            </h1>
            <p className="text-sm text-gray-600 my-2">
                {formatDate(currentTime)}
            </p>
            <p className="flex items-center mt-2 text-3xl font-semibold text-blue-600">
                {getGreeting()}
            </p>
        </div>
    );
};

export default TimeGreeting;