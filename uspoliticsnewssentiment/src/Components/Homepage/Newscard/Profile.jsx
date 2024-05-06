import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { people } from './PeopleData';


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

    const { positive, negative } = person.articles || { positive: [], negative: [] };


    const handlePageChange = (pageNumber) => {
              
    }

    return (
        <section>
            <div className="profile-container">
                <div className="images-container">
                    <div className="profile-image">
                        <img src={person.image} alt={person.name} />
                    </div>
                    {/* <div className="profile-image">
                <img src={person.secondImage} alt={`${person.name} Second`} />
                </div> */}
                    <div className="profile-links">
                        <h5>Campaign Website</h5>
                        <a href="https://www.donaldjtrump.com/" target="_blank" rel="noopener noreferrer">https://www.donaldjtrump.com/</a>
                        <div className="social-links">
                            <h6 className="text-uppercase fw-bold mb-4">Social Media</h6>
                            <a href="https://www.facebook.com/your-page" className="me-4 text-reset">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="https://www.twitter.com/your-profile" className="me-4 text-reset">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="https://www.instagram.com/your-profile" className="me-4 text-reset">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="https://www.youtube.com/in/your-profile" className="me-4 text-reset">
                                <i className="fab fa-youtube"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="profile-details">
                    <h1>{person.name}</h1>
                    <h2>{person.title}</h2>
                    <p><strong>About the candidate:</strong> {person.about}</p>
                    <p><strong>Campaign Position:</strong> {person.campaignPosition}</p>
                </div>
            </div>
            <div>

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
                                <h4>{article.title}</h4>
                                <p>{article.description}</p>
                            </div>
                        ))}
                    </div>


                    <div className="article-section">
                        <h3>Negative Articles
                            <select onChange={handleNegativeChange} value={negativeAction}>
                                <option value="all">All</option>
                                <option value="mostRecent">Most Recent</option>
                                <option value="mostPopular"> Show Latest</option>
                            </select>

                        </h3>
                        {negative.map((article, index) => (
                            <div key={index} className="article-card">
                                <img src={article.image} alt={article.title} />
                                <h4>{article.title}</h4>
                                <p>{article.description}</p>
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



