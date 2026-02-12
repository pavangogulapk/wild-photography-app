const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// MODIFIED LOGIN LOGIC:
app.post('/login', (req, res) => {
    const { username } = req.body; 
    // This sends the name in the URL: /dashboard?name=Pavan
    res.redirect(`/dashboard?name=${encodeURIComponent(username)}`); 
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});