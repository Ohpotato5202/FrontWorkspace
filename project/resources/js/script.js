var mockProductList = [
    {
        pno: 1,
        name: "Do it ! 자바프로그래밍 입문",
        description: "자바 프로그래밍을 입문하는데 있어서 최적의 책!",
        price: 15500,
        src: "resources/images/java.jpg"
    },
    {
        pno: 2,
        name: "Do it ! 오라클로 배우는 데이터베이스 입문",
        description: "오라클을 입문하는데 있어서 최적의 책!",
        price: 20000,
        src: "resources/images/oracle.jpg"
    },
    {
        pno: 3,
        name: "Do it! 리액트 네이티브 앱 프로그래밍",
        description: "리액트 네이티브를 입문하는데 있어서 최적의 책!",
        price: 44200,
        src: "resources/images/react.jpg"
    },
    {
        pno: 4,
        name: "Do it ! HTML+CSS+자바스크립트 웹 표준의 정석",
        description: "HTML+CSS+자바스크립트 프로그래밍을 입문하는데 있어서 최적의 책!",
        price: 30000,
        src: "resources/images/html.jpg"
    },
    {
        pno: 5,
        name: "JSP 웹 프로그래밍과 스프링 프레임워크",
        description: "JSP를 입문하는데 있어서 최적의 책!",
        price: 27000,
        src: "resources/images/jsp.jpg"
    },
    {
        pno: 6,
        name: "리액트 200제",
        description: "리액트를 입문하는데 있어서 최적의 책!",
        price: 22500,
        src: "resources/images/react200.PNG"
    },
    {
        pno: 7,
        name: "Do it! 자바스크립트 입문",
        description: "자바스크립트를 입문하는데 있어서 최적의 책!",
        price: 16200,
        src: "resources/images/js.png"
    },
    {
        pno: 8,
        name: "Do it ! Node.js 프로그래밍 입문",
        description: "Node.js을 입문하는데 있어서 최적의 책!",
        price: 32400,
        src: "resources/images/node.png"
    }
];

document.addEventListener('DOMContentLoaded', function () {
    const productList = document.getElementById('product-list');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const modal = document.getElementById('product-modal');
    const modalProductDetails = document.getElementById('modal-product-details');
    const closeModal = document.querySelector('.close-button');
    const searchBox = document.getElementById('search-box');
    const searchButton = document.getElementById('search-button');
    let cart = [];

    function renderProducts(products) {
        productList.innerHTML = '';
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <img src="${product.src}" alt="${product.name}" class="product-image">
                <h3>${product.name}</h3>
                <p>${product.price}원</p>
                <button class="add-to-cart" data-pno="${product.pno}">장바구니담기</button>
            `;
            productList.appendChild(productDiv);
        });
    }

    function renderCart() {
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                ${item.name} - ${item.price}원
                <button class="remove-from-cart" data-index="${index}">삭제</button>
            `;
            cartItems.appendChild(cartItem);
            total += item.price;
        });
        cartTotal.innerHTML = `Total: ${total}원`;
    }

    function showModal(product) {
    const modal = document.getElementById('product-modal');
    const modalImage = document.getElementById('modal-product-image');
    const modalTitle = document.getElementById('modal-product-title');
    const modalDescription = document.getElementById('modal-product-description');
    const modalPrice = document.getElementById('modal-product-price');
    
    modalImage.src = product.src;
    modalTitle.textContent = product.name;
    modalDescription.textContent = product.description;
    modalPrice.textContent = `${product.price}원`;
    
    modal.style.display = 'block';
}


    function addToCart(productPno) {
        const product = mockProductList.find(p => p.pno === parseInt(productPno));
        cart.push(product);
        renderCart();
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        renderCart();
    }

    function searchProducts(query) {
        const filteredProducts = mockProductList.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase())
        );
        renderProducts(filteredProducts);
    }

    productList.addEventListener('click', function (event) {
        if (event.target.classList.contains('add-to-cart')) {
            const productPno = event.target.getAttribute('data-pno');
            addToCart(productPno);
        } else if (event.target.classList.contains('product-image')) {
            const productPno = event.target.parentElement.querySelector('.add-to-cart').getAttribute('data-pno');
            const product = mockProductList.find(p => p.pno === parseInt(productPno));
            showModal(product);
        }
    });

    cartItems.addEventListener('click', function (event) {
        if (event.target.classList.contains('remove-from-cart')) {
            const index = event.target.getAttribute('data-index');
            removeFromCart(index);
        }
    });

    closeModal.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };

    searchButton.addEventListener('click', function () {
        const query = searchBox.value;
        searchProducts(query);
    });

    searchBox.addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            const query = searchBox.value;
            searchProducts(query);
        }
    });

    renderProducts(mockProductList);
});
