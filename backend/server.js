const express = require('express');
const path = require('path');
const app = express();

// Render.com uses process.env.PORT automatically
const PORT = process.env.PORT || 8000;

app.use(express.json());

// RENDERING FIX: This tells the server to serve the HTML file from this folder
app.use(express.static(path.join(__dirname)));

// Mock database to keep Pavan Kumar's profile and posts saved
let userProfile = {
    username: "Pavan Kumar",
    role: "Wild Photographer",
    posts: [
        { id: 1, title: "Tiger in the Wild", date: "2026-02-10" },
        { id: 2, title: "Mountain Eagle", date: "2026-02-12" }
    ]
};

// API to get profile (displays the username at login)
app.get('/api/profile', (req, res) => {
    res.json(userProfile);
});

// API to handle "Login" with a new username
app.post('/api/login', (req, res) => {
    const { newUsername } = req.body;
    if (newUsername) {
        userProfile.username = newUsername; // Updates and "saves" it
    }
    res.json({ message: "Logged in successfully", user: userProfile });
});

// THE RENDERING ROUTE: This forces the index.html to show up
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is live on port ${PORT}`);
});