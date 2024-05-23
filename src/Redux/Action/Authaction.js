import axios from "axios";
import { toast } from 'react-hot-toast'
import { ArticleSlice, NegativeArticleSlice, PietotalnegativeresultSlice, PietotalpositiveresultSlice } from "../Slice/Authslice";
import config from "../../config";


const BASE_URL = config.REACT_APP_BASE_URL;

// ArticlesNews
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

        const fetchData = async (query) => {
            try {
                const response = await axios.get(`${BASE_URL}/newsApiLite?token=${token}&q=${query}`, config);
                return response.data;
            } catch (error) {
                console.error('Error fetching articles:', error);
                throw error;
            }
        };


        if (articleCache[name]) {
            // If data is cached, dispatch it directly
            dispatch(ArticleSlice(articleCache[name].positive));
            dispatch(NegativeArticleSlice(articleCache[name].negative));
        } else if (!requestQueue[name]) {
            requestQueue[name] = true;
            try {
                // Fetch positive articles
                const positiveQuery = `sentiment:positive thread.title:${name} election`;
                const positiveResponse = await fetchData(positiveQuery);
                if (positiveResponse) {
                    dispatch(ArticleSlice(positiveResponse));
                    articleCache[name] = { positive: positiveResponse };
                } else {
                    console.error('Positive data not found in response.');
                }

                // Fetch negative articles only if positive articles were successfully fetched
                if (positiveResponse) {
                    const negativeQuery = `sentiment:negative thread.title:${name} election`;
                    const negativeResponse = await fetchData(negativeQuery);
                    if (negativeResponse) {
                        dispatch(NegativeArticleSlice(negativeResponse));
                        articleCache[name].negative = negativeResponse;
                    } else {
                        console.error('Negative data not found in response.');
                    }
                }
            } finally {
                delete requestQueue[name];
            }
        }
    } catch (error) {
        console.error(error);
    }
};


// Pagination
export const NexpaginationAction = (positiveUrl, negativeUrl) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const fetchData = async () => {
            try {
                // Fetch positive articles
                const positiveResponse = await axios.get(`${BASE_URL}/${positiveUrl}`, config);
                dispatch(ArticleSlice(positiveResponse.data));

                // Fetch negative articles
                const negativeResponse = await axios.get(`${BASE_URL}/${negativeUrl}`, config);
                dispatch(NegativeArticleSlice(negativeResponse.data));
            } catch (error) {
                if (error.response && error.response.status === 429) {
                    console.error('Token limit exceeded. Retrying...');
                    await new Promise(resolve => setTimeout(resolve, 1000));
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
let pieTotalResultRequestPending = false;

export const PietotalresultAction = () => async (dispatch, getState) => {
    const token = localStorage.getItem('accessToken');
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const fetchData = async (query) => {
        try {
            const response = await axios.get(`${BASE_URL}/newsApiLite?token=${token}&q=${query}`, config);
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 429) {
                
                await new Promise(resolve => setTimeout(resolve, 2000));
                return fetchData(query);
            } else if (error.response && error.response.status === 401) {
                console.error('Token is not valid');
                toast.error('Token is Not Valid');
            } else {
                console.error('Error fetching total result articles:', error);
            }
            throw error;
        }
    };

    const state = getState();
    const positiveData = state.pietotalresult?.positiveData;
    const negativeData = state.pietotalresult?.negativeData;

    if (positiveData && negativeData) {
        dispatch(PietotalpositiveresultSlice(positiveData));
        dispatch(PietotalnegativeresultSlice(negativeData));
    } else if (!pieTotalResultRequestPending) {
        pieTotalResultRequestPending = true;

        try {
            if (!positiveData) {
                const positiveQuery = `sentiment:positive thread.title:trump%20biden`;
                const fetchedPositiveData = await fetchData(positiveQuery);
                dispatch(PietotalpositiveresultSlice(fetchedPositiveData));
            }

            if (!negativeData) {
                const negativeQuery = `sentiment:negative thread.title:trump%20biden`;
                const fetchedNegativeData = await fetchData(negativeQuery);
                dispatch(PietotalnegativeresultSlice(fetchedNegativeData));
            }
        } finally {
            pieTotalResultRequestPending = false;
        }
    }
};