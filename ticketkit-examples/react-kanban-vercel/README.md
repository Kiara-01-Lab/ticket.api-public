# TicketKit React Kanban - Vercel + Supabase Deployment

Production-ready Kanban board powered by TicketKit, deployed on Vercel with Supabase PostgreSQL.

## 🚀 One-Click Deploy

1. **Fork/Clone** this repository
2. **Click** the button below:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

3. **Configure** (see setup instructions below)

## 📋 What You Need

- **Vercel Account** - [Sign up free](https://vercel.com/signup)
- **Supabase Account** - [Sign up free](https://supabase.com)
- **5 minutes** of your time

## 🗄️ Step 1: Create Supabase Database

### 1.1 Create Project

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Click **"New Project"**
3. Fill in:
   - **Name**: `ticketkit-kanban`
   - **Database Password**: Generate strong password (save it!)
   - **Region**: Choose closest to your users
4. Click **"Create new project"**
5. Wait ~2 minutes for setup

### 1.2 Get Connection String

1. In your project, go to **Settings** → **Database**
2. Scroll to **"Connection string"**
3. Select **"URI"** tab
4. Copy the connection string:
   ```
   postgresql://postgres.[PROJECT]:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
   ```
5. Replace `[PASSWORD]` with your actual password

**💡 Pro Tip:** Use the **pooler** connection string (port 6543) for better performance with serverless functions.

## ☁️ Step 2: Deploy to Vercel

### 2.1 Import Project

1. Go to [vercel.com/new](https://vercel.com/new)
2. Choose **"Import Git Repository"** or **"Upload"** this folder
3. Vercel detects configuration automatically

### 2.2 Configure Root Directory (Important!)

In **Build & Development Settings**:
- Set **Root Directory** to: `react-kanban-vercel`

This tells Vercel which folder to deploy.

### 2.3 Set Environment Variables

Click **"Environment Variables"** and add:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | Your Supabase connection string |
| `NODE_ENV` | `production` |

### 2.4 Deploy!

1. Click **"Deploy"**
2. Wait ~2 minutes
3. Your app is live! 🎉

You'll get a URL like: `https://your-project.vercel.app`

## 🎨 Features

- ✅ **Drag & Drop** tickets between columns
- ✅ **Create/Edit/Delete** tickets
- ✅ **Comments** on tickets
- ✅ **Activity Log** for audit trail
- ✅ **Labels & Priorities**
- ✅ **Search & Filter**
- ✅ **Subtasks** support
- ✅ **Multiple Boards**

## 🏗️ Architecture

```
┌───────────────────────────────────────────────────┐
│              Vercel (Free Tier)                   │
│                                                   │
│  ┌──────────────┐         ┌──────────────────┐  │
│  │  React App   │────────→│  Serverless API  │  │
│  │  (Static)    │         │  (Node.js)       │  │
│  └──────────────┘         └────────┬──────────┘  │
└──────────────────────────────────────┼────────────┘
                                      │
                         ┌────────────▼─────────────┐
                         │  Supabase (Free Tier)    │
                         │  PostgreSQL + Pooling    │
                         └──────────────────────────┘
```

## 📁 Project Structure

```
react-kanban-vercel/
├── api/                        # Serverless Functions
│   ├── _lib/
│   │   └── db.js              # Database connection
│   ├── boards.js              # Boards CRUD
│   ├── boards/[id].js         # Single board
│   ├── boards/[id]/
│   │   ├── kanban.js          # Kanban view
│   │   └── tickets.js         # Create ticket
│   ├── tickets/[id].js        # Ticket CRUD
│   ├── tickets/[id]/
│   │   ├── move.js            # Move ticket
│   │   ├── comments.js        # Comments
│   │   ├── activity.js        # Activity log
│   │   ├── assign.js          # Assignees
│   │   └── subtasks.js        # Subtasks
│   └── search.js              # Search tickets
├── public/                     # Built React app
│   ├── index.html
│   └── assets/
├── client/                     # React source (for dev)
├── package.json
├── vercel.json                # Vercel config
└── README.md                  # This file
```

## 🔌 API Endpoints

### Boards
- `GET /api/boards` - List all boards
- `POST /api/boards` - Create board
- `GET /api/boards/[id]` - Get board
- `GET /api/boards/[id]/kanban` - Get kanban view

### Tickets
- `POST /api/boards/[id]/tickets` - Create ticket
- `GET /api/tickets/[id]` - Get ticket
- `PATCH /api/tickets/[id]` - Update ticket
- `DELETE /api/tickets/[id]` - Delete ticket
- `POST /api/tickets/[id]/move` - Move to status

### Features
- `GET /api/tickets/[id]/comments` - List comments
- `POST /api/tickets/[id]/comments` - Add comment
- `GET /api/tickets/[id]/activity` - Get activity
- `POST /api/tickets/[id]/assign` - Assign users
- `GET /api/tickets/[id]/subtasks` - List subtasks
- `POST /api/tickets/[id]/subtasks` - Create subtask
- `GET /api/search` - Search tickets

## 🧪 Local Development

### Install Dependencies

```bash
npm install
cd client && npm install && cd ..
```

### Set Environment Variables

Create `.env`:

```bash
DATABASE_URL=postgresql://postgres...
NODE_ENV=development
```

### Run with Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Run dev server
vercel dev
```

Visit: `http://localhost:3000`

## 🔄 Continuous Deployment

Vercel automatically deploys:
- **Production** - Every push to `main` branch
- **Preview** - Every pull request

## 🐛 Troubleshooting

### "Cannot find module 'ticketkit'"

**Solution:**
- Ensure `ticketkit@beta` is in dependencies
- Redeploy project

### "Connection timeout"

**Solution:**
- Use Supabase **pooler** connection string (port 6543)
- Enable connection pooling in Supabase settings

### "Function execution timeout"

**Solution:**
- Check Supabase database is running
- Verify DATABASE_URL is correct
- Use connection pooling

### API returns 404

**Solution:**
- Verify `Root Directory` is set to `react-kanban-vercel`
- Check `vercel.json` routes configuration

## 💰 Pricing (Free Tier)

**Vercel:**
- ✅ 100 GB bandwidth/month
- ✅ 100 hours serverless execution
- ✅ Unlimited deployments

**Supabase:**
- ✅ 500 MB database storage
- ✅ 2 GB bandwidth/month
- ✅ 50,000 monthly active users

**Total Cost:** $0/month for most use cases

## 📊 Monitoring

### Vercel Dashboard
- View logs: `https://vercel.com/[your-project]/logs`
- Function metrics
- Error tracking

### Supabase Dashboard
- Database size
- Connection count
- Query performance

## 🚀 Production Tips

1. **Enable Connection Pooling** in Supabase (Transaction mode)
2. **Use Pooler URL** instead of direct connection
3. **Monitor Function Execution** time in Vercel
4. **Set up Alerts** for errors
5. **Add Custom Domain** in Vercel settings

## 🔐 Security

- ✅ CORS enabled for API
- ✅ SSL enforced for database
- ✅ Environment variables secured
- ✅ No sensitive data in client

## 📚 Resources

- [TicketKit Documentation](https://github.com/Kiara-01-Lab/ticket.api-public)
- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js API Routes (similar pattern)](https://nextjs.org/docs/api-routes/introduction)

## 🤝 Support

- **Issues:** [GitHub Issues](https://github.com/Kiara-01-Lab/ticket.api-public/issues)
- **Discussions:** [GitHub Discussions](https://github.com/Kiara-01-Lab/ticket.api-public/discussions)

## 📝 License

MIT © 2025 Kiara Lab
