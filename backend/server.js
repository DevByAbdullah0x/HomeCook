const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const foodRoutes = require('./routes/foods');
const orderRoutes = require('./routes/orders');
const authRoutes = require('./routes/auth');

// Load env variables
dotenv.config();

// Connect to database
connectDB().then(() => {
  const seedData = require('./config/seed');
  seedData();
});

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/foods', foodRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', authRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to HomeCook API',
    version: '1.0.0',
    endpoints: {
      foods: '/api/foods',
      orders: '/api/orders',
      admin: '/api/admin'
    }
  });
});

const PORT = parseInt(process.env.PORT, 10) || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});