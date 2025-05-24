// const express = require('express');
const morgan = require('morgan');
// const fs = require('fs'); // Import the 'fs' module for synchronous functions
require('dotenv').config();
const accessLogs=require('./utils/logUtil')
const GeminiRouter=require('./routes/geminiRouter')
const app=require('./app')

// Setup the logger
app.use(morgan('combined', { stream: accessLogs.accessLogStream }));

app.use('/api', GeminiRouter);
