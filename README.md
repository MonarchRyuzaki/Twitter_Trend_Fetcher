# Twitter Trends Fetching Web Scraping Project

Welcome to the Twitter Trends Fetching Web Scraping Project! This project aims to scrape the latest trending topics from Twitter using a combination of various modern technologies. It includes a backend to handle web scraping and email verification, a frontend to display the trends, and a database to store the collected data.

## Table of Contents

* [Features](#features)
* [Technologies Used](#technologies-used)
* [Setup](#setup)
* [Usage](#usage)
* [Video Example](#video-example)

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
