import axios from "axios";
import { toast } from 'react-toastify';
import { ArticleSlice, NegativeArticleSlice, PietotalnegativeresultSlice, PietotalpositiveresultSlice } from "../Slice/Authslice";

const BASE_URL = process.env.REACT_APP_BASE_URL;


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
                dispatch(ArticleSlice(positiveResponse.data));
                dispatch(NegativeArticleSlice(negativeResponse.data));
            } catch (error) {
                if (error.response && error.response.status === 429) {
                    if (retries < maxRetries) {
                        const delay = Math.pow(2, retries) * baseDelay;
                        console.log(`Too many requests. Retrying in ${delay} milliseconds.`);
                        await new Promise(resolve => setTimeout(resolve, delay));
                        retries++;
                        await fetchData(); // Retry the request
                    } else {
                        console.error('Max retries exceeded. Please try again later.');
                    }
                } else if (error?.response?.data.message) {
                    console.error(error);
                }
            }
        };
        await fetchData();
    } catch (error) {
        console.error(error);
    }
};


// Paginstaion 
export const NexpaginationAction = (positiveUrl, negativeUrl) => async (dispatch) => {
    try {
        // const token = localStorage.getItem('accessToken'); // Retrieve token from localStorage

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
                console.error('Too many requests. Retrying after 5 seconds...');
                retryCount++;
                if (retryCount <= MAX_RETRIES) {
                    setTimeout(() => {
                        fetchData();
                    }, 5000);
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
