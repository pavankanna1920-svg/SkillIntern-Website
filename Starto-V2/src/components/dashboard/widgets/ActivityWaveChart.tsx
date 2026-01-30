"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts"

const data = [
    { day: "Mon", value: 4 },
    { day: "Tue", value: 3 },
    { day: "Wed", value: 15 },
    { day: "Thu", value: 10 },
    { day: "Fri", value: 25 }, // Peak
    { day: "Sat", value: 18 },
    { day: "Sun", value: 12 },
]

export function ActivityWaveChart() {
    return (
        <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data}>
                <XAxis
                    dataKey="day"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <Tooltip
                    contentStyle={{ backgroundColor: "#000", border: "none", borderRadius: "8px", color: "#fff" }}
                    itemStyle={{ color: "#fff" }}
                    cursor={{ stroke: "#e5e7eb", strokeWidth: 1 }}
                />
                <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#000000"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "#000", strokeWidth: 2, stroke: "#fff" }}
                    activeDot={{ r: 6, fill: "#000" }}
                    className="drop-shadow-sm"
                />
            </LineChart>
        </ResponsiveContainer>
    )
}
