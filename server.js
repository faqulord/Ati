const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000; 
const MONGO_URI = process.env.MONGO_URI; 

// Hogy a szerver megértse a JSON formátumú rendeléseket
app.use(express.json()); 

// --- MONGODB CSATLAKOZÁS ÉS MODELL ---
if (MONGO_URI) {
    mongoose.connect(MONGO_URI)
      .then(() => console.log('✅ BINGO! Sikeresen csatlakoztunk a MongoDB adatbázishoz!'))
      .catch((err) => console.error('❌ Hiba az adatbázis csatlakozáskor:', err));
} else {
    console.log('⚠️ Figyelem: Nincs beállítva a MONGO_URI változó!');
}

// Rendelés (Order) sémája az adatbázisban
const orderSchema = new mongoose.Schema({
    nev: String,
    email: String,
    telefon: String,
    cim: String,
    fizetesMod: String,
    termekek: Array,
    osszeg: Number,
    statusz: { type: String, default: 'Új' },
    datum: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

// --- API VÉGPONTOK (A titkos kommunikációs csatornák) ---

// 1. Új rendelés mentése a MongoDB-be (A kosar.html hívja meg)
app.post('/api/orders', async (req, res) => {
    try {
        const ujRendeles = new Order(req.body);
        await ujRendeles.save();
        res.status(201).json({ message: 'Rendelés sikeresen mentve a MongoDB-be!' });
    } catch (error) {
        console.error('Hiba rendelés mentésekor:', error);
        res.status(500).json({ error: 'Belső szerverhiba a mentésnél' });
    }
});

// 2. Rendelések lekérése az Adminnak (Az admin.html hívja meg)
app.get('/api/orders', async (req, res) => {
    try {
        // A legfrissebb rendelések lesznek legelöl (-1)
        const orders = await Order.find().sort({ datum: -1 });
        res.json(orders);
    } catch (error) {
        console.error('Hiba lekérdezéskor:', error);
        res.status(500).json({ error: 'Hiba a rendelések lekérésekor' });
    }
});

// --- STATIKUS FÁJLOK KISZOLGÁLÁSA ---
app.use(express.static(__dirname));

// Minden más kérés az index.html-re visz (kivéve az API-kat)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 A szerver kilőve, figyeljük a ${PORT} portot.`);
});