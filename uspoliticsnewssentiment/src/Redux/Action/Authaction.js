import axios from "axios";
import { ArticleSlice, NegativeArticleSlice } from "../Slice/Authslice";


const BACKEND_URL = process.env.APP_BASE_URL;
const Token = process.env.Api_Token;

// ArticlesNews
export const ArticledisplayAction = (name, token = 'db458c9d-4ffc-4c44-b0b8-0cb0821aba84',sort = 'desc', orderField = 'published') => async (dispatch) => {
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
            // dispatch(ArticleSlice(error.message));
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
