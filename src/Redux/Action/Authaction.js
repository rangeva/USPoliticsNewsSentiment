import axios from "axios";

import Swal from 'sweetalert2';
import { ArticleSlice, NegativeArticleSlice, PietotalnegativeresultSlice, PietotalpositiveresultSlice, PietotalresultSlice } from "../Slice/Authslice";

const BASE_URL = process.env.REACT_APP_BASE_URL;

// ArticlesNews
export const ArticledisplayAction = (name, sort = 'desc', orderField = 'published') => async (dispatch) => {
    try {
        const token = localStorage.getItem('accessToken'); // Retrieve token from localStorage
        

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const [positiveResponse, negativeResponse] = await Promise.all([
            axios.get(`${BASE_URL}/newsApiLite?token=${token}&q=sentiment:positive thread.title:${name} election`, config),
            axios.get(`${BASE_URL}/newsApiLite?token=${token}&q=sentiment:negative thread.title:${name} election`, config)
        ]);

        dispatch(ArticleSlice(positiveResponse.data));
        dispatch(NegativeArticleSlice(negativeResponse.data));
    } catch (error) {
        if (error.response && error.response.status === 429) {
            Swal.fire({
                icon: 'error',
                title: 'Too many requests',
                text: 'You have exceeded the limit of requests. Please try again later.',
            });
        } else if (error?.response?.data.message) {

            console.error(error);
        }
    }
};



// Paginstaion 
export const NexpaginationAction = (positiveUrl, negativeUrl) => async (dispatch) => {
    try {
        const token = localStorage.getItem('accessToken'); // Retrieve token from localStorage

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const [positiveResponse, negativeResponse] = await Promise.all([

            axios.get(`${BASE_URL}/${positiveUrl}`, config),
            axios.get(`${BASE_URL}/${negativeUrl}`, config)

        ]);

        dispatch(ArticleSlice(positiveResponse.data));
        dispatch(NegativeArticleSlice(negativeResponse.data));
    } catch (error) {
        console.error('Error fetching paginated articles:', error);
    }
};


// Piechart total count
export const PietotalresultAction = () => async (dispatch) => {
    try {
        const token = localStorage.getItem('accessToken'); // Retrieve token from localStorage
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const [positiveResponse, negativeResponse] = await Promise.all([
            axios.get(`${BASE_URL}/newsApiLite?token=${token}&q=sentiment:positive thread.title:trump%20biden`, config),
            axios.get(`${BASE_URL}/newsApiLite?token=${token}&q=sentiment:negative thread.title:trump%20biden`, config)
        ]);

        dispatch(PietotalpositiveresultSlice(positiveResponse.data));
        dispatch(PietotalnegativeresultSlice(negativeResponse.data));
    } catch (error) {
        if (error.response && error.response.status === 429) {
            setTimeout(() => {
                dispatch(PietotalresultAction()); // Call action recursively
            }, 5000);
            // Swal.fire({
            //     icon: 'error',
            //     title: 'Too many requests',
            //     text: 'Used 1000 out of 1000 allowed in a month',
            // });
        } else {
            console.error('Error fetching totalresult articles:', error);
            Swal.fire({
                icon: 'error',
                title: 'Token is not valid',
            });
        }
    }
};
