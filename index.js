const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');

const authRouter = require('./routes/user');
const documentRouter = require('./routes/document');
const Document = require('./models/document');
require('dotenv').config();

const PORT = process.env.PORT | 3001

const app = express();

var server = http.createServer(app);
var io = require('socket.io')(server);

app.use(cors());
app.use(express.json()); // convert body request to json
app.use(authRouter);
app.use(documentRouter);

const DB_URI = process.env.URI;

mongoose.
    connect(DB_URI).
    then(() => {
        console.log("Connection initialized successfully!")
    }).
    catch((err) => {
        console.log(err)
    });

io.on("connection", (socket) => {
    socket.on('join', (documentId) => {
        socket.join(documentId);
    });

    socket.on('typing', (data) => {
        // socket.broadcast(): send to every socket 
        // socket.broadcast.to(): send to only documentId room
        socket.broadcast.to(data.room).emit("changes", data);
    });

    socket.on('save', (data) => {
        saveData(data);
    })
});

const saveData = async (data) => {
    let document = await Document.findById(data.room);
    document.content = data.delta;
    document = await document.save();
}

server.listen(PORT, '0.0.0.0', () => {
    console.log(`App is listening on ${PORT}`);
});