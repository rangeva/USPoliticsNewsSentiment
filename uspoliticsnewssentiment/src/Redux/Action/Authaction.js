import axios from "axios";
import { ArticleSlice, NegativeArticleSlice, NextpaginationSlice } from "../Slice/Authslice";


export const ArticledisplayAction = (name, token = '3c830191-4cf4-4a5a-89d8-5eeb18e15f60') => async (dispatch) => {
    console.log(name, 'oooooo');
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const positiveResponse = await axios.get(`https://api.webz.io/newsApiLite?token=${token} &q=sentiment:positive thread.title:${name} election`);
        //   debugger
        dispatch(ArticleSlice(positiveResponse.data));

        const negativeResponse = await axios.get(`https://api.webz.io/newsApiLite?token=${token}&q=sentiment:negative thread.title:${name} election`);
        dispatch(NegativeArticleSlice(negativeResponse.data));

    } catch (error) {
        if (error?.response?.data.message) {
            // dispatch(ArticleSlice(error.message));
            console.error(error);
        }
    }
};



export const NexpaginationAction = (url, token = '3c830191-4cf4-4a5a-89d8-5eeb18e15f60') => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const response = await axios.get(`https://api.webz.io/${url}`);
        console.log(response, 'ppppppppppp')
        //   debugger
        dispatch(NextpaginationSlice(response.data));

    } catch (error) {
        if (error?.response?.data.message) {
            // dispatch(ArticleSlice(error.message));
            console.error(error);
        }
    }
};