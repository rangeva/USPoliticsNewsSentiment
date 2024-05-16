import React,{useEffect} from 'react';
import { people } from '../Newscard/PeopleData';
import PieChart from '../../../Piechart/Piechart';
import { useDispatch, useSelector } from 'react-redux';

import { ArticledisplayAction } from '../../../Redux/Action/Authaction';
import { PietotalresultAction} from '../../../Redux/Action/Authaction';  


export default function Chart() {
    const dispatch = useDispatch();
    const aggregatedArticles = people.reduce((acc, person) => {
        if (person.articles.positive) {
            acc.positive = acc.positive.concat(person.articles.positive);
        }
        if (person.articles.negative) {
            acc.negative = acc.negative.concat(person.articles.negative);
        }
        return acc;
    }, { positive: [], negative: [] });

    const totalPositiveCount = useSelector((state) => state.news.totalPositiveCount);
    const totalNegativeCount = useSelector((state) => state.news.totalNegativeCount);
    

    useEffect(() => {
        dispatch(ArticledisplayAction());
    }, [dispatch])


    return (
        <section className='chart-section bg_gray'>
            <div className="container">
                <div className='row'>
                    <div className="col-lg-6 mb-5 mb-lg-0">
                        {/* <PieChart articles={aggregatedArticles} context="home" /> */}
                        <PieChart totalPositiveCount={totalPositiveCount} totalNegativeCount={totalNegativeCount} />
                    </div>

                    <div className="col-lg-6 section-title pe-xxl-1">
                        <h2>Tracking the Pulse: </h2>
                        <h3>Viewer Sentiment Analysis of the US Election</h3>
                        <div class="title-description me-xxl-2 text-center text-lg-start">
                            <p className='mb-3 pb-1'>Webz.io sources and collects data from across the web and transforms it into machine-ready feeds that plug right into any platform. It deploys a wide array of crawlers that run in near real-time, drawing from millions of sources — covering everything from the biggest news sites, to obscure blogs and forums, all the way to the furthest reaches of the dark web.</p>

                            <p>All stored in repositories, so machines consume live and historical data on demand. Webz.io gives machines data exactly the way they need it, so companies easily turn web data into customer value.</p>
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
