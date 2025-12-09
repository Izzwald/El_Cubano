import * as Message from "./message.js";
import * as Auth from "./auth.js";

document.addEventListener('DOMContentLoaded', () => {
    const removeCartItemButtons = document.getElementsByClassName('btn-danger');
    const quantityInputs = document.getElementsByClassName('cart-quantity-input');
    const purchaseButton = document.getElementsByClassName('getInfo')[0];
    const confirmPurchase = document.getElementsByClassName('confirmInfo')[0];
    const tipInput = document.getElementById("tip");


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
        purchaseButton.addEventListener('click', () => {
            let emptyCart = document.getElementById("emptyCart");
            if (emptyCart){
                Message.showBanner("Your cart is empty!",{type:'warning',duration:5000,position:'top'})
                return
            }
            else{
                purchaseClicked();
            }
        });
    }

    if (confirmPurchase) {

        const customerName = document.getElementById("name");
        let customerNameValue = "";

        const customerEmail = document.getElementById("email");
        let customerEmailValue = "";

        const customerAdress = document.getElementById("address");
        let customerAdressValue = "";

        const isDelivery = document.getElementById("delivery");
        let isDeliveryValue = false;

        const isPickUp = document.getElementById("pickUp");

        const cardNumber = document.getElementById("cardNumber");
        let cardNumberValue = "";
        
        const cardExperation = document.getElementById("exp");
        let cardExperationValue = "";
        
        const cardCVC = document.getElementById("cvc");
        let cardCVCValue = "";

        const cardFields = document.getElementById("cardFields");

        customerName.value = Auth.getActiveUser().firstname
        customerNameValue = Auth.getActiveUser().firstname
        customerName.addEventListener("input", (e) => {
            customerNameValue = e.target.value;
            console.log(customerNameValue);
        });

        customerEmail.addEventListener("input", (e) => {
            customerEmailValue = e.target.value;
            console.log(customerEmailValue);
        });

        customerAdress.addEventListener("input", (e) => {
            customerAdressValue = e.target.value;
            console.log(customerAdressValue);
        });

        isDelivery.addEventListener("input", (e) => {
            if (e.target.checked){
                isDeliveryValue = true;
            }
            console.log(isDeliveryValue);
        });

        isPickUp.addEventListener("input", (e) => {
            if (e.target.checked){
                isDeliveryValue = false;
            }
            console.log(isDeliveryValue);
        });

        cardNumber.addEventListener("input", (e) => {
            cardNumberValue = e.target.value;
            console.log(cardNumberValue);
        });

        cardExperation.addEventListener("input", (e) => {
            cardExperationValue = e.target.value;
            console.log(cardExperationValue);
        });

        cardCVC.addEventListener("input", (e) => {
            cardCVCValue = e.target.value;
            console.log(cardCVCValue);
        });

        confirmPurchase.addEventListener('click', () => {

            if((getComputedStyle(cardFields).display=="none")){      
                if(nameChecker(customerNameValue)&&emailChecker(customerEmailValue)&&deliveryChecker(customerAdressValue,isDeliveryValue)){
                    purchaseSuccess()
                }
                else {
                    let wronginfo=""
                    if (!nameChecker(customerNameValue)){
                        customerName.value=""
                        wronginfo+="Name "
                    }
                    if (!emailChecker(customerEmailValue)){
                        customerEmail.value=""
                        wronginfo+="Email "
                    }
                    if (!deliveryChecker(customerAdressValue,isDeliveryValue)){
                        customerAdress.value=""
                        wronginfo+="Delivery Address "
                    }
                    Message.showBanner("Payment field(s) Invalid: "+wronginfo,{type:'error',duration:10000,position:'top'})
                }
            }
            else if(nameChecker(customerNameValue)&&emailChecker(customerEmailValue)&&deliveryChecker(customerAdressValue,isDeliveryValue)&&isValidCardNum(cardNumberValue)&&experationChecker(cardExperationValue)&&cvcChecker(cardCVCValue)){
                purchaseSuccess()
            }
            else {
                let wronginfo=""
                if (!nameChecker(customerNameValue)){
                    customerName.value=""
                    wronginfo+="Name "
                }
                if (!emailChecker(customerEmailValue)){
                    customerEmail.value=""
                    wronginfo+="Email "
                }
                if (!deliveryChecker(customerAdressValue,isDeliveryValue)){
                    customerAdress.value=""
                    wronginfo+="Delivery Address "
                }
                if (!isValidCardNum(cardNumberValue)){
                    cardNumber.value=""    
                    wronginfo+="Card Number "
                }
                if (!experationChecker(cardExperationValue)){
                    cardExperation.value=""
                    wronginfo+="Experation Date "
                }
                if (!cvcChecker(cardCVCValue)){
                    cardCVC.value=""
                    wronginfo+="CVC "
                }
                Message.showBanner("Payment field(s) Invalid: "+wronginfo,{type:'error',duration:10000,position:'top'})
            }
        });       
    }

    // Event delegation for Add to Cart buttons (works for existing and future buttons)
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('addToCart')) {
            addToCartClicked(event);
        }
    });
});

function deliveryChecker(address, isDelivery){
    const str = String(address);
    if(isDelivery){
        if (str.length>=1){
            return true
        }
        else{
            return false
        }   
    }
    else{
        return true
    } 
}

function emailChecker(email){
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

function nameChecker(input){
    const str = String(input);
    if (str.length>=1){
        return true
    }
    else{
        return false
    }
}

function cvcChecker(input){
    const str = String(input);
    if ((str.length==3)||(str.length==4)){
        return true
    }
    else{
        //Message.showBanner("CVC not valid",{type:'error',duration:5000,position:'top'})
        return false
    }
}

function experationChecker(input){
    const str = String(input);
    let valid=true
    let month, year, currentMonth, currentYear;    

    if ((str.length)==4){
        month = Number(str.slice(0, 2));
        year = Number(str.slice(2));

        const today = new Date();
        currentMonth = today.getMonth()+1
        currentYear = Number(String(today.getFullYear()).slice(-2));
    }
    else{
        valid=false
    }
    if (valid){
        if (month<1||month>12){
            valid=false
        }
        else if (year>(currentYear+5)){
            valid=false
        }
        else if ((year==(currentYear+5))&&(month>currentMonth)){
            valid=false
        }
    }
    let expired=false
    if (valid){
        if (year<=currentYear){
            if (year<currentYear){
                expired=true
            }
            else if ((year==currentYear)&&(month<currentMonth)){
                expired=true
            }
        }
    }

    if (valid&&(!expired)){
        return true
    }
    else if (!valid){
        //Message.showBanner("Card experation date not valid",{type:'error',duration:5000,position:'top'})
        return false
    }
    else{
        //Message.showBanner("Card is expired",{type:'error',duration:5000,position:'top'})
        return false
    }
}

function isValidCardNum(cardnumber){
    let isvalid = false
    let cardnumberlist=String(cardnumber).replace(/\s+/g, "").split("");
    let reversedcardnumberlist = cardnumberlist
    reversedcardnumberlist.reverse()
    let cardnumlength=reversedcardnumberlist.length
    let sum=0
    for (let i=0;i<cardnumlength;i++){
        let number = reversedcardnumberlist[i]
        number = Number(number)
        if ((i+1)%2==0){
            number*=2
            if (number>9){
                number-=9
            }
        }
        sum+=number
    }

    let passesLuhn=(sum%10==0)

    if (passesLuhn&&((cardnumlength>=13)&&(cardnumlength<=19))){
        function startsWith(startnum, cardnum) {
            return String(cardnum).startsWith(String(startnum));
        }

        function matchesRange(start, end, cardnum) {
            const prefix = Number(String(cardnum).substring(0, String(start).length));
            return prefix >= start && prefix <= end;
        }

        //Visa
        if (startsWith(4, cardnumber)) {
            if ((cardnumlength === 13) || (cardnumlength === 16) || (cardnumlength === 19)) {
                isvalid = true;
            }
        }
        //MasterCard
        else if (matchesRange(51, 55, cardnumber) || matchesRange(2221, 2720, cardnumber)) {
            if (cardnumlength === 16) {
                isvalid = true;
            }
        }
        //AmEx
        else if (startsWith(34, cardnumber) || startsWith(37, cardnumber)) {
            if (cardnumlength === 15) {
                isvalid = true;
            }
        }
        //Discover
        else if (startsWith(6011, cardnumber) || startsWith(65, cardnumber) || matchesRange(644, 649, cardnumber) || matchesRange(622126, 622925, cardnumber)) {
            if (cardnumlength === 16 || cardnumlength === 19) {
                isvalid = true;
            }
        }
        //Diners Club
        else if (matchesRange(300, 305, cardnumber) || startsWith(36, cardnumber) || startsWith(38, cardnumber) || startsWith(39, cardnumber)) {
            if (cardnumlength === 14) {
                isvalid = true;
            }
        }
        //JCB
        else if (matchesRange(3528, 3589, cardnumber)) {
            if (cardnumlength === 16 || cardnumlength === 17 || cardnumlength === 18 || cardnumlength === 19) { 
                isvalid = true;
            }
        }
    }
    // if (!isvalid){
    //     Message.showBanner("Card number not valid",{type:'error',duration:5000,position:'top'})
    // }

    return isvalid
}

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
                <span id="emptyCart" class="cart-item-title">Empty</span>
            </div>
            <span class="cart-price cart-column">$0.00</span>
        `;
        cartItems.appendChild(emptyRow);
        reversePurchaseClicked();
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
            <button class="btn btn-danger" type="button">X</button>
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
    document.getElementsByClassName('cart-total-price')[0].innerText = `$${total.toFixed(2)}`
    updateCartTotal;
    updateTipAmountDisplay();
    updateFinalTotalDisplay();
}

// PURCHASE CLICKED
function purchaseClicked() {
    const form = document.querySelector('.formContainer');
    if (form) {
        form.style.display = 'block'; // Show the form
    }
    const checkout = document.querySelector('.getInfo');
    if (checkout) {
        checkout.style.display = 'none'; // Hide button
    }
}

//for when a user removes all items from cart after clicking purchase
function reversePurchaseClicked() {
    const form = document.querySelector('.formContainer');
    if (form) {
        form.style.display = 'none'; // hide the form
    }
    const checkout = document.querySelector('.getInfo');
    if (checkout) {
        checkout.style.display = 'block'; // Show button
    }
}



// PURCHASE Prossessed
function purchaseSuccess() {
    // Message.showBanner("Thank you for your purchase!",{type:'success',duration:3000,position:'top'});
    Message.showBanner(`Thank you ${(Auth.getActiveUser()).firstname} for your purchase! \n Your order has been placed. Your order will be ready in 15-20 minutes.`,{type:'success',duration:5000,position:'top'});
    // console.log("Your order has been placed.");
    // console.log("Order Total: " + document.getElementsByClassName('cart-total-price')[0].innerText);
    // console.log(`plus a tip of ${document.getElementById("tip").value}%`);
    // console.log(`for a final total of $${(parseFloat(document.getElementsByClassName('cart-total-price')[0].innerText.replace('$','')) * (1 + parseFloat(document.getElementById("tip").value)/100)).toFixed(2)}`);
    // console.log("Your order will be ready in 15-20 minutes.");
    
    buildReceipt();

    // Show receipt popup
    const receiptPopup = document.getElementById("receiptPopup");
    receiptPopup.style.display = "flex";
    
    const cartItems = document.getElementsByClassName('cart-items')[0];
    cartItems.innerHTML = '';
    checkEmptyCart();
    updateCartTotal();
    const form = document.querySelector('.formContainer');
    if (form) {
        form.style.display = 'none'; // hide the form
    }
    const checkout = document.querySelector('.getInfo');
    if (checkout) {
        checkout.style.display = 'block'; // Show button
    }
};

function buildReceipt() {
    let receiptHTML = "<h2>Receipt</h2>";

    // Fetch items
    const cartRows = document.querySelectorAll(".cart-items .cart-row");
    receiptHTML += "<h3>Items:</h3>";

    cartRows.forEach(row => {
        const title = row.querySelector(".cart-item-title")?.innerText;
        const price = row.querySelector(".cart-price")?.innerText;
        const qtyInput = row.querySelector(".cart-quantity-input");
        if (!qtyInput) return; // Skip empty row
        const qty = qtyInput.value;

        receiptHTML += `<p>${title} — ${qty} × ${price}</p>`;
    });

    // Totals
    const subtotal = document.querySelector(".cart-total-price").innerText;
    const tipAmount = document.getElementById("tip_Amount").innerText;
    const finalTotal = document.getElementById("final-total-display").innerText;

    receiptHTML += `
        <hr>
        <p><strong>Subtotal:</strong> ${subtotal}</p>
        <p><strong>Tip:</strong> ${tipAmount}</p>
        <p><strong>Final Total:</strong> ${finalTotal}</p>
        <hr>
    `;

    // Customer Info
    const name = document.getElementById("name").value || "-";
    const email = document.getElementById("email").value || "-";
    const address = 
        document.getElementById("delivery").checked 
        ? document.getElementById("address").value || "(no address)" 
        : "Pickup";
    if (document.getElementById("delivery").checked){
        receiptHTML += `
            <h3>Customer Info</h3>
            <p>Name: ${name}</p>
            <p>Email: ${email}</p>
            <p>Order Type: ${document.getElementById("delivery").checked ? "Delivery" : "Pickup"}</p>
            <p>Address: ${address}</p>
        `;
    }
    else{
        receiptHTML += `
            <h3>Customer Info</h3>
            <p>Name: ${name}</p>
            <p>Email: ${email}</p>
            <p>Order Type: ${document.getElementById("delivery").checked ? "Delivery" : "Pickup"}</p>
        `;
    }


    // Inject into popup
    const content = document.querySelector("#receiptPopup .popup-content");
    content.innerHTML = receiptHTML + `<button id="closePopupBtn">Close</button>`;

    // Wire close button
    document.getElementById("closePopupBtn").addEventListener("click", () => {
        document.getElementById("receiptPopup").style.display = "none";
    });
}

function tipAmount() {
    const cartTotal = parseFloat(document.getElementsByClassName('cart-total-price')[0].innerText.replace('$', ''));
    let tipPercentage = parseFloat(document.getElementById("tip").value) || 0;
    if (tipPercentage > 30) {
        tipPercentage = 30
    }
    tipPercentage = Math.floor(tipPercentage);
    document.getElementById("tip").value = tipPercentage;
    const tipAmount = cartTotal * (tipPercentage / 100);
    window.updateFinalTotalDisplay();
    return tipAmount.toFixed(2);
}

window.updateTipAmountDisplay = function() {
    const tipAmountValue = tipAmount();
    document.getElementById("tip_Amount").innerText =
        "$" + tipAmountValue;
}


function calculateFinalTotal() {
    const cartTotal = parseFloat(document.getElementsByClassName('cart-total-price')[0].innerText.replace('$', ''));
    const tipPercentage = parseFloat(document.getElementById("tip").value) || 0;
    const finalTotal = cartTotal * (1 + tipPercentage / 100);
    return finalTotal.toFixed(2);
}

window.updateFinalTotalDisplay = function() {
    const finalTotal = calculateFinalTotal();
    document.getElementById("final-total-display").innerText =
        "$" + finalTotal;
}


/* Order confirmation delivery/payment display*/

document.getElementById("delivery").addEventListener("change", function() {
    document.getElementById("addressRow").style.display = this.checked ? "block" : "none";
});

document.getElementById("payment").addEventListener("change", function() {
    document.getElementById("cardFields").style.display =
        this.value === "Card" ? "block" : "none";
});


const deliveryCheckbox = document.getElementById('delivery');
    const pickUpCheckbox = document.getElementById('pickUp');

    // When 'delivery' changes, make sure 'pickUp' is unchecked
    deliveryCheckbox.addEventListener('change', function() {
        if (this.checked) {
            pickUpCheckbox.checked = false;
        }
    });

    // When 'pickUp' changes, make sure 'delivery' is unchecked
    pickUpCheckbox.addEventListener('change', function() {
        if (this.checked) {
            deliveryCheckbox.checked = false;
        }
    });