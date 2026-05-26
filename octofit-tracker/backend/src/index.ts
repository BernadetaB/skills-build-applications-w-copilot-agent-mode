import express from 'express';
import mongoose from 'mongoose';
import { UserModel } from './models/User.js';

const app = express();
const port = 8000;
const mongoUri = 'mongodb://127.0.0.1:27017/octofit';

app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ message: 'OctoFit Tracker backend is running on port 8000.' });
});

app.get('/users', async (_req, res) => {
  const users = await UserModel.find().limit(10);
  res.json(users);
});

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB at', mongoUri);
    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });
