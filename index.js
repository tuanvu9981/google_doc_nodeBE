const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRouter = require('./routes/user');
require('dotenv').config();

const PORT = process.env.PORT | 3001

const app = express();
app.use(cors());
app.use(express.json()); // convert body request to json
app.use(authRouter);

const DB_URI = process.env.URI;

mongoose.
    connect(DB_URI).
    then(() => {
        console.log("Connection initialized successfully!")
    }).
    catch((err) => {
        console.log(err)
    });

app.listen(PORT, '0.0.0.0', () => {
    console.log(`App is listening on ${PORT}`);
});