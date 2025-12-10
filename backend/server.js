const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const nodemailer = require('nodemailer'); // Import nodemailer
require('dotenv').config({ path: path.resolve(__dirname, '.env') }); // Load environment variables from .env

const app = express();
const PORT = process.env.PORT || 3000; // Use port 3000 for the combined server

// CORS middleware to allow frontend and backend on same origin
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

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
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #9D4EDD;">New Contact Form Submission</h2>
                <p>You have received a new message from your portfolio contact form:</p>
                <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <p><strong>Name:</strong> ${formData.name}</p>
                    <p><strong>Email:</strong> <a href="mailto:${formData.email}">${formData.email}</a></p>
                    <p><strong>Subject:</strong> ${formData.subject || 'Portfolio Contact'}</p>
                    <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #ddd;">
                        <p><strong>Message:</strong></p>
                        <p style="white-space: pre-wrap;">${formData.message}</p>
                    </div>
                </div>
                <p style="color: #666; font-size: 12px;">Sent at: ${new Date().toLocaleString()}</p>
            </div>
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

// Serve static files from the frontend directory (CSS, JS, images, etc.)
// This should come after API routes to allow API routes to be hit first
app.use(express.static(path.join(__dirname, '../'), {
    index: false, // Don't serve index.html automatically, we'll handle it with the route below
    extensions: ['html', 'css', 'js', 'png', 'jpg', 'jpeg', 'svg', 'ico', 'json']
}));

// Explicit route for root path to serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

// Fallback for any routes not matched by previous middleware/routes
// This should always be the LAST middleware (for SPA routing)
app.get('*', (req, res) => {
    // Only serve index.html for non-API routes
    if (!req.path.startsWith('/api')) {
        res.sendFile(path.join(__dirname, '../index.html'));
    } else {
        res.status(404).json({ error: 'API endpoint not found' });
    }
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