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
                                        <Link to="/" className="text-reset">Home</Link>
                                    </li>
                                    <li>
                                        <Link to="/howitworks" className="text-reset">How it Works</Link>
                                    </li>
                                    <li>
                                        <Link to="/accesstoken" className="text-reset">Access Token</Link>
                                    </li>
                                    <li>
                                        <Link to="/faq" className="text-reset">FAQ's</Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="text-reset">Contact</Link>
                                    </li>
                                </ul>
                            </div>

                            <div className="col-md-4 col-lg-3 col-xl-3">
                                <h6 className="foot-title">
                                    Others
                                </h6>
                                <ul className='list-inline mb-lg-0'>
                                    <li>
                                        <Link to="#" className="text-reset">Terms of Services</Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="text-reset">Privacy Policy</Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="text-reset">News API</Link>
                                    </li>
                                </ul>
                            </div>

                            <div className="col-md-4 col-lg-3 col-xl-3">
                                <h6 className="foot-title">Social Media</h6>
                                <ul className='list-inline social-icon mb-lg-0'>
                                    <li>                                        
                                        <a href="https://www.facebook.com/your-page">
                                            <img src='/Images/telegram-icon.svg' alt='' className="img-fluid" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.twitter.com/your-profile">
                                            <img src='/Images/x-icon.svg' alt='' className="img-fluid" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.google.com">
                                            <img src='/Images/discord-bot.svg' alt='' className="img-fluid" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.instagram.com/your-profile">
                                            <img src='/Images/web.svg' alt='' className="img-fluid" />
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
