import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faGoogle, faInstagram, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';


export default function Footer() {
    return (
        <div>
            <footer className="text-center text-lg-start bg-body-tertiary text-muted" style={{ paddingTop: "2rem" }}>
                <section>
                    <div className="container text-center text-md-start mt-5">
                        <div className="row mt-3">
                            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                <h4 className="text-uppercase fw-bold mb-4">
                                    <i className="fas fa-gem me-3"></i>Webz.io
                                </h4>
                            </div>

                            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">
                                    Site Links
                                </h6>
                                <p>
                                    <Link to="/" className="text-reset">Home</Link>
                                </p>
                                <p>
                                    <Link to="/howitworks" className="text-reset">How it Works</Link>
                                </p>
                                <p>
                                    <Link to="/accesstoken" className="text-reset">Access Token</Link>
                                </p>
                                <p>
                                    <Link to="/faq" className="text-reset">FAQ's</Link>
                                </p>
                                <p>
                                    <Link to="#" className="text-reset">Contact</Link>
                                </p>
                            </div>

                            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">
                                    Others
                                </h6>
                                <p>
                                    <Link to="#" className="text-reset">Terms of Services</Link>
                                </p>
                                <p>
                                    <Link to="#" className="text-reset">Privacy Policy</Link>
                                </p>
                                <p>
                                    <Link to="#" className="text-reset">News API</Link>
                                </p>
                            </div>

                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">Social Media</h6>
                                <div>
                                    <a href="https://www.facebook.com/your-page" className="me-4 text-reset">
                                        <FontAwesomeIcon icon={faFacebookF} />
                                    </a>
                                    <a href="https://www.twitter.com/your-profile" className="me-4 text-reset">
                                        <FontAwesomeIcon icon={faTwitter} />
                                    </a>
                                    <a href="https://www.google.com" className="me-4 text-reset">
                                        <FontAwesomeIcon icon={faGoogle} />
                                    </a>
                                    <a href="https://www.instagram.com/your-profile" className="me-4 text-reset">
                                        <FontAwesomeIcon icon={faInstagram} />
                                    </a>
                                    <a href="https://www.linkedin.com/in/your-profile" className="me-4 text-reset">
                                        <FontAwesomeIcon icon={faLinkedin} />
                                    </a>
                                    <a href="https://www.github.com/your-profile" className="me-4 text-reset">
                                        <FontAwesomeIcon icon={faGithub} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="text-center p-4" style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}>
                    © 2024 by Webz.io, All Right Reserved.
                </div>
            </footer>
        </div>
    );
}
