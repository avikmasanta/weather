/* eslint-disable react/prop-types */
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { format } from 'date-fns';
import { ThermometerSun, Droplets, Clock } from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const HourlyTemperature = ({ forecastData }) => {
    
  const chartsData = forecastData.list.slice(0, 8).map((item) => ({
    time: format(new Date(item.dt * 1000), 'ha'),
    temp: Math.round(item.main.temp),
    feels_like: Math.round(item.main.feels_like)
  }));

  return (
    <Card className="flex-1">
        <CardHeader>
            <CardTitle>Hourly Temperature Graph</CardTitle>
        </CardHeader>

        <CardContent>
            <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartsData}>
                        <XAxis 
                            dataKey="time" 
                            stroke="#888888" 
                            fontSize={12} 
                            tickLine={false} 
                            axisLine={false}
                        />
                        <YAxis                           
                            stroke="#888888" 
                            fontSize={12} 
                            tickLine={false} 
                            axisLine={false}
                            tickFormatter={(value) => `${value}°`}
                        />
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="flex items-center gap-1">
                                                    <ThermometerSun className="w-4 h-4 text-red-500" />
                                                    <div className="flex flex-col">
                                                        <span className="text-[0.70rem] uppercase text-muted-foreground">Temperature</span>
                                                        <span className="font-bold">{payload[0].value}°</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Droplets className="w-4 h-4 text-blue-500" />
                                                    <div className="flex flex-col">
                                                        <span className="text-[0.70rem] uppercase text-muted-foreground">Feels Like</span>
                                                        <span className="font-bold">{payload[1].value}°</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                } else {
                                    return null;
                                }
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="temp"
                            stroke="#2563eb"
                            strokeWidth={2}
                            dot={true}
                        />
                        <Line
                            type="monotone"
                            dataKey="feels_like"
                            stroke="#64748b"
                            strokeWidth={2}
                            dot={true}
                            strokeDasharray="5 5"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Icons Below the Graph */}
            <div className="mt-4 flex justify-between text-xs text-muted-foreground">
                <div className="flex flex-col items-center">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <span>Time</span>
                </div>
                <div className="flex flex-col items-center">
                    <ThermometerSun className="w-5 h-5 text-red-500" />
                    <span>Temp (°C)</span>
                </div>
                <div className="flex flex-col items-center">
                    <Droplets className="w-5 h-5 text-blue-500" />
                    <span>Feels Like</span>
                </div>
            </div>

        </CardContent>
    </Card>
  );
}

export default HourlyTemperature;

