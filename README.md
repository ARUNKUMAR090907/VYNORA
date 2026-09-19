# VYNORA   - MERN Stack

A comprehensive MERN (MongoDB, Express, React, Node.js) platform that helps citizens discover and apply for government schemes. The platform provides personalized eligibility checks based on user profiles and includes an AI copilot for guidance.

## Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Profile Management**: Comprehensive user profiling for accurate eligibility assessment
- **Scheme Database**: 500+ government schemes across all states
- **Eligibility Checker**: Intelligent eligibility calculation with score-based recommendations
- **Personalized Dashboard**: View schemes you're eligible for sorted by eligibility score
- **Multilingual Support**: 6 Indian languages (English, Hindi, Tamil, Telugu, Kannada, Malayalam)
- **AI Copilot**: Intelligent assistant for scheme guidance and application help
- **Search & Filter**: Find schemes by category, state, or keyword

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **React Router** - Navigation
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## Project Structure

```
govt-schemes-platform/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # Auth context
│   │   ├── services/      # API services
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── package.json
│
├── server/                 # Express backend
│   ├── config/
│   │   └── database.js
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Auth & other middleware
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── services/          # Business logic
│   ├── server.js          # Entry point
│   ├── .env.example
│   └── package.json
│
├── .gitignore
├── README.md
└── package.json           # Root scripts
```

## Setup Instructions

### Prerequisites
- Node.js 16+ and npm
- MongoDB Atlas account (or local MongoDB)

### 1. Clone/Extract Project

```bash
cd govt-schemes-platform
```

### 2. Install All Dependencies

```bash
npm run install-all
```

This installs dependencies for root, client, and server.

### 3. Configure Environment Variables

#### Server Configuration
Create `server/.env`:
```env
MONGO_URI=mongodb+srv://your_user:your_password@cluster.mongodb.net/govt_schemes
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
PORT=5000
CLIENT_URL=http://localhost:5173
GEMINI_API_KEY=your_gemini_key_if_using_ai
```

#### Client Configuration
Create `client/.env`:
```env
VITE_API_URL=http://localhost:5000
```

### 4. Start Development Server

```bash
npm run dev
```

This runs both client (port 5173) and server (port 5000) concurrently.

**Frontend**: http://localhost:5173  
**Backend**: http://localhost:5000

## API Routes

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### User Management
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update profile (protected)

### Schemes
- `GET /api/schemes` - Get all schemes
- `GET /api/schemes/:id` - Get scheme details
- `GET /api/schemes/search?query=` - Search schemes
- `GET /api/schemes/category/:category` - Get schemes by category

### Eligibility
- `GET /api/eligibility/schemes` - Get eligible schemes (protected)
- `GET /api/eligibility/summary` - Get eligibility summary (protected)

### Copilot
- `POST /api/copilot/ask` - Ask AI copilot question (protected)

## User Flow

1. **Landing Page** → Public landing with feature highlights
2. **Register** → Create account with email, username, password, name
3. **Profile Questionnaire** → Complete 9-field profile after registration
4. **Home Dashboard** → View personalized scheme recommendations
5. **Profile Page** → View/update profile, triggers eligibility recalculation
6. **Scheme Details** → View eligibility details and matched criteria

## Authentication Flow

1. User registers → JWT token generated
2. Token stored in localStorage
3. Token sent in Authorization header for protected routes
4. Token verified by backend middleware
5. Expired tokens trigger redirect to login

## Eligibility Scoring

Schemes are scored based on:
- **Income** (25%) - If user income matches scheme requirement
- **State** (20%) - If scheme is available in user's state
- **Gender** (15%) - If scheme targets user's gender
- **Community** (15%) - If user community is eligible
- **Occupation** (15%) - If user occupation status matches
- **Housing** (10%) - If house type meets requirement

### Eligibility Status
- **Highly Eligible** (80%+) - Excellent match
- **Likely Eligible** (60-79%) - Good match
- **Partially Eligible** (40-59%) - Some criteria met
- **Check Requirements** (<40%) - Limited eligibility

## Default Login Credentials

After seeding, demo credentials (create during setup):
- Email: `user@example.com`
- Password: `password123`

## Database Models

### User Model
- email (unique)
- username (unique)
- password (hashed)
- name
- annualIncome
- houseType
- gender
- address
- state
- nativeLanguage
- community
- religion
- occupationStatus
- profileCompleted
- eligibilityCache
- eligibilityLastUpdated

### Scheme Model
- title (unique)
- description
- category
- states
- targetGroups
- incomeCriteria
- genderCriteria
- communityCriteria
- occupationCriteria
- houseCriteria
- ageCriteria
- requiredDocuments
- applicationProcess
- officialLink
- deadline
- eligibilityRules
- languageData
- benefits

## Security Considerations

- Passwords hashed with bcryptjs (salt rounds: 10)
- JWT tokens expire in 7 days
- Protected routes require valid JWT
- CORS enabled for frontend URL
- Environment variables for sensitive data
- Password never returned in API responses

## Deployment

### Backend (Heroku/Render/Railway)
```bash
cd server
git push heroku main
```

### Frontend (Vercel/Netlify)
```bash
cd client
npm run build
# Deploy dist folder
```

## Future Enhancements

- [ ] Gemini AI integration for copilot
- [ ] Scheme application form builder
- [ ] Document upload and verification
- [ ] Notification system for scheme updates
- [ ] Admin panel for scheme management
- [ ] Payment gateway for premium features
- [ ] Mobile app with React Native
- [ ] Advanced analytics dashboard

## Troubleshooting

### Port Already in Use
```bash
# Find process using port 5000/5173
lsof -i :5000
lsof -i :5173
# Kill process
kill -9 <PID>
```

### MongoDB Connection Error
- Verify MONGO_URI is correct
- Check IP whitelist in MongoDB Atlas
- Ensure network access is enabled

### CORS Errors
- Ensure CLIENT_URL matches frontend URL
- Check API_URL in client .env

### Token Not Working
- Clear localStorage and login again
- Check JWT_SECRET matches between sessions
- Verify token expiration

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open Pull Request

## License

MIT License - See LICENSE file for details

## Support

For issues, questions, or suggestions:
1. Check existing GitHub issues
2. Create new issue with detailed description
3. Contact: support@example.com

---

**Built with ❤️ for Indian citizens**
# VYNORA
