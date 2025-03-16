document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('product-container');
    const prevPageButton = document.getElementById('prev-page');
    const nextPageButton = document.getElementById('next-page');
    const pageInfo = document.getElementById('page-info');
    const cartCount = document.getElementById('cart-count');

    const products = [
        { id: 1, img: 'img/sweater1.jpg', name: 'Sweater 1', category: 'sweaters', brand: 'Brand 1', price: 50.00 },
        { id: 2, img: 'img/sweater2.jpg', name: 'Sweater 2', category: 'sweaters', brand: 'Brand 2', price: 60.00 },
        { id: 3, img: 'img/sweater3.jpg', name: 'Sweater 3', category: 'sweaters', brand: 'Brand 3', price: 70.00 },
        { id: 4, img: 'img/sweater4.jpg', name: 'Sweater 4', category: 'sweaters', brand: 'Brand 4', price: 80.00 },
        { id: 5, img: 'img/sweater5.jpg', name: 'Sweater 5', category: 'sweaters', brand: 'Brand 5', price: 90.00 },
        { id: 6, img: 'img/sweater6.jpg', name: 'Sweater 6', category: 'sweaters', brand: 'Brand 6', price: 100.00 },
        { id: 7, img: 'img/sweater7.jpg', name: 'Sweater 7', category: 'sweaters', brand: 'Brand 7', price: 110.00 },
        { id: 8, img: 'img/sweater8.jpg', name: 'Sweater 8', category: 'sweaters', brand: 'Brand 8', price: 120.00 },
        { id: 9, img: 'img/sweater9.jpg', name: 'Sweater 9', category: 'sweaters', brand: 'Brand 9', price: 130.00 },
        { id: 10, img: 'img/sweater10.jpg', name: 'Sweater 10', category: 'sweaters', brand: 'Brand 10', price: 140.00 }
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