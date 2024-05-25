import React, { useState, useEffect } from 'react';
import PieChart from '../../../Piechart/Piechart';
import { useDispatch, useSelector } from 'react-redux';
import { PietotalresultAction } from '../../../Redux/Action/Authaction';
import config from '../../../config.json'; 


export default function Chart() {
    const dispatch = useDispatch();
    const pietotalPositiveCount = useSelector((state) => state.news.pietotalPositiveCount);
    const pietotalNegativeCount = useSelector((state) => state.news.pietotalNegativeCount);
    const [isLoading, setIsLoading] = useState(true);
    const [tokenSubmitted, setTokenSubmitted] = useState(localStorage.getItem('tokenSubmitted'));
     


    useEffect(() => {
        if (tokenSubmitted) {
            const fetchData = async () => {
                try {
                    await dispatch(PietotalresultAction());
                    setIsLoading(false);
                } catch (error) {
                    console.error('Error fetching data:', error);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchData();
        }
    }, [dispatch, tokenSubmitted]);

    // Generate random numbers for positive and negative counts
    const generateRandomCounts = () => {
        const randomPositiveCount = Math.floor(Math.random() * 80);
        const randomNegativeCount = Math.floor(Math.random() * 100);
        return { randomPositiveCount, randomNegativeCount };
    };

   // Conditionally render PieChart or random numbers
   let chartContent;
   if (isLoading) {
       const { randomPositiveCount, randomNegativeCount } = generateRandomCounts();
       chartContent = <PieChart totalPositiveCount={randomPositiveCount} totalNegativeCount={randomNegativeCount} context="home" />;
   } else {
       chartContent = <PieChart totalPositiveCount={pietotalPositiveCount} totalNegativeCount={pietotalNegativeCount} context="home" />;
   }
    return (
        <section className='chart-section bg_gray'>
            <div className="container">
                <div className='row'>
                    <div className="col-lg-6 mb-5 mb-lg-0">
                        {/* <PieChart totalPositiveCount={pietotalPositiveCount} totalNegativeCount={pietotalNegativeCount} context="home" /> */}
                        {chartContent}
                    </div>
                    <div className="col-lg-6 section-title pe-xxl-1">
                        <h2>{config.homechart.mainTitle} </h2>
                        <h3>{config.homechart.subTitle}</h3>
                        <div class="title-description me-xxl-2 text-center text-lg-start">
                            <p className='mb-3 pb-1'>{config.homechart.description1}</p>
                            <p>{config.homechart.description2}</p>
                        </div>

                        <div className="buttons-holder text-center text-lg-start">
                            <a href="https://webz.io/products/news-api#lite" target="_blank" rel="noopener noreferrer">
                                <button className="btn btnTwo" role="button" tabIndex="0">
                                    Get API Access Token
                                </button>
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
