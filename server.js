// Beimportáljuk a szükséges csomagokat
const express = require('express');
const path = require('path');

// Létrehozzuk az Express alkalmazást
const app = express();

// A Railway automatikusan ad egy PORT környezeti változót. 
// Ha a gépünkön teszteljük, a 3000-es portot használja.
const PORT = process.env.PORT || 3000;

// Beállítjuk a 'public' mappát a statikus fájlok (CSS, képek, videók) kiszolgálására.
// Bármi, amit ide teszel, közvetlenül elérhető lesz a weben.
app.use(express.static(path.join(__dirname, 'public')));

// Amikor valaki megnyitja a főoldalt (a '/' útvonalat), elküldjük neki az index.html fájlt.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Elindítjuk a szervert, és kiírjuk a konzolra, hogy sikeresen fut.
app.listen(PORT, () => {
    console.log(`A szerver sikeresen elindult a ${PORT}-es porton!`);
});