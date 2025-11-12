import {cart,removeFromCart,updateCartQuantity,updateDeliveryOption} from '../../data/cart.js';
import {getProduct,getDeliveryOption} from '../../data/products.js';
import { currencyFormat } from '../utilitys/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {deliveryOptions} from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';

export function renderCartSummary() {
    let cartSummaryHTML = "";

    cart.forEach((cartItem) => {

        const productID = cartItem.productID;

        const matchedProduct = getProduct(productID);

        const deliveryOptionID = cartItem.deliveryOptionID;

        const deliveryOption = getDeliveryOption(deliveryOptionID);

        const today = dayjs();

        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days').format('dddd, MMMM D');

        cartSummaryHTML +=
        `
        <div class="cart-item-container js-cart-item-container-${matchedProduct.id}">
            <div class="delivery-date">
                Delivery date:${deliveryDate}
            </div>
            <div class="cart-item-details-grid">
                <img class="product-image" src="${matchedProduct.image}">
                <div class="cart-item-details">
                    <div class="product-name">${matchedProduct.name}</div>
                    <div class="product-price">$${currencyFormat(matchedProduct.priceCents)}</div>
                    <div class="product-quantity">
                        <span>
                            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchedProduct.id}">Update</span>
                        <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchedProduct.id}">Delete</span>
                    </div>
                </div>
                <div class="delivery-options">
                    <div class="delivery-options-title">Choose a delivery option:</div>
                    ${deliveryOptionsHTML(matchedProduct.id, cartItem)}
                </div>
            </div>
        </div>
        `;
    });

    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
}

function deliveryOptionsHTML(productID, cartItem) {

    let html = '';

    
    deliveryOptions.forEach((deliveryOption) => {

        const today = dayjs();
    
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'day').format('dddd, MMMM D');

        const deliveryPrice = deliveryOption.priceCents === 0 ? 'FREE Shipping' : `$${currencyFormat(deliveryOption.priceCents)} - Shipping`;

        const isChecked = cartItem.deliveryOptionID === deliveryOption.id;

        html += `
            <div class="delivery-option js-delivery-option"
            data-product-id="${productID}"
            data-delivery-option-id="${deliveryOption.id}">
            <input type="radio"
                ${isChecked ? 'checked' : ''}
                class="delivery-option-input"
                name="delivery-option-${productID}">
            <div>
            <div class="delivery-option-date">
                ${deliveryDate}
                </div>
                <div class="delivery-option-price">
                    ${deliveryPrice}
            </div>
            </div>
        </div>
    `;
});

    return html;

}

document.addEventListener('DOMContentLoaded' , () => {

    const cartQuantity = JSON.parse(localStorage.getItem('cartQuantity')) || 0;

    document.querySelector('.js-checkout-header-middle-section').innerHTML = `
        Checkout (<a class="return-to-home-link js-return-to-home-link" href="index.html">${cartQuantity} items</a>)
    `;

    updateCartQuantity();
    renderCartSummary();
    renderPaymentSummary();
    setupCartEventListeners();

});

renderPaymentSummary();

function setupCartEventListeners() {
    document.querySelectorAll('.js-delivery-option').forEach((option) => {
    option.addEventListener('click' , () => {

        const productID = option.dataset.productId;
        const deliveryOptionID = option.dataset.deliveryOptionId;

        updateDeliveryOption(productID , deliveryOptionID);

        renderCartSummary();
        renderPaymentSummary();
        updateCartQuantity();
        setupCartEventListeners();
    });
});

    document.querySelectorAll('.js-update-link').forEach((link) => {

        link.addEventListener('click' , () =>{
            
            const productID = link.dataset.productId;

            const cartItem = cart.find(item => item.productID === productID);

            const productContainer = document.querySelector(`.js-cart-item-container-${productID}`);

            productContainer.querySelector('.product-quantity').classList.add('update-mode');

            productContainer.querySelector('.product-quantity').innerHTML =
            `
                <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}
                </span>

                <span class="update-quantity-link link-primary js-update-link" data-product-id="${cartItem.id}">
                    Update
                </span>

                <input class="quantity-input" type="number" value="${cartItem.quantity}" min="1">

                <span class="save-quantity-link link-primary">
                    Save
                </span>

                <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${cartItem.id}">
                    Delete
                </span>
            `;

            productContainer.querySelector('.save-quantity-link').addEventListener('click' , () => {

                const newQuantityInput = parseInt(productContainer.querySelector('.quantity-input').value);

                cartItem.quantity = newQuantityInput;

                productContainer.querySelector('.quantity-label').innerText = newQuantityInput;

                productContainer.querySelector('.product-quantity').classList.remove('update-mode');

                updateCartQuantity();
                renderCartSummary();
                renderPaymentSummary();
                setupCartEventListeners();
            });
        });
    });

    document.querySelectorAll('.js-delete-link').forEach((link) => {
        link.addEventListener('click', () => {

            const productID = link.dataset.productId;

            removeFromCart(productID);

            document.querySelector(`.js-cart-item-container-${productID}`).remove();

            updateCartQuantity();
            renderCartSummary();
            renderPaymentSummary();
            setupCartEventListeners();
        });
    });
}


