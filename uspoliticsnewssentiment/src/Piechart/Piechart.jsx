import React, { useRef, useEffect } from 'react';
import { Chart } from 'chart.js/auto';


export default function PieChart({ articles,context  }) {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        if (!articles || articles.length === 0) {
            return; 
        }
        const positiveCount = articles.positive ? articles.positive.length : 0;
        const negativeCount = articles.negative ? articles.negative.length : 0;

        const colors = context === "profile" ? {
            positive: '#41D77D',
            negative: '#EE4C4C'
        } : {
            positive: '#FC9F00',
            negative: '#44B0E7'
        };

        const data = {
            labels: ['Positive', 'Negative'],
            datasets: [{
                data: [positiveCount, negativeCount],
                backgroundColor: [colors.positive, colors.negative],
                hoverBackgroundColor: [colors.positive, colors.negative],
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
    }, [articles,context]);

    return (
        <div className="chart-container" style={{ width: '400px', height: '400px', margin: 'auto' }}>
            <canvas ref={chartRef} />
        </div>
    );
}
