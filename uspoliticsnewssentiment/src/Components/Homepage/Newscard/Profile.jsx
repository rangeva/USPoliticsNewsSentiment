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

// const Token = process.env.REACT_APP_API_TOKEN;
// console.log(Token)


export default function Profile(name) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const person = people.find(p => p.id === id);
    const [order, setOrder] = useState('desc');
    const [token, setToken] = useState(localStorage.getItem('accessToken') || ''); // Retrieve token from localStorage
    console.log(token, 'ppp')
    const positivearticle = useSelector((state) => state.news.ArticlesData);
    const negativearticle = useSelector((state) => state.news.NegativearticleData);
    const totalPositiveCount = useSelector((state) => state.news.totalPositiveCount);
    const totalNegativeCount = useSelector((state) => state.news.totalNegativeCount);
    // console.log(totalPositiveCount, totalNegativeCount);

    useEffect(() => {
        if (id && token) {
            console.log(`Fetching articles for ID: ${id} with order: ${order}`);
            dispatch(ArticledisplayAction(id, token, order));
        }
    }, [dispatch, id, order, token]);


    const handleOrderChange = (event) => {
        setOrder(event.target.value);
        console.log(`Order changed to: ${event.target.value}`);
    };


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


    if (!person) return <div>Profile not found.</div>;
    // const { positive, negative } = person.articles;

    // Pagination handler
    // const handlePageChange = () => {
    //     const positiveNextUrl = positivearticle.next;
    //     const negativeNextUrl = negativearticle.next;

    //     if (positiveNextUrl && negativeNextUrl) {
    //         dispatch(NexpaginationAction(positiveNextUrl, negativeNextUrl));
    //     } else {
    //         console.error("Pagination URLs missing for positive or negative articles");
    //     }
    // };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options);
    };

    if (!person) return <div>Profile not found.</div>;
    // const { positive, negative } = person.articles;


    return (
        <main>
            <section className="header-section">
                <div className='profile-sub-header mb-md-5'>
                    <div className='container'>
                        <div className="back-bread py-4">
                            <Link to="/">
                                <span><img src="/images/back-arrow.svg" alt="" /></span>Back to Candidate Selection
                            </Link>
                        </div>
                    </div>
                    <div className='candidate-info bg_gray_dark'>
                        <div className="container">
                            <div className="row text-center text-md-start">
                                <div className="col-md-8">
                                    <h2>2024 Presidential Candidates</h2>
                                    <p>Donald Trump is the presumptive Republican presidential nominee who will face President Joe Biden in
                                        <br className='d-none d-md-block'></br>
                                        November. These were his GOP primary challengers.
                                    </p>
                                </div>
                                <div className="col-md-4">
                                    <div className="map-img-holder">
                                        <img className='img-fluid' src="/images/us-map.svg" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='profile-section'>
                <div className="profile-main-content pt-md-2">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-5">
                                <div className="images-container">
                                    <div className="pro-image">
                                        <img className='img-fluid w-100' src={person.secondImage} alt={person.name} />
                                    </div>
                                    <div className="profile-links d-none d-md-block">
                                        <h5>Campaign Website</h5>
                                        <Link className='candidate-link' to={person.campaignLink} target="_blank" rel="noopener noreferrer">{person.campaignLink}</Link>
                                        <div className="social-links">
                                            <h6>Social Media</h6>
                                            <ul className='list-inline mb-0'>
                                                <li>
                                                    <Link to={person.socialLinks.facebook}>
                                                        <FontAwesomeIcon icon={faFacebookF} />
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to={person.socialLinks.twitter}>
                                                        <FontAwesomeIcon icon={faTwitter} />
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to={person.socialLinks.instagram}>
                                                        <FontAwesomeIcon icon={faInstagram} />
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to={person.socialLinks.youtube}>
                                                        <FontAwesomeIcon icon={faYoutube} />
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-7 text-center text-md-start">
                                <div className="pro-details">
                                    <h1>{person.name}</h1>
                                    <h3 className='pb-4 color_secondary'>{person.title}</h3>
                                    <h4>About the Candidate</h4>
                                    <p className='bb-1'>{person.about}</p>
                                    <h4 className='cp-list-title'>Campaign Positions</h4>
                                    {/* <p>{person.campaignPosition}</p> */}
                                    <ul className='cp-content pb-4 pb-md-0 mb-0'>
                                        <li>Support legislation that represents a “record investment” in police.</li>
                                        <li>Pardon 'a large portion' of the people convicted of federal offenses for their participation in the Jan. 6, 2021, attack on the U.S. Capitol.</li>
                                        <li>Sign an executive order instructing federal agencies to 'cease all programs that promote the concept of sex and gender transition at any age'; punish doctors who provide gender-affirming care to minors.</li>
                                        <li>Get something done on abortion; has declined to specify how many weeks into a pregnancy he would support a ban; has said a federal ban would need to include exceptions for rape, incest, and the life of the mother.</li>
                                    </ul>
                                </div>
                                <div className="profile-links d-block d-md-none">
                                    <h5>Campaign Website</h5>
                                    <Link className='candidate-link' to={person.campaignLink} target="_blank" rel="noopener noreferrer">{person.campaignLink}</Link>
                                    <div className="social-links">
                                        <h6>Social Media</h6>
                                        <ul className='list-inline mb-0'>
                                            <li>
                                                <Link to={person.socialLinks.facebook}>
                                                    <img src="/images/or_facebook.svg" alt="" />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={person.socialLinks.twitter}>
                                                    <img src="/images/or_x.svg" alt="" />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={person.socialLinks.instagram}>
                                                    <img src="/images/or_instagram.svg" alt="" />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={person.socialLinks.youtube}>
                                                    <img src="/images/or_youtube.svg" alt="" />
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container sa-section mb-4">
                <div className="wrapper">
                    <div className="row">
                        <div className="col-md-7">
                            <div className="main-content">
                                <div className="title-container mb-4">
                                    <span className="emoji"><img src="/images/ph_smiley.svg" alt="" /></span>
                                    <h2 className="title">Sentiment Analysis</h2>
                                </div>
                                <p className='text-center text-md-start'>
                                    Webz.io sources and collects data from across the web and transforms it into machine-ready feeds that plug right into any platform.
                                    It deploys a wide array of crawlers that run in near real-time, drawing from millions of sources — covering everything from the biggest news sites, to obscure blogs and forums, all the way to the furthest reaches of the dark web.
                                    <br /><br />
                                    All stored in repositories, so machines consume live and historical data on demand. Webz.io gives machines data exactly the way they need it, so companies easily turn web data into customer value.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-5 col-xl-4 offset-xl-1">
                            {/* <PieChart articles={person.articles} context="profile" /> */}
                            <PieChart totalPositiveCount={totalPositiveCount} totalNegativeCount={totalNegativeCount} context="profile" />
                        </div>
                    </div>
                </div>
            </section>

            <section className='articles-section bg_gray'>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="positive-article wrapper">
                                <div className="title-holder">
                                    <h4>
                                        <span>{totalPositiveCount}</span>
                                        Positive Articles
                                    </h4>
                                    <select onChange={handleOrderChange} value={order}>
                                        {/* <option value="desc">All</option> */}
                                        <option value="desc">Latest</option>
                                        <option value="asc">Oldest </option>
                                    </select>
                                </div>
                                {positivearticle && positivearticle?.posts?.map((article, index) => (
                                    <div key={index} className="article-card-holder">
                                        <div className="ac-img-wrapper">
                                            <img className='img-fluid w-100' src={article.thread.main_image} alt={article.title} />
                                        </div>
                                        <div className="article-body px-md-2">
                                            <div className="article-info">
                                                <button className="btn btn-success">Article</button>
                                                <div className="author-date-holder">
                                                    <p>Posted by {article.author}</p>
                                                    <p>{formatDate(article.published)}</p>
                                                </div>
                                            </div>
                                            <h4 className='main-pn-card-title'>{article.title}</h4>
                                            <p className='discription'>{article.text}</p>
                                            <a href={article.url} target='blank' className='mt-4 d-block'>
                                                View Original Article <span><img src="/images/g-arrow.svg" alt="" /></span>
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-md-6" >
                            <div className="negative-article wrapper">
                                <div className="title-holder">
                                    <h4>
                                        <span>{totalNegativeCount}</span>
                                        Negative Articles
                                    </h4>
                                    <select onChange={handleOrderChange} value={order} >
                                        {/* <option value="desc">All</option> */}
                                        <option value="desc">Latest</option>
                                        <option value="asc"> Oldest </option>
                                    </select>
                                </div>
                                {negativearticle && negativearticle?.posts?.map((article, index) => (
                                    <div key={index} className="article-card-holder">
                                        <div className="ac-img-wrapper">
                                            <img className='img-fluid w-100' src={article.thread.main_image} alt={article.title} />
                                        </div>
                                        <div className="article-body px-md-2">
                                            <div className="article-info">
                                                <button className="btn btn-danger">Article</button>
                                                <div className="author-date-holder">
                                                    <p>Posted by {article.author}</p>
                                                    <p>{formatDate(article.published)}</p>
                                                </div>
                                            </div>
                                            <h4 className='main-pn-card-title'>{article.title}</h4>
                                            <p className='discription'>{article.text}</p>
                                            <a href={article.url} target='blank' className='mt-4 d-block'>
                                                View Original Article <span><img src="/images/r-arrow.svg" alt="" /></span>
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="pagination-section bg_gray">
                <div className="container">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination mb-0">
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
        </main>
    );
}




