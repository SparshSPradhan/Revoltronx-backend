const axios = require('axios');
require('dotenv').config();

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

const normalize = (value, max) => (value / max);  // Normalize values to a scale of 0-1

const searchYouTube = async (query) => {
  const url = `https://www.googleapis.com/youtube/v3/search`;
  const params = {
    part: 'snippet',
    q: query,
    type: 'video',
    maxResults: 5,
    key: YOUTUBE_API_KEY,
  };

  try {
    const response = await axios.get(url, { params });
    const videos = await Promise.all(
      response.data.items.map(async (item) => {
        const videoId = item.id.videoId;
        const statsResponse = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${YOUTUBE_API_KEY}`
        );
        const stats = statsResponse.data.items[0].statistics;
        const views = parseInt(stats.viewCount, 10);
        const likes = parseInt(stats.likeCount || 0, 10);  // Some videos may not have likes data

        // Normalize views and likes (using hypothetical maximums for normalization)
        const normalizedViews = normalize(views, 1000000);  // Assuming 1,000,000 is the maximum views for normalization
        const normalizedLikes = normalize(likes, 10000);    // Assuming 10,000 is the maximum likes for normalization

        // Calculate score: 70% weight on views and 30% on likes
        const score = normalizedViews * 0.7 + normalizedLikes * 0.3;

        return {
          title: item.snippet.title,
          url: `https://www.youtube.com/watch?v=${videoId}`,
          views,
          likes,
          score,
          description: item.snippet.description,
        };
      })
    );

    return videos.sort((a, b) => b.score - a.score);  // Sort by calculated score
  } catch (error) {
    console.error('Error fetching YouTube data:', error);
    return [];
  }
};

module.exports = { searchYouTube };
