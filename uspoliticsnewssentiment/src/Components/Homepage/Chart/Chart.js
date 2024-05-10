import React,{useEffect} from 'react';
import { people } from '../Newscard/PeopleData';
import PieChart from '../../../Piechart/Piechart';
import { useDispatch, useSelector } from 'react-redux';
import { PietotalresultAction} from '../../../Redux/Action/Authaction';  


export default function Chart() {
    const dispatch = useDispatch();
    const pietotalPositiveCount = useSelector((state) => state.news.pietotalPositiveCount);
    const pietotalNegativeCount = useSelector((state) => state.news.pietotalNegativeCount);
    console.log(pietotalPositiveCount,pietotalNegativeCount,"hhhhhhhhhhh")

    useEffect(() => {
        dispatch(PietotalresultAction());
    }, [dispatch]);

    return (
        <div className="flex-container" style={{ paddingTop: "2rem" }}>
            <div className="flex-item">
                {/* <PieChart articles={aggregatedArticles} context="home" /> */}
                <PieChart totalPositiveCount={pietotalPositiveCount} totalNegativeCount={pietotalNegativeCount} context="home" />
            </div>

            <div className="flex-item content">
                <h1>Tracking the Pulse: </h1>
                <h2>Viewer Sentiment Analysis of the US Election</h2>
                <div class="content">
                    <p>Webz.io sources and collects data from across the web and transforms it into machine-ready feeds that plug right into any platform. It deploys a wide array of crawlers that run in near real-time, drawing from millions of sources — covering everything from the biggest news sites, to obscure blogs and forums, all the way to the furthest reaches of the dark web.

                        All stored in repositories, so machines consume live and historical data on demand. Webz.io gives machines data exactly the way they need it, so companies easily turn web data into customer value.</p>
                </div>

                <div className="buttons-container">
                    <span className="btn btn-warning" role="button" tabIndex="0">
                        Get API | Access Token
                    </span>
                </div>
            </div>
        </div>
    )
}
