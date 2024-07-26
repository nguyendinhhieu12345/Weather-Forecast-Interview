import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { IResponseTemperatureChart } from './HourlyForecast';
import { ITemperatureChart } from '@/utils/type';

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload as ITemperatureChart;
        return (
            <div className="bg-white p-2 rounded shadow">
                <img src={data?.condition?.icon} alt='icon weather' className='w-10 h-10' />
                <p>{`Temperature: ${data.temp_c}°C`}</p>
                <p>{`Wind: ${data.wind_kph} km/h`}</p>
                <p>{`Humidity: ${data.humidity} %`}</p>
            </div>
        );
    }
    return null;
};

const WeatherChart = (temperatureChart: IResponseTemperatureChart) => {
    const transformedData = temperatureChart?.data?.map(entry => {
        const date = new Date(entry.time);
        const hours = date.getHours().toString().padStart(2, '0');
        return { ...entry, time: `${hours}h` };
    });

    return (
        <div className="w-full p-4 rounded-lg h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={transformedData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                    <XAxis dataKey="time" />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="temp_c" stroke="#FFBB28" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default WeatherChart;