# Securix - Cybersecurity Services Web Application

A full-stack web application for Securix cybersecurity services, featuring a React frontend and Node.js/Express backend with MongoDB database and Gemini AI chatbot integration.

## 🎯 Features

### Frontend (React + Vite)
- **Responsive UI** - Modern, cybersecurity-themed interface
- **AI ChatBot** - Powered by Google Gemini API for intelligent customer support
- **Navigation** - Multi-page application with routing (Home, About, Services, Events, Team, Projects, Contact)
- **Admin Dashboard** - Secure admin panel for managing content
- **Real-time Updates** - Live chat and service information

### Backend (Node.js + Express)
- **RESTful API** - 11 endpoints for content management
- **JWT Authentication** - Secure token-based authentication
- **MongoDB Integration** - Persistent data storage
- **Admin Management** - Create, read, update, delete services, events, and more
- **Gemini AI Integration** - Smart chatbot responses with fallback support
- **CORS Enabled** - Cross-origin requests handled securely

### Database (MongoDB)
- **Collections**: Admins, About, Services, Events
- **Schemas**: Type-safe MongoDB models with Mongoose
- **Local Development**: MongoDB running on localhost:27017

## 📦 Project Structure

```
securix-web-app/
├── securix-react/              # React frontend
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   │   ├── ChatBot.jsx    # AI chatbot with Gemini
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Admin.jsx      # Admin dashboard
│   │   ├── pages/             # Page components
│   │   ├── App.jsx            # Main app with routes
│   │   └── styles.css
│   ├── package.json
│   └── vite.config.js
│
├── securix-backend/            # Node.js backend
│   ├── controllers/           # Business logic
│   │   ├── adminController.js    # Auth & admin profile
│   │   ├── chatController.js     # Gemini API integration
│   │   ├── serviceController.js  # CRUD for services
│   │   └── eventController.js    # CRUD for events
│   ├── models/                # Mongoose schemas
│   ├── routes/                # API endpoints
│   ├── middleware/            # JWT protection
│   ├── config/                # Database config
│   ├── scripts/               # Utility scripts
│   ├── server.js              # Express app
│   ├── seed.js                # Database seeding
│   └── package.json
│
└── .gitignore
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or Atlas)
- npm or yarn

### Backend Setup

```bash
cd securix-backend
npm install
```

Create `.env` file:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/securix
JWT_SECRET=your_jwt_secret_key_change_this_in_production
GEMINI_API_KEY=your_gemini_api_key_from_google
NODE_ENV=development
```

Start backend:
```bash
npm run dev        # With nodemon (development)
npm start          # Direct node (production)
```

Create admin user:
```bash
node seed.js
```

### Frontend Setup

```bash
cd securix-react
npm install
npm run dev
```

Access at: http://localhost:5173

## 🔐 Authentication

### JWT Login Flow
```
1. POST /api/admin/login
   Body: { username: "admin", password: "securix123" }
   Response: { token: "eyJhbGciOiJIUzI1NiIs..." }

2. Use token in Authorization header:
   Authorization: Bearer <token>

3. Access protected routes:
   GET /api/admin/me (requires JWT)
```

### Default Credentials (Development)
- **Username**: admin
- **Password**: securix123

## 📡 API Endpoints

### Authentication
- `POST /api/admin/login` - Login with credentials
- `GET /api/admin/me` - Get current admin profile (protected)

### Chat
- `POST /api/chat` - Send message to Gemini AI

### Services
- `GET /api/services` - Get all services
- `POST /api/services` - Create service (protected)
- `PUT /api/services/:id` - Update service (protected)
- `DELETE /api/services/:id` - Delete service (protected)

### Events
- `GET /api/events` - Get all events
- `POST /api/events` - Create event (protected)
- `PUT /api/events/:id` - Update event (protected)
- `DELETE /api/events/:id` - Delete event (protected)

### About
- `GET /api/about` - Get about content
- `PUT /api/about` - Update about content (protected)

## 🤖 Gemini AI Chatbot

The chatbot is powered by Google's Gemini API with:
- **System Prompt**: Context-aware responses about Securix services
- **Auto-Fallback**: Graceful fallback messages when API quota is exceeded
- **Rate Limiting**: Respects free tier limits (upgrade for higher usage)
- **Real-time Responses**: 1-3 second response time

### Setup
1. Get API key from: https://aistudio.google.com/app/apikeys
2. Add to `.env`: `GEMINI_API_KEY=your_key`
3. Upgrade for production use: https://ai.google.dev/pricing

## 📝 Scripts

### Backend Scripts
```bash
# Check MongoDB connection
node scripts/checkMongo.js

# Test JWT authentication
powershell scripts/test_jwt.ps1
```

### Development
```bash
# Backend development
cd securix-backend && npm run dev

# Frontend development
cd securix-react && npm run dev

# Backend production
cd securix-backend && npm start
```

## 🧪 Testing

### Postman Collection
Import `securix-backend/Securix_Backend_API.postman_collection.json` for complete API testing.

### Manual Testing
1. Start backend: `npm run dev` (port 5000)
2. Start frontend: `npm run dev` (port 5173)
3. Open http://localhost:5173
4. Test chatbot by clicking "Chat" button
5. Access admin panel for content management

## 🔑 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| PORT | Express server port | Yes (default: 5000) |
| MONGO_URI | MongoDB connection string | Yes |
| JWT_SECRET | Secret key for JWT signing | Yes |
| GEMINI_API_KEY | Google Gemini API key | Yes (for chatbot) |
| NODE_ENV | Environment (development/production) | No (default: development) |

## 📚 Technologies

### Frontend
- React 19.2.0
- React Router DOM 6.20.0
- Vite 7.2.5
- CSS3 (responsive design)

### Backend
- Node.js / Express 4.18.2
- MongoDB / Mongoose 7.0.0
- JWT (jsonwebtoken 9.0.0)
- bcryptjs 2.4.3 (password hashing)
- Axios 1.6.0 (HTTP client)
- Nodemon 2.0.20 (development)

### External APIs
- Google Gemini API (AI chatbot)

## 🛡️ Security Features

- **Password Hashing**: bcryptjs with salting
- **JWT Authentication**: 24-hour token expiration
- **CORS Protection**: Cross-origin request handling
- **Environment Variables**: Secure credential management
- **API Key Protection**: Server-side API calls only

## 📈 Performance

- **Frontend**: Vite dev server with HMR
- **Backend**: Nodemon with auto-reload
- **Database**: MongoDB with indexing
- **Caching**: JWT tokens for session management
- **API Optimization**: RESTful endpoints with minimal overhead

## 🚢 Deployment

### Backend Deployment
Recommended platforms: Render, Railway, Heroku
```bash
# Ensure .env is configured for production
npm start  # Uses NODE_ENV=production
```

### Frontend Deployment
Recommended platforms: Vercel, Netlify
```bash
npm run build  # Creates production build
```

### Database Deployment
Use MongoDB Atlas for cloud database:
1. Create cluster at https://www.mongodb.com/cloud/atlas
2. Update `MONGO_URI` in `.env`
3. Ensure security rules allow your server IP

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/name`
2. Commit changes: `git commit -m "Add feature"`
3. Push to remote: `git push origin feature/name`
4. Create pull request on GitHub

## 📄 License

ISC License - See LICENSE file for details

## 👥 Support

For issues or questions:
- Email: care.securix@gmail.com
- WhatsApp: [Contact via app]

## 📞 Contact

- **Website**: [Your domain]
- **Email**: care.securix@gmail.com
- **Services**: Penetration Testing, Cloud Security Auditing, Digital Forensics

---

**Last Updated**: December 2025
**Status**: Production Ready ✅
