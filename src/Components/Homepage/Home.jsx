import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Title from './Title/Title';
import Newscard from './Newscard/Newscard';
import Chart from './Chart/Chart';
import Howitworks from './Howitworks/Howitworks';
import Accesstoken from './Acceesstoken/Accesstoken'
import Faqs from './Faqs/Faqs';
import {verifyAccessToken} from "../../utils/common.utils"


Modal.setAppElement('#root'); // Set app element for accessibility

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function Home() {
  const [showModal, setShowModal] = useState(true);
  const [accessToken, setAccessToken] = useState('');
  const [error, setError] = useState('');

  // Load access token from local storage on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) {
      setAccessToken(storedToken);
      setShowModal(false);
    }
  }, []);

  // Function to handle access token submission
  const handleAccessTokenSubmit = async (token) => {
    setAccessToken(token);
    localStorage.setItem('accessToken', token);
    setShowModal(false);
  };

  // Function to toggle the modal visibility
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <Title />
      <Newscard />
      <Chart />
      <Howitworks />
      {/* Conditionally render the Access Token component */}
      <Accesstoken  />
      <Faqs />
      {/* Modal */}
      {!accessToken && (
        <Modal
          className={'accessToken_modal'}
          isOpen={showModal}
          onRequestClose={toggleModal}
          contentLabel="No Access Token Found"
        >
          <h2>No Access Token Found</h2>
          <p>Please provide an access token to proceed.</p>
          {error && <p>{error}</p>}
          <Accesstoken onSubmit={handleAccessTokenSubmit} />
          <a className='atBtn_holder' href="https://webz.io/products/news-api#lite" target="_blank" rel="noopener noreferrer">
            <button className='btn btnOne'>Get Your Token</button>
          </a>
        </Modal>
      )}
    </div>
  );
}
// export default function Home() {
//   const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || '');
//   const [showModal, setShowModal] = useState(!accessToken); // Show modal only if access token is not present
//   const [error, setError] = useState('');

//   useEffect(() => {
//     // Check if access token is present and valid
//     if (accessToken) {
//       verifyAccessToken(accessToken)
//         .then(result => {
//           // Access token is valid, show all components
//           setShowModal(false);
//         })
//         .catch(error => {
//           // Access token is not valid, handle error or show modal
//           console.error('Error verifying access token:', error);
//           setShowModal(true);
//         });
//     }
//   }, [accessToken]);

//   // Function to handle access token submission
//   const handleAccessTokenSubmit = async (token) => {
//     setAccessToken(token);
//     localStorage.setItem('accessToken', token);
//   };

//   // Function to toggle the modal visibility
//   const toggleModal = () => {
//     setShowModal(!showModal);
//   };

//   // Conditionally render based on access token
//   if (!accessToken || showModal) {
//     return (
//       <Modal
//         className={'accessToken_modal'}
//         isOpen={showModal}
//         onRequestClose={toggleModal}
//         contentLabel="No Access Token Found"
//       >
//         <h2>No Access Token Found</h2>
//         <p>Please provide a valid access token to proceed.</p>
//         {error && <p>{error}</p>}
//         <Accesstoken onSubmit={handleAccessTokenSubmit} />
//         <a className='atBtn_holder' href="https://webz.io/products/news-api#lite" target="_blank" rel="noopener noreferrer">
//           <button className='btn btnOne'>Get Your Token</button>
//         </a>
//       </Modal>
//     );
//   }

//   // Render components when access token is present and valid
//   return (
//     <>
//       <Title />
//       <Newscard />
//       <Chart />
//       <Howitworks />
//       <Accesstoken />
//       <Faqs />
//     </>
//   );
// }