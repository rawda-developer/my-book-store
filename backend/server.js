import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import routes from './routes/index.js';
const app = express();
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
app.use('/thumbnails', express.static('thumbnails'));
dotenv.config();
const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;
database.on('error', () => console.log('error connecting to database'));
database.once('connected', () => {
  console.log('connected to database');
});
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/api', routes);
app.listen(4000, () => {
  console.log('Example app listening on port 4000!');
});
