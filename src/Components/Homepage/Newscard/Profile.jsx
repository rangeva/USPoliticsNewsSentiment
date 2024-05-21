import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Oval as Loader } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import PieChart from '../../../Piechart/Piechart';
import { ArticledisplayAction, NexpaginationAction } from '../../../Redux/Action/Authaction';
import { toast, Toaster } from 'react-hot-toast'
import config from '../../../config.json';



export default function Profile(name) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const articlesSectionRef = useRef(null);
    const { people, staticContent, additionalContent } = config;
    const person = people.find(p => p.id === id);
    const [order, setOrder] = useState('desc');
    const [token, setToken] = useState(localStorage.getItem('accessToken') || '');
    const [isLoading, setIsLoading] = useState(true);
    const [loadingArticles, setLoadingArticles] = useState(false);
    const [loadingPagination, setLoadingPagination] = useState(false);


    const positivearticle = useSelector((state) => state.news.ArticlesData);
    const negativearticle = useSelector((state) => state.news.NegativearticleData);
    const totalPositiveCount = useSelector((state) => state.news.totalPositiveCount);
    const totalNegativeCount = useSelector((state) => state.news.totalNegativeCount);

    const formattedTotalPositiveCount = new Intl.NumberFormat().format(totalPositiveCount);
    const formattedTotalNegativeCount = new Intl.NumberFormat().format(totalNegativeCount);


    useEffect(() => {
        if (id && token) {
            console.log(`Fetching articles with order: ${order}`);
            dispatch(ArticledisplayAction(id, token, order))
                .then(() => setIsLoading(false))
                .catch(() => setIsLoading(false))
                .then(() => setLoadingArticles(false))
                .catch(() => setLoadingArticles(false));
        }
    }, [dispatch, id, order, token]);


   


    const handlePageChange = () => {
        setLoadingPagination(true);
        const positiveNextUrl = positivearticle.next;
        const negativeNextUrl = negativearticle.next;

        if (positiveNextUrl && negativeNextUrl) {
            dispatch(NexpaginationAction(positiveNextUrl, negativeNextUrl))
                .then(() => {
                    setLoadingPagination(false);
                    setLoadingArticles(false);
                    if (articlesSectionRef.current) {
                        articlesSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                })
                .catch(() => {
                    setLoadingPagination(false);
                    setLoadingArticles(false)
                });
        } else {
            console.error("Error accur from api to  getting  positive or negative articles");
            setLoadingPagination(false);
            setLoadingArticles(false);
        }
    };


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options);
    };

    if (!person) return <div>Profile not found.</div>;


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
                                    <h2>{staticContent.header}</h2>
                                    <p dangerouslySetInnerHTML={{ __html: staticContent.description }}></p>
                                </div>
                                <div className="col-md-4">
                                    <div className="map-img-holder">
                                        <img className='img-fluid' src={staticContent.image} alt="" />
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
                        <div className="row px-1">
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
                            <div className="col-md-7 text-center text-md-start">
                                <div className="pro-details">
                                    <h1>{person.name}</h1>
                                    <h3 className='pb-4 color_secondary'>{person.title}</h3>
                                    <h4>About the Candidate</h4>
                                    <p className='bb-1'>{person.about}</p>
                                    <h4 className='cp-list-title'>Campaign positions</h4>
                                    <ul className='cp-content pb-4 pb-md-0 mb-0'>
                                        {person.campaignPosition.map((position, index) => (
                                            <li key={index}>{position}</li>
                                        ))}
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
                                    <span className="emoji"><img src={additionalContent.emoji} alt="" /></span>
                                    <h2 className="title">{additionalContent.title}</h2>
                                </div>
                                <p className='text-center text-md-start'>
                                            {additionalContent.text}
                                </p>
                                <p className='text-center text-md-start'>
                                {additionalContent.text2}
                                </p>
                            </div>
                        </div>
                        <div className="col-md-5 col-xl-4 offset-xl-1">
                            {isLoading ? (
                                <div className="loader-container">
                                    <Loader type="Oval" color="#00BFFF" height={90} width={90} />
                                </div>
                            ) : (
                                <PieChart totalPositiveCount={totalPositiveCount} totalNegativeCount={totalNegativeCount} context="profile" />
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <section className='articles-section bg_gray' ref={articlesSectionRef}>
                <div className="container">
                    {loadingPagination ? (
                        <div className="loader-container">
                            <Loader type="Oval" color="#ffffff" height={100} width={100} />
                        </div>
                    ) : (
                        <div className="row px-1">
                            <div className="col-md-6">
                                <div className="positive-article wrapper">
                                    <div className="title-holder">
                                        <h4>
                                            <span>{formattedTotalPositiveCount}</span>
                                            Positive Articles
                                        </h4>
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
                                                {/* <p className='discription'>{article.text}</p> */}
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
                                            <span>{formattedTotalNegativeCount}</span>
                                            Negative Articles
                                        </h4>
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
                                                {/* <p className='discription'>{article.text}</p>/ */}
                                                <a href={article.url} target='blank' className='mt-4 d-block'>
                                                    View Original Article <span><img src="/images/r-arrow.svg" alt="" /></span>
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
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



