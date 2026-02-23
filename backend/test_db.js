const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env
dotenv.config({ path: path.join(__dirname, '.env') });

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error('ERROR: MONGO_URI not found in .env file');
    process.exit(1);
}

console.log('--- MongoDB Connection Test ---');
console.log('Using URI:', MONGO_URI.replace(/:([^@]+)@/, ':****@')); // Hide password

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('SUCCESS: MongoDB Connected successfully!');
        process.exit(0);
    })
    .catch(err => {
        console.error('FAILURE: MongoDB Connection Error:');
        console.error('Error Name:', err.name);
        console.error('Error Message:', err.message);
        if (err.info) {
            console.error('Error Info:', JSON.stringify(err.info, null, 2));
        }
        if (err.errorResponse) {
            console.error('Atlas Error Response:', JSON.stringify(err.errorResponse, null, 2));
        }
        process.exit(1);
    });
