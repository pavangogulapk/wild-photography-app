import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState(localStorage.getItem('savedUser') || 'Pavan Kumar');
  const [tempName, setTempName] = useState('');
  const [posts, setPosts] = useState([]);
  const [bookings, setBookings] = useState([]);
  
  const [tripType, setTripType] = useState('Wild Safari Ride');
  const [tripDate, setTripDate] = useState('');
  const [message, setMessage] = useState('');

  const refreshData = () => {
    axios.get('http://localhost:5000/api/data')
      .then(res => {
        setPosts(res.data.posts);
        setBookings(res.data.bookings);
      });
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (tempName) {
      setUsername(tempName);
      localStorage.setItem('savedUser', tempName);
      setTempName('');
    }
  };

  const handleSchedule = (e) => {
    e.preventDefault();
    if (!tripDate) return alert("Please pick a date!");
    axios.post('http://localhost:5000/api/book', { username, tripName: tripType, date: tripDate })
      .then(() => {
        setMessage(`Success! ${tripType} booked for ${tripDate}`);
        setTripDate(''); 
        refreshData();
      });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', textAlign: 'center', backgroundColor: '#f0f4f0', minHeight: '100vh' }}>
      <header style={{ backgroundColor: '#2d4739', color: 'white', padding: '20px', borderRadius: '10px', marginBottom: '30px' }}>
        <h1>🐾 WILD PHOTOGRAPHY ADVENTURES</h1>
        <p>Current Explorer: <strong>{username}</strong></p>
        <form onSubmit={handleLogin}>
          <input value={tempName} onChange={(e) => setTempName(e.target.value)} placeholder="Enter Name" style={inputStyle} />
          <button type="submit" style={btnStyle}>Switch User</button>
        </form>
      </header>

      {message && <div style={{ background: '#d4edda', color: '#155724', padding: '10px', marginBottom: '20px' }}>{message}</div>}

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '30px' }}>
        <div style={cardStyle}>
          <h2>📅 Schedule a Trip</h2>
          <select value={tripType} onChange={(e) => setTripType(e.target.value)} style={inputStyle}>
            <option>Wild Safari Ride</option>
            <option>Mountain Hiking</option>
            <option>Adventure Guide Trip</option>
          </select>
          <input type="date" value={tripDate} onChange={(e) => setTripDate(e.target.value)} style={inputStyle} />
          <button onClick={handleSchedule} style={{ ...btnStyle, width: '100%', marginTop: '10px' }}>Confirm Booking</button>
        </div>

        <div style={cardStyle}>
          <h2>📝 Upcoming Bookings</h2>
          <ul style={{ textAlign: 'left', listStyle: 'none', padding: 0 }}>
            {bookings.map(b => (
              <li key={b.id} style={{ borderBottom: '1px solid #ddd', padding: '10px 0' }}>
                <strong>{b.user}</strong> booked <strong>{b.trip}</strong> on {b.date}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <h2 style={{ marginTop: '50px' }}>Photography Gallery</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
        {posts.map(post => (
          <div key={post.id} style={{ background: 'white', borderRadius: '15px', width: '300px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
            <img src={post.image} alt={post.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            <div style={{ padding: '15px' }}>
              <h3>{post.title}</h3>
              <p>Photographer: <strong>{post.author}</strong></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const inputStyle = { padding: '10px', margin: '5px', borderRadius: '5px', border: '1px solid #ccc' };
const btnStyle = { padding: '10px 20px', backgroundColor: '#4a7c59', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' };
const cardStyle = { backgroundColor: 'white', padding: '20px', borderRadius: '15px', width: '400px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' };

export default App;