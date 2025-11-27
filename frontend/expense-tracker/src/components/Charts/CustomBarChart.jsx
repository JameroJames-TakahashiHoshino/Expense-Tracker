import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell,
} from "recharts";


const CustomBarChart = ({ data = [], xDataKey = "category" }) => {

    // This is a Function to alternate colors
    const getBarColor = (index) => {
        return index % 2 === 0 ? "#875cf5" : "#cfbefb";
    };

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="shadow-md rounded-lg p-2" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
                    <p className="text-xs font-semibold mb-1" style={{ color: 'var(--muted)' }}>{payload[0].payload.category}</p>
                    <p className="text-sm" style={{ color: 'var(--muted)' }}>
                        Amount: <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>${payload[0].payload.amount}</span>
                    </p>
                </div>
            );
        }
        return null;
    };

    return(
        <div className="card mt-6">
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <CartesianGrid stroke="none" />

                <XAxis dataKey={xDataKey} tick={{ fontSize: 12, fill: 'var(--muted)' }} stroke="none" />
                <YAxis tick={{ fontSize: 12, fill: 'var(--muted)' }} stroke="none" />

                <Tooltip content={<CustomTooltip />} />

                <Bar
                    dataKey="amount"
                    radius={[10, 10, 0, 0]}
                >
                    {data.map((entry, index) => (
                        <Cell key={index} fill={getBarColor(index)} />
                    ))}

                </Bar>
            </BarChart>
        </ResponsiveContainer>
    </div>
  )

}

export default CustomBarChart