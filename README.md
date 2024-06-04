# Twitter Trends Fetching Web Scraping Project

Welcome to the Twitter Trends Fetching Web Scraping Project! This project aims to scrape the latest trending topics from Twitter using a combination of various modern technologies. It includes a backend to handle web scraping and email verification, a frontend to display the trends, and a database to store the collected data.

## Table of Contents

* [Features](#features)
* [Technologies Used](#technologies-used)
* [Setup](#setup)
* [Usage](#usage)
* [Video Example](#video-example)
* [What I Learned](#what-i-learned)
* [Unresolved Issues](#unresolved-issues)

## Features

* **Web Scraping** : Uses Selenium to scrape trending topics from Twitter.
* **Email Verification** : Utilizes `node-imap` to fetch verification codes from email.
* **Proxy Support** : Implements ProxyMesh and a proxy authentication extension for secure web scraping.
* **Full-Stack Implementation** : Combines Express for the backend, React for the frontend, and MongoDB for data storage.

## Technologies Used

* **Backend** : Express.js, Node.js
* **Frontend** : React.js
* **Database** : MongoDB
* **Web Scraping** : Selenium with Headless Browser
* **Email Handling** : Node-IMAP
* **Proxy** : ProxyMesh with Proxy Authentication Extension

## Setup

### Prerequisites

* Node.js and npm installed
* MongoDB installed and running
* A Twitter account for scraping trends
* An email account for receiving verification codes

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/twitter-trends-fetching.git
   cd twitter-trends-fetching
   ```
2. Install backend dependencies:

```
   cd backend
   npm install
```

3. Install frontend dependencies:

   ```
   cd ../frontend
   npm install
   ```
4. Configure environment variables:

   ```
   Create a .env file in the backend directory and add the following variables:
   TWITTER_EMAIL = user@example.com 
   TWITTER_USERNAME = your_username 
   TWITTER_PASSWORD = your_password 
   MONGODB_URL = your_mongodb_url
   ```
5. Start the backend server:

   ```
   cd ../backend
   node index.js

   ```
6. Start the frontend development server:

   ```
   cd ../frontend
   npm run dev
   ```

## Usage

1. Ensure your MongoDB server is running.
2. Start the backend server and then the frontend development server as described in the setup.
3. Open your browser and navigate to `http://localhost:5173` to view the latest Twitter trends.

## Video Example

[![Video Example](https://img.youtube.com/vi/UUdrwbhedGY/0.jpg)](https://www.youtube.com/watch?v=UUdrwbhedGY)


## What I Learned

During the development of this project, I gained valuable experience in several key areas:

* **Web Scraping with Selenium** : Learned how to automate web browsers using Selenium for scraping dynamic content.
* **React for Frontend Development** : Enhanced my skills in building interactive user interfaces with React.
* **Backend with Express** : Developed a robust backend using Express to handle API requests and manage server-side logic.
* **MongoDB for Data Storage** : Implemented MongoDB for efficient storage and retrieval of scraped data.
* **Email Handling with Node-IMAP** : Understood the process of automating email interactions to fetch verification codes.
* **Proxy Management** : Gained knowledge in using ProxyMesh and proxy authentication extensions to manage web scraping proxies securely.

## Unresolved Issues

While working on this project, I encountered some challenges that I could not fully resolve:

* **Handling Captchas** : Occasionally, Twitter presents captchas that are difficult to bypass programmatically. Finding a reliable solution for this remains a challenge.
* **Proxy Rotation** : Implementing a more sophisticated proxy rotation mechanism to avoid being blocked by Twitter is still a work in progress.
* **Email Verification Reliability** : Ensuring consistent and reliable fetching of verification codes from email can sometimes be unpredictable due to various email provider restrictions.
* **Dynamic Content Loading** : Some Twitter content loads dynamically and handling such cases requires further refinement in the Selenium scripts.
* **Timeout Errors** : Encountered timeout errors during web scraping sessions which can interrupt the data collection process.
* **Invalid Session ID/Not Connected to DevTools** : These errors sometimes occur during the scraping process, causing disruptions and necessitating script restarts.

Due to these unresolved issues, the project is not yet deployed.
