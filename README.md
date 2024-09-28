
# Search App Backend

This is the backend for the **Search App**, designed to fetch and return search results from multiple sources like YouTube, academic papers, articles, and blogs. The backend integrates several APIs and provides results ranked based on views, likes, and relevance. The backend is built using Node.js and Express.

## Features

- Fetches YouTube videos using YouTube Data API.
- Fetches articles and blogs using Google Custom Search API or Bing Search API.
- Fetches academic papers using Google Scholar or PubMed APIs.
- Ranks search results based on views, likes, and relevance.
- Supports filtering of results by type (e.g., YouTube videos, articles, academic papers).
- Backend designed to be deployed on cloud platforms like Vercel or Heroku.

---

## Table of Contents

1. [Technologies Used](#technologies-used)
2. [Prerequisites](#prerequisites)
3. [Setup Instructions](#setup-instructions)
4. [Environment Variables](#environment-variables)
5. [API Endpoints](#api-endpoints)
6. [Error Handling](#error-handling)
7. [Deployment](#deployment)
8. [Contributing](#contributing)

---

## Technologies Used

- **Node.js**: JavaScript runtime for building the backend.
- **Express**: Web framework for building APIs.
- **Axios**: Promise-based HTTP client for making API requests.
- **YouTube Data API**: For fetching YouTube video metadata.
- **Google Custom Search API**: For fetching articles and blog posts.
- **Google Scholar API** (or **PubMed API**): For fetching academic papers.
- **Vercel** (or **Heroku**): For deploying the backend.

---

## Prerequisites

- Node.js (version 14 or higher)
- NPM or Yarn package manager
- API Keys for:
  - YouTube Data API
  - Google Custom Search API or Bing API
  - Google Scholar or PubMed API

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/search-app-backend.git
cd search-app-backend
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```
YOUTUBE_API_KEY=your-youtube-api-key
GOOGLE_SEARCH_API_KEY=your-google-api-key
GOOGLE_SEARCH_ENGINE_ID=your-search-engine-id
```

> Replace the `your-...` fields with actual keys obtained from respective APIs.

---

## Environment Variables

- `YOUTUBE_API_KEY`: API key for YouTube Data API.
- `GOOGLE_SEARCH_API_KEY`: API key for Google Custom Search API.
- `GOOGLE_SEARCH_ENGINE_ID`: Google Search Engine ID for the search API.
---

## API Endpoints

### 1. **Search API**

`GET /search?q={searchTerm}&filter={filter}`

- **Description**: Fetches search results from YouTube, articles, blogs, and academic papers based on the search term.
- **Query Parameters**:
  - `q`: The search query term.
  - `filter`: The content type to filter results (`youtube`, `articles`, `papers`).
- **Response**:
  - Returns a list of results, ranked by views, likes, and relevance.

### Example Request:

```bash
GET /search?q=climate+change&filter=youtube
```

---

## Error Handling

- Proper error handling is implemented for API failures (e.g., API key errors, rate limits, invalid requests).
- Common HTTP status codes are returned (e.g., `400`, `403`, `500`) to indicate different types of failures.
- Detailed error messages are provided in the response for debugging.

---

## Deployment

### 1. Deploying on Vercel

1. **Connect Repository**: Link your GitHub repository on Vercel.
2. **Environment Variables**: Set the environment variables in the Vercel dashboard.
3. **Deploy**: Deploy directly from the Vercel dashboard or by pushing to the main branch.

### 2. Deploying on Heroku

1. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli).
2. Create a new Heroku app:
   
   ```bash
   heroku create
   ```

3. Set environment variables on Heroku:

   ```bash
   heroku config:set YOUTUBE_API_KEY=your-api-key
   ```

4. Push the code to Heroku:

   ```bash
   git push heroku main
   ```

---

## Challenges Faced

1. **API Rate Limits**:
   - Handling API rate limits for YouTube and Google Custom Search required careful monitoring and efficient use of API keys.
   - Implemented caching strategies (optional) to reduce API call frequency.

2. **Cross-Origin Resource Sharing (CORS)**:
   - Configured CORS headers to allow the frontend to communicate with the backend seamlessly.

3. **Ranking and Filtering**:
   - Implemented a custom ranking algorithm to sort results based on views, likes, and relevance.
   - The filtering mechanism allows users to narrow down results by content type.

---

## Contributing

Feel free to submit issues or pull requests if you'd like to contribute to this project.

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and test thoroughly.
4. Commit your changes (`git commit -m 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

---
