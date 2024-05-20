const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.get('/', (req, res) => {
    res.send("Hello Joon")
})

app.listen(5001, ()=> {
    console.log("server started and listening port 5001")
})
