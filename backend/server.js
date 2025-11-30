const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000; // Use port 3000 for the combined server

// Middleware to parse JSON bodies
app.use(express.json());

// Set up CORS - This is crucial for local development if frontend and backend are on different ports
// In a production environment, you would restrict origin to your frontend domain
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins for now
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// SQLite Database Setup
const dbPath = path.resolve(__dirname, 'messages.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        // Create messages table if it doesn't exist
        db.run(`CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            subject TEXT,
            message TEXT NOT NULL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )`, (createErr) => {
            if (createErr) {
                console.error('Error creating messages table:', createErr.message);
            } else {
                console.log('Messages table created or already exists.');
            }
        });
    }
});

// API Endpoint for Contact Form Submission
app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body;

    // Basic server-side validation
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Name, email, and message are required fields.' });
    }

    db.run(`INSERT INTO messages (name, email, subject, message) VALUES (?, ?, ?, ?)`,
        [name, email, subject, message],
        function (err) {
            if (err) {
                console.error('Error inserting message:', err.message);
                return res.status(500).json({ error: 'Failed to send message.' });
            }
            console.log(`A new message has been inserted with rowid ${this.lastID}`);
            res.status(200).json({ message: 'Message sent successfully!' });
        }
    );
});

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '../'))); // Assuming frontend is one level up from backend

// Catch-all for other routes, to serve index.html for SPAs
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});


// Start the server
app.listen(PORT, () => {
    console.log(`Combined server running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err.message);
        } else {
            console.log('Closed the SQLite database connection.');
        }
        process.exit(0);
    });
});