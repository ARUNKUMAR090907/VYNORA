# Quick Setup Guide - Government Schemes Platform

## 5-Minute Quick Start

### Step 1: Install Dependencies
```bash
npm run install-all
```

### Step 2: Create Environment Files

**`server/.env`:**
```env
MONGO_URI=mongodb+srv://your_user:your_pass@cluster.mongodb.net/govt_schemes
JWT_SECRET=your_secret_key_here_123456
PORT=5000
CLIENT_URL=http://localhost:5173
```

**`client/.env`:**
```env
VITE_API_URL=http://localhost:5000
```

### Step 3: Start Development Server
```bash
npm run dev
```

### Step 4: Seed Database (Optional)
In another terminal:
```bash
cd server
npm run seed
```

### Step 5: Access Application
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000

---

## Detailed Setup

### Prerequisites
- Node.js v16+ (Check: `node --version`)
- npm v8+ (Check: `npm --version`)
- MongoDB Atlas account (Free tier available)
- Git (optional)

### 1. Database Setup (MongoDB Atlas)

1. Visit https://www.mongodb.com/cloud/atlas
2. Sign up (free) or login
3. Create a new cluster
4. Create a database user with password
5. Add your IP to whitelist (0.0.0.0/0 for dev)
6. Get connection string: `mongodb+srv://user:pass@cluster.mongodb.net/db`

### 2. Project Installation

```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..

# Install server dependencies
cd server
npm install
cd ..
```

Or use shortcut:
```bash
npm run install-all
```

### 3. Environment Configuration

Create `server/.env`:
```env
# MongoDB Connection
MONGO_URI=mongodb+srv://youruser:yourpassword@cluster.mongodb.net/govt_schemes

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_in_production

# Server
PORT=5000

# Frontend URL (for CORS)
CLIENT_URL=http://localhost:5173

# Optional: AI Copilot (if using Gemini API)
GEMINI_API_KEY=your_gemini_api_key
```

Create `client/.env`:
```env
# API Server URL
VITE_API_URL=http://localhost:5000
```

### 4. Database Initialization

Optional: Seed sample schemes:
```bash
cd server
npm run seed
```

### 5. Start Application

Development mode (both client & server):
```bash
npm run dev
```

Or start separately:
```bash
# Terminal 1 - Frontend
npm run client:dev

# Terminal 2 - Backend
npm run server:dev
```

### 6. Verify Setup

- Frontend loads: http://localhost:5173
- Backend responds: http://localhost:5000/api/health
- Can register new account
- Can login

---

## Testing User Flow

### 1. Register New Account
- Go to http://localhost:5173/register
- Fill in: Email, Username, Password, Name
- Click "Create Account"

### 2. Complete Profile
- Fill in demographic details
- Select income, state, occupation, etc.
- Click "Continue to Dashboard"

### 3. View Eligible Schemes
- See personalized scheme recommendations
- Check eligibility scores
- View matched/unmatched criteria

### 4. Update Profile
- Click "Profile" in top navigation
- Update any information
- Eligibility recalculates automatically

---

## Troubleshooting

### Error: "Cannot find module 'express'"
```bash
cd server
npm install express
```

### Error: "connection refused" (MongoDB)
- Check MONGO_URI in `server/.env`
- Verify IP whitelist in MongoDB Atlas
- Ensure cluster is running

### Port 5000/5173 Already in Use
```bash
# Kill process using port
lsof -i :5000          # Find PID
kill -9 <PID>          # Kill process

# Or use different port
PORT=5001 npm run server:dev
```

### CORS Error
- Ensure `CLIENT_URL` in server .env matches frontend URL
- Check `VITE_API_URL` in client .env matches backend URL

### Empty Schemes List
Run database seed:
```bash
cd server
npm run seed
```

---

## Development Commands

### Client
- `npm run client:dev` - Start Vite dev server
- `npm run build` - Build for production

### Server
- `npm run server:dev` - Start Node with auto-reload
- `npm run seed` - Seed database with sample data

### Root
- `npm run install-all` - Install all dependencies
- `npm run dev` - Run client & server together
- `npm run build` - Build client (production)

---

## File Structure Quick Reference

```
govt-schemes-platform/
├── client/src/              React source code
│   ├── pages/               Page components
│   ├── components/          Reusable components
│   ├── context/             Auth state
│   ├── services/            API calls
│   └── App.jsx              Main component
├── server/                  Express API
│   ├── controllers/         Route handlers
│   ├── models/              Database schemas
│   ├── routes/              API endpoints
│   └── server.js            Entry point
└── README.md                Full documentation
```

---

## Production Deployment

### Deploy Backend (Render/Railway/Heroku)
```bash
cd server
git push heroku main
```

Set environment variables in platform dashboard.

### Deploy Frontend (Vercel/Netlify)
```bash
cd client
npm run build
# Deploy the 'dist' folder
```

Update `VITE_API_URL` to production API URL.

---

## API Documentation

### Authentication
```bash
# Register
POST /api/auth/register
Body: { email, username, password, confirmPassword, name }

# Login
POST /api/auth/login
Body: { usernameOrEmail, password }

# Get Current User
GET /api/auth/me
Headers: { Authorization: "Bearer <token>" }
```

### Schemes
```bash
# Get All Schemes
GET /api/schemes

# Get Scheme by ID
GET /api/schemes/:id

# Search Schemes
GET /api/schemes/search?query=housing

# Get by Category
GET /api/schemes/category/housing
```

### User Profile
```bash
# Get Profile
GET /api/users/profile
Headers: { Authorization: "Bearer <token>" }

# Update Profile
PUT /api/users/profile
Headers: { Authorization: "Bearer <token>" }
Body: { name, annualIncome, state, ... }
```

### Eligibility
```bash
# Get Eligible Schemes
GET /api/eligibility/schemes
Headers: { Authorization: "Bearer <token>" }

# Get Summary
GET /api/eligibility/summary
Headers: { Authorization: "Bearer <token>" }
```

---

## Next Steps

1. ✅ Install dependencies
2. ✅ Configure environment
3. ✅ Start servers
4. ✅ Create test account
5. 📊 Explore features
6. 🚀 Deploy to production

---

## Support & Resources

- **API Docs**: See `README.md`
- **Issues**: Check `TROUBLESHOOTING`
- **MongoDB Help**: https://docs.mongodb.com
- **React Docs**: https://react.dev
- **Vite Guide**: https://vitejs.dev

---

**Happy coding! 🎉**
