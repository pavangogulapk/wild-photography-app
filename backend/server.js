const express = require('express');
const cors = require('cors');
const path = require('path'); // New: helps find files on the internet
const app = express();

// CHANGE 1: Use the port provided by the hosting service OR 5000 for local
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Your Data (Saved from our previous step)
let siteData = {
    posts: [
        { 
            id: 1, 
            title: "Majestic African Lion", 
            author: "Pavan Kumar", 
            type: "Wild Safari", 
            image: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=800" 
        },
        { 
            id: 2, 
            title: "Golden Eagle Soaring", 
            author: "Pavan Kumar", 
            type: "Photography", 
            image: "https://images.unsplash.com/photo-1506220926022-cc2c17377ff1?w=800" 
        },
        { 
            id: 3, 
            title: "Deep Jungle Elephant", 
            author: "Pavan Kumar", 
            type: "Hiking", 
            image: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=800" 
        }
    ],
    bookings: [] 
};

// API Routes
app.get('/api/data', (req, res) => {
    res.json(siteData);
});

app.post('/api/book', (req, res) => {
    const { username, tripName, date } = req.body;
    const newBooking = { id: Date.now(), user: username, trip: tripName, date: date };
    siteData.bookings.push(newBooking);
    res.json({ message: "Booking saved!", booking: newBooking });
});

// CHANGE 2: Tell the backend to serve the frontend files when hosted
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`✅ Server is ready for the internet on port ${PORT}`);
});