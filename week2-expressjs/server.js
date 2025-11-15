const express = require('express');

const app = express();
const PORT = 3000;

// --- MIDDLEWARE ---

// 1. JSON Parsing (Required for POST requests)
app.use(express.json());

// 2. Bonus: Logging Middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} request to ${req.url}`);
    next();
});

// 3. Static Files (Serves the index.html)
app.use(express.static('public'));


// --- ROUTES ---

// GET / -> Simple text response
app.get('/', (req, res) => {
    res.send("My Week 2 API!");
});

// POST /user -> Adds a user
app.post('/user', (req, res) => {
    const { name, email } = req.body;

    // Error handling: Check if data is missing
    if (!name || !email) {
        return res.status(400).json({ error: "Data missing! Please provide name and email." });
    }

    res.send(`Hello, ${name}!`);
});

// GET /user/:id -> Dynamic User Profile
app.get('/user/:id', (req, res) => {
    const id = req.params.id;
    res.send(`User ${id} profile`);
});


// --- START SERVER ---
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
}); 