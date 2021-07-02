const express = require('express');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const { apiInit, dbConnect } = require('./src/api/api');

function start() {
    console.log('Performing db connection...')
    dbConnect();
    
    console.log('Starting up api services for annotation app...');
    apiInit();
}

start();