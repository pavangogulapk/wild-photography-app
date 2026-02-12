const express = require('express');
const path = require('path');
const app = express();

// Render.com will provide the PORT automatically
const PORT = process.env.PORT || 8000;

// This allows the server to understand the data from your Login form
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

// 1. Show the Login Page when you first open the link
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 2. The route for your "Proper" Green Website
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// 3. This handles the Login button click
app.post('/login', (req, res) => {
    // This command physically changes the URL in your browser to /dashboard
    res.redirect('/dashboard');
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
});