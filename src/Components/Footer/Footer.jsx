import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faGoogle, faInstagram, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';


export default function Footer() {
    return (
        <div>
            <footer className='pt-4 pt-lg-5'>
                <section className='text-center text-lg-start'>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 col-lg-3 col-xl-3">
                                <Link className="navbar-brand" to="/">
                                    <img src='/Images/logo-white.svg' alt='' className="img-fluid" />
                                </Link>
                            </div>

                            <div className="col-md-4 col-lg-3 col-xl-3">
                                <h6 className="foot-title">
                                    Site Links
                                </h6>

                                <ul className='list-inline mb-lg-0'>
                                    <li>
                                        <Link to="https://github.com/rangeva/USPoliticsNewsSentiment" className="text-reset">Source Code</Link>
                                    </li>
                                    <li>
                                        <Link to="https://webz.io" className="text-reset">Webz.io</Link>
                                    </li>
                                    <li>
                                        <Link to="https://webz.io/products/news-api#lite" className="text-reset">Free News API</Link>
                                    </li>
                                    <li>
                                        <Link to="https://webz.io/products/news-api#lite" className="text-reset">Access Token</Link>
                                    </li>
                                    
                                </ul>
                            </div>

                            <div className="col-md-4 col-lg-3 col-xl-3">
                                <h6 className="foot-title">
                                    Others
                                </h6>
                                <ul className='list-inline mb-lg-0'>
                                    <li>
                                        <Link to="https://webz.io/tos-lite" className="text-reset">Terms of Services</Link>
                                    </li>
                                    
                                </ul>
                            </div>

                            <div className="col-md-4 col-lg-3 col-xl-3">
                                <h6 className="foot-title">Social Media</h6>
                                <ul className='list-inline social-icon mb-lg-0'>
                                    <li>                                        
                                        <a href="https://www.linkedin.com/company/webz-io-official/posts">
                                            <img src='/Images/telegram-icon.svg' alt='' className="img-fluid" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://x.com/webz_io">
                                            <img src='/Images/x-icon.svg' alt='' className="img-fluid" />
                                        </a>
                                    </li>
                                   
                                    
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="text-center copyright-footer">
                    © 2024 by Webz.io, All Rights Reserved.
                </div>
            </footer>
        </div>
    );
}
