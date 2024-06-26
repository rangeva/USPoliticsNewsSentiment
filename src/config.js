const config = {
  accesstoken: {
    heading: "Enter Access Token",
    description:
      "To try the demo, you'll need access to the Webz.io News API Lite, which is available for free.",
    placeholder: "Enter your Access Token",
  },
  Title: {
    heroTitle: "Battle for the Oval",
    subtitle: "Biden vs. Trump",
    mainHeading: "Deciding America's Future",
    description:
      "Explore our demo: an interactive dashboard powered by Webz.io News API Lite, designed to analyze and display sentiment trends in US election news. ",
  },
  homechart: {
    mainTitle: "Tracking the Pulse:",
    subTitle: "Viewer Sentiment Analysis of the US Election",
    description1:
      "Our demo leverages Webz.io's News API Lite to showcase sentiment trends in US election news. ",
    description2:
      "Download the source code from: https://github.com/rangeva/USPoliticsNewsSentiment",
  },
  cardata: [
    {
      sectionTitle: {
        heroTitle: "How it Works",
        subtitle: "Understanding the Process",
        description:
          "Webz.io sources and collects data from across the web and transforms it into\nmachine-ready feeds that plug right into any platform.",
      },
      cards: [
        {
          id: 1,
          image: "/Images/Group 57.png",
          title: "Get the News API Lite Access Token",
          text: "Go to our News API web page and enter your email address. Next, check your inbox for an email containing your unique API key. It's completely free!",
        },
        {
          id: 2,
          image: "/Images/Group 58.png",
          title: "Enter Access Token",
          text: "To access the demo, enter the access token you received via email in the dialog box that appears. Please note that you cannot view the demo without the access token provided by Webz.io News Lite.",
        },
        {
          id: 3,
          image: "/Images/Group 59.png",
          title: "View Latest News by Viewers Sentiment",
          text: "Enjoy the demo, which showcases positive and negative news about each candidate. You can scroll to see more news articles categorized by their sentiment, either positive or negative.",
        },
      ],
    },
  ],
  faqSection: {
    title: "Frequently Asked Questions",
    description: "Here are some questions you may have and their answers:",
    faqs: [
      {
        id: 1,
        question:
          "Can I modify the demo to compare entities other than Donald Trump and Joe Biden?",
        answer:
          "Yes, of course! This is an open-source project that you can fork on GitHub and modify. For example, you can change the entities to compare Bitcoin vs. Ethereum. Here is the repo: https://github.com/rangeva/USPoliticsNewsSentiment.",
      },
      {
        id: 2,
        question: "Is the News API free?",
        answer:
          "Yes, it is. Webz.io offers a free version of its news API called News API Lite. You can find it here: https://webz.io/products/news-api#lite.",
      },
      {
        id: 3,
        question: "What programming language is this demo written in?",
        answer: "The demo is written in JavaScript using the React framework.",
      },
      {
        id: 4,
        question: "Why is the sentiment sometimes inaccurate for an article?",
        answer:
          "The sentiment analysis might sometimes be inaccurate due to the complexity and nuances of human language, which can be challenging for automated systems to interpret correctly. Factors such as sarcasm, context, and ambiguous language can affect the accuracy of sentiment detection.",
      },
      {
        id: 5,
        question: "Is there a guide on how to use the API?",
        answer:
          "Yes, you can find a quick guide here: https://webz.io/blog/news-api/quick-guide-to-the-webz-io-free-news-api-lite/.",
      },
      {
        id: 6,
        question: "How often is the data updated?",
        answer:
          "Every time you refresh the page, a new API call is made to retrieve the most relevant news articles from the past 3 days.",
      },
    ],
  },
  people: [
    {
      id: "trump",
      name: "Donald Trump",
      title: "The Republicans",
      description:
        "Donald John Trump was born on June 14, 1946, in Queens, New York City, to Fred and Mary Anne Trump. He grew up in Queens and attended the Kew-Forest School before transferring to the New York Military Academy at the age of 13.",
      image: "/Images/trump.png",
      about:
        "Former President Trump was the first candidate to declare his intent to run for the GOP nomination in 2024. He also became the first former president to face any kind of criminal charges after being indicted by a Manhattan grand jury in a case related to a payoff to a porn star. He now faces federal criminal charges, too, related to his alleged mishandling of classified documents that were discovered at his Mar-a-Lago resort. (Trump has denied wrongdoing in both cases.)",
      campaignPosition: [
        "Support legislation that represents a “record investment” in police.",
        "Pardon 'a large portion' of the people convicted of federal offenses for their participation in the Jan. 6, 2021, attack on the U.S. Capitol.",
        "Sign an executive order instructing federal agencies to 'cease all programs that promote the concept of sex and gender transition at any age'; punish doctors who provide gender-affirming care to minors.",
        "Get something done on abortion; has declined to specify how many weeks into a pregnancy he would support a ban; has said a federal ban would need to include exceptions for rape, incest, and the life of the mother.",
      ],
      secondImage: "/Images/Rectangle 33.png",
      campaignLink: "https://www.donaldtrump.com",
      socialLinks: {
        facebook: "https://www.facebook.com/donaldtrump",
        twitter: "https://www.twitter.com/donaldtrump",
        instagram: "https://www.instagram.com/donaldtrump",
      },
    },
    {
      id: "biden",
      name: "Joe Biden",
      title: "The Democrats",
      description:
        "Joe Biden was born on June 14, 1946, in Queens, New York City, to Fred and Mary Anne Biden. He grew up in Queens and attended the Kew-Forest School before transferring to the New York Military Academy at the age of 17.",
      image: "/Images/joe-biden.png",
      about:
        "Eget orci dui gravida orci pellentesque ultricies praesent. Vel ipsum porttitor eu nisl iaculis sapien euismod sed. Integer eu nibh senectus faucibus. Non erat vitae feugiat blandit ullamcorper integer et posuere.",
      campaignPosition: [
        "Support legislation that represents a “record investment” in police",
        "Pardon a large portion of the people convicted of federal offenses for their participation in the Jan. 6, 2021, attack on the U.S. Capitol",
        "Support legislation that represents a “record investment” in police",
      ],
      secondImage: "/Images/Rectangle 77.png",
      campaignLink: "https://www.joebiden.com",
      socialLinks: {
        facebook: "https://www.facebook.com/joebiden",
        twitter: "https://www.twitter.com/joebiden",
        instagram: "https://www.instagram.com/joebiden",
      },
    },
  ],
  staticContent: {
    header: "2024 Presidential Candidates",
    description:
      "Donald Trump is the presumptive Republican presidential nominee who will face President Joe Biden in<br class='d-none d-md-block'></br>November. These were his GOP primary challengers.",
    image: "/Images/us-map.svg",
  },
  additionalContent: {
    emoji: "/Images/ph_smiley.svg",
    title: "Sentiment Analysis",
    text: "The results page presents a comprehensive view of the sentiment trends in news articles about the candidate. It categorizes articles into positive and negative sentiments, allowing you to quickly grasp the public perception. The page is designed to be interactive, enabling you to scroll through and explore a wide range of news articles. ",
    text2:
      "Each article is enriched with additional information like sentiment, categories, and social data, providing a detailed and nuanced understanding of how each candidate is being portrayed in the media. This clear visualization helps in analyzing and comparing the sentiment trends for each candidate effectively.",
  },
};

export default config;
