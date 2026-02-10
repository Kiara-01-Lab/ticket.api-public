/**
 * Database connection helper for Vercel serverless functions
 * Reuses existing connections when available
 */

const { TicketKit, PostgreSQLAdapter } = require('ticketkit');

let kit = null;
let initPromise = null;

async function getKit() {
  // Return existing instance if available
  if (kit) return kit;

  // If initialization is in progress, wait for it
  if (initPromise) return initPromise;

  // Start new initialization
  initPromise = (async () => {
    const storage = new PostgreSQLAdapter(process.env.DATABASE_URL);
    await storage.init();
    kit = new TicketKit(storage);

    console.log('✅ Database initialized');
    return kit;
  })();

  return initPromise;
}

module.exports = { getKit };
