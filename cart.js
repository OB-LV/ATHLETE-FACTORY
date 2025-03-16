document.addEventListener('DOMContentLoaded', () => {
    // Get necessary DOM elements
    const cartContainer = document.getElementById('cart-container');
    const totalItems = document.getElementById('total-items');
    const totalPrice = document.getElementById('total-price');
    const cartCount = document.getElementById('cart-count');
    
    // Main function to update cart display and functionality
    function updateCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartContainer.innerHTML = '';

        let total = 0;
        cart.forEach((product, index) => {
            // Ensure quantity is at least 1
            product.quantity = product.quantity || 1;
            
            const productDiv = document.createElement('div');
            productDiv.classList.add('cart-item');
            productDiv.innerHTML = `
                <img src="${product.img}" alt="${product.name}">
                <p>${product.name}</p>
                <p>Price: $${product.price.toFixed(2)}</p>
                <div class="quantity-control">
                    <button class="decrease-quantity" data-index="${index}">-</button>
                    <input type="number" class="quantity-input" data-index="${index}" value="${product.quantity}" min="1">
                    <button class="increase-quantity" data-index="${index}">+</button>
                </div>
                <button class="remove-from-cart" data-index="${index}">Remove</button>
            `;
            cartContainer.appendChild(productDiv);
            total += product.price * product.quantity;
        });

        // Update cart totals
        const itemCount = cart.reduce((sum, product) => sum + (parseInt(product.quantity) || 1), 0);
        totalItems.textContent = itemCount;
        totalPrice.textContent = `$${total.toFixed(2)}`;
        updateCartCount();

        // Add event listeners to cart controls
        attachCartEventListeners();
    }
    
    function attachCartEventListeners() {
        // Add event listeners to "Remove" buttons
        const removeFromCartButtons = document.querySelectorAll('.remove-from-cart');
        removeFromCartButtons.forEach(button => {
            button.addEventListener('click', removeFromCart);
        });

        // Add event listeners to quantity control buttons
        const decreaseQuantityButtons = document.querySelectorAll('.decrease-quantity');
        decreaseQuantityButtons.forEach(button => {
            button.addEventListener('click', decreaseQuantity);
        });

        const increaseQuantityButtons = document.querySelectorAll('.increase-quantity');
        increaseQuantityButtons.forEach(button => {
            button.addEventListener('click', increaseQuantity);
        });

        // Add event listeners to quantity input fields
        const quantityInputs = document.querySelectorAll('.quantity-input');
        quantityInputs.forEach(input => {
            input.addEventListener('change', updateQuantity);
        });
    }

    function removeFromCart(event) {
        const productIndex = event.target.getAttribute('data-index');
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.splice(productIndex, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    }

    function decreaseQuantity(event) {
        const productIndex = event.target.getAttribute('data-index');
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart[productIndex].quantity > 1) {
            cart[productIndex].quantity--;
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCart();
        }
    }

    function increaseQuantity(event) {
        const productIndex = event.target.getAttribute('data-index');
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart[productIndex].quantity = (parseInt(cart[productIndex].quantity) || 1) + 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    }

    function updateQuantity(event) {
        const productIndex = event.target.getAttribute('data-index');
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const newQuantity = parseInt(event.target.value);
        if (newQuantity > 0) {
            cart[productIndex].quantity = newQuantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCart();
        }
    }

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const count = cart.reduce((sum, product) => sum + (parseInt(product.quantity) || 1), 0);
        
        // Handle the case when cart is empty
        if (cart.length === 0) {
            cartCount.textContent = "0";
        } else {
            cartCount.textContent = count.toString();
        }
    }

    // Initialize the cart when page loads
    updateCart();
});