import React from "react";
import { XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, AreaChart} from "recharts";

const CustomLineChart = ({ data }) => {

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length){
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

    return <div className="card">
        <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
        <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x="0" y2="1">
                <stop offset="5%" stopColor="#875cf5" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#875cf5" stopOpacity={0} />
            </linearGradient>
        </defs>

            <CartesianGrid stroke="none" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--muted)' }} stroke="none" />
            <YAxis tick={{ fontSize: 12, fill: 'var(--muted)'}} stroke="none" />
            <Tooltip content={<CustomTooltip />} />

            <Area type="monotone" dataKey="amount" stroke="#875cf5" fill="url(#incomeGradient)" strokeWidth={3} dot={{ r: 3, fill: "#ab8df8" }} />
        </AreaChart>
    </ResponsiveContainer>
  </div>
  

};

export default CustomLineChart;