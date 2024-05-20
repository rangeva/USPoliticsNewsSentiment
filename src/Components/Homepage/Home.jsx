import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Title from './Title/Title';
import Newscard from './Newscard/Newscard';
import Chart from './Chart/Chart';
import Howitworks from './Howitworks/Howitworks';
import Accesstoken from './Acceesstoken/Accesstoken'
import Faqs from './Faqs/Faqs';
import { verifyAccessToken } from "../../utils/common.utils"
import config from '../../config';

Modal.setAppElement('#root');

const BASE_URL = config.REACT_APP_BASE_URL;


const Home = () => {
    const [showModal, setShowModal] = useState(false);
    const [accessToken, setAccessToken] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const storedToken = localStorage.getItem('accessToken');
        const tokenSubmitted = localStorage.getItem('tokenSubmitted');
        if (storedToken && tokenSubmitted) {
            setShowModal(false);
            document.body.style.overflow = 'auto'; 
        } else {
            setShowModal(true);
            document.body.style.overflow = 'hidden'; 
        }
    }, []);

    const checkToken = async (token) => {
        const isValid = await verifyAccessToken(token);
        if (isValid.status === 200) {
            setAccessToken(token);
            localStorage.setItem('accessToken', token);
            localStorage.setItem('tokenSubmitted', true);
            setShowModal(false);
            document.body.style.overflow = 'auto'; 
        } else {
            setError('Stored access token is invalid. Please enter a new one.');
            setShowModal(true);
            document.body.style.overflow = 'hidden'; 
        }
    };

    const handleAccessTokenSubmit = async (token) => {
        const isValid = await verifyAccessToken(token);
        if (isValid) {
            checkToken(token);
            setError('');
        } else {
            setError('Invalid access token. Please try again.');
        }
    };

    return (
        <div>
            <Title />
            <Newscard />
            <Chart />
            <Howitworks />
            <Accesstoken />
            <Faqs />
            {showModal && (
                <Modal
                    className={'accessToken_modal'}
                    isOpen={showModal}
                    onRequestClose={() => setShowModal(true)}
                    shouldCloseOnOverlayClick={false}
                    contentLabel="No Access Token Found"
                >
                    <p>Please provide an access token to proceed.</p>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <Accesstoken onSubmit={handleAccessTokenSubmit} />
                    <a className='atBtn_holder' href="https://webz.io/products/news-api#lite" target="_blank" rel="noopener noreferrer">
                        <button className='btn btnOne'>Get Your Token</button>
                    </a>
                </Modal>
            )}
        </div>
    );
};

export default Home;