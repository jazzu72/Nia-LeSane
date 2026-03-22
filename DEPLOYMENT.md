# Nia-Prime-Lite Deployment Guide

## 🔒 SECURITY - ONLY JASON LESANE CAN ACCESS

| Credential | Value |
|------------|-------|
| **Password** | `AddieMaeLesane-33` |
| **Secret Key** | `jazzu-ultimate-2026-secure` |

---

## Project Structure

```
Nia-Prime-Lite/
├── Backend/
│   ├── app.py              # Flask API
│   └── requirements.txt    # Python dependencies
├── frontend/
│   ├── index.html          # Main HTML
│   ├── app.js              # Frontend JS
│   ├── styles.css          # Mobile-first CSS
│   ├── manifest.json       # PWA manifest
│   └── service-worker.js   # PWA service worker
```

---

## Backend Deployment (Render)

### 1. Prepare Your Backend

The backend is in `/Backend/` directory with:
- `app.py` - Flask application with endpoints: `/`, `/add`, `/leads`
- `requirements.txt` - Dependencies: flask, pymongo, gunicorn

### 2. Create a Render Service

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure:

| Setting | Value |
|---------|-------|
| Name | nia-prime-lite-backend |
| Root Directory | backend |
| Runtime | Python 3 |
| Build Command | `pip install -r requirements.txt` |
| Start Command | `gunicorn app:app` |

### 3. Set Environment Variables

Add the following environment variable:

| Key | Value |
|-----|-------|
| `MONGO_URI` | Your MongoDB Atlas connection string |

Example MongoDB Atlas URI:
```
mongodb+srv://<username>:<password>@cluster0.mongodb.net/<database>?retryWrites=true&w=majority
```

### 4. Deploy

Click "Create Web Service" and wait for deployment.

Your backend URL will be: `https://nia-prime-lite-backend.onrender.com`

---

## Frontend Deployment (Vercel)

### 1. Configure Your Frontend

Before deploying, update the API URL in `frontend/app.js`:

```javascript
// Change this:
const API = "https://YOUR_RENDER_BACKEND_URL";

// To your actual Render backend URL:
const API = "https://nia-prime-lite-backend.onrender.com";
```

### 2. Deploy to Vercel

**Option A: Vercel CLI**

```bash
cd frontend
vercel login
vercel
```

**Option B: Vercel Dashboard**

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure:

| Setting | Value |
|---------|-------|
| Root Directory | frontend |
| Framework Preset | Other |
| Build Command | (leave empty) |
| Output Directory | (leave empty) |

5. Click "Deploy"

### 3. Your Frontend URL

Example: `https://nia-prime-lite-frontend.vercel.app`

---

## Configuration Checklist

### Backend (Render)

- [ ] Root Directory: `backend`
- [ ] Build Command: `pip install -r requirements.txt`
- [ ] Start Command: `gunicorn app:app`
- [ ] Environment Variable: `MONGO_URI` set

### Frontend (Vercel)

- [ ] Root Directory: `frontend`
- [ ] API URL updated in `app.js`
- [ ] All PWA files present: index.html, app.js, manifest.json, service-worker.js

---

## Testing Endpoints

After deployment, test these URLs:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `https://your-backend.onrender.com/` | GET | Health check |
| `https://your-backend.onrender.com/owner` | GET | Owner info (public) |
| `https://your-backend.onrender.com/add?name=Test&email=test@test.com&password=jazzu2026` | GET | Add lead (requires password) |
| `https://your-backend.onrender.com/leads?password=jazzu2026` | GET | List leads (requires password) |
| `https://your-backend.onrender.com/power` | GET | Power layer status |
| `https://your-backend.onrender.com/power/reset` | POST | Reset metrics (requires password) |
| `https://your-backend.onrender.com/power/threshold` | GET/POST | Get/set threshold (requires password) |

---

## MongoDB Atlas Setup (Free Tier)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a free cluster
4. Create database user (username/password)
5. Network Access: Allow all IPs (0.0.0.0/0) for development
6. Get connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.mongodb.net/<database>?retryWrites=true&w=majority
   ```

---

## PWA Features

Your frontend is a valid PWA with:

- ✅ Mobile-first responsive design
- ✅ Web App Manifest (installable)
- ✅ Service Worker (offline support)
- ✅ Cache-first strategy
- ✅ Add to home screen capability

To test PWA:
1. Open in mobile browser
2. Tap "Add to Home Screen"
3. Use offline (service worker caches resources)

---

## Troubleshooting

### Backend Issues

- **"No default database" error**: Ensure MONGO_URI includes database name
- **Connection timeout**: Check MongoDB Atlas network access settings

### Frontend Issues

- **API offline**: Check that Render backend is running
- **CORS errors**: Flask needs CORS support (add if needed)

### Adding CORS Support

Add to `Backend/app.py`:

```python
from flask_cors import CORS
CORS(app)
```

And add to requirements.txt:
```
flask-cors
```

---

## Complete Deployment Flow

1. **Deploy Backend** → Get backend URL (e.g., `nia-prime-lite.onrender.com`)
2. **Update Frontend** → Replace `YOUR_RENDER_BACKEND_URL` in `app.js`
3. **Deploy Frontend** → Get frontend URL (e.g., `nia-prime-lite.vercel.app`)
4. **Test** → Open frontend URL and verify API connection
5. **Install PWA** → Add to home screen on mobile

---

## Environment Variables Summary

### Render (Backend)
```
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
JAZZU_PASSWORD=your_special_password
```

### Vercel (Frontend)
No additional environment variables required for basic setup.

---

## Security Notes

- Never commit `MONGO_URI` to version control
- Use environment variables in production
- Consider adding rate limiting for `/add` endpoint
- Add authentication if needed for production use
