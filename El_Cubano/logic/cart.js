import * as Message from "./message.js";

// Wait until DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const removeCartItemButtons = document.getElementsByClassName('btn-danger');
    const quantityInputs = document.getElementsByClassName('cart-quantity-input');
    const addToCartButtons = document.getElementsByClassName('shop-item-button');
    const purchaseButton = document.getElementsByClassName('btn-purchase')[0];

    // Remove item buttons
    for (let button of removeCartItemButtons) {
        button.addEventListener('click', removeCartItem);
    }

    // Quantity input changes
    for (let input of quantityInputs) {
        input.addEventListener('change', quantityChanged);
    }

    // Add to cart buttons
    for (let button of addToCartButtons) {
        button.addEventListener('click', addToCartClicked);
    }

    // Purchase button
    if (purchaseButton) {
        purchaseButton.addEventListener('click', purchaseClicked);
    }
});

// REMOVE ITEM
function removeCartItem(event) {
    const buttonClicked = event.target;
    const cartRow = buttonClicked.closest('.cart-row');
    cartRow.remove();
    checkEmptyCart();
    updateCartTotal();
}

// CHECK IF CART IS EMPTY
function checkEmptyCart() {
    const cartItems = document.getElementsByClassName('cart-items')[0];
    if (cartItems.children.length === 0) {
        const emptyRow = document.createElement('div');
        emptyRow.classList.add('cart-row');
        emptyRow.innerHTML = `
            <div class="cart-item cart-column">
                <span class="cart-item-title">Empty</span>
            </div>
            <span class="cart-price cart-column">$0.00</span>
        `;
        cartItems.appendChild(emptyRow);
    }
}

// QUANTITY CHANGED
function quantityChanged(event) {
    const input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal();
}

// ADD TO CART CLICKED
function addToCartClicked(event) {
    const button = event.target;
    const shopItem = button.closest('.shop-item');
    const title = shopItem.querySelector('.shop-item-title').innerText;
    const price = shopItem.querySelector('.shop-item-price').innerText;

    addItemToCart(title, price);
    updateCartTotal();
}

// ADD ITEM TO CART
function addItemToCart(title, price) {
    const cartItems = document.getElementsByClassName('cart-items')[0];

    // Remove "Empty" placeholder if it's there
    if (cartItems.children.length === 1 && cartItems.children[0].querySelector('.cart-item-title').innerText === 'Empty') {
        cartItems.innerHTML = '';
    }

    // Check if the item is already in the cart
    const cartItemNames = cartItems.getElementsByClassName('cart-item-title');
    for (let i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText === title) {
            // Increment quantity
            const quantityInput = cartItemNames[i].closest('.cart-row').querySelector('.cart-quantity-input');
            quantityInput.value = parseInt(quantityInput.value) + 1;
            updateCartTotal();
            return;
        }
    }

    // Create a new cart row without image
    const cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    cartRow.innerHTML = `
        <div class="cart-item cart-column">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>
    `;
    cartItems.append(cartRow);

    // Add event listeners for the new row
    cartRow.querySelector('.btn-danger').addEventListener('click', removeCartItem);
    cartRow.querySelector('.cart-quantity-input').addEventListener('change', quantityChanged);
}

// UPDATE CART TOTAL
function updateCartTotal() {
    const cartItems = document.getElementsByClassName('cart-items')[0];
    const cartRows = cartItems.getElementsByClassName('cart-row');
    let total = 0;

    for (let i = 0; i < cartRows.length; i++) {
        const cartRow = cartRows[i];
        const priceElement = cartRow.querySelector('.cart-price');
        const quantityElement = cartRow.querySelector('.cart-quantity-input');
        if (!quantityElement) continue; // Skip "Empty" row

        const price = parseFloat(priceElement.innerText.replace('$', ''));
        const quantity = quantityElement.value;
        total += price * quantity;
    }

    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('cart-total-price')[0].innerText = `$${total.toFixed(2)}`;
}

// PURCHASE CLICKED
function purchaseClicked() {
    
}


function purchaseSuccess(){
    Message.showBanner("Thank you for your purchase!",{type:'success',duration:4000,position:'top'})
    const cartItems = document.getElementsByClassName('cart-items')[0];
    cartItems.innerHTML = '';
    checkEmptyCart();
    updateCartTotal();
}