/**
 * Search API
 * GET /api/search?board_id=xxx&q=keyword&priority=high&label=bug
 */

const { getKit } = require('./_lib/db');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const kit = await getKit();
    const { board_id, q, priority, label } = req.query;

    if (req.method === 'GET') {
      if (q) {
        const results = await kit.search(board_id, q);
        return res.status(200).json(results);
      } else {
        // Return all tickets for the board if no search query
        const tickets = await kit.listTickets({ board_id });
        let filtered = tickets;

        if (priority) {
          filtered = filtered.filter(t => t.priority === priority);
        }
        if (label) {
          filtered = filtered.filter(t => t.labels && t.labels.includes(label));
        }

        return res.status(200).json(filtered);
      }
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Search API error:', error);
    return res.status(500).json({ error: error.message });
  }
};
