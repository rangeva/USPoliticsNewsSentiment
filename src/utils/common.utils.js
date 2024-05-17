import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const verifyAccessToken = async (token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    try {
        const result = await axios.get(`${BASE_URL}/newsApiLite?token=${token}&q=sentiment:positive thread.title:trump%20biden`, config)
        return result
        return true;
    } catch (error) {
        console.log(error, 'sjfkjskfjskfjsksjfksjkf')
        return false; 
    }

}

