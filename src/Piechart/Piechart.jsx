
import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';


export default function PieChart({ totalPositiveCount, totalNegativeCount,context  }) {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        if (!totalPositiveCount && !totalNegativeCount) {
            return;
        }

         // Setting colors based on the context
         const colors = context === 'profile' ? ['#41D77D', '#EE4C4C'] : ['#44B0E7', '#FC9F00'];
         const hoverColors = context === 'profile' ? ['#41D77D', '#EE4C4C'] : ['#44B0E7', '#FC9F00'];

        const data = {
            labels: ['Positive', 'Negative'],
            datasets: [{
                data: [totalPositiveCount, totalNegativeCount],
                backgroundColor: colors,
                hoverBackgroundColor: hoverColors,
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
    }, [totalPositiveCount, totalNegativeCount, context]);

    return (
        <div className="chart-container" style={{ width: '400px', height: '400px', margin: 'auto' }}>
            <canvas ref={chartRef} />
        </div>
    );
}

