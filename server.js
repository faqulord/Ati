const express = require('express');
const mongoose = require('mongoose');

const app = express();
// A Railway automatikusan ad egy portot, vagy a 3000-est használjuk
const PORT = process.env.PORT || 3000; 

// BEOLVASSUK A RAILWAYEN BEÁLLÍTOTT VÁLTOZÓDAT!
const MONGO_URI = process.env.MONGO_URI; 

// Hogy a szerverünk megértse a bejövő adatokat (pl. új rendelés)
app.use(express.json()); 

// Csatlakozás az adatbázishoz (Mongoose használatával)
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ BINGO! Sikeresen csatlakoztunk a MongoDB adatbázishoz!'))
  .catch((err) => console.error('❌ Hiba az adatbázis csatlakozáskor:', err));

// Egy egyszerű teszt végpont, hogy lássuk, él-e a szerver
app.get('/', (req, res) => {
  res.send('Az A&T Harmonies szerver fut, az adatbázis készen áll a rendelések fogadására!');
});

// Szerver elindítása
app.listen(PORT, () => {
  console.log(`🚀 A szerver kilőve, figyeljük a ${PORT} portot.`);
});