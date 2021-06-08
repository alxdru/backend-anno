const express = require('express');
const mongoose = require('mongoose');

const taskRoutes = require('./route/taskRoute');
const annotationRoutes = require('./route/annotationRoute');

const port = process.env.PORT || 4003;
const app = express();

function dbConnect() {
    mongoose.connect('mongodb://localhost/db-annotation-app', { useNewUrlParser: true});

    const db = mongoose.connection;
    // Added check for DB connection
    if(!db) {
        console.log("Error connecting db!");
    } else {
        console.log("Db connected successfully!");
    }
}

function apiInit() {
    app.use(express.urlencoded());
    app.use(express.json());

    app.use('/task', taskRoutes);
    app.use('/annotation', annotationRoutes);

    const server = app.listen(port, () => {
        console.log(`Api services started! Server listening on port:${port}.`);
    });
}

module.exports.apiInit = apiInit;
module.exports.dbConnect = dbConnect;