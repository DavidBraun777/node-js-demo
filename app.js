import express from 'express';
import routes from './source/routes/routes.js';
import cors from 'cors';

// Variables
const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// CORS configuration
const corsOptions = {
  origin: 'https://main--frontend-nodejs.netlify.app', // Replace with your frontend URL
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
routes(app);

app.listen(PORT, HOST, function () {
  console.log(`Server running on http://localhost:${PORT}`);
});
