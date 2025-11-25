import * as Auth from "./auth.js";
console.log(Auth.getUsers());
console.log(Auth.getActiveUser());
console.log(Auth.getActiveType());



if (Auth.getActiveType()!="guest"){
    let user = Auth.getActiveUser();
    console.log(user.firstname);
}






const topSellers = [
    {
        img: "resources/images/menu_items/entrees/beef_and_cheese_empanada.jpg",
        title: "Beef and Cheese Empanada",
        text: "Savory pastries filled with seasoned ground beef and cheese.",
        price: "$3.50"
    },
    {
        img: "resources/images/menu_items/entrees/cuban_sandwich.jpg",
        title: "Cuban Sandwich",
        text: "Roasted pork, ham, Swiss cheese, pickles, and yellow mustard on a fresh roll.",
        price: "$6.50"
    },
    {
        img: "resources/images/menu_items/entrees/chicken_and_cheese_empanada.jpg",
        title: "Chicken and Cheese Empanada",
        text: "Savory pastries filled with shredded chicken and cheese.",
        price: "$3.50"
    },
    {
        img: "resources/images/menu_items/entrees/cuban_pizza.jpg",
        title: "Cuban Pizza",
        text: "Delicious pizza with shredded beef and olives.",
        price: "$9.50"
    }
];

let currentIndex = 0;

function updateGallery() {
    const item = topSellers[currentIndex];

    // mobile gallery image
    document.getElementById("gallery-top-sellers").src = item.img;

    // desktop image (if exists)
    const desktopImg = document.getElementById("gallery-desktop-image");
    if (desktopImg) {
        desktopImg.src = item.img;
    }

    // text fields
    document.getElementById("gallery-title").textContent = item.title;
    document.getElementById("gallery-text").textContent = item.text;
    document.getElementById("gallery-price").textContent = item.price;
}

function nextImage() {
    currentIndex = (currentIndex + 1) % topSellers.length;
    updateGallery();
}

function prevImage() {
    currentIndex = (currentIndex - 1 + topSellers.length) % topSellers.length;
    updateGallery();
}

document.addEventListener("DOMContentLoaded", updateGallery);








// Store specials in an array of objects
        const specials = [
            { day: 'Monday', name: 'Cicken/Beef Combo', description: '$2 off any combos with either chicken or beef.' },
            { day: 'Tuesday', name: 'Smoothie Tuesday', description: '$4 Smoothie Tuesdays' },
            { day: 'Wednesday', name: 'Half-Price Desserts', description: 'Get all desserts half price, all day long.' },
            { day: 'Thursday', name: 'Half-Price Empanadas', description: 'Get all empanadas half price, all day long.' },
            { day: 'Friday', name: 'Fish and Chips Special', description: 'Crispy beer-battered fish with fries and fried pickles.' },
            { day: 'Saturday', name: 'Chef\'s Special', description: 'Seasoned Pork Chops with your choice of two sides.' },
            { day: 'Sunday', name: 'Soup Sunday', description: 'Enjoy Soup on a stay-at-home Sunday.' }
        ];

        const today = new Date();
        const currentDay = today.toLocaleDateString('en-US', { weekday: 'long' });

        function displaySpecial() {
            // Find the special for the current day
            const special = specials.find(s => s.day === currentDay);
            
            // Get the HTML element where we want to display the information
            const specialDisplay = document.getElementById('special-display'); // Assumes an element with this ID

            if (special) {
                // If a special is found, update the HTML
                specialDisplay.innerHTML = `
                    <h2>Today's Special:</h2>
                    <br>
                    <h3>${special.name}!</h3>
                    <br>
                    <p>${special.description}</p>
                `;
            } else {
                // If no special is found (e.g., a typo in the data), display a fallback message
                specialDisplay.innerHTML = '<p>No special available today.</p>';
            }
        }

        // Call the function to display the special when the page loads
        displaySpecial();


