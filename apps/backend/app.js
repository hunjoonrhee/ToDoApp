const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const taskRouter = require('./routes/task');
const tasksRouter = require('./routes/tasks');
const userRouter = require('./routes/user');
const cors = require('cors');

const app = express();

const dotenv = require('dotenv');
const session = require('express-session');
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
    cookie: { secure: true },
  }),
);

const MONGODB_URI = process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI_PROD : process.env.MONGODB_URI_DEV;
console.log(MONGODB_URI);
mongoose
  .connect(MONGODB_URI)
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
app.use('/user', userRouter);

app.listen(process.env.PORT || 5001, () => {
  console.log('server started and listening port 5001');
});
