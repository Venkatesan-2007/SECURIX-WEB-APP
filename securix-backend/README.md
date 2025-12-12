# Securix Backend API

Professional Node.js + Express + MongoDB backend for the Securix security services website.

## Folder Structure

```
securix-backend/
├── server.js                 # Main server entry point
├── package.json              # Dependencies and scripts
├── .env                      # Environment variables
│
├── config/
│   └── db.js                # MongoDB connection setup
│
├── models/
│   ├── About.js             # About schema
│   ├── Service.js           # Service schema
│   ├── Event.js             # Event schema
│   └── Admin.js             # Admin schema
│
├── controllers/
│   ├── aboutController.js   # About CRUD logic
│   ├── serviceController.js # Service CRUD logic
│   ├── eventController.js   # Event CRUD logic
│   └── adminController.js   # Admin login logic
│
├── routes/
│   ├── aboutRoutes.js       # About endpoints
│   ├── serviceRoutes.js     # Service endpoints
│   ├── eventRoutes.js       # Event endpoints
│   └── adminRoutes.js       # Admin endpoints
│
└── middleware/
    └── auth.js              # JWT authentication middleware
```

## Installation

### 1. Install Dependencies

```bash
cd securix-backend
npm install
```

### 2. Configure Environment Variables

Edit `.env`:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/securix
JWT_SECRET=your_secure_jwt_secret_key
NODE_ENV=development
```

### 3. Start MongoDB

Make sure MongoDB is running locally or update `MONGO_URI` with your connection string.

### 4. Run Backend Server

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server will run on `http://localhost:5000`

## API Endpoints

### Admin Routes
- **POST** `/api/admin/login` - Login with username and password
  ```json
  {
    "username": "admin",
    "password": "securix123"
  }
  ```
  Returns JWT token

### About Routes
- **GET** `/api/about` - Get about content
- **PUT** `/api/about` - Update about content (requires JWT token)
  ```json
  {
    "content": "Your about content here"
  }
  ```

### Service Routes
- **GET** `/api/services` - Get all services
- **POST** `/api/services` - Add new service (requires JWT token)
  ```json
  {
    "name": "Penetration Testing"
  }
  ```
- **PUT** `/api/services/:id` - Update service (requires JWT token)
- **DELETE** `/api/services/:id` - Delete service (requires JWT token)

### Event Routes
- **GET** `/api/events` - Get all events
- **POST** `/api/events` - Add new event (requires JWT token)
  ```json
  {
    "name": "Cybersecurity Workshop"
  }
  ```
- **PUT** `/api/events/:id` - Update event (requires JWT token)
- **DELETE** `/api/events/:id` - Delete event (requires JWT token)

## Database Setup (One-time)

### Insert Default Admin User

Use MongoDB shell or MongoDB Compass to insert:

```javascript
db.admins.insertOne({
  username: "admin",
  password: "$2a$10$C0Vy/TmBV7qg8tT9pSEcqeYIDvQjr6Cof8nZDbpU7AGZxtzZQxYMK"
  // password: "securix123" (bcrypt hashed)
})
```

## Testing with Postman

### 1. Admin Login
- **Method:** POST
- **URL:** `http://localhost:5000/api/admin/login`
- **Body (JSON):**
  ```json
  {
    "username": "admin",
    "password": "securix123"
  }
  ```
- **Response:** `{ "token": "your_jwt_token" }`

### 2. Using JWT Token
For any protected route (PUT/POST/DELETE), add header:
```
Authorization: Bearer your_jwt_token
```

### 3. Get All Services
- **Method:** GET
- **URL:** `http://localhost:5000/api/services`
- **Headers:** None required

### 4. Add Service
- **Method:** POST
- **URL:** `http://localhost:5000/api/services`
- **Headers:** 
  - `Authorization: Bearer your_jwt_token`
  - `Content-Type: application/json`
- **Body (JSON):**
  ```json
  {
    "name": "Cloud Security Auditing"
  }
  ```

## Technologies Used

- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin requests
- **dotenv** - Environment variables
- **Nodemon** - Development auto-reload

## Key Features

✅ RESTful API design
✅ JWT-based authentication
✅ MongoDB integration
✅ CORS enabled for frontend communication
✅ Password hashing with bcryptjs
✅ Error handling
✅ Clean folder structure

## Next Steps

1. Test all endpoints with Postman
2. Connect React frontend with `fetch()` or `axios`
3. Implement JWT token storage in localStorage on frontend
4. Send authorization header with protected requests

## Frontend Integration

```javascript
// Example: Fetch services
const res = await fetch("http://localhost:5000/api/services");
const services = await res.json();

// Example: Add service (with auth)
const token = localStorage.getItem("token");
const res = await fetch("http://localhost:5000/api/services", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  },
  body: JSON.stringify({ name: "Digital Forensics" })
});
```

## Support

For issues, check:
- MongoDB connection in `.env`
- JWT_SECRET is set
- All dependencies installed (`npm install`)
- Port 5000 is not in use

---

Built with ❤️ for Securix Security Services
