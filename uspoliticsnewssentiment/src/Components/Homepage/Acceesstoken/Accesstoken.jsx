import React, { useState } from 'react';


export default function AccessToken({onSubmit }) {
    const [accessToken, setAccessToken] = useState('');
    // const [searchTerm, setSearchTerm] = useState('');

    const handleTokenChange = (event) => {
        setAccessToken(event.target.value);
      };

      const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Submitting Access Token:", accessToken);
        if (onSubmit) {
            onSubmit(accessToken); // Call the onSubmit function passed via props
          }
      };

    
    return (
        <section className="accessTokenContainer"  style={{ paddingTop: "2rem" }}>
            <div className="title-row accessTokenTitleRow">
                <div className="title-col accessTokenTitleCol">
                    <h1 className="title-hero-title">Enter Access Token</h1>
                    <h2 className="title-subtitle">Understanding the Process</h2>
                    <p className="title-description">
                        Webz.io sources and collects data from across the web and transforms it into
                    </p>
                    <p className="title-description">
                         machine-ready feeds that plug right into any platform.
                    </p>
                </div>
            </div>

            <div className="buttons-container">
                <div className="card-group">
                    <form onSubmit={handleSubmit} className="searchForm">
                        <input
                            type="text"
                            value={accessToken}
                            onChange={handleTokenChange}
                            placeholder="Enter your Access Token"
                            className="accessTokenInput"
                        />
                        <button type="submit" className="accessTokenButton">Submit</button>
                    </form>
                </div>
            </div>
        </section>
    );
}
