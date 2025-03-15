document.addEventListener('DOMContentLoaded', () => {
    const filterForm = document.getElementById('filter-form');
    const productContainer = document.getElementById('product-container');
    const prevPageButton = document.getElementById('prev-page');
    const nextPageButton = document.getElementById('next-page');
    const pageInfo = document.getElementById('page-info');

    const products = [
        { img: 'img/adidas sweter men.jpg', name: 'ADIDAS Sweater', category: 'sweaters', brand: 'adidas', price: 119.99 },
        { img: 'img/puma jacket.avif', name: 'PUMA Street X', category: 'sweaters', brand: 'puma', price: 179.99 },
        { img: 'img/sweater png.webp', name: 'adidas FALL DRI-FIT', category: 'sweaters', brand: 'adidas', price: 180.00 },
        { img: 'img/under armor sweter.jpeg', name: 'UNDER ARMOR GYM Sweater', category: 'sweaters', brand: 'under armor', price: 179.99 },
        { img: 'img/adidas sweter 1.jpg', name: 'Adidas Originals', category: 'sweaters', brand: 'adidas', price: 250.00 },
        { img: 'img/under armor2.webp', name: 'UNDER ARMOR gym shirt', category: 'shirts', brand: 'under armor', price: 50.00 },
        { img: 'img/product6.webp', name: 'ADIDAS 2025 EDITION', category: 'shirts', brand: 'adidas', price: 180.00 },
        { img: 'img/product3.webp', name: 'NIKE SHADE', category: 'shirts', brand: 'nike', price: 180.00 },
        { img: 'img/puma product.avif', name: 'PUMA FITS', category: 'shirts', brand: 'puma', price: 89.99 },
        { img: 'img/under armor png.jpg', name: 'UNDER ARMOR SIMPLE FIT', category: 'shirts', brand: 'under armor', price: 99.00 },
        { img: 'img/shoe2.webp', name: 'PUMA Ultraboost', category: 'shoes', brand: 'puma', price: 179.99 },
        { img: 'img/shoe3.webp', name: 'PUMA Night Walker3', category: 'shoes', brand: 'puma', price: 149.99 },
        { img: 'img/adidas1.webp', name: 'ADIDAS FLY ONE', category: 'shoes', brand: 'adidas', price: 200.00 },
        { img: 'img/new balance2.webp', name: 'NEW BALANCE Elite Edition', category: 'shoes', brand: 'new balance', price: 199.99 },
        { img: 'img/asics love.webp', name: 'ASICS Dash', category: 'shoes', brand: 'asics', price: 150.00 },
        { img: 'img/fuji.png', name: 'NIKE Fuji4', category: 'shoes', brand: 'nike', price: 250.00 },
        { img: 'img/nike1.jpeg', name: 'NIKE ZOOM1', category: 'shoes', brand: 'nike', price: 180.00 },
        { img: 'img/nike3.jpg', name: 'NIKE ALY2', category: 'shoes', brand: 'nike', price: 180.00 }
    ];

    let currentPage = 1;
    const itemsPerPage = 6;
    let filteredProducts = products;

    filterForm.addEventListener('submit', (event) => {
        event.preventDefault();
        applyFilters();
    });

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

    function applyFilters() {
        const category = document.getElementById('category').value;
        const brand = document.getElementById('brand').value;
        const priceRange = document.getElementById('price-range').value;

        filteredProducts = products.filter(product => {
            return (category === 'all' || product.category === category) &&
                   (brand === 'all' || product.brand === brand) &&
                   (priceRange === 'all' || isWithinPriceRange(product.price, priceRange));
        });

        currentPage = 1; // Reset to the first page after applying filters
        renderProducts();
    }

    function isWithinPriceRange(price, range) {
        const [min, max] = range.split('-').map(Number);
        return price >= min && price <= max;
    }

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
            `;
            productContainer.appendChild(productDiv);
        });

        pageInfo.textContent = `Page ${currentPage} of ${Math.ceil(filteredProducts.length / itemsPerPage)}`;
        prevPageButton.disabled = currentPage === 1;
        nextPageButton.disabled = currentPage === Math.ceil(filteredProducts.length / itemsPerPage);
    }

    // Initial render of all products
    renderProducts();
});