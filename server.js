const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
// A Railway megadja a portot
const PORT = process.env.PORT || 3000; 
const MONGO_URI = process.env.MONGO_URI; 

// Hogy a szerverünk megértse a bejövő adatokat (később a rendeléseknél kell)
app.use(express.json()); 

// Csatlakozás az adatbázishoz
if (MONGO_URI) {
    mongoose.connect(MONGO_URI)
      .then(() => console.log('✅ BINGO! Sikeresen csatlakoztunk a MongoDB adatbázishoz!'))
      .catch((err) => console.error('❌ Hiba az adatbázis csatlakozáskor:', err));
} else {
    console.log('⚠️ Figyelem: Nincs beállítva a MONGO_URI változó!');
}

// --- ÍME A MEGOLDÁS A FEHÉR KÉPERNYŐRE ---
// Megmondjuk a szervernek, hogy az aktuális mappában lévő HTML, CSS, képek és videók fájljait mutassa meg a látogatóknak.
// Ez automatikusan betölti az index.html-t a főoldalon!
app.use(express.static(__dirname));

// Ha valaki olyan linkre kattint, ami nem létezik, dobjuk vissza a kezdőlapra
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Szerver elindítása
app.listen(PORT, () => {
  console.log(`🚀 A szerver kilőve, figyeljük a ${PORT} portot.`);
});