const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// ─── CORS ────────────────────────────────────────────────────────────────────
app.use(cors({
  origin: function (origin, callback) {
    // Allow no-origin requests (Postman, curl, mobile apps)
    if (!origin) return callback(null, true);
    // Allow any localhost port (development)
    if (origin.startsWith('http://localhost') || origin.startsWith('http://127.0.0.1')) {
      return callback(null, true);
    }
    // Allow ALL Render.com hosted domains (frontend)
    if (origin.endsWith('.onrender.com')) {
      return callback(null, true);
    }
    // Allow any custom domain if set via env
    const allowedDomain = process.env.FRONTEND_URL;
    if (allowedDomain && origin === allowedDomain) {
      return callback(null, true);
    }
    callback(new Error('Not allowed by CORS: ' + origin));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ─── BODY PARSERS ────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ─── HEALTH & KEEP-ALIVE ROUTES ──────────────────────────────────────────────
// Root health check
app.get('/', (req, res) => {
  res.json({
    message: 'SmileCare Dental Clinic API is running! 🦷',
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production',
  });
});

// /api/health - used by frontend ping
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server running', db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

// /api/ping - keep-alive route for Render free tier
app.get('/api/ping', (req, res) => {
  res.json({ pong: true, time: Date.now() });
});

// ─── API ROUTES ───────────────────────────────────────────────────────────────
const appointmentRoutes = require('./routes/appointments');
const contactRoutes = require('./routes/contact');
const blogRoutes = require('./routes/blog');
const adminRoutes = require('./routes/admin');

app.use('/api/appointments', appointmentRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/admin', adminRoutes);

// ─── 404 HANDLER ─────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.url} not found` });
});

// ─── GLOBAL ERROR HANDLER ────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('❌ Unhandled error:', err.message);
  res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
});

// ─── MONGODB + SERVER START ──────────────────────────────────────────────────
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

if (!MONGO_URI) {
  console.error('❌ MONGO_URI is not defined in environment variables!');
  process.exit(1);
}

mongoose
  .connect(MONGO_URI, {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
  })
  .then(() => {
    console.log('✅ MongoDB connected successfully');

    const server = app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'production'}`);
    });

    // ─── SELF KEEP-ALIVE PING (prevents Render free tier from sleeping) ──────
    if (process.env.NODE_ENV !== 'development') {
      const SELF_URL = process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`;
      const http = SELF_URL.startsWith('https') ? require('https') : require('http');
      setInterval(() => {
        http.get(`${SELF_URL}/api/ping`, (res) => {
          console.log(`🏓 Keep-alive ping → ${res.statusCode}`);
        }).on('error', (err) => {
          console.log(`⚠️  Keep-alive error: ${err.message}`);
        });
      }, 10 * 60 * 1000); // every 10 minutes
    }

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} is already in use!`);
        process.exit(1);
      } else {
        throw err;
      }
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });

// ─── GRACEFUL SHUTDOWN ────────────────────────────────────────────────────────
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received, shutting down gracefully...');
  mongoose.connection.close(() => {
    console.log('📦 MongoDB connection closed.');
    process.exit(0);
  });
});
