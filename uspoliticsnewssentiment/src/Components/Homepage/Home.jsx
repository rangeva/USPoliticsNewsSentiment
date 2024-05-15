// import React, { useState, useEffect } from 'react';
// import Modal from 'react-modal';
// import Title from './Title/Title';
// import Newscard from './Newscard/Newscard';
// import Chart from './Chart/Chart';
// import Howitworks from './Howitworks/Howitworks';
// import Accesstoken from './Acceesstoken/Accesstoken'
// import Faqs from './Faqs/Faqs';
// import axios from 'axios';

// Modal.setAppElement('#root'); // Set app element for accessibility

// export default function Home() {
//   const [showModal, setShowModal] = useState(true);
//   const [accessToken, setAccessToken] = useState('');
//   const [error, setError] = useState('');

//    // Load access token from local storage on component mount
//    useEffect(() => {
//     const storedToken = localStorage.getItem('accessToken');
//     if (storedToken) {
//       setAccessToken(storedToken);
//       setShowModal(false);
//     }
//   }, []);

//   // Function to handle access token submission
//    const handleAccessTokenSubmit = (token) => {
//     setAccessToken(token);
//     localStorage.setItem('accessToken', token);
//     setShowModal(false);
//   };


//   // Function to toggle the modal visibility
//   const toggleModal = () => {
//     setShowModal(!showModal);
//   };

//   return (
//     <div>
//       <Title />
//       <Newscard />
//       <Chart />
//       <Howitworks />
//       {/* Conditionally render the Access Token component */}
//       <Accesstoken/>
//       <Faqs />
//       {/* Modal */}
//       {!accessToken && <Modal
//         isOpen={showModal}
//         onRequestClose={toggleModal}
//         contentLabel="No Access Token Found"
//       >
//         <h2>No Access Token Found</h2>
//         <p>Please provide an access token to proceed.</p>
//         <Accesstoken onSubmit={handleAccessTokenSubmit}/>
//         {/* <button onClick={toggleModal}>Get you Token</button> */}
//         <a href="https://webz.io/products/news-api#lite" target="_blank"  rel="noopener noreferrer">
//           <button >Get Your Token</button>
//         </a>
//       </Modal>}
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Title from './Title/Title';
import Newscard from './Newscard/Newscard';
import Chart from './Chart/Chart';
import Howitworks from './Howitworks/Howitworks';
import Accesstoken from './Acceesstoken/Accesstoken'
import Faqs from './Faqs/Faqs';
import axios from 'axios';

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
      <Accesstoken onSubmit={handleAccessTokenSubmit} />
      <Faqs />
      {/* Modal */}
      {!accessToken && (
        <Modal
          isOpen={showModal}
          onRequestClose={toggleModal}
          contentLabel="No Access Token Found"
        >
          <h2>No Access Token Found</h2>
          <p>Please provide an access token to proceed.</p>
          {error && <p>{error}</p>}
          <Accesstoken onSubmit={handleAccessTokenSubmit} />
          <a href="https://webz.io/products/news-api#lite" target="_blank" rel="noopener noreferrer">
            <button>Get Your Token</button>
          </a>
        </Modal>
      )}
    </div>
  );
}
