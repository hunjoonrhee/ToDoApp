const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const taskRouter = require('./routes/task');
const tasksRouter = require('./routes/tasks');
const cors = require('cors')

const app = express();
app.use(bodyParser.json());
app.use(cors());
const mongoURI = 'mongodb://localhost:27017/todoApp';

mongoose.connect(mongoURI).then(() => {
  console.log('mongoose connected');
}).catch((err) => {
  console.log('mongoose connection failed', err);
});

app.get('/', (req, res) => {
  res.send('Hello Joon');
});

app.use('/task', taskRouter);
app.use('/tasks', tasksRouter);

app.listen(5001, () => {
  console.log('server started and listening port 5001');
});
