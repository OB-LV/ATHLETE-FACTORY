document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('product-container');
    const prevPageButton = document.getElementById('prev-page');
    const nextPageButton = document.getElementById('next-page');
    const pageInfo = document.getElementById('page-info');
    const cartCount = document.getElementById('cart-count');

    const products = [
        { id: 1, img: 'img/adidas sweter 1.jpg', name: 'ADIDAS ORIGINALS', category: 'sweaters', brand: 'Brand 1', price: 250.00 },
        { id: 2, img: 'img/under armor sweter.jpeg', name: 'UNDER ARMOR SWEATER', category: 'sweaters', brand: 'Brand 2', price: 179.99 },
        { id: 3, img: 'img/adidas sweter men.jpg', name: 'ADIDAS SWEATER', category: 'sweaters', brand: 'Brand 3', price: 119.00 },
        { id: 4, img: 'img/under armor sweter1.avif', name: 'UNDER ARMOR HEAVY DUTY EDITION', category: 'sweaters', brand: 'Brand 4', price: 180.00 },
        { id: 7, img: 'img/puma jacket.avif', name: 'PUMA STREET X', category: 'sweaters', brand: 'Brand 7', price: 179.99 },
        { id: 9, img: 'img/sweater png.webp', name: 'ADIDAS FALL DRI-FIT', category: 'sweaters', brand: 'Brand 9', price: 180.00 },
    ];

    let currentPage = 1;
    const itemsPerPage = 6;
    let filteredProducts = products;

    prevPageButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderProducts();
        }
    });

    nextPageButton.addEventListener('click', () => {
        if (currentPage < Math.ceil(filteredProducts.length / itemsPerPage)) {
            currentPage++;
            renderProducts();
        }
    });

    function renderProducts() {
        productContainer.innerHTML = '';
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedProducts = filteredProducts.slice(start, end);

        paginatedProducts.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <img src="${product.img}" alt="${product.name}">
                <p>${product.name}</p>
                <p>Price: $${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            `;
            productContainer.appendChild(productDiv);
        });

        pageInfo.textContent = `Page ${currentPage} of ${Math.ceil(filteredProducts.length / itemsPerPage)}`;
        prevPageButton.disabled = currentPage === 1;
        nextPageButton.disabled = currentPage === Math.ceil(filteredProducts.length / itemsPerPage);

        // Add event listeners to "Add to Cart" buttons
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', addToCart);
        });
    }

    function addToCart(event) {
        const productId = event.target.getAttribute('data-id');
        const product = products.find(p => p.id == productId);

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));

        updateCartCount();
    }

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartCount.textContent = cart.length;
    }

    // Initial render of all products
    renderProducts();
    updateCartCount();
});