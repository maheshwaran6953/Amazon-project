export let cart;

loadFromLocalStorage();
export function loadFromLocalStorage() {
    cart = JSON.parse(localStorage.getItem('cart')) || [
    {
        productID: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity : 2,
        deliveryOptionID: '1',
    },
    {
        productID: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity : 1,
        deliveryOptionID: '2',
    }
];
}

export function saveCartToLocalStorage() {

    localStorage.setItem('cart' , JSON.stringify(cart));
    
}

export function updateCartQuantity() {
    let cartQuantity = 0;

    cart.forEach((item) => {
        cartQuantity += item.quantity;
    });

    document.querySelector('.js-checkout-header-middle-section').innerHTML = `
        Checkout (<a class="return-to-home-link js-return-to-home-link" href="index.html">${cartQuantity} items</a>)
    `;

    saveCartToLocalStorage();

}

export function addToCart(productID, productNAME, productQuantity = 1) {

        if (typeof document !== 'undefined') {
            const quantitySelector = document.querySelector(`.js-quantity-selector-${productID}`);
            if (quantitySelector) {
                productQuantity = quantitySelector.value;
            }

            const addedText = document.querySelector(`.js-added-text-${productID}`);
            if(addedText){
                addedText.style.opacity = 1;
                setTimeout(() => {
                addedText.style.opacity = "0";
            }, 1500);
            }
        }

        let matchedProduct;

        cart.forEach((item) => {
            if(productID === item.productID){
                matchedProduct = item;
            }
        });

        if(matchedProduct){
            matchedProduct.quantity += Number(productQuantity);
        }

        else{

            cart.push({
                productID,
                productNAME,
                quantity : Number(productQuantity),
                deliveryOptionID: '1',
            });
        }

        saveCartToLocalStorage();
}

export function removeFromCart(productID){

    const newCart = [];

    cart.forEach((item) => {
        if(item.productID !== productID){
            newCart.push(item);
        }
    });

    cart = newCart;

    saveCartToLocalStorage();
}

export function updateDeliveryOption(productID, deliveryOptionID) {

    let matchedProduct;

        cart.forEach((item) => {
            if(productID === item.productID){
                matchedProduct = item;
            }
        });

        matchedProduct.deliveryOptionID = deliveryOptionID;

    saveCartToLocalStorage();
}