require('dotenv').config({ path: '/Users/mayurvishwakarma/Developer/llamacorp/llamacorp-backend-temp/.env' });
const mongoose = require('mongoose');
const User = require('./llamacorp-backend-temp/backend-new/models/User');

async function seedAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    const existingAdmin = await User.findOne({ email: 'admin@llamacorp.com' });
    if (existingAdmin) {
      console.log('Admin already exists. Deleting it to recreate...');
      await User.deleteOne({ email: 'admin@llamacorp.com' });
    }
    
    const admin = new User({
      name: 'Super Admin',
      email: 'admin@llamacorp.com',
      password: 'admin1234',
      role: 'admin'
    });
    
    await admin.save();
    console.log('Admin user seeded successfully: admin@llamacorp.com / admin1234');
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

seedAdmin();
