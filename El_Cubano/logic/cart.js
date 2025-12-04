import * as Message from "./message.js";

// Wait until DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const removeCartItemButtons = document.getElementsByClassName('btn-danger');
    const quantityInputs = document.getElementsByClassName('cart-quantity-input');
    const purchaseButton = document.getElementsByClassName('getInfo')[0];
    const confirmPurchase = document.getElementsByClassName('confirmInfo')[0];

    // Remove item buttons
    for (let button of removeCartItemButtons) {
        button.addEventListener('click', removeCartItem);
    }

    // Quantity input changes
    for (let input of quantityInputs) {
        input.addEventListener('change', quantityChanged);
    }

    // PURCHASE button
    if (purchaseButton) {
        purchaseButton.addEventListener('click', purchaseClicked);
    }
    if (confirmPurchase) {
        confirmPurchase.addEventListener('click', purchaseSuccess);
    }

    // Event delegation for Add to Cart buttons (works for existing and future buttons)
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('addToCart')) {
            addToCartClicked(event);
        }
    });
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
    if (input.value > 99) {
        input.value = 99;
    }
    updateCartTotal();
}

// ADD TO CART CLICKED
function addToCartClicked(event) {
    const button = event.target;

    // Use data attributes on the button for reliability
    const title = button.dataset.item;         // e.g., "Beef Empanadas"
    const price = `$${parseFloat(button.dataset.price).toFixed(2)}`; // e.g., "$3.50"

    addItemToCart(title, price);
    updateCartTotal();
}

// ADD ITEM TO CART
function addItemToCart(title, price) {
    const cartItems = document.getElementsByClassName('cart-items')[0];

    // Remove "Empty" placeholder
    if (
        cartItems.children.length === 1 &&
        cartItems.children[0].querySelector('.cart-item-title')?.innerText === 'Empty'
    ) {
        cartItems.innerHTML = '';
    }

    // Check duplicates (FIXED)
    const cartItemNames = cartItems.getElementsByClassName('cart-item-title');
    for (let i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText === title) {
            const quantityInput = cartItemNames[i]
                .closest('.cart-row')
                .querySelector('.cart-quantity-input');
            
            quantityInput.value = Math.min(parseInt(quantityInput.value) + 1, 99);
            updateCartTotal();
            return;
        }
    }

    // Add new cart row
    const cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    cartRow.innerHTML = `
        <div class="cart-item cart-column">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1" max="99">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>
    `;

    cartItems.append(cartRow);

    // Events
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
    const form = document.querySelector('.formContainer');
    if (form) {
        form.style.display = 'block'; // Show the form
    }
}

// PURCHASE Prossessed
function purchaseSuccess() {
    Message.showBanner("Thank you for your purchase!",{type:'success',duration:3000,position:'top'})
    const cartItems = document.getElementsByClassName('cart-items')[0];
    cartItems.innerHTML = '';
    checkEmptyCart();
    updateCartTotal();
    const form = document.querySelector('.formContainer');
    if (form) {
        form.style.display = 'none'; // hide the form
    }
};






/* Order confirmation delivery/payment display*/

document.getElementById("delivery").addEventListener("change", function() {
    document.getElementById("addressRow").style.display =
        this.checked ? "block" : "none";
});

document.getElementById("payment").addEventListener("change", function() {
    document.getElementById("cardFields").style.display =
        this.value === "Card" ? "block" : "none";
});