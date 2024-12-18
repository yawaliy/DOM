// Select cart container and necessary elements
const cartContainer = document.querySelector('.cart-container');
const totalPriceElement = document.querySelector('.total-price');
const emptyCartMessage = document.querySelector('.empty-cart-message');

function updateTotalPrice() {
    const cartItems = document.querySelectorAll('.cart-item');
    let total = 0;

    cartItems.forEach(item => {
        const priceElement = item.querySelector('.item-price');
        const quantityElement = item.querySelector('.quantity');
        const price = parseFloat(priceElement.textContent.replace('$', ''));
        const quantity = parseInt(quantityElement.value);
        total += price * quantity;
    });

    totalPriceElement.textContent = `$${total.toFixed(2)}`;

    // Show empty cart message if no items remain
    if (cartItems.length === 0) {
        emptyCartMessage.style.display = 'block';
        totalPriceElement.textContent = '$0.00';
    } else {
        emptyCartMessage.style.display = 'none';
    }
}

function addEventListenersToItem(item) {
    // Adjust quantity through input field
    const quantityElement = item.querySelector('.quantity');

    quantityElement.addEventListener('input', () => {
        const value = parseInt(quantityElement.value);
        if (isNaN(value) || value < 1) {
            quantityElement.value = 1;
        }
        updateTotalPrice();
    });

    // Delete items from the cart
    const deleteButton = item.querySelector('.delete');
    deleteButton.addEventListener('click', () => {
        item.remove();
        updateTotalPrice();
    });

    // Like items through a clickable heart button
    const heartButton = item.querySelector('.heart');
    heartButton.addEventListener('click', () => {
        heartButton.classList.toggle('liked');
    });
}

// Initial setup for cart items
function initializeCart() {
    const cartItems = document.querySelectorAll('.cart-item');
    cartItems.forEach(item => {
        addEventListenersToItem(item);
    });
    updateTotalPrice();
}

initializeCart();