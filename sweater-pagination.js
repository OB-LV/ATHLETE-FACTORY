document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { img: 'img/adidas sweter men.jpg', name: 'ADIDAS Sweater', price: '$119.99' },
        { img: 'img/puma jacket.avif', name: 'PUMA Street X', price: '$179.99' },
        { img: 'img/sweater png.webp', name: 'adidas FALL DRI-FIT', price: '$180.00' },
        { img: 'img/under armor sweter.jpeg', name: 'UNDER ARMOR GYM Sweater', price: '$179.99' },
        { img: 'img/adidas sweter 1.jpg', name: 'Adidas Originals', price: '$250.00' }
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

    // Initial render
    renderProducts();
});