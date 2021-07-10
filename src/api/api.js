const express = require('express');
const mongoose = require('mongoose');

const _ = require('../util/utilities');

const taskRoutes = require('./route/taskRoute');
const annotationRoutes = require('./route/annotationRoute');
const conflictRoutes = require('./route/conflictRoute');

const { headerMiddleware } = require('./middleware/routeHeaders');

const { dbCreds } = require('../util/config');

const port = process.env.PORT || 4003;
const app = express();

function dbConnect() {
    mongoose.connect(dbCreds.uri, { useNewUrlParser: true, useUnifiedTopology: true });

    const db = mongoose.connection;
    // Added check for DB connection
    if(!db) {
        console.log("Error connecting db!");
    } else {
        console.log("Db connected successfully!");
    }
}

function apiInit() {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(headerMiddleware);

    app.use('/task', taskRoutes);
    app.use('/annotation', annotationRoutes);
    app.use('/conflict', conflictRoutes);

    const server = app.listen(port, () => {
        console.log(`Api services started! Server listening on port:${port}.`);
    });
}

module.exports.apiInit = apiInit;
module.exports.dbConnect = dbConnect;