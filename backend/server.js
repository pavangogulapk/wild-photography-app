const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

// ROUTE 1: Shows the Black Login Page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ROUTE 2: Shows the Green Proper Website (Dashboard)
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// ROUTE 3: The Redirect Logic
app.post('/login', (req, res) => {
    const { username } = req.body;
    console.log(`Pavan Kumar's App: User ${username} is logging in.`);
    // THIS REDIRECTS YOU TO THE PROPER WEBSITE
    res.redirect('/dashboard');
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
});