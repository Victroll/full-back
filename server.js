const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Routes
const listRoutes = require('./routes/shopping-list');
const userRoutes = require('./routes/user');

const app = express();

const dbUrl =
  'mongodb+srv://victroll:ohLEBLhW8tK7F8gi@cluster0-rmtji.mongodb.net/full-back?retryWrites=true&w=majority';

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Update to match the domain you will make the request from
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

mongoose.connect(dbUrl);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/list', listRoutes);
app.use('/user', userRoutes);

app.listen(3214, () => console.log('Init!!'));
