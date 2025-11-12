import { cart } from '../../data/cart.js';
import { getProduct,getDeliveryOption } from '../../data/products.js';
import { currencyFormat } from '../utilitys/money.js';

export function renderPaymentSummary() {
    let itemsTotal = 0;
    let totalQuantity = 0;
    let shipping = 0;

    cart.forEach((item) => {
        const product = getProduct(item.productID);

        itemsTotal += product.priceCents * item.quantity;

        totalQuantity += item.quantity;
    
        const deliveryOption = getDeliveryOption(item.deliveryOptionID);

        shipping += deliveryOption.priceCents * item.quantity;
    });

    const totalBeforeTax = itemsTotal + shipping;

    const tax = Math.round(totalBeforeTax * 0.10);

    const orderTotal = totalBeforeTax+ tax;

    document.querySelector('.payment-summary').innerHTML = `
        <div class="payment-summary-title">
            Order Summary
        </div>
        <div class="payment-summary-row">
            <div>
                Items (${totalQuantity}):
            </div>
            <div class="payment-summary-money">
                $${currencyFormat(itemsTotal)}
            </div>
        </div>
        <div class="payment-summary-row">
            <div>
                Shipping &amp; handling:
            </div>
            <div class="payment-summary-money">
                $${currencyFormat(shipping)}
            </div>
        </div>
        <div class="payment-summary-row subtotal-row">
            <div>
                Total before tax:
            </div>
            <div class="payment-summary-money">
                $${currencyFormat(totalBeforeTax)}
            </div>
        </div>
        <div class="payment-summary-row">
            <div>
                Estimated tax (10%):
            </div>
            <div class="payment-summary-money">
                $${currencyFormat(tax)}
            </div>
        </div>
        <div class="payment-summary-row total-row">
            <div>
                Order total:
            </div>
            <div class="payment-summary-money">
                $${currencyFormat(orderTotal)}
            </div>
        </div>
        <button class="place-order-button button-primary">
            Place your order
        </button>
    `;

}
