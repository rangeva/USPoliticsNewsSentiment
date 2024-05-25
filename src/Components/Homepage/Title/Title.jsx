import React from 'react';
import config from '../../../config.json'; 


export default function Title() {
    const { heroTitle, subtitle, mainHeading, description, buttonText, buttonLink } = config.Title;
    const descriptionParts = description.split('\n');
    return (
        <div>
            <section className="title-sections">
                <div className="container text-center">
                    <div className="title-row justify-content-center">
                        <div className="title-col">
                            <h1 className="title-hero-title edge-tag">{config.Title.heroTitle}</h1>
                            <h2 className="title-subtitle">{config.Title.subtitle}</h2>
                            <h1 className="title-main-heading edge-tag">{config.Title.mainHeading}</h1>
                            <p className="title-description">
                            {descriptionParts.map((part, index) => (
                                    <React.Fragment key={index}>
                                        {part}
                                        {index < descriptionParts.length - 1 && <br className='d-none d-lg-block' />}
                                    </React.Fragment>
                                ))}
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
