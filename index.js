require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const User = require('./models/User');
const Vehicle = require('./models/Vehicle');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log("MongoDB connection error:", err));

app.post('/chat', async (req, res) => {
    try {
        const { userId, message } = req.body;

        if (!userId || !message) {
            return res.status(400).json({ reply: "Nedostaju parametri userId ili message." });
        }

        const id = Number(userId);
        const user = await User.findOne({ userId: id });
        const registered = user ? user.registered : false;

        if (!registered) {
            return res.json({
                reply: "Niste registrovani. Molimo vas posetite aics.com i napravite nalog kako biste pristupili detaljima o vozilima."
            });
        }

        const brands = ["Audi", "BMW", "Mercedes", "Volkswagen", "Toyota", "Opel", "Peugeot", "Renault", "Kia", "Hyundai"];

        const foundBrand = brands.find(brand =>
            message.toLowerCase().includes(brand.toLowerCase())
        );

        if (!foundBrand) {
            return res.json({ reply: "Molimo unesite brend vozila (npr. Audi, BMW, Toyota...)." });
        }

        const vehicle = await Vehicle.findOne({
            brand: { $regex: foundBrand, $options: 'i' }
        });

        const reply = vehicle
            ? `Vozilo: ${vehicle.brand} ${vehicle.model}, Godina: ${vehicle.year}, Cena: ${vehicle.price}€`
            : `Nismo pronašli nijedno vozilo marke ${foundBrand}.`;

        res.json({ reply });

    } catch (err) {
        console.error("Error in /chat:", err);
        res.status(500).json({ reply: "Došlo je do greške na serveru." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
