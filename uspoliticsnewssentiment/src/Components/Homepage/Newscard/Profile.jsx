import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { useDispatch, useSelector } from 'react-redux';

import { people } from './PeopleData';
import PieChart from '../../../Piechart/Piechart';
import { ArticledisplayAction, NexpaginationAction } from '../../../Redux/Action/Authaction';

const Token = process.env.REACT_APP_API_TOKEN;
console.log(Token)

export default function Profile(name) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const person = people.find(p => p.id === id);
    const [order, setOrder] = useState('desc'); 
    

    const positivearticle = useSelector((state) => state.news.ArticlesData);
    const negativearticle = useSelector((state) => state.news.NegativearticleData);
    const totalPositiveCount = useSelector((state) => state.news.totalPositiveCount);
    const totalNegativeCount = useSelector((state) => state.news.totalNegativeCount);
    // console.log(totalPositiveCount, totalNegativeCount);

    useEffect(() => {
        if (id) {
            console.log(`Fetching articles for ID: ${id} with order: ${order}`);
            dispatch(ArticledisplayAction(id, Token, order));
        }
    }, [dispatch, id, order]);

    // Show publisg article based on timestamp
    // useEffect(() => {
    //     filterArticles(articles.ArticlesData, 'positive');
    //     filterArticles(articles.NegativearticleData, 'negative');
    // }, [articles, articleFilter]);

    // const handleFilterChange = (type) => (event) => {
    //     setArticleFilter(prev => ({ ...prev, [type]: event.target.value }));
    // };
    // const filterArticles = (articlesData, type) => {
    //     let sortedArticles = [...articlesData.posts];
    //     if (articleFilter[type] === 'mostRecent') {
    //         sortedArticles.sort((a, b) => new Date(b.published) - new Date(a.published));
    //     } else if (articleFilter[type] === 'mostPopular') {
    //         // Define sorting based on another criteria if needed
    //     }
    //     setDisplayedArticles(prev => ({ ...prev, [type]: sortedArticles }));
    // };
    const handleOrderChange = (event) => {
        setOrder(event.target.value);
        console.log(`Order changed to: ${event.target.value}`);
    };

    
    if (!person) return <div>Profile not found.</div>;
    // const { positive, negative } = person.articles;

    // Pagination handler
    const handlePageChange = () => {
        const positiveNextUrl = positivearticle.next;
        const negativeNextUrl = negativearticle.next;

        if (positiveNextUrl && negativeNextUrl) {
            dispatch(NexpaginationAction(positiveNextUrl, negativeNextUrl));
        } else {
            console.error("Pagination URLs missing for positive or negative articles");
        }
    };
    return (
        <section style={{ paddingTop: "1rem" }}>
            <div>
                <span>
                    <Link to="/" style={{ color: 'orange' }}>
                        Back to Candidate Selection
                    </Link>
                </span>
                <div>
                    <h2>2024 Presidential Candidates</h2>
                    <p>Donald Trump is the presumptive Republican presidential nominee who will face President Joe Biden in
                        <br />
                        November. These were his GOP primary challengers.</p>
                </div>
            </div>

            <div className="profile-container">
                <div className="images-container">
                    <div className="profile-image">
                        <img src={person.secondImage} alt={person.name} />
                    </div>
                    <div className="profile-links">
                        <h5>Campaign Website</h5>
                        <Link to={person.campaignLink} target="_blank" rel="noopener noreferrer">{person.campaignLink}</Link>
                        <div className="social-links">
                            <h6 className="text-uppercase fw-bold mb-4">Social Media</h6>
                            <Link to={person.socialLinks.facebook} className="me-4 text-reset">
                                <FontAwesomeIcon icon={faFacebookF} />
                            </Link>
                            <Link to={person.socialLinks.twitter} className="me-4 text-reset">
                                <FontAwesomeIcon icon={faTwitter} />
                            </Link>
                            <Link to={person.socialLinks.instagram} className="me-4 text-reset">
                                <FontAwesomeIcon icon={faInstagram} />
                            </Link>
                            <Link to={person.socialLinks.youtube} className="me-4 text-reset">
                                <FontAwesomeIcon icon={faYoutube} />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="profile-details">
                    <h1>{person.name}</h1>
                    <h2>{person.title}</h2>
                    <p><strong>About the candidate:</strong>
                        <br />
                        {person.about}</p>
                    <p><strong>Campaign Position:</strong>
                        <br />
                        {person.campaignPosition}</p>
                </div>
            </div>
            <div>


                <section className="container">
                    <div className="two-column-container">
                        <div className="left-column">
                            <div className="content">
                                <div className="title-container">
                                    <p className="emoji">😊</p>
                                    <h1 className="title">Sentiment Analysis</h1>
                                </div>
                                <p>
                                    Webz.io sources and collects data from across the web and transforms it into machine-ready feeds that plug right into any platform.
                                    It deploys a wide array of crawlers that run in near real-time, drawing from millions of sources — covering everything from the biggest news sites, to obscure blogs and forums, all the way to the furthest reaches of the dark web.
                                    <br /><br />
                                    All stored in repositories, so machines consume live and historical data on demand. Webz.io gives machines data exactly the way they need it, so companies easily turn web data into customer value.
                                </p>
                            </div>
                        </div>
                        <div className="right-column">
                            <PieChart totalPositiveCount={totalPositiveCount} totalNegativeCount={totalNegativeCount} context="profile" />
                        </div>
                    </div>
                </section>


                <div className="articles-container">
                    <div className="article-section">
                        <h4> {totalPositiveCount} Positive Articles
                            <select onChange={handleOrderChange} value={order}>
                                {/* <option value="desc">All</option> */}
                                <option value="desc">Latest</option>
                                <option value="asc">Oldest </option>
                            </select>
                        </h4>
                        {positivearticle && positivearticle?.posts?.map((article, index) => (
                            <div key={index} className="article-card">
                                <img src={article.thread.main_image} alt={article.title} />
                                <div className="article-info">
                                    <button className="btn btn-success">Article</button>
                                    <div className="author-date">
                                        <p>Posted by {article.author}</p>
                                        <p>{article.published}</p>
                                    </div>
                                </div>
                                <h4>{article.title}</h4>
                                <p>{article.text}</p>
                                <a href={article.url} target='blank'>
                                    <span>View Original Article</span>
                                </a>
                            </div>
                        ))}
                    </div>
                    <div className="article-section" >
                        <h4> {totalNegativeCount}  Negative Articles
                            <select onChange={handleOrderChange} value={order} >
                                {/* <option value="desc">All</option> */}
                                <option value="desc">Latest</option>
                                <option value="asc"> Oldest </option>
                            </select>
                        </h4>
                        {negativearticle && negativearticle?.posts?.map((article, index) => (
                            <div key={index} className="article-card">
                                <img src={article.thread.main_image} alt={article.title} />
                                <div className="article-info">
                                    <button className="btn btn-danger">Article</button>
                                    <div className="author-date">
                                        <p>Posted by {article.author}</p>
                                        <p>{article.published}</p>
                                    </div>
                                </div>
                                <h4>{article.title}</h4>
                                <p>{article.text}</p>
                                <a href={article.url} target='blank'>
                                    <span>View Original Article</span>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="pagination-container" style={{ display: 'flex', justifyContent: 'center' }}>
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item">
                            <a className="page-link" href="#">
                                Previous
                            </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" onClick={handlePageChange}> Next </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </section>
    );
}



