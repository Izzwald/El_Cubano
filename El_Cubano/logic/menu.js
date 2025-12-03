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
function addMenuItem(item) {
    menuItems.push(item);
    saveMenuItems();
}

// Remove an item by name
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
    // Entrees
    new MenuItem("Beef Empanadas", "Savory pastry filled with seasoned ground beef and cheese", "Entree", 3.50, 1,"../resources/images/menu_items/entrees/beef_and_cheese_empanada.jpg"),
    new MenuItem("Chicken Empanadas", "Savory pastry filled with shredded chicken and cheese", "Entree", 3.50, 1),
    new MenuItem("Friscase de Pollo", "Cuban style chicken fricassee in tomato-based sauce", "Entree", 8.99, 1),
    new MenuItem("Cerdo Asado", "Roast pork marinated in citrus juices, garlic, Cuban spices", "Entree", 11.99, 1),
    new MenuItem("Bistec de Res", "Beef steak marinated with spices, topped with onions", "Entree", 11.99, 1),
    new MenuItem("Ropa Vieja", "Shredded beef stew simmered in tomato sauce", "Entree", 11.99, 1),
    new MenuItem("Bistec Uruguayo estilo Cubano", "Uruguayan steak Cuban-style", "Entree", 14.99, 1),
    new MenuItem("Filete de Cerdo Empanizado", "Breaded pork filet stuffed with ham & Swiss cheese", "Entree", 14.99, 1),
    new MenuItem("Costillas de Cerdo Fritas", "Fried pork ribs", "Entree", 11.99, 1),
    new MenuItem("Sandwich Cubano", "Classic Cuban sandwich with roast pork, ham, Swiss, pickles, mustard", "Entree", 10.99, 1),
    new MenuItem("Jamaican Beef Patty", "Spicy beef pastry", "Entree", 4.99, 1),
    new MenuItem("Cuban Pizza", "Authentic Cuban-style pizza", "Entree", 12.99, 1),

    // Sides
    new MenuItem("Fried Yucca", "With garlic sauce on the side", "Side", 3.50, 1),
    new MenuItem("Stuffed Yucca (2 pcs)", "Breaded yucca stuffed with ground beef", "Side", 8.99, 2),
    new MenuItem("Tamales (2 pcs)", "Corn tamales stuffed with pork", "Side", 8.99, 2),
    new MenuItem("Chicken Wings (6 pcs)", "Choice of cilantro, BBQ or hot sauce", "Side", 11.99, 6),
    new MenuItem("Empanadas (3 pcs)", "Choice of beef or chicken", "Side", 11.99, 3),
    new MenuItem("Steamed Yucca (6 pcs)", "Topped with garlic sauce and raw onions", "Side", 9.99, 6),
    new MenuItem("Potato Balls (2 pcs)", "Breaded mashed potatoes stuffed with ground beef", "Side", 8.99, 2),
    new MenuItem("Croquettes (4 pcs)", "Ham & cheese croquettes", "Side", 7.99, 4),
    new MenuItem("Cuban Sampler", "Mix of croquettes, fried yucca, chicken wings, fried pork chunks", "Side", 18.99, 1),
    new MenuItem("Chicken Salad", "Mixed greens, tomatoes, onions", "Side", 16.99, 1),
    new MenuItem("Salmon Salad", "Mixed greens, tomatoes, onions", "Side", 20.99, 1),
    new MenuItem("Shrimp Salad", "Mixed greens, tomatoes, onions", "Side", 20.99, 1),
    new MenuItem("Sweet Plantains Plate", "Served with choice of side", "Side", 14.99, 1),

    // Desserts
    new MenuItem("Flan", "Traditional Cuban caramel custard", "Dessert", 4.99, 1),
    new MenuItem("Tres Leches Cake", "Moist sponge cake soaked in three milks", "Dessert", 5.99, 1),
    
    // Drinks 
    new MenuItem("Batido de Mango", "Fresh mango milkshake", "Drink_NA", 5.99, 1),
    new MenuItem("Batido de Guava", "Guava milkshake", "Drink_A", 5.99, 1),

    //Kids
    new MenuItem("Chicken Tenders","3 grilled tenders served with a side of corn and applesauce", "Kid",9.99,1)
   
];

// const defaultItems = [
//     // Appetizers
//     new MenuItem("Beef Empanadas", 3.50,"Savory pastry filled with seasoned ground beef and cheese"),
//     new MenuItem("Chicken Empanadas", 3.50,"Savory pastry filled with shredded chicken and cheese"),
//     new MenuItem("Fried Yucca", 3.50, "With garlic sauce on the side"),
//     new MenuItem("Stuffed Yucca (2 pcs)", 8.99, "Breaded yucca stuffed with ground beef"),
//     new MenuItem("Tamales (2 pcs)", 8.99, "Corn tamales stuffed with pork"),
//     new MenuItem("Chicken Wings (6 pcs)", 11.99, "Choice of cilantro, BBQ or hot sauce"),
//     new MenuItem("Empanadas (3 pcs)", 11.99, "Choice of beef or chicken"),
//     new MenuItem("Steamed Yucca (6 pcs)", 9.99, "Topped with garlic sauce and raw onions"),
//     new MenuItem("Potato Balls (2 pcs)", 8.99, "Breaded mashed potatoes stuffed with ground beef"),
//     new MenuItem("Croquettes (4 pcs)", 7.99, "Ham & cheese croquettes"),
//     new MenuItem("Cuban Sampler", 18.99, "Mix of croquettes, fried yucca, chicken wings, fried pork chunks"),

//     // Salads & Soups
//     new MenuItem("Chicken Salad", 16.99, "Mixed greens, tomatoes, onions"),
//     new MenuItem("Salmon Salad", 20.99, "Mixed greens, tomatoes, onions"),
//     new MenuItem("Shrimp Salad", 20.99, "Mixed greens, tomatoes, onions"),
//     new MenuItem("Sweet Plantains Plate", 14.99, "Served with choice of side"),

//     // Meat Entrées
//     new MenuItem("Friscase de Pollo", 9.00, "Cuban style chicken fricassee in tomato-based sauce"),
//     new MenuItem("Cerdo Asado", 12.00, "Roast pork marinated in citrus juices, garlic, Cuban spices"),
//     new MenuItem("Bistec de Res", 12.00, "Beef steak marinated with spices, topped with onions"),
//     new MenuItem("Ropa Vieja", 12.00, "Shredded beef stew simmered in tomato sauce"),
//     new MenuItem("Bistec Uruguayo estilo Cubano", 15.00, "Uruguayan steak Cuban-style"),
//     new MenuItem("Filete de Cerdo Empanizado", 15.00, "Breaded pork filet stuffed with ham & Swiss cheese"),
//     new MenuItem("Costillas de Cerdo Fritas", 12.00, "Fried pork ribs"),

//     // Sandwiches
//     new MenuItem("Sandwich Cubano", 10.99, "Classic Cuban sandwich with roast pork, ham, Swiss, pickles, mustard"),
//     new MenuItem("Jamaican Beef Patty", 4.99, "Spicy beef pastry"),
//     new MenuItem("Cuban Pizza", 12.99, "Authentic Cuban-style pizza"),

//     // Drinks & Desserts
//     new MenuItem("Batido de Mango", 5.99, "Fresh mango milkshake"),
//     new MenuItem("Batido de Guava", 5.99, "Guava milkshake"),
//     new MenuItem("Flan", 4.99, "Traditional Cuban caramel custard"),
//     new MenuItem("Tres Leches Cake", 5.99, "Moist sponge cake soaked in three milks")
// ]

//initializes menu items with defaults if none are detected to be saved to local storage Ex First page load
function initializeMenuItems() {
    const data = localStorage.getItem("menuItems");
    if (!data) {
        menuItems = defaultItems;
        saveMenuItems();
    } else {
        loadMenuItems();
    }
}
initializeMenuItems();

//Sets all menu Items back to default
function resetMenuItems() {
    localStorage.removeItem("menuItems");
    menuItems = defaultItems;
    saveMenuItems();
    console.log("Menu reset to defaults:", menuItems);
}

export {MenuItem,menuItems,defaultItems,addMenuItem,removeMenuItem,saveMenuItems,loadMenuItems,initializeMenuItems,resetMenuItems};
