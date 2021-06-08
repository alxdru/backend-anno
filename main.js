const express = require('express');
const { apiInit, dbConnect } = require('./src/api/api');

function start() {
    console.log('Performing db connection...')
    dbConnect();
    
    console.log('Starting up api services for annotation app...');
    apiInit();
}

start();