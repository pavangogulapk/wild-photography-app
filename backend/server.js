const express = require('express');
const path = require('path');
const app = express();

// Koyeb provides the port automatically
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// This route sends your profile data
app.get('/api/profile', (req, res) => {
    res.json({ 
        name: "Pavan Kumar", 
        portfolio: "Wild Photography", 
        status: "Live" 
    });
});

// This route renders the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
});