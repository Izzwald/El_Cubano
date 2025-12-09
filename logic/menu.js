import * as Message from "./message.js";

class MenuItem{
    constructor(name,description,type,price,quantity,imgSrc=""){
        this.name=name
        this.description=description
        this.type=type
        this.price=price
        this.quantity=quantity
        this.maxPerCustomer=this.quantity
        this.imgSrc=imgSrc
    }

    setName(name){
        this.name=name
    }

    setDescription(description){
        this.description=description
    }

    setType(itemtype){
        this.type=itemtype
    }

    setPrice(number){
        this.price=number
    }

    setQuantity(number){
        this.quantity=number
    }

    setMaxPerCustomer(number){
        if (number<this.quantity) this.maxPerCustomer=number
        else this.maxPerCustomer=this.quantity
    }
    
    setImgSrc(imgSrc){
        this.imgSrc=imgSrc
    }
}

let menuItems = [];

// Add a new item
function handleAddItem(event) {
    event.preventDefault();

    const name = document.getElementById('itemNameInput').value.trim();
    const description = document.getElementById('itemDescriptionInput').value.trim();
    const type = document.getElementById('itemTypeSelect').value;
    const price = parseFloat(document.getElementById('itemPriceInput').value);
    const quantity = parseInt(document.getElementById('itemQuantityInput').value);
    const imgSrcInput = document.getElementById('itemImgSrcInput');
    const imgSrc = imgSrcInput ? imgSrcInput.value.trim() : "";
    if (!name || isNaN(price) || isNaN(quantity) || quantity < 1) {
        alert("Please fill in all required fields correctly.");
        return;
    }

    const exists = menuItems.some(item => item.name.toLowerCase() === name.toLowerCase());
    if (exists) {
        alert(`A menu item with the name "${name}" already exists.`);
        return;
    }

    const newItem = new MenuItem(name, description, type, price, quantity, imgSrc);
    addMenuItem(newItem);
    Message.showBanner(`Menu item "${name}" has been added.`, { type: 'success', duration: 10000 }); 
    document.getElementById('addItemForm').reset();
}
function addMenuItem(item) {
    menuItems.push(item);
    saveMenuItems();
    populateRemoveItemOptions();
}

function handleRemoveItem() {
    const select = document.getElementById('removeItemIdSelect');
    const name = select.value;

    if (!name) {
        alert("Please select an item to remove.");
        return;
    }

    removeMenuItem(name);
    populateRemoveItemOptions();
    Message.showBanner(`Menu item "${name}" has been removed.`, { type: 'success', duration: 10000 });

    // Reset dropdown to default
    select.value = "";
}

// Remove an item
function removeMenuItem(name) {
    menuItems = menuItems.filter(item => item.name !== name);
    saveMenuItems();
    
}

// Save to localStorage
function saveMenuItems() {
    localStorage.setItem("menuItems", JSON.stringify(menuItems));
}

// Load from localStorage
function loadMenuItems() {
    const data = localStorage.getItem("menuItems");
    if (data) {
        const parsed = JSON.parse(data);
        menuItems = parsed.map(obj => {
            const item = new MenuItem(
                obj.name,
                obj.description,
                obj.type,
                obj.price,
                obj.quantity,
                obj.imgSrc
            );
            // Restore maxPerCustomer explicitly
            item.maxPerCustomer = obj.maxPerCustomer;
            return item;
        });
    }
}

const defaultItems = [
    //Entrees      new MenuItem("","","Entree",,1,"../resources/images/menu_items/entrees/.jpg"),

    //Sandwiches
    new MenuItem("Cuban Sandwich","Roast pork, mustard, pickles, ham, and Swiss cheese panini pressed in our Cuban bread","Entree_Sandwich",12.50,1,"../resources/images/menu_items/entrees/cuban_sandwich.jpg"),
    new MenuItem("Midnight Sandwich","Roast pork, mustard, pickles, ham, and Swiss cheese panini pressed in sweet bread","Entree_Sandwich",13.50,1,"../resources/images/menu_items/entrees/midnight_sandwich.jpg"),
    new MenuItem("Steak Sandwich","Comes with tomato, lettuce, onions and mayo","Entree_Sandwich",12.00,1,"../resources/images/menu_items/entrees/steak_sandwich.jpg"),
    new MenuItem("Chicken Sandwich","Chicken, mustard, pickles, ham, and Swiss cheese panini pressed in our Cuban bread","Entree_Sandwich",12.00,1),
    new MenuItem("Ham and Cheese Sandwich","","Entree_Sandwich",8.00,1),
    new MenuItem("Pork Sandwich","","Entree_Sandwich",8.00,1),
    new MenuItem("Croquette Sandwich","Comes with mayo and tomato","Entree_Sandwich",8.00,1),

    //Meats
    new MenuItem("Beef Stew","Shredded beef simmered in Spanish sauce with a variety of seasonings","Entree_Meat",10.00,1,"../resources/images/menu_items/entrees/beef_stew.jpg"),
    new MenuItem("Beef Steak","Beef steak marinated with spices and slow-cooked and topped off with onions","Entree_Meat",10.00,1,"../resources/images/menu_items/entrees/beef_steak.jpg"),
    new MenuItem("Roast Pork","Cuban pork marinated in citrus juices garlic cuban spices and slow roasted for hours","Entree_Meat",10.00,1,"../resources/images/menu_items/entrees/roast_pork.jpg"),
    new MenuItem("Fried Chicken","Boneless breaded chicken thighs","Entree_Meat",8.00,1,"../resources/images/menu_items/entrees/fried_chicken.jpg"),
    new MenuItem("Chicken Fricassee","Cuban-style chicken simmered in Spanish sauce","Entree_Meat",8.00,1,"../resources/images/menu_items/entrees/chicken_fricassee.jpg"),
    new MenuItem("Fried Pork Ribs","","Entree_Meat",10.00,1,"../resources/images/menu_items/entrees/fried_pork_ribs.jpg"),
    new MenuItem("Fried Chicken Wings","Accompanied with any rice,any side with green salad included","Entree_Meat",8.00,1),
    new MenuItem("Cuban Style Uruguayan Steak","Breaded pork filet stuffed with ham and swiss cheese","Entree_Meat",12.00,1,"../resources/images/menu_items/entrees/cuban_style_uruguayan_steak.jpg"),
  
    //Empanadas
    new MenuItem("Beef Empanadas", "Savory pastry filled with seasoned ground beef and cheese", "Entree_Empanada",3.50, 1,"../resources/images/menu_items/entrees/beef_and_cheese_empanada.jpg"),
    new MenuItem("Chicken Empanadas", "Savory pastry filled with shredded chicken and cheese", "Entree_Empanada",3.50, 1,"../resources/images/menu_items/entrees/chicken_and_cheese_empanada.jpg"),
    new MenuItem("Pizza Empanadas","Savory pastry filled with pizza sauce and cheese","Entree_Empanada",3.50,1,"../resources/images/menu_items/entrees/pizza_empanada.jpg"),
    new MenuItem("Jamaican Beef","Savory pastry filled with shredded seasoned Jamaican beef","Entree_Empanada",3.25,1),

   
    //Sides        new MenuItem("","","Side",,1,"../resources/images/menu_items/sides/.jpg"),

    new MenuItem("Stuffed Potato Ball","Smashed potato ball stuffed with beef","Side",3.50,1,"../resources/images/menu_items/sides/stuffed_potato_ball.jpg"),
    
    //Plantains 
    new MenuItem("Sweet Fried Plantains","","Side",3.50,1,"../resources/images/menu_items/sides/sweet_fried_plantains.jpg"),
    new MenuItem("Fried Plantains","","Side",3.50,1,"../resources/images/menu_items/sides/fried_plantains.jpg"),

    //Rice
    new MenuItem("Yellow Rice","Rice with pigeon peas and meats.","Side",4.00,1,"../resources/images/menu_items/sides/yellow_rice_and_beans.jpg"),
    new MenuItem("Cuban Rice","Cuban style rice mixed with beans","Side",4.00,1,"../resources/images/menu_items/sides/cuban_rice_and_beans.jpg"),

    //Soup
    new MenuItem("Black Bean Soup","","Side",6.00,1,"../resources/images/menu_items/sides/black_bean_soup.jpg"),
    new MenuItem("Red Bean Soup","","Side",6.00,1,"../resources/images/menu_items/sides/red_bean_soup.jpg"),

    //Desserts     new MenuItem("","","Dessert",,1,"../resources/images/menu_items/desserts/.jpg"),
    new MenuItem("Cuban Peanut Nougat", "Traditional sweet treat made with only two ingredients; peanuts and sugar", "Dessert", 4.99, 1,"../resources/images/menu_items/desserts/cuban_peanut_nougat.jpg"),
    new MenuItem("Tres Leches", "Moist sponge cake soaked in three milks", "Dessert", 5.99, 1,"../resources/images/menu_items/desserts/tres_leches.jpg"),
    new MenuItem("Rice Pudding","","Dessert",3.75,1,"../resources/images/menu_items/desserts/rice_pudding.jpg"),


    //Drinks

    //Non Alchoholic Drinks       new MenuItem("","","Drink_NA",,1,"../resources/images/menu_items/drinks/.jpg"), 

    //Smoothies
    new MenuItem("Strawberry Smoothie","Fresh strawberry smoothie","Drink_NA",5.50,1,"../resources/images/menu_items/drinks/strawberry_smoothie.jpg"), 
    new MenuItem("Mango Smoothie", "Fresh mango smoothie", "Drink_NA", 5.50, 1),
    new MenuItem("Guava Smoothie", "Fresh guava smoothie", "Drink_NA", 5.99, 1),
    new MenuItem("Banana Smoothie", "Fresh banana smoothie", "Drink_NA", 5.99, 1),

    //Bottled Drinks
    new MenuItem("Materva","","Drink_NA",1.50,1,"../resources/images/menu_items/drinks/materva.jpg"),
    new MenuItem("Mango Juice","","Drink_NA",2.00,1,"../resources/images/menu_items/drinks/mango_juice.jpg"),
    new MenuItem("Guava Juice","","Drink_NA",2.00,1,"../resources/images/menu_items/drinks/guava_juice.jpg"),
    new MenuItem("Malta INDIA","","Drink_NA",2.00,1,"../resources/images/menu_items/drinks/malta_india.jpg"),
    new MenuItem("Sunny D","","Drink_NA",1.50,1,"../resources/images/menu_items/drinks/sunnyd.jpg"),
    new MenuItem("Raspberry Country Club Soda","","Drink_NA",2.00,1,"../resources/images/menu_items/drinks/country_club_soda_raspberry.jpg"),
    new MenuItem("Merengue Country Club Soda","","Drink_NA",2.00,1,"../resources/images/menu_items/drinks/country_club_soda_merengue.jpg"),

    //Alchoholic Drinks       new MenuItem("","","Drink_A",,1,"../resources/images/menu_items/drinks/.jpg"), 

    //Beer
    new MenuItem("Corona Extra","","Drink_A",4.00,1),
    new MenuItem("SOL","","Drink_A",4.00,1),
    new MenuItem("Modelo","","Drink_A",4.00,1),
    new MenuItem("Stella Artois","","Drink_A",4.00,1),

    //Cocktails
    new MenuItem("Pina Colada","","Drink_A",7.50,1),
    new MenuItem("Daiquiri","","Drink_A",7.50,1),
    new MenuItem("Screwdriver","","Drink_A",7.50,1),


    //Kids      new MenuItem("","","Kid",,1), 

    new MenuItem("Chicken Tenders","Comes with french fries","Kid",9.99,1),
    new MenuItem("Mozzarella","5 Mozzarella Sticks","Kid",9.99,1),
];

//initializes menu items with defaults if none are detected to be saved to local storage Ex First page load
function initializeMenuItems() {
    const data = localStorage.getItem("menuItems");

    if (!data) {
        menuItems = defaultItems.map(obj => new MenuItem(
            obj.name,
            obj.description,
            obj.type,
            obj.price,
            obj.quantity,
            obj.imgSrc
        ));
        saveMenuItems();
    } else {
        loadMenuItems();
    }
}
initializeMenuItems();
//Sets all menu Items back to default
function resetMenuItems() {
    localStorage.removeItem("menuItems");

    menuItems = defaultItems.map(obj => new MenuItem(
        obj.name,
        obj.description,
        obj.type,
        obj.price,
        obj.quantity,
        obj.imgSrc
    ));

    saveMenuItems();
    console.log("Menu reset to defaults:", menuItems);
}




window.addEventListener('DOMContentLoaded', () => {
    const addForm = document.getElementById('addItemForm');
    const removeForm = document.getElementById('removeItemForm');
    const addBtn = document.getElementById('addItemBtn');
    const removeBtn = document.getElementById('removeItemBtn');
    const submitAddBtn = document.getElementById('submitAddItem'); // <-- your submit button

    if (!addForm || !removeForm || !addBtn || !removeBtn || !submitAddBtn) return; // safeguard

    addForm.style.display = 'none';
    removeForm.style.display = 'none';

    // Toggle add/remove forms
    addBtn.addEventListener('click', () => {
        addForm.style.display = 'block';
        removeForm.style.display = 'none';
    });

    removeBtn.addEventListener('click', () => {
        removeForm.style.display = 'block';
        addForm.style.display = 'none';
        populateRemoveItemOptions();
    });

    // **Attach the handler to the Add Item submit button**
    addForm.addEventListener('submit', handleAddItem);

    // Reset menu
    document.getElementById('resetMenuBtn').addEventListener('click', () => {
        resetMenuItems();
        alert("Menu has been restored to defaults!");
        populateRemoveItemOptions();
    });
});

function populateRemoveItemOptions() {
    const select = document.getElementById('removeItemIdSelect');
    
    select.innerHTML = '<option value="" disabled selected>Choose an option</option>';
    menuItems.forEach(item => {
        const option = document.createElement('option');
        option.value = item.name;
        option.textContent = item.name;
        select.appendChild(option);
    });
}


window.handleAddItem = handleAddItem;
window.handleRemoveItem = handleRemoveItem;
window.populateRemoveItemOptions = populateRemoveItemOptions;
export {MenuItem,menuItems,defaultItems,addMenuItem,removeMenuItem,saveMenuItems,loadMenuItems,initializeMenuItems,resetMenuItems};