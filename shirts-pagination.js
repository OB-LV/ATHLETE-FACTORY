document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { img: 'img/under armor2.webp', name: 'UNDER ARMOR gym shirt', price: '$50.00' },
        { img: 'img/product6.webp', name: 'ADIDAS 2025 EDITION', price: '$180.00' },
        { img: 'img/product3.webp', name: 'NIKE SHADE', price: '$180.00' },
        { img: 'img/puma product.avif', name: 'PUMA FITS', price: '$89.99' },
        { img: 'img/under armor png.jpg', name: 'UNDER ARMOR SIMPLE FIT', price: '$99.00' }
    ];

    const itemsPerPage = 6;
    let currentPage = 1;
    const totalPages = Math.ceil(products.length / itemsPerPage);

    const productContainer = document.getElementById('product-container');
    const prevPageButton = document.getElementById('prev-page');
    const nextPageButton = document.getElementById('next-page');
    const pageInfo = document.getElementById('page-info');

    function renderProducts() {
        productContainer.innerHTML = '';
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedProducts = products.slice(start, end);

        paginatedProducts.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <img src="${product.img}" alt="${product.name}">
                <p>${product.name}</p>
                <p>${product.price}</p>
                <button>Add to Cart</button>
            `;
            productContainer.appendChild(productDiv);
        });

        pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
        prevPageButton.disabled = currentPage === 1;
        nextPageButton.disabled = currentPage === totalPages;
    }

    prevPageButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderProducts();
        }
    });

    nextPageButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderProducts();
        }
    });

    renderProducts();
});