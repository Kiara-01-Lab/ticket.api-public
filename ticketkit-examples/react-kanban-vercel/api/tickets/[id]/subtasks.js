/**
 * Subtasks API
 * GET /api/tickets/[id]/subtasks - Get all subtasks
 * POST /api/tickets/[id]/subtasks - Create subtask
 */

const { getKit } = require('../../_lib/db');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const kit = await getKit();
    const { id } = req.query;

    if (req.method === 'GET') {
      const subtasks = await kit.getSubtasks(id);
      return res.status(200).json(subtasks);
    }

    if (req.method === 'POST') {
      const subtask = await kit.createSubtask(id, req.body);
      return res.status(201).json(subtask);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Subtasks API error:', error);
    return res.status(500).json({ error: error.message });
  }
};
