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
    //new MenuItem()
]

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
