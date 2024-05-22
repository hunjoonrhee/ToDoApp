const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const taskRouter = require('./routes/task');
const tasksRouter = require('./routes/tasks');
const cors = require('cors');

const app = express();

const dotenv = require('dotenv');
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

const MONGODB_URI_PROD = process.env.MONGODB_URI_PROD;
mongoose
  .connect(MONGODB_URI_PROD)
  .then(() => {
    console.log('mongoose connected');
  })
  .catch((err) => {
    console.log('mongoose connection failed', err);
  });

app.get('/', (req, res) => {
  res.send('Hello Joon');
});

app.use('/task', taskRouter);
app.use('/tasks', tasksRouter);

app.listen(process.env.PORT || 5001, () => {
  console.log('server started and listening port 5001');
});
