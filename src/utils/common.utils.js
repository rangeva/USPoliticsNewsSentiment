import axios from "axios";

const BASE_URL = "https://api.webz.io";

let isTokenValidated = false;

export const verifyAccessToken = async (token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  // Check if the token is already validated
  if (isTokenValidated) {
    return isTokenValidated;
  }

  try {
    const result = await axios.get(
      `${BASE_URL}/newsApiLite?token=${token}&q=sentiment:positive thread.title:trump%20biden`,
      config
    );
    isTokenValidated = result;
    return result;
  } catch (error) {
    console.log("Token is not Valid");
    return false;
  }
};
