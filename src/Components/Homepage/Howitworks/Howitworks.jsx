import React from 'react';
import config from '../../../config.json';


export default function Howitworks() {
    const cardData = config.cardata[0];
    return (
        <div>
            <section className="how-it-works-sections">
                <div className="container text-center">
                    <div className="title-row justify-content-center">
                        <div className="section-title">
                            <h2 className="title-hero-title">{cardData.sectionTitle.heroTitle}</h2>
                            <h3 className="title-subtitle">{cardData.sectionTitle.subtitle}</h3>
                            <p className="title-description" style={{ whiteSpace: 'pre-line' }}>
                                {cardData.sectionTitle.description}
                            </p>
                        </div>
                    </div>

                    <div className="row justify-content-center mb-3 pb-lg-4 card-group">
                        {cardData && cardData.cards.map(card => (
                            <div key={card.id} className="col-12 col-lg-4 text-center mb-4 mb-lg-0">
                                <div className="card card_styleTwo h-100">
                                    <div className="card_img">
                                        <img className="card-img-top" src={card.image} alt="Card image cap" />
                                    </div>
                                    <div className="card-body p-0">
                                        <h5 className="card-title">{card.title}</h5>
                                        <p className="card-text">{card.text}</p>
                                        <p className="card-text"><small className="text-muted">{card.lastUpdated}</small></p>
                                    </div>

                                    <button className="btn btnOne" role="button" tabIndex="0">
                                        Enter Token
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
