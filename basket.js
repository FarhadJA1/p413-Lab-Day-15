const basket = document.querySelector('.basket');

function DisplayBasket() {
    const products =JSON.parse(localStorage.getItem('basket'))
    products.forEach(product => {
        let html=`
        <li>${product.productName}</li>
    `
        basket.insertAdjacentHTML('beforeend',html);
    });
    
}
DisplayBasket();