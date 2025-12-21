# GitHub & Vercel Deployment Guide

## Step 1: Create GitHub Repository

### Option A: Using GitHub Web Interface
1. Go to [GitHub](https://github.com) and log in
2. Click **New** button (top left)
3. Fill in details:
   - **Repository name**: `securix-web-app`
   - **Description**: Cybersecurity platform with React frontend and Node.js backend
   - **Public** (to showcase your work)
   - ✅ Check "Add a README file"
   - **License**: MIT License (already in your project)
4. Click **Create repository**

### Option B: Using GitHub CLI
```powershell
gh repo create securix-web-app --public --source=. --remote=origin --push
```

---

## Step 2: Push to GitHub

### If you created repo via web:
```powershell
cd "g:\securix web app"

# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/securix-web-app.git

# Rename branch to main if needed
git branch -M main

# Push all commits
git push -u origin main
```

### If you already have origin:
```powershell
cd "g:\securix web app"
git push origin main
```

---

## Step 3: Update GitHub Repository Settings

1. Go to your repository on GitHub
2. **Settings** → **General**:
   - Add description: "Cybersecurity platform with React frontend, Node.js backend, and MongoDB"
   - Add topics: `cybersecurity`, `react`, `nodejs`, `mongodb`, `gemini-api`
   
3. **Settings** → **Collaborators** (if you want to add team members):
   - Click "Add people"
   - Add team member GitHub usernames

---

## Step 4: Deploy Frontend to Vercel

### Step 4a: Connect Frontend Only
1. Go to [Vercel](https://vercel.com)
2. Sign up or log in with GitHub
3. Click **New Project**
4. Select your `securix-web-app` repository
5. **Framework Preset**: Select `Vite`
6. **Root Directory**: `securix-react`
7. **Environment Variables**: Leave empty (frontend doesn't need any)
8. Click **Deploy**

✅ Frontend will be live at: `https://securix-web-app.vercel.app`

---

## Step 5: Deploy Backend to Render or Railway

Since Vercel is mainly for frontend, deploy backend separately:

### Option A: Render.com (Recommended)
1. Go to [Render](https://render.com)
2. Click **New** → **Web Service**
3. Connect GitHub account
4. Select `securix-web-app` repository
5. Configure:
   - **Name**: `securix-backend`
   - **Root Directory**: `securix-backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
6. **Environment Variables** (add these):
   ```
   NODE_ENV=production
   MONGODB_URI=your_mongodb_atlas_connection_string
   PORT=5000
   GMAIL_EMAIL=your_gmail@gmail.com
   GMAIL_PASSWORD=your_app_password
   GEMINI_API_KEY=your_gemini_api_key
   ```
7. Click **Create Web Service**

✅ Backend will be live at: `https://securix-backend.onrender.com`

### Option B: Railway.app
1. Go to [Railway](https://railway.app)
2. Click **New Project** → **Deploy from GitHub**
3. Select repository and `securix-backend` folder
4. Add environment variables (same as above)
5. Deploy

---

## Step 6: Update Frontend API Endpoint

After backend is deployed, update frontend to use production API:

### File: `securix-react/src/services/api.js` (if it exists)
Or search for `http://localhost:5000` in your code and replace with:
```
https://securix-backend.onrender.com
```

Then push the change:
```powershell
git add .
git commit -m "Update API endpoint for production"
git push origin main
```

Vercel will automatically redeploy your frontend.

---

## Step 7: Verify Deployment

✅ **Frontend**: https://securix-web-app.vercel.app
✅ **Backend**: https://securix-backend.onrender.com
✅ **Repository**: https://github.com/YOUR_USERNAME/securix-web-app

---

## Project Structure on GitHub
```
securix-web-app/
├── README.md                 # Main documentation
├── LICENSE                   # MIT License
├── package.json             # Root package (if needed)
├── vercel.json              # Vercel config
├── .gitignore               # Git ignore rules
│
├── securix-backend/         # Node.js/Express API
│   ├── .env                 # Environment variables (private)
│   ├── .env.example         # Example env file
│   ├── server.js            # Express server
│   ├── package.json         # Backend dependencies
│   ├── config/              # Database config
│   ├── controllers/         # Route handlers
│   ├── models/              # MongoDB schemas
│   ├── middleware/          # Auth & custom middleware
│   └── routes/              # API endpoints
│
└── securix-react/           # React Vite frontend
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── src/
    │   ├── App.jsx
    │   ├── main.jsx
    │   ├── styles.css
    │   ├── pages/
    │   ├── components/
    │   └── public/
    └── public/
```

---

## Common Issues & Solutions

### ❌ "Failed to authenticate"
- Generate GitHub Personal Access Token: Settings → Developer settings → Personal access tokens
- Use token instead of password in git commands

### ❌ "Vercel build fails"
- Check **Vercel logs**: Click project → Deployments → Failed → View logs
- Ensure all environment variables are set
- Check Node.js version compatibility

### ❌ "Backend API not responding"
- Verify MongoDB connection string
- Check all environment variables are set in Render/Railway
- Test endpoint with Postman

### ❌ "CORS errors"
- Update backend `server.js` to allow Vercel frontend domain:
  ```javascript
  app.use(cors({
    origin: ['https://securix-web-app.vercel.app', 'http://localhost:5173'],
    credentials: true
  }));
  ```

---

## Quick Reference Commands

```powershell
# View git status
git status

# Push changes
git push origin main

# Pull latest changes
git pull origin main

# View commit history
git log --oneline

# Undo last commit (before push)
git reset --soft HEAD~1
```

---

## ✅ You're Done!
Your Securix web app is now:
- ✅ On GitHub with MIT license
- ✅ Frontend deployed on Vercel
- ✅ Backend deployed on Render/Railway
- ✅ Ready for production!

Need help? Check Vercel logs or contact support.
