
import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

export default function PieChart({ totalPositiveCount, totalNegativeCount }) {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        if (!totalPositiveCount && !totalNegativeCount) {
            return;
        }

        const data = {
            labels: ['Positive', 'Negative'],
            datasets: [{
                data: [totalPositiveCount, totalNegativeCount],
                backgroundColor: ['#41D77D', '#EE4C4C'],
                hoverBackgroundColor: ['#41D77D', '#EE4C4C'],
            }]
        };

        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        const ctx = chartRef.current.getContext('2d');
        const newChartInstance = new Chart(ctx, {
            type: 'pie',
            data,
            options: {
                responsive: true,
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const value = context.parsed || 0;
                                const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
                                const percentage = ((value / total) * 100).toFixed(2);
                                return `${percentage}%`;
                            },
                        },
                    },
                },
            },
        });

        chartInstanceRef.current = newChartInstance;
    }, [totalPositiveCount, totalNegativeCount]);

    return (
        <div className="chart-container" style={{ width: '400px', height: '400px', margin: 'auto' }}>
            <canvas ref={chartRef} />
        </div>
    );
}
