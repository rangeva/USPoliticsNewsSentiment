import axios from "axios";
import { ArticleSlice, NegativeArticleSlice, PietotalnegativeresultSlice, PietotalpositiveresultSlice, PietotalresultSlice} from "../Slice/Authslice";


// ArticlesNews
export const ArticledisplayAction = (name, token = '5b111e78-5a0a-4b83-9c23-9b6343dc857d',sort = 'desc', orderField = 'published') => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const positiveResponse = await axios.get(`https://api.webz.io/newsApiLite?token=${token} &q=sentiment:positive thread.title:${name} election`, config);
        //   debugger
        dispatch(ArticleSlice(positiveResponse.data));

        const negativeResponse = await axios.get(`https://api.webz.io/newsApiLite?token=${token}&q=sentiment:negative thread.title:${name} election`, config);
        dispatch(NegativeArticleSlice(negativeResponse.data));

    } catch (error) {
        if (error?.response?.data.message) {
            console.error(error);
        }
    }
};


export const NexpaginationAction = (positiveUrl, negativeUrl) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const [positiveResponse, negativeResponse] = await Promise.all([
            axios.get(`https://api.webz.io/${positiveUrl}`, config),
            axios.get(`https://api.webz.io/${negativeUrl}`, config)
        ]);

        dispatch(ArticleSlice(positiveResponse.data));
        dispatch(NegativeArticleSlice(negativeResponse.data));
    } catch (error) {
        console.error('Error fetching paginated articles:', error);
    }
};


// Correct the dispatch in your action creator
export const PietotalresultAction = (token = '5b111e78-5a0a-4b83-9c23-9b6343dc857d') => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const [positiveResponse, negativeResponse] = await Promise.all([
            axios.get(`https://api.webz.io/newsApiLite?token=${token}&q=sentiment:positive thread.title:trump%20biden`, config),
            axios.get(`https://api.webz.io/newsApiLite?token=${token}&q=sentiment:negative thread.title:trump%20biden`, config)
        ]);
        console.log('Positive Response111:', positiveResponse.data);
        console.log('Negative Response222:', negativeResponse.data);

        // Correct dispatch to send an action with type and payload
        dispatch(PietotalpositiveresultSlice(positiveResponse.data));
        dispatch(PietotalnegativeresultSlice(negativeResponse.data));
    } catch (error) {
        if (error.response && error.response.status === 429) {
            setTimeout(() => {
                dispatch(PietotalresultAction(token));
            }, 5000);
        } else {
            console.error('Error fetching totalresult articles:', error);
        }
    }
};


