const express = require('express');
const path = require('path');
const app = express();

// Use the port Koyeb provides, or default to 8000
const PORT = process.env.PORT || 8000;

// This line tells the server to look in the CURRENT folder for files
app.use(express.static(__dirname));

// This handles the "Pavan Kumar" profile data
app.get('/api/profile', (req, res) => {
    res.json({ 
        name: "Pavan Kumar", 
        role: "Wild Photographer",
        status: "Active" 
    });
});

// THIS IS THE FIX: This sends the index.html file whenever someone visits the link
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
});