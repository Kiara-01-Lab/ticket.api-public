/**
 * Ticket API
 * GET /api/tickets/[id] - Get ticket by ID
 * PATCH /api/tickets/[id] - Update ticket
 * DELETE /api/tickets/[id] - Delete ticket
 */

const { getKit } = require('../_lib/db');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const kit = await getKit();
    const { id } = req.query;

    if (req.method === 'GET') {
      const ticket = await kit.getTicket(id);
      return res.status(200).json(ticket);
    }

    if (req.method === 'PATCH') {
      await kit.updateTicket(id, req.body);
      const ticket = await kit.getTicket(id);
      return res.status(200).json(ticket);
    }

    if (req.method === 'DELETE') {
      await kit.deleteTicket(id);
      return res.status(204).end();
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Ticket API error:', error);
    return res.status(500).json({ error: error.message });
  }
};
