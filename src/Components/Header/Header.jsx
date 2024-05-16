import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-transparent">
                <div className="container">
                    <div className="head-wrapper">
                        <Link className="navbar-brand" to="/">
                            <img src='/Images/logo.svg' alt='' className="img-fluid light-bg" />
                            <img src='/Images/logo-mob-white.svg' alt='' className="img-fluid dark-bg" />
                        </Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                            <img className="nav-toggle img-fluid" src='/Images/nav-toggle.svg' alt='' />
                            <img className="nav-close img-fluid" src='/Images/nav_close.svg' alt='' />
                        </button>
                    </div>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/howitworks">How it Works</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/accesstoken">Access Token</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/faq">FAQ's</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="#">Contact</Link>
                            </li>
                        </ul>

                        <a className='text-decoration-none' href="https://webz.io/products/news-api#lite" target="_blank" rel="noopener noreferrer">
                            <button className="btn btnOne" >  Get API  Access Token</button>
                        </a>
                    </div>
                </div>
            </nav>
        </header>
    );
}
