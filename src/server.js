// const express = require('express');
// const { searchYouTube } = require('./services/youtubeService');
// const { searchArticlesAndBlogs } = require('./services/articleService');
// const { searchAcademicPapers } = require('./services/paperService');

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(express.json());

// app.get('/search', async (req, res) => {
//   const query = req.query.q;
//   const filter = req.query.filter;
//   if (!query) {
//     return res.status(400).json({ error: 'Query parameter "q" is required' });
//   }

//   try {
//     const [youtubeResults, articleResults, paperResults] = await Promise.all([
//       searchYouTube(query),
//       searchArticlesAndBlogs(query),
//       searchAcademicPapers(query),
//     ]);

//     res.json({
//       youtube: youtubeResults,
//       articles: articleResults,
//       papers: paperResults,
//     });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch search results' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });



const express = require('express');
const { searchYouTube } = require('./services/youtubeService');
const { searchArticlesAndBlogs } = require('./services/articleService');
const { searchAcademicPapers } = require('./services/paperService');
const cors = require('cors');  // Import cors middleware

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());

app.get('/search', async (req, res) => {
  const query = req.query.q;
  const filter = req.query.filter; // New filter query parameter

  if (!query) {
    return res.status(400).json({ error: 'Query parameter "q" is required' });
  }

  try {
    let youtubeResults = [];
    let articleResults = [];
    let paperResults = [];

    // Fetch results based on the filter provided
    if (!filter || filter === 'youtube') {
      youtubeResults = await searchYouTube(query);
    }

    if (!filter || filter === 'articles') {
      articleResults = await searchArticlesAndBlogs(query);
    }

    if (!filter || filter === 'papers') {
      paperResults = await searchAcademicPapers(query);
    }
    // Send filtered results (only those requested by the filter)
    res.json({
      youtube: youtubeResults,
      articles: articleResults,
      papers: paperResults,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch search results' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
