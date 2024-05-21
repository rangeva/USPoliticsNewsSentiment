import axios from "axios";
import toast, { Toaster } from 'react-hot-toast'
import { ArticleSlice, NegativeArticleSlice, PietotalnegativeresultSlice, PietotalpositiveresultSlice } from "../Slice/Authslice";
import config from "../../config";


const BASE_URL = config.REACT_APP_BASE_URL;


export const ArticledisplayAction = (name, sort = 'desc', orderField = 'published') => async (dispatch) => {
    try {
        const token = localStorage.getItem('accessToken');
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        let retries = 0;
        const maxRetries = 5;
        const baseDelay = 1000; // 1 second

        const fetchData = async () => {
            try {
                const [positiveResponse, negativeResponse] = await Promise.all([
                    axios.get(`${BASE_URL}/newsApiLite?token=${token}&q=sentiment:positive thread.title:${name} election`, config),
                    axios.get(`${BASE_URL}/newsApiLite?token=${token}&q=sentiment:negative thread.title:${name} election`, config)
                ]);
                // Check if the responses contain data
                if (positiveResponse.data && negativeResponse.data) {
                    dispatch(ArticleSlice(positiveResponse.data));
                    dispatch(NegativeArticleSlice(negativeResponse.data));
                } else {
                    console.error('Data not found in response.');
                }
            } catch (error) {
                if (error.response && error.response.status === 429) {
                    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second
                    await fetchData(); 
                } else {
                    console.error('Error fetching articles:', error);
                }
            }
        };
        await fetchData();
    } catch (error) {
        console.error(error);
    }
};



export const NexpaginationAction = (positiveUrl, negativeUrl) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const fetchData = async () => {
            try {
                const [positiveResponse, negativeResponse] = await Promise.all([
                    axios.get(`${BASE_URL}/${positiveUrl}`, config),
                    axios.get(`${BASE_URL}/${negativeUrl}`, config)
                ]);
                dispatch(ArticleSlice(positiveResponse.data));
                dispatch(NegativeArticleSlice(negativeResponse.data));
            } catch (error) {
                if (error.response && error.response.status === 429) {
                    console.error('Token limit exceeded. Retrying...');
                    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second
                    await fetchData(); // Retry the request
                } else {
                    console.error('Error fetching paginated articles:', error);
                }
            }
        };

        await fetchData();
    } catch (error) {
        console.error('Error in NexpaginationAction:', error);
    }
};



// Piechart totalcount
export const PietotalresultAction = () => async (dispatch) => {
    const MAX_RETRIES = 3;
    let retryCount = 0;

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('accessToken');
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
                console.error('Too many requests. Retrying after 2 seconds...');
                retryCount++;
                if (retryCount <= MAX_RETRIES) {
                    setTimeout(() => {
                        fetchData();
                    }, 1000);
                } else {
                    console.error('Max retries reached. Unable to fetch total result articles.');
                }
            } else {
                console.error('Error fetching total result articles:', error);
                if (error.response && error.response.status === 401) {
                    console.error('Token is not valid');
                    toast.error('Token is Not Valid');
                }
            }
        }
    };

    await fetchData();
};
