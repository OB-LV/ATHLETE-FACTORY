document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('product-container');
    const prevPageButton = document.getElementById('prev-page');
    const nextPageButton = document.getElementById('next-page');
    const pageInfo = document.getElementById('page-info');
    const cartCount = document.getElementById('cart-count');

    const products = [
        { id: 1, img: 'img/under armor png.jpg', name: 'UNDER ARMOR GYM STYLE', category: 'shirts', brand: 'Brand 1', price: 75.00 },
        { id: 2, img: 'img/product4.avif', name: 'ADIDAS Retro', category: 'shirts', brand: 'Brand 2', price: 99.99 },
        { id: 3, img: 'img/puma3.avif', name: 'PUMA Summer Colection', category: 'shirts', brand: 'Brand 3', price: 80.00 },
        { id: 4, img: 'img/puma.avif', name: 'PUMA Stylish', category: 'shirts', brand: 'Brand 4', price: 85.00 },
        { id: 5, img: 'img/product3.webp', name: 'NIKE 2024 Edition', category: 'shirts', brand: 'Brand 5', price: 90.00 },
        { id: 6, img: 'img/under armor2.webp', name: 'UNDER ARMOR Sport Way', category: 'shirts', brand: 'Brand 6', price: 60.00 },
        { id: 7, img: 'img/puma1.avif', name: 'PUMA Outdoors Jogger', category: 'shirts', brand: 'Brand 7', price: 90.00 },
        { id: 8, img: 'img/product6.webp', name: 'ADIDAS long Sleeve Classics', category: 'shirts', brand: 'Brand 8', price: 120.00 },
        { id: 9, img: 'img/under armor1.jpeg', name: 'UNDER ARMOR Lifting', category: 'shirts', brand: 'Brand 9', price: 70.00 },
        { id: 10, img: 'img/product2.jpg', name: 'NIKE FALL COLLECTION', category: 'shirts', brand: 'Brand 10', price: 140.00 }
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