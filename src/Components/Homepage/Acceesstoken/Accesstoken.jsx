import React, { useState } from 'react';
import { verifyAccessToken } from '../../../utils/common.utils';
import { toast } from 'react-toastify';
import config from '../../../config.json'; 


export default function AccessToken({onSubmit }) {
    const [accessToken, setAccessToken] = useState('');
    const [loading,setLoading]=useState(false)
    

    const handleTokenChange = (event) => {
        setAccessToken(event.target.value);
      };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Check if access token is available
        if (!accessToken) {
            // If token is null or undefined, display error message
            toast.error('Access token is missing!');
            return;
        }
        try {
            setLoading(true);
            const result = await verifyAccessToken(accessToken);  
           
            if (result) {
                onSubmit(accessToken); 
            } else {
                toast.error('Invalid access token!');
            }
        } catch (error) {
            console.error("Error verifying access token:");
        }finally {
            setLoading(false); 
        }
    };
    
    return (
        <section className="accessTokenContainer bg_gray p-block">            
            <div className="container p-block p-block-mob">
                <div className="row justify-content-center blue-card mx-0">
                    <div className="col-12 text-center">
                        <div className="box_styleOne">
                            <div className="row justify-content-center">
                                <div className="col-12 col-lg-6 text-center">
                                    <h2 className="heading_one">{config.accesstoken.heading}</h2>
                                    <p className="color_lightGray">{config.accesstoken.description}</p>
                                </div>
                                <div className="col-12 text-center form-wrapper">
                                    <div className="searchForm">
                                        <form onSubmit={handleSubmit}>
                                            <input
                                                type="text"
                                                value={accessToken}
                                                onChange={handleTokenChange}
                                                placeholder="Enter your Access Token"
                                                className="accessTokenInput"
                                            />
                                            <button type="submit" disabled={loading} className="accessTokenButton btn btn_one"> {loading ? 'Loading...' : 'Submit'}</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
