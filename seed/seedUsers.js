require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

async function seedUsers() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB connected for seeding users");

    await User.deleteMany({});

    const users = [
      { userId: 54, email: "nikola.stankovic560@gmail.com", registered: true },
      { userId: 55, email: "peraperic@gmail.com", registered: false },
      { userId: 56, email: "markomarkovic@gmail.com", registered: true },
      { userId: 98, email: "test@gmail.com", registered: true }
    ];

    await User.insertMany(users);
    console.log("Users seeded successfully");
    process.exit();
  } catch (err) {
    console.error("Error seeding users:", err);
    process.exit(1);
  }
}

seedUsers();
