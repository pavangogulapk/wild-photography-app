const express = require('express');
const path = require('path');
const app = express();
const port = 8000;

app.use(express.json());

// This line is the magic - it tells the server to show your HTML file
app.use(express.static(__dirname));

// Route to get your profile data
app.get('/api/profile', (req, res) => {
    res.json({
        name: "Pavan Kumar",
        role: "Wild Photographer",
        status: "Online"
    });
});

// Main route to serve the website
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, "0.0.0.0", () => {
    console.log(`Pavan's Server is running on port ${port}`);
});