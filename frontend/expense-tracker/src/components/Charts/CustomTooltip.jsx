import React from "react";

const CustomTooltip = ({active, payload}) => {
    if (active && payload && payload.length) {
  return(
    <div className="shadow-md rounded-lg p-2" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
        <p className="text-xs font-semibold mb-1" style={{ color: 'var(--muted)' }}>{payload[0].name}</p>
        <p className="text-sm" style={{ color: 'var(--muted)' }}>
            Amount: <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>
                ${payload[0].value}
            </span>
        </p>
    </div>
  );    

}
    return null;
}

export default CustomTooltip