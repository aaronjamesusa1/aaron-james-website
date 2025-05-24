// Initialize cart if empty
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM Elements
const cartItemsContainer = document.querySelector('.cart-items');
const emptyCartMsg = document.querySelector('.empty-cart');
const cartCountElements = document.querySelectorAll('.cart-count');

// Update cart display
function renderCart() {
    if (cart.length === 0) {
        emptyCartMsg.style.display = 'flex';
        return;
    }
    
    emptyCartMsg.style.display = 'none';
    cartItemsContainer.innerHTML = '';
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="item-details">
                <h3>${item.title}</h3>
                <p>$${item.price.toFixed(2)}</p>
                <button class="remove-item" data-id="${item.id}">Remove</button>
            </div>
            <div class="item-quantity">
                <button class="decrease">-</button>
                <span>${item.quantity}</span>
                <button class="increase">+</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
    
    updateCartCount();
}

// Update cart count in header
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElements.forEach(el => el.textContent = count);
}

// Add to cart function
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showModal();
}

// Modal functions
function showModal() {
    document.querySelector('.add-to-cart-modal').classList.add('show');
}

function hideModal() {
    document.querySelector('.add-to-cart-modal').classList.remove('show');
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    renderCart();
    
    // Modal buttons
    document.querySelector('.close-modal')?.addEventListener('click', hideModal);
    document.querySelector('.btn-continue')?.addEventListener('click', hideModal);
    
    // Add to cart buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            addToCart({
                id: btn.dataset.id,
                title: btn.dataset.title,
                price: parseFloat(btn.dataset.price),
                image: btn.dataset.image
            });
        });
    });
});