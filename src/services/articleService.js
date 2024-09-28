const axios = require('axios');
require('dotenv').config();

const GOOGLE_CUSTOM_SEARCH_KEY = process.env.GOOGLE_CUSTOM_SEARCH_KEY;
const GOOGLE_CX_ID = process.env.GOOGLE_CX_ID;

const searchArticlesAndBlogs = async (query) => {
  const url = `https://www.googleapis.com/customsearch/v1`;
  const params = {
    key: GOOGLE_CUSTOM_SEARCH_KEY,
    cx: GOOGLE_CX_ID,
    q: query,
    num: 5,
  };

  try {
    const response = await axios.get(url, { params });
    const results = response.data.items.map((item) => {
      const titleRelevance = item.title.toLowerCase().includes(query.toLowerCase()) ? 1 : 0;
      const snippetRelevance = item.snippet.toLowerCase().includes(query.toLowerCase()) ? 1 : 0;
      
      // Calculate relevance score (we'll give equal weight to title and snippet relevance)
      const score = (titleRelevance + snippetRelevance) / 2;

      return {
        title: item.title,
        link: item.link,
        snippet: item.snippet,
        score,
      };
    });

    return results.sort((a, b) => b.score - a.score);  // Sort by score
  } catch (error) {
    console.error('Error fetching articles and blogs:', error);
    return [];
  }
};

module.exports = { searchArticlesAndBlogs };
