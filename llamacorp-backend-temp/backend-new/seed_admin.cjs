require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

async function seedAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    const existingAdmin = await User.findOne({ email: 'admin@llamacorp.com' });
    if (existingAdmin) {
      await User.deleteOne({ email: 'admin@llamacorp.com' });
    }
    
    const admin = new User({
      name: 'Super Admin',
      email: 'admin@llamacorp.com',
      password: 'admin1234',
      role: 'Admin'
    });
    
    await admin.save();
    console.log('Admin seeded!');
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

seedAdmin();
