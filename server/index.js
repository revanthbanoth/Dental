const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    // Allow all localhost origins (any port) and requests with no origin (Postman, etc.)
    if (!origin || origin.startsWith('http://localhost') || origin.startsWith('http://127.0.0.1')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const appointmentRoutes = require('./routes/appointments');
const contactRoutes = require('./routes/contact');
const blogRoutes = require('./routes/blog');
const adminRoutes = require('./routes/admin');

app.use('/api/appointments', appointmentRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Lotus Dental Clinic API is running! 🦷', status: 'OK' });
});

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://brevanth50_db_user:revanth05@cluster0.eod5r4t.mongodb.net/dental-clinic?appName=Cluster0';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    console.log(`📦 Database: ${MONGO_URI}`);
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n❌ Port ${PORT} is already in use!`);
    console.error(`👉 Fix: Open a new terminal and run:`);
    console.error(`   npx kill-port ${PORT}`);
    console.error(`   Then run "npm run dev" again.\n`);
    process.exit(1);
  } else {
    throw err;
  }
});
