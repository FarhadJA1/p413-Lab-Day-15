const usernameInput = document.querySelector('.username-input');
const passwordInput = document.querySelector('.password-input');
const loginBtn = document.querySelector('.login-button');
const productList = document.querySelector('.product-list');
const logoutBtn = document.querySelector('.logout-button');
const dangerText = document.querySelector('.danger-text');
const basketLink = document.querySelector('.basket-link');
const basketCount = document.querySelector('.basket-count');
const users = [
    {
        id: 1,
        username: 'Farhad',
        password: '1234',
        role: 'customer'
    },
    {
        id: 5,
        username: 'Fidan',
        password: '1234',
        role: 'customer'
    },
    {
        id: 2,
        username: 'Gunay',
        password: '1234',
        role: 'store'
    },
    {
        id: 3,
        username: 'Kamran',
        password: '1234',
        role: 'store'
    },
    {
        id: 4,
        username: 'Onur',
        password: '1234',
        role: 'store'
    }
]

const products = [
    {
        id: 1,
        productName: 'Cola',
        userId: 2
    },
    {
        id: 2,
        productName: 'Fanta',
        userId: 2
    },
    {
        id: 3,
        productName: 'BMW',
        userId: 3
    },
    {
        id: 4,
        productName: 'Mercedes',
        userId: 3
    },
    {
        id: 5,
        productName: 'Gucci',
        userId: 4
    },
    {
        id: 6,
        productName: 'Armani',
        userId: 4
    },
    {
        id: 7,
        productName: 'Sprite',
        userId: 2
    },
    {
        id: 8,
        productName: 'Audi',
        userId: 3
    },
    {
        id: 9,
        productName: 'DG',
        userId: 4
    }
]


loginBtn.addEventListener('click', function () {    
    const username = usernameInput.value;
    const password = passwordInput.value;
    const currentUser = users.find(m => m.username === username && m.password === password);
    if (currentUser) {
        dangerText.classList.add('d-none');
        logoutBtn.classList.remove('d-none');
        loginBtn.classList.add('d-none');
        if (currentUser.role === 'customer') {
            basketLink.classList.remove('d-none')
            basketCount.classList.remove('d-none');
            localStorage.setItem('basket',JSON.stringify([]))
            products.forEach(product => {
                let html = `
                <li>${product.productName} <button data-id="${product.id}" class="add-button">Add Basket</button></li>
            `
                productList.insertAdjacentHTML('beforeend', html)
                const addButtons = document.querySelectorAll('.add-button');
                const basket = JSON.parse(localStorage.getItem('basket'));
                
                addButtons.forEach(btn => {
                    btn.addEventListener('click',function () {
                        let initialProduct = products.find(m=>m.id==btn.dataset.id);                                                
                        basket.push(initialProduct);
                        localStorage.setItem('basket',JSON.stringify(basket));
                        let count = basket.length;
                        basketCount.textContent=count;
                    })
                });
            });

        }
        if (currentUser.role === 'store') {
            const initialProducts = products.filter(m => m.userId === currentUser.id);
            initialProducts.forEach(product => {
                let html = `
                <li>${product.productName}</li>
            `
                productList.insertAdjacentHTML('beforeend', html)
            });
        }
    }
    else{
        dangerText.classList.remove('d-none');
    }
});

logoutBtn.addEventListener('click',function () {
    basketLink.classList.add('d-none')
    basketCount.classList.add('d-none');
    productList.innerHTML='';
    usernameInput.value='';
    passwordInput.value='';
    logoutBtn.classList.add('d-none');
    loginBtn.classList.remove('d-none');
});
