import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

import { people } from './PeopleData';
import PieChart from '../../../Piechart/Piechart';
import { useDispatch, useSelector } from 'react-redux';
import { ArticledisplayAction, NexpaginationAction } from '../../../Redux/Action/Authaction';


export default function Profile(name) {
    const { id } = useParams();
    const person = people.find(p => p.id === id);
    const [positiveAction, setPositiveAction] = useState('');
    const [negativeAction, setNegativeAction] = useState('');

    const dispatch = useDispatch();
    const positivearticle = useSelector((state) => state.news.ArticlesData);
    const negativearticle = useSelector((state) => state.news.NegativearticleData)
    // const nextpagenation = useSelector((state) => state.news.NexpaginationAction)
    // console.log(newsarticledata.posts[''].author);
    // newsarticledata.posts.forEach(post => {
    //    
    // });
    console.log(positivearticle);
    const totalPositiveCount = useSelector((state) => state.news.totalPositiveCount);
    const totalNegativeCount = useSelector((state) => state.news.totalNegativeCount);


    useEffect(() => {
        dispatch(ArticledisplayAction(id));
    }, [dispatch, id])


    const handlePositiveChange = (event) => {
        setPositiveAction(event.target.value);

    };
    const handleNegativeChange = (event) => {
        setNegativeAction(event.target.value);

    };

    if (!person) return <div>Profile not found.</div>;

    const { positive, negative } = person.articles;

    const handlePageChange = async (url) => {
        console.log(url);
        // try {
        //     let nextPage;
        //     if (pageNumber === 'next') {
        //         nextPage = currentPage + 1;
        //     } else if (pageNumber === 'prev') {
        //         nextPage = currentPage - 1;
        //     } else {
        //         nextPage = pageNumber;
        //     }
        // setCurrentPage(nextPage);
        dispatch(NexpaginationAction(url));
        // } catch (error) {
        //     console.error('Error fetching articles:', error.message);
        // }
    };

    return (
        <section style={{ paddingTop: "1rem" }}>
            <div>
                <span >
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
                            {/* <PieChart articles={person.articles} context="profile" /> */}
                            <PieChart totalPositiveCount={totalPositiveCount} totalNegativeCount={totalNegativeCount} />
                        </div>
                    </div>
                </section>


                <div className="articles-container">
                    <div className="article-section">
                        <h3>Positive Articles
                            <select onChange={handlePositiveChange} value={positiveAction}>
                                <option value="all">All</option>
                                <option value="mostRecent">Most Recent</option>
                                <option value="mostPopular"> Show Latest</option>
                            </select>
                        </h3>
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
                        <h3>Negative Articles
                            <select onChange={handleNegativeChange} value={negativeAction} >
                                <option value="all">All</option>
                                <option value="mostRecent">Most Recent</option>
                                <option value="mostPopular"> Show Latest</option>
                            </select>
                        </h3>
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
                            <a className="page-link" href="#" onClick={() => handlePageChange('prev')}>
                                Previous
                            </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" onClick={() => handlePageChange(positivearticle.next)}>
                                Next
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </section>
    );
}



