const { spawn } = require('child_process');
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

// Use a JSON stream parser to parse the data from Flask.
const jsonParser = require('json-stream');

// Child process to run the Flask API
const pythonProcess = spawn('python', ['../py/app.py']);

// Declare the dataBuffer variable.
let dataBuffer = '';

// Listen for data from Flask.
pythonProcess.stdout.on('data', (data) => {
    // Append the new data to the buffer.
    dataBuffer += data;

    // Try to parse the buffer as JSON.
    try {
        // If the parser is successful, store the parsed data.
        const flaskData = jsonParser.parse(dataBuffer);

        // Clear the buffer.
        dataBuffer = '';

        // Send the parsed data to the client.
        res.send(flaskData);
    } catch (err) {
        // If the parser fails, do nothing and wait for more data.
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});