import React, { useState, useEffect } from 'react';
import Title from './Title/Title';
import Newscard from './Newscard/Newscard';
import Chart from './Chart/Chart';
import Howitworks from './Howitworks/Howitworks';
import Accesstoken from './Acceesstoken/Accesstoken'
import Faqs from './Faqs/Faqs';



const Home = () => {
    return (
        <div>
            <Title />
            <Newscard />
            <Chart />
            <Howitworks />
            <Accesstoken />
            <Faqs />
        </div>
    );
};

export default Home;