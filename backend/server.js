const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const nodemailer = require('nodemailer'); // Import nodemailer
require('dotenv').config({ path: path.resolve(__dirname, '.env') }); // Load environment variables from .env

const app = express();
const PORT = process.env.PORT || 3000; // Use port 3000 for the combined server

// Middleware to parse JSON bodies
app.use(express.json());

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

// Nodemailer Transporter Setup
const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use other services or SMTP directly
    auth: {
        user: process.env.EMAIL_USER, // Your sending email address
        pass: process.env.EMAIL_PASS, // Your generated app password
    },
});

// Function to send email notification
async function sendNotificationEmail(formData) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_RECIPIENT, // Your recipient email address
        subject: `New Contact Form Submission: ${formData.subject || 'No Subject'}`,
        html: `
            <p>You have received a new message from your portfolio contact form:</p>
            <ul>
                <li><strong>Name:</strong> ${formData.name}</li>
                <li><strong>Email:</strong> ${formData.email}</li>
                <li><strong>Subject:</strong> ${formData.subject || 'N/A'}</li>
                <li><strong>Message:</strong><br>${formData.message}</li>
            </ul>
            <p>Sent at: ${new Date().toLocaleString()}</p>
        `,
    };

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.EMAIL_RECIPIENT) {
        console.warn('Email sending skipped: EMAIL_USER, EMAIL_PASS, or EMAIL_RECIPIENT environment variables are not set.');
        return;
    }

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email notification sent successfully.');
    } catch (error) {
        console.error('Error sending email notification:', error);
    }
}

// Basic Authentication Middleware for Admin Panel
const basicAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.setHeader('WWW-Authenticate', 'Basic');
        return res.status(401).send('Authentication required.');
    }

    const [type, credentials] = authHeader.split(' ');
    if (type !== 'Basic' || !credentials) {
        res.setHeader('WWW-Authenticate', 'Basic');
        return res.status(401).send('Authentication required.');
    }

    const decodedCredentials = Buffer.from(credentials, 'base64').toString();
    const [username, password] = decodedCredentials.split(':');

    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
        next(); // Authentication successful
    } else {
        res.setHeader('WWW-Authenticate', 'Basic');
        res.status(401).send('Invalid credentials.');
    }
};


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

            // Send email notification
            sendNotificationEmail({ name, email, subject, message });

            res.status(200).json({ message: 'Message sent successfully!' });
        }
    );
});

// Admin API Endpoint to fetch all messages (protected by basicAuth)
app.get('/api/messages', basicAuth, (req, res) => {
    db.all('SELECT id, name, email, subject, message, timestamp FROM messages ORDER BY timestamp DESC', (err, rows) => {
        if (err) {
            console.error('Error fetching messages:', err.message);
            return res.status(500).json({ error: 'Failed to fetch messages.' });
        }
        res.status(200).json(rows);
    });
});

// Specific route to serve admin.html (must come before static middleware to avoid it being caught by index.html)
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// Serve static files from the frontend directory
// This should come after API routes to allow API routes to be hit first
app.use(express.static(path.join(__dirname, '../')));


// Fallback for any routes not matched by previous middleware/routes
// This should always be the LAST middleware
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