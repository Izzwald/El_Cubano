import * as Menu from "./menu.js";


Menu.initializeMenuItems()

document.addEventListener('DOMContentLoaded', () => {

    
    //  Add items listed in menu.js to respective menu sections
    
    const entreeSection=document.getElementById("entree_menu_section")
    const sideSection=document.getElementById("side_menu_section")
    const dessertSection=document.getElementById("dessert_menu_section")
    const drinkNaSection=document.getElementById("alcohol_free_menu_section")
    const drinkASection=document.getElementById("alcohol_menu_section")
    const kidSection=document.getElementById("kid_menu_section")
    const isCartPage = window.location.pathname.endsWith('cart.html');  

    for (let menuItem of Menu.menuItems){

        let newItem=document.createElement("li")
        newItem.classList.add("menu_Item")
        newItem.classList.add(String(menuItem.type))

        if (menuItem.imgSrc){
            let alt=menuItem.name+" image"
            newItem.innerHTML=`
            <div class="Menu_Item_Header">
                <h3>${menuItem.name}</h3>
                <h3 class="Menu_Item_Price">$${menuItem.price.toFixed(2)}</h3>
            </div>
            <p>${menuItem.description}</p>
            <img class="Menu_Item_Image"src="${menuItem.imgSrc}" alt="${alt}"></img>`;
        }
        else{
            newItem.innerHTML=`
            <div class="Menu_Item_Header">
                <h3>${menuItem.name}</h3>
                <h3 class="Menu_Item_Price">$${menuItem.price.toFixed(2)}</h3>
            </div>
            <p>${menuItem.description}</p>`;
        }

        if (isCartPage){
            let addToCart = document.createElement("button")
            addToCart.classList.add("addToCart")
            addToCart.textContent = "Add to Cart"
            addToCart.dataset.item = menuItem.name
            addToCart.dataset.price = menuItem.price
            newItem.appendChild(addToCart)
        }

        if (menuItem.type=="Entree"){
            entreeSection.appendChild(newItem)
        }
        else if (menuItem.type=="Side"){
            sideSection.appendChild(newItem)
        }
        else if (menuItem.type=="Dessert"){
            dessertSection.appendChild(newItem)
        }
        else if (menuItem.type=="Drink_NA"){
            drinkNaSection.appendChild(newItem)
        }
        else if (menuItem.type=="Drink_A"){
            drinkASection.appendChild(newItem)
        }
        else if (menuItem.type=="Kid"){
            kidSection.appendChild(newItem)
        }
    }


    // Select all buttons with the class 'menu_collapse'
    const buttons = document.querySelectorAll('.menu_collapse');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const isActive = btn.classList.toggle('active');
            let menu_section_content_ID=btn.id
            menu_section_content_ID=menu_section_content_ID.replace(/_button$/, "");
            let menu_section_content=document.getElementById(menu_section_content_ID)
            menu_section_content.classList.toggle('show')
        });
    });

    function resizeMenu(){
        //changes menu appearance based on window width during resizes
        const width= window.innerWidth
        const menuContainer= document.getElementsByClassName("menu_container")[0]
        const cartContainer = document.getElementsByClassName("cart_container")[0]
        const cartPage = document.getElementsByClassName("cart_page")[0]
        const isMenuPage = window.location.pathname.endsWith('menu.html');
        const isCartPage = window.location.pathname.endsWith('cart.html');   

        if (width <= 500) {
            console.log("phone")
            if (isMenuPage){
                menuContainer.style.width="100%"
                menuContainer.style.margin="10px 5px"
            }
            else if (isCartPage){
                menuContainer.style.width=`${cartPage.offsetWidth-34}px`
            }
        } 
        else if (width <= 800) {
            console.log("tablet")
            if (isMenuPage){
                menuContainer.style.width="100%"
                menuContainer.style.maxWidth="565px"
                menuContainer.style.margin="15px"
            }
            else if (isCartPage){
                menuContainer.style.maxWidth="565px"
                menuContainer.style.margin="0 auto"
                menuContainer.style.width=`${cartPage.offsetWidth-54}px`
            }
        } 

        else if (width > 800) {
            console.log("desktop")
            if (isMenuPage){
                menuContainer.style.width="565px"
            }
            else if (isCartPage){
                menuContainer.style.width="50%"
            }
        }
        //console.log(cartPage.offsetWidth)
    }

    resizeMenu();

    window.addEventListener('resize',()=>{
        resizeMenu()
    });

});