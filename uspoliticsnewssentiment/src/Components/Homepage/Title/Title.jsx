import React from 'react';


export default function Title() {
    return (
        <div>
            <section className="title-sections" style={{ paddingTop: "2rem" }}>
                <div className="title-containers text-center">
                    <div className="title-row justify-content-center">
                        <div className="title-col">
                            <h1 className="title-hero-title">Battle For The Oval</h1>
                            <h2 className="title-subtitle">Biden vs. Trump</h2>
                            <h1 className="title-main-heading">Deciding America's Future</h1>
                            <p className="title-description" style={{ marginBottom: '2px' }}>
                                Webz.io transforms the web into machine-ready feeds that plug right into any platform. So machines get
                            </p>
                            <p className="title-description" style={{ marginBottom: '20px' }}>
                                Get on-demand access to your own team of developers.
                            </p>
                        </div>
                    </div>
                    <div className="buttons-container">
                        {/* <span className="btn btn-warning" role="button" tabIndex="0">
                            Get API | Access Token
                        </span> */}
                        <a href="https://webz.io/products/news-api#lite" target="_blank" rel="noopener noreferrer">
                            <button className="btn btn-warning" >  Get API | Access Token</button>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
