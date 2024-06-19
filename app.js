import express from 'express';
import routes from './source/routes/routes.js';
import cors from 'cors';

// Variables
const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// Allowed origins
const allowedOrigins = [
  'https://main--frontend-nodejs.netlify.app',
  'https://frontend-nodejs.netlify.app'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
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
