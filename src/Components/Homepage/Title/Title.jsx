import React from 'react';


export default function Title() {
    return (
        <div>
            <section className="title-sections">
                <div className="container text-center">
                    <div className="title-row justify-content-center">
                        <div className="title-col">
                            <h1 className="title-hero-title edge-tag">Battle for the Oval</h1>
                            <h2 className="title-subtitle">Biden vs. Trump</h2>
                            <h1 className="title-main-heading edge-tag">Deciding America's Future</h1>
                            <p className="title-description">
                                Webz.io transforms the web into machine-ready feeds that plug right into any platform. So machines get<br className='d-none d-lg-block'></br>
                                data just the way they need it — and companies easily turn web data into customer value.
                            </p>
                        </div>
                    </div>
                    <div className="buttons-container">
                        <a href="https://webz.io/products/news-api#lite" target="_blank" rel="noopener noreferrer">
                            <button className="btn btnOne" >  Get API  Access Token</button>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
