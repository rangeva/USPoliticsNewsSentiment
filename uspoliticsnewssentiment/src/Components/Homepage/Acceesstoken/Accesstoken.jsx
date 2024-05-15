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
        <section className="accessTokenContainer bg_gray p-block">            
            <div className="container p-block p-block-mob">
                <div className="row justify-content-center blue-card">
                    <div className="col-12 text-center">
                        <div className="box_styleOne">
                            <div className="row justify-content-center">
                                <div className="col-12 col-lg-6 text-center">
                                    <h2 className="heading_one">Enter Access Token</h2>
                                    <p className="color_lightGray">Webz.io sources and collects data from across the web and transforms it into machine-ready feeds that plug right into any platform.</p>
                                </div>
                                <div className="col-12 text-center form-wrapper">
                                    <div className="searchForm">
                                        <form onSubmit={handleSubmit}>
                                            <input
                                                type="text"
                                                value={searchTerm}
                                                onChange={handleSearchChange}
                                                placeholder="Enter your Access Token"
                                                className="accessTokenInput"
                                            />
                                            <button type="submit" className="accessTokenButton btn btn_one">Submit</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
