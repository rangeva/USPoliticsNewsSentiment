# USPoliticsNewsSentiment


## Description
This project is an open-source demo web application that showcases the use of the Webz.io [News API](https://webz.io/products/news-api#lite) Lite for viewing news about US politics. 
The application allows users to select their favorite political candidate to view specific news articles related to them. You can, of course, fork this project and change the topics to whatever you want, such as Bitcoin vs. Ethereum. 

<p align="left">
  <img src="https://github.com/rangeva/USPoliticsNewsSentiment/blob/main/screencapture1.png" alt="Image 1" width="192" style="vertical-align: top;"/>
  <img src="https://github.com/rangeva/USPoliticsNewsSentiment/blob/main/screencapture2.png" alt="Image 2" width="192" style="vertical-align: top;"/>
  <img src="https://github.com/rangeva/USPoliticsNewsSentiment/blob/main/screencapture3.png" alt="Image 3" width="192" style="vertical-align: top;"/>
</p>


To access the data, an API token is required, which can be obtained [using Webz.io Free News API](https://webz.io/products/news-api#lite):

<img src="https://github.com/rangeva/USPoliticsNewsSentiment/blob/main/access_token.png" >

For a quick guide on how to use the News API, visit this [link](https://webz.io/blog/news-api/quick-guide-to-the-webz-io-free-news-api-lite/).


## Installation
To run this project locally, follow these steps:

1. Clone the repository:

   git clone https://github.com/rangeva/USPoliticsNewsSentiment/


2. Navigate to the project directory

    cd project-directory


3. Install dependencies using npm
    npm install


4. Start the development server
    npm start 


5. Edit the text :
    If you need to edit static data in the project, edit config.json file inside the src for that purpose. 
   

Once the server is running, open your web browser and go to http://localhost:3000 

Upon loading the application, a popup will appear prompting for an API token. Click the "Get Token" button to acquire the token. Enter the token in the provided input field to access website data.

If the token is valid, you will be redirected to the landing page where you can view news regarding US politics.

Select your favorite candidate to view particular news articles related to them.

