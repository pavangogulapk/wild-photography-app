const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8000; // Important for Koyeb

app.use(express.json());

// This line tells the server to look for index.html in the same folder
app.use(express.static(__dirname));

// The main route that renders the frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Profile API for your saved info
app.get('/api/profile', (req, res) => {
    res.json({ name: "Pavan Kumar", status: "Active" });
});

app.listen(port, "0.0.0.0", () => {
    console.log(`Server is running on port ${port}`);
});