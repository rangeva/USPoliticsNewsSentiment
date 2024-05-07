import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

import { people } from './PeopleData';
import PieChart from '../../../Piechart/Piechart';


export default function Profile() {
    const { id } = useParams();
    const person = people.find(p => p.id === id);
    const [positiveAction, setPositiveAction] = useState('');
    const [negativeAction, setNegativeAction] = useState('');

    const handlePositiveChange = (event) => {
        setPositiveAction(event.target.value);

    };

    const handleNegativeChange = (event) => {
        setNegativeAction(event.target.value);

    };

    if (!person) return <div>Profile not found.</div>;

    const { positive, negative } = person.articles;

    const handlePageChange = (pageNumber) => {

    }

    return (
        <section style={{ paddingTop: "1rem" }}>
            <div>
                <span >
                    <Link to="#" style={{ color: 'orange' }}>
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
                            <PieChart articles={person.articles} context="profile" />
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
                        {positive.map((article, index) => (
                            <div key={index} className="article-card">
                                <img src={article.image} alt={article.title} />
                                <div className="article-info">
                                    <button className="btn btn-success">Article</button>
                                    <div className="author-date">
                                        <p>Posted by {article.author}</p>
                                        <p>{article.dateTime}</p>
                                    </div>
                                </div>
                                <h4>{article.title}</h4>
                                <p>{article.description}</p>
                                <Link to="#">
                                    <span>View Original Article</span>
                                </Link>
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
                        {negative.map((article, index) => (
                            <div key={index} className="article-card">
                                <img src={article.image} alt={article.title} />
                                <div className="article-info">
                                    <button className="btn btn-danger">Article</button>
                                    <div className="author-date">
                                        <p>Posted by {article.author}</p>
                                        <p>{article.dateTime}</p>
                                    </div>
                                </div>
                                <h4>{article.title}</h4>
                                <p>{article.description}</p>
                                <Link to="#">
                                    <span>View Original Article</span>
                                </Link>
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
                            <a className="page-link" href="#" onClick={() => handlePageChange(1)}>
                                1
                            </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#" onClick={() => handlePageChange(2)}>
                                2
                            </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#" onClick={() => handlePageChange(3)}>
                                3
                            </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#" onClick={() => handlePageChange('next')}>
                                Next
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </section>
    );
}



