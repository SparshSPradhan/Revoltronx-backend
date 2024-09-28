Search App Backend
This is the backend for the Search App, designed to fetch and return search results from multiple sources like YouTube, academic papers, articles, and blogs. The backend integrates several APIs and provides results ranked based on views, likes, and relevance. The backend is built using Node.js and Express.

Features
Fetches YouTube videos using YouTube Data API.
Fetches articles and blogs using Google Custom Search API or Bing Search API.
Fetches academic papers using Google Scholar or PubMed APIs.
Ranks search results based on views, likes, and relevance.
Supports filtering of results by type (e.g., YouTube videos, articles, academic papers).
Backend designed to be deployed on cloud platforms like Vercel or Heroku.


Table of Contents


Technologies Used
Prerequisites
Setup Instructions
Environment Variables
API Endpoints
Error Handling
Deployment
Contributing


Technologies Used


Node.js: JavaScript runtime for building the backend.
Express: Web framework for building APIs.
Axios: Promise-based HTTP client for making API requests.
YouTube Data API: For fetching YouTube video metadata.
Google Custom Search API: For fetching articles and blog posts.
Google Scholar API (or PubMed API): For fetching academic papers.
Vercel (or Heroku): For deploying the backend.


Prerequisites
Node.js (version 14 or higher)
NPM or Yarn package manager
API Keys for:
YouTube Data API
Google Custom Search API or Bing API
Google Scholar or PubMed API


Setup Instructions


1. Clone the Repository
bash
git clone https://github.com/your-username/search-app-backend.git
cd search-app-backend


3. Install Dependencies

npm install
# or
yarn install


3. Environment Variables


Create a .env file in the root directory and add the following environment variables:

YOUTUBE_API_KEY=your-youtube-api-key
GOOGLE_SEARCH_API_KEY=your-google-api-key
GOOGLE_SEARCH_ENGINE_ID=your-search-engine-id

Replace the your-... fields with actual keys obtained from respective APIs.

Environment Variables

YOUTUBE_API_KEY: API key for YouTube Data API.
GOOGLE_SEARCH_API_KEY: API key for Google Custom Search API.
GOOGLE_SEARCH_ENGINE_ID: Google Search Engine ID for the search API.


API Endpoints

1. Search API
GET /search?q={searchTerm}&filter={filter}

Description: Fetches search results from YouTube, articles, blogs, and academic papers based on the search term.
Query Parameters:
q: The search query term.
filter: The content type to filter results (youtube, articles, papers).
Response:
Returns a list of results, ranked by views, likes, and relevance.
Example Request:


GET /search?q=climate+change&filter=youtube

