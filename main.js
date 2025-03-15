document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: 'Running Shoes', price: '$50', image: 'img/shoes.png' },
        { id: 2, name: 'Training Shirt', price: '$30', image: 'img/shirt.png' },
        { id: 3, name: 'Sweatshirt', price: '$40', image: 'img/sweater.png' },
        // Add more products as needed
    ];

    const productsPerPage = 3;
    let currentPage = 1;

    const productContainer = document.getElementById('product-container');
    const prevPageButton = document.getElementById('prev-page');
    const nextPageButton = document.getElementById('next-page');
    const pageInfo = document.getElementById('page-info');

    function renderProducts(page) {
        productContainer.innerHTML = '';
        const start = (page - 1) * productsPerPage;
        const end = start + productsPerPage;
        const paginatedProducts = products.slice(start, end);

        paginatedProducts.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <p>${product.name}</p>
                <p>${product.price}</p>
                <button>Add to Cart</button>
            `;
            productContainer.appendChild(productElement);
        });

        pageInfo.textContent = `Page ${page} of ${Math.ceil(products.length / productsPerPage)}`;
        prevPageButton.disabled = page === 1;
        nextPageButton.disabled = page === Math.ceil(products.length / productsPerPage);
    }

    prevPageButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderProducts(currentPage);
        }
    });

    nextPageButton.addEventListener('click', () => {
        if (currentPage < Math.ceil(products.length / productsPerPage)) {
            currentPage++;
            renderProducts(currentPage);
        }
    });

    renderProducts(currentPage);
});
document.addEventListener('DOMContentLoaded', () => {
    const scrollLinks = document.querySelectorAll('.scroll-link');

    scrollLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

