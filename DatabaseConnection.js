const mongoose = require('mongoose');
const dns = require('dns');

try {
    dns.setServers(['8.8.8.8', '8.8.4.4']);
} catch (err) {
    console.warn("Could not set custom DNS servers, using system defaults:", err.message);
}

function Dbconnection() {
    const DB_URI = process.env.MONGO_URI;

    mongoose.connect(DB_URI).catch(err => {
        console.error("Database connection error:", err.message);
    });

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log("Connected to MongoDB successfully!");
    });
}

module.exports = Dbconnection;