const connectToMongo = require('./db');
const express = require('express');

connectToMongo();  // Ensures the MongoDB connection is established

const app = express();
const port = 5000;

// Middleware to parse JSON
app.use(express.json());

// Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
    console.log(`iNotebook backend listening at http://localhost:${port}`);
});
