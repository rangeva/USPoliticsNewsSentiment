import React, { useState } from 'react';


export default function AccessToken() {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Searching for:", searchTerm);
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
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Enter your Access Token"
                            className="accessTokenInput"
                        />
                        <button type="submit" className="accessTokenButton">Search</button>
                    </form>
                </div>
            </div>
        </section>
    );
}
