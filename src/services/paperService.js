const axios = require('axios');

const searchAcademicPapers = async (query) => {
  const url = `https://api.openalex.org/works?search=${query}&per-page=5`;

  try {
    const response = await axios.get(url);
    const papers = response.data.results.map((paper) => {
      const titleRelevance = paper.title.toLowerCase().includes(query.toLowerCase()) ? 1 : 0;
      
      return {
        title: paper.title,
        link: paper.id,
        authors: paper.authorships.map((auth) => auth.author.display_name).join(', '),
        score: titleRelevance,  // Relevance based on title
      };
    });

    return papers.sort((a, b) => b.score - a.score);  // Sort by relevance score
  } catch (error) {
    console.error('Error fetching academic papers:', error);
    return [];
  }
};

module.exports = { searchAcademicPapers };
