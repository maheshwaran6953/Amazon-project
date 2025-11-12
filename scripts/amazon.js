import {cart, addToCart} from '../data/cart.js';
import {products} from '../data/products.js';
import { currencyFormat } from './utilitys/money.js';

document.addEventListener('DOMContentLoaded', () => {
    const cartQuantity = JSON.parse(localStorage.getItem('cartQuantity')) || 0;

    document.querySelector('.cart-quantity').innerHTML = cartQuantity;

    updateCartQuantity();
    
});

let productsDetails = "";

products.forEach((products) =>{
    productsDetails += `
    <div class="product-container">
        <div class="product-image-container">
        <img class="product-image"
            src="${products.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
        ${products.name}
        </div>

        <div class="product-rating-container">
        <img class="product-rating-stars"
            src="images/ratings/rating-${products.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
            ${products.rating.count}
        </div>
        </div>

        <div class="product-price">
        $${currencyFormat(products.priceCents)}
        </div>

        <div class="product-quantity-container">
        <select class="js-quantity-selector-${products.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
        </select>
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-text-${products.id}">
        <img src="images/icons/checkmark.png">
        Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart" data-products-id = ${products.id}
        data-products-name = ${products.name}
        data-products-price = ${products.priceCents}
        data-products-image = ${products.image}
        data-products-rating = ${products.rating.stars}
        >
        Add to Cart
        </button>
        </div>
    `
});

document.querySelector(`.products-grid`).innerHTML = productsDetails;

function updateCartQuantity(){
    let cartQuantity = 0;

        cart.forEach((item) => {
            cartQuantity += item.quantity;
        })

        document.querySelector('.cart-quantity').innerHTML = cartQuantity;
        
        localStorage.setItem('cartQuantity', JSON.stringify(cartQuantity));

}

document.querySelectorAll(`.js-add-to-cart`).forEach((button) => {

    button.addEventListener("click" , () =>{

        
        const productID = button.dataset.productsId;
        const productNAME = button.dataset.productsName;
        const productPrice = button.dataset.productsPrice;
        const productImage = button.dataset.productsImage;
        const productRating = button.dataset.productsRating;
        
        addToCart(productID,productNAME);
        updateCartQuantity();

    });
});