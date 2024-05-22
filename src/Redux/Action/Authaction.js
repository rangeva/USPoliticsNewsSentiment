import axios from "axios";
import  { toast } from 'react-hot-toast'
import { ArticleSlice, NegativeArticleSlice, PietotalnegativeresultSlice, PietotalpositiveresultSlice } from "../Slice/Authslice";
import config from "../../config";


const BASE_URL = config.REACT_APP_BASE_URL;

// Articles news

const articleCache = {};
const requestQueue = {}; 

export const ArticledisplayAction = (name, sort = 'desc', orderField = 'published') => async (dispatch) => {
    try {
        const token = localStorage.getItem('accessToken');
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

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
                    // Cache the data
                    articleCache[name] = {
                        positive: positiveResponse.data,
                        negative: negativeResponse.data
                    };
                } else {
                    console.error('Data not found in response.');
                }
            } catch (error) {
                console.error('Error fetching articles:', error);
            } finally {
                delete requestQueue[name];
            }
        };

        // Check if data for 'name' is already in the cache
        if (articleCache[name]) {
            dispatch(ArticleSlice(articleCache[name].positive));
            dispatch(NegativeArticleSlice(articleCache[name].negative));
        } else if (!requestQueue[name]) { 
            requestQueue[name] = true;
            await fetchData();
        }
    } catch (error) {
        console.error(error);
    }
};





// Pagination next
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
                    await fetchData(); 
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
const pieTotalResultCache = {};
let pieTotalResultRequestPending = false;

export const PietotalresultAction = () => async (dispatch) => {
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

            // Cache the data
            pieTotalResultCache['positive'] = positiveResponse.data;
            pieTotalResultCache['negative'] = negativeResponse.data;
        } catch (error) {
            if (error.response && error.response.status === 429) {
                console.error('Too many requests. Retrying after 2 seconds...');
            } else {
                console.error('Error fetching total result articles:', error);
                if (error.response && error.response.status === 401) {
                    console.error('Token is not valid');
                    toast.error('Token is Not Valid');
                }
            }
        } finally {
            pieTotalResultRequestPending = false;
        }
    };

    // Check if data is already in the cache
    if (pieTotalResultCache['positive'] && pieTotalResultCache['negative']) {
        dispatch(PietotalpositiveresultSlice(pieTotalResultCache['positive']));
        dispatch(PietotalnegativeresultSlice(pieTotalResultCache['negative']));
    } else if (!pieTotalResultRequestPending) { 
        pieTotalResultRequestPending = true;
        await fetchData();
    }
};
