document.addEventListener('DOMContentLoaded', () => {
    const cartItems = [
        { img: 'img/adidas1.webp', name: 'ADIDAS FLY ONE 1', price: 200.00, quantity: 1 },
        { img: 'img/nike1.jpeg', name: 'NIKE ZOOM1', price: 180.00, quantity: 2 },
        { img: 'img/shoe3.webp', name: 'Puma Night Walker 3', price: 150.00, quantity: 1 }
    ];

    const cartContainer = document.getElementById('cart-container');
    const totalItemsElement = document.getElementById('total-items');
    const totalPriceElement = document.getElementById('total-price');

    function renderCart() {
        cartContainer.innerHTML = '';
        let totalItems = 0;
        let totalPrice = 0;

        cartItems.forEach(item => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');
            cartItemDiv.innerHTML = `
                <img src="${item.img}" alt="${item.name}">
                <div class="cart-item-details">
                    <p>${item.name}</p>
                    <p>Price: $${item.price.toFixed(2)}</p>
                    <p>Quantity: ${item.quantity}</p>
                </div>
                <button class="remove-button">Remove</button>
            `;
            cartContainer.appendChild(cartItemDiv);

            totalItems += item.quantity;
            totalPrice += item.price * item.quantity;
        });

        totalItemsElement.textContent = totalItems;
        totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
    }

    cartContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-button')) {
            const itemName = event.target.previousElementSibling.firstElementChild.textContent;
            const itemIndex = cartItems.findIndex(item => item.name === itemName);
            if (itemIndex !== -1) {
                cartItems.splice(itemIndex, 1);
                renderCart();
            }
        }
    });

    renderCart();
});