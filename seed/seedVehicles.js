require('dotenv').config();
const mongoose = require('mongoose');
const Vehicle = require('../models/Vehicle');

async function seedVehicles() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB connected for seeding vehicles");

    await Vehicle.deleteMany({}); 

    const vehicles = [
      { brand: "Audi", model: "A4", year: 2021, price: 20000 },
      { brand: "BMW", model: "X5", year: 2022, price: 50000 },
      { brand: "Tesla", model: "Model 3", year: 2023, price: 45000 },
      { brand: "Mercedes", model: "C200", year: 2020, price: 25000 },
      { brand: "Volkswagen", model: "Golf", year: 2019, price: 15000 }
    ];

    await Vehicle.insertMany(vehicles);
    console.log("Vehicles seeded successfully");

    process.exit();
  } catch (err) {
    console.error("Error seeding vehicles:", err);
    process.exit(1);
  }
}

seedVehicles();
