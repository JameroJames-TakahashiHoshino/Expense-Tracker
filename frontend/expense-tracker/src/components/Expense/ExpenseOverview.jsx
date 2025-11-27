import React, { useState, useEffect } from "react";
import CustomLineChart from "../Charts/CustomLineChart";
import { LuPlus } from "react-icons/lu";
import { prepareExpenseLineChartData } from "../../utils/helper";

const ExpenseOverview = ({transactions, onExpenseIncome}) => {
        const [chartData, setChartData] = useState ([]);

        useEffect(() => {
                const result = prepareExpenseLineChartData(transactions);
                setChartData(result);

                return () => {};
        }, [transactions]);

    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <div>
                    <h5 className="text-lg">Expense Overview</h5>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>
                        Track your spending trends over time and gain insights into where
                        your money goes.
                    </p>
                </div>

                <button className="add-btn flex items-center gap-2" onClick={onExpenseIncome}>
                    <LuPlus className="text-lg" />
                    Add Expense
                </button>
            </div>

            <div className="mt-4 text-sm" style={{ color: 'var(--muted)' }}></div>

            <div className="mt-10">
                <CustomLineChart data={chartData} />
            </div>
        </div>
    );
  
};

export default ExpenseOverview