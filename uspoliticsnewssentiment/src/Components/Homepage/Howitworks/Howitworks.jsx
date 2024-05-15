import React from 'react';
import cardData from "./howitwoekdata"


export default function Howitworks() {
    return (
        <div>
            <section className="title-sections" style={{ paddingTop: "2rem" }}>
                <div className="title-containers text-center">
                    <div className="title-row justify-content-center">
                        <div className="title-col">
                            <h1 className="title-hero-title">How it Works</h1>
                            <h2 className="title-subtitle">Understanding the Process</h2>
                            <p className="title-description" style={{ marginBottom: '2px' }}>
                                Webz.io sources and collects data from across the web   and transforms
                            </p>
                            <p className="title-description" style={{ marginBottom: '20px' }}>
                                it into machine-ready feeds that plug right into any platform.
                            </p>
                        </div>
                    </div>

                    <div className="buttons-container">
                        <div className="card-group">
                            {cardData.map(card => (
                                <div key={card.id} className="card">
                                    <img className="card-img-top" src={card.image} alt="Card image cap" />
                                    <div className="card-body">
                                        <h5 className="card-title">{card.title}</h5>
                                        <p className="card-text">{card.text}</p>
                                        <p className="card-text"><small className="text-muted">{card.lastUpdated}</small></p>
                                    </div>
                                    <span className="btn btn-warning" role="button" tabIndex="0">
                                        Enter Token
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
