const express = require('express');
const server = require('timesync/server');
const app = express();
const PORT = 3000;

app.listen(PORT);
console.log("Listening at", PORT);

// Handle /timesync requests
app.use('/timesync', server.requestHandler);

