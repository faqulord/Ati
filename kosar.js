// kosar.js - Az A&T Harmonies Kosár motorja (LocalStorage alapú)

function getCart() {
    let cart = localStorage.getItem('at_harmonies_cart');
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem('at_harmonies_cart', JSON.stringify(cart));
    updateCartBadge();
}

function addToCart(id, name, price, image, extras = '') {
    let cart = getCart();

    // Megnézzük, van-e már ilyen termék pontosan ilyen extrával (pl. méret/típus) a kosárban
    let existingItem = cart.find(item => item.id === id && item.extras === extras);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: id,
            name: name,
            price: price,
            image: image,
            extras: extras,
            quantity: 1
        });
    }

    saveCart(cart);

    // Vizuális visszajelzés a vásárlónak
    alert(name + " sikeresen bekerült a kosárba! 🛒");
}

function updateCartBadge() {
    let cart = getCart();
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    let badge = document.getElementById('cart-badge');
    if (badge) {
        if (totalItems > 0) {
            badge.innerText = totalItems;
            badge.classList.remove('hidden');
        } else {
            badge.classList.add('hidden');
        }
    }
}

// Amikor betölt az oldal, rögtön frissítjük a kosár ikonon lévő számot
document.addEventListener('DOMContentLoaded', updateCartBadge);