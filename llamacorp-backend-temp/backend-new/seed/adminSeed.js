const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

const seedAdmin = async () => {
    try {
        if (!process.env.MONGO_URI) {
            console.error('MONGO_URI is missing. Cannot seed.');
            process.exit(1);
        }

        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for seeding...');

        const adminExists = await User.findOne({ email: 'admin@llamacorp.com' });

        if (adminExists) {
            console.log('Admin user already exists. Seeding aborted.');
            process.exit(0);
        }

        await User.create({
            name: 'Admin',
            email: 'admin@llamacorp.com',
            password: 'admin1234', // Pre-save hook in User model will hash this
            role: 'Admin',
        });

        console.log('Admin user seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
};

seedAdmin();
