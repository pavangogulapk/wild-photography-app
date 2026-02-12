const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Helps read login data
app.use(express.static(__dirname));

// 1. Home Route: Shows your Login Page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 2. Dashboard Route: Shows your "Proper" Website
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// 3. Login Logic: Moves user from Home to Dashboard
app.post('/api/login', (req, res) => {
    const { username } = req.body;
    // After logging in, REDIRECT the browser to the dashboard
    res.redirect('/dashboard');
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
});