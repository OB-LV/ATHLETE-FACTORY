document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('product-container');
    const prevPageButton = document.getElementById('prev-page');
    const nextPageButton = document.getElementById('next-page');
    const pageInfo = document.getElementById('page-info');
    const cartCount = document.getElementById('cart-count');

    const products = [
        { id: 1, img: 'img/new balance1.jpg', name: 'NEW BALANCE Elite White', category: 'shoes', brand: 'Brand 1', price: 200.00 },
        { id: 2, img: 'img/shoe2.webp', name: 'PUMA ULTRABOOST', category: 'shoes', brand: 'Brand 2', price: 250.00 },
        { id: 3, img: 'img/adidas3.jpeg', name: 'ADIDAS 3', category: 'shoes', brand: 'Brand 3', price: 120.00 },
        { id: 4, img: 'img/adidas1.webp', name: 'ADIDAS FLY ONE1', category: 'shoes', brand: 'Brand 4', price: 300.00 },
        { id: 5, img: 'img/shoe1.jpeg', name: 'PUMA FUJI4', category: 'shoes', brand: 'Brand 5', price: 250.00 },
        { id: 6, img: 'img/nike1.jpeg', name: 'NIKE ZOOM1', category: 'shoes', brand: 'Brand 6', price: 180.00 },
        { id: 7, img: 'img/shoe7.jpg', name: 'Shoe 7', category: 'shoes', brand: 'Brand 7', price: 220.00 },
        { id: 8, img: 'img/shoe8.jpg', name: 'Shoe 8', category: 'shoes', brand: 'Brand 8', price: 240.00 },
        { id: 9, img: 'img/shoe9.jpg', name: 'Shoe 9', category: 'shoes', brand: 'Brand 9', price: 260.00 },
        { id: 10, img: 'img/shoe10.jpg', name: 'Shoe 10', category: 'shoes', brand: 'Brand 10', price: 280.00 }
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