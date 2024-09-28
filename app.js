require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const GOOGLE_SEARCH_API_KEY = process.env.GOOGLE_SEARCH_API_KEY;
const GOOGLE_SEARCH_CX = process.env.GOOGLE_SEARCH_CX;

// Function to search YouTube
const searchYouTube = async (term) => {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(term)}&key=${YOUTUBE_API_KEY}`;
    const response = await axios.get(url);
    return response.data.items;
};

// Function to search articles
const searchArticles = async (term) => {
    const url = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_SEARCH_API_KEY}&cx=${GOOGLE_SEARCH_CX}&q=${encodeURIComponent(term)}`;
    const response = await axios.get(url);
    return response.data.items;
};

// Search endpoint
app.get('/search', async (req, res) => {
    const term = req.query.term;

    try {
        const youtubeResults = await searchYouTube(term);
        const articleResults = await searchArticles(term);

        const results = {
            youtube: youtubeResults,
            articles: articleResults,
        };

        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching search results.');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
