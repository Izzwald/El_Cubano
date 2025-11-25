import * as Auth from "./auth.js";

function signOut(){
    Auth.logout()
    customerSignedIn() //removes any employee page access still applies to guest
    let isIndexPage = window.location.pathname.endsWith('index.html');
    window.location.href = isIndexPage ? '#page' : '../index.html';
    setMenutoLogin()
}
    
function setMenutoLogin(){
    let loginLink = document.getElementById("login_menu_link");
    let aTag = document.createElement("a");
    let isIndexPage = window.location.pathname.endsWith('index.html');
    let isLoginPage = window.location.pathname.endsWith('login.html');
    
    let aTagPath=isIndexPage ? 'pages/login.html' : isLoginPage ? '#page' : 'login.html';
    aTag.href=aTagPath
    aTag.textContent="Login"
    loginLink.innerHTML = "";
    loginLink.appendChild(aTag);
}

function setMenutoLogout(){
    let loginLink = document.getElementById("login_menu_link");
    let logoutBtn = document.createElement("button");
    logoutBtn.textContent = "Logout";
    logoutBtn.onclick = function() {
        signOut()
        console.log("logged out");
    };
    loginLink.innerHTML = "";
    loginLink.appendChild(logoutBtn);
}

function customerSignedIn(){                                            //removes any employee page access
    let cartLink=document.getElementById("menu_cart_link")
    let aboutLink=document.getElementById("menu_about_link")
    let ordersLink=document.getElementById("menu_orders_link")
    let management_link=document.getElementById("menu_management_link")
    if (aboutLink) aboutLink.style.display="block"
    if (cartLink) cartLink.style.display="block"
    if (ordersLink) ordersLink.style.display="none"
    if (management_link) management_link.style.display="none"
}

function employeeSignedIn(){
    let cartLink=document.getElementById("menu_cart_link")
    let aboutLink=document.getElementById("menu_about_link")
    let ordersLink=document.getElementById("menu_orders_link")
    let management_link=document.getElementById("menu_management_link")
    if (aboutLink) aboutLink.style.display="none"
    if (cartLink) cartLink.style.display="none"
    if (ordersLink) ordersLink.style.display="block"
    if (management_link) management_link.style.display="none"
}

function managerSingedIn(){
    let management_link=document.getElementById("menu_management_link")
    if (management_link) management_link.style.display="block"
}

export{signOut,setMenutoLogin,setMenutoLogout}

document.addEventListener('DOMContentLoaded', () => {
    const isSignedIn=Auth.getSignedIn()
    const header_child_1 = document.getElementsByClassName("header_child_1")[0]
    const header_child_3 = document.getElementsByClassName("header_child_3")[0]
    const header = document.getElementsByClassName("header")[0]
    const main_content = document.getElementsByClassName("main_page_content")[0]
    const footer = document.getElementsByClassName("footer")[0]
    var currentMode=''
    const button = document.getElementById('header_child_3_menu_btn');
    const menu = document.getElementById('header_child_2');
    let isOpen = false;
    let midFrame = 0;
    let total = 0;
    const menu_button_color="#000000ff"
    const isIndexPage = window.location.pathname.endsWith('index.html');
    let isAccountPage = window.location.pathname.endsWith('account.html');
    let isOrderPage = window.location.pathname.endsWith('cart.html');
    const isOrdersPage = window.location.pathname.endsWith('orders.html');
    const animationPath = isIndexPage ? 'resources/icons/menu.json' : '../resources/icons/menu.json';         //changes menu icon path depending on current page loaded
    const width = window.innerWidth; 
    const height = window.innerHeight;                                                                        //used as a inital media width query
    const backToTopDist = 300                                                                                 //Distance needed to scroll until back to top button appears
    const backToTopBtn = document.getElementById("backToTop");

    const animation = lottie.loadAnimation({
        container: button,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: animationPath
    });

    animation.addEventListener('DOMLoaded', () => {
        total = animation.totalFrames;
        midFrame = total / 2;
        animation.goToAndStop(0, true);                              // Start at hamburger
    });

    // Force menu_button_color stroke on every frame
    animation.addEventListener('enterFrame', () => {
        const svgContainer = button.querySelector('svg');
        if (svgContainer) {
            const paths = svgContainer.querySelectorAll('path, rect, circle, line, polygon');
            paths.forEach(path => {
                path.setAttribute('stroke', menu_button_color);
            });
        }
    });

    const initalmainheight=main_content.offsetHeight
    function fixpageheight(){
        let headheight=header.offsetHeight
        let mainheight=main_content.offsetHeight
        let footheight=footer.offsetHeight
        let headerfooter_height=headheight+footheight
        let currentcontent_height=headerfooter_height+mainheight
        let prevcontent_height=headerfooter_height+initalmainheight
        

        if (height>(currentcontent_height)){
            //console.log("main content height set")
            main_content.style.height=(height-(headerfooter_height))+"px"
        }
        else if (height>(prevcontent_height)){
            main_content.style.height=(height-(headerfooter_height))+"px"
        }
    }

    button.addEventListener('click', () => {
        isOpen = !isOpen;

        if (currentMode!='tablet'){
            header.style.paddingBottom = '10px';
        }
        if (isOpen) {
            animation.playSegments([0, midFrame], true);             // hamburger → X
            menu.classList.add('open');
            if(currentMode=='tablet'){
                header.style.paddingBottom = '15px';    
            }
        } 
        else {
            animation.playSegments([midFrame, total], true);         // X → hamburger
            menu.classList.remove('open');
            if(currentMode=='tablet'){
                header.style.paddingBottom = '10px';    
            }
        }
        fixpageheight()
        button.setAttribute('aria-expanded', isOpen.toString());
    });

    function phoneMenu(){
        header_child_3.style.display="block"
        header_child_3.style.position="relative"
        header_child_3.style.top="0px"
        header_child_3.style.right="0px"
        header.style.paddingBottom = '10px';
        header_child_3.remove()
        header.appendChild(header_child_3)
        //console.log(header_child_3)
    }

    function tabletMenu(){
        header_child_3.style.display="inline-block"
        header_child_3.style.position="absolute"
        header_child_3.style.top="20px"
        header_child_3.style.right="20px"
        if (isOpen) {
            header.style.paddingBottom = '15px';    
        }
        header_child_3.remove()
        header_child_1.appendChild(header_child_3)
    }

    function desktopMenu(){
        header_child_3.style.display="none"
        header.style.paddingBottom = '10px';
        if (isOpen){
            animation.playSegments([midFrame, total], true);
        }    
        isOpen = false
        menu.classList.remove('open');
    }

    //changes menu appearance based on initail window width
    if (width <= 500) {
        phoneMenu()
        currentMode='phone'
        //console.log('Initially in phone mode');
    } 
    else if (width <= 800) {
        tabletMenu()
        currentMode='tablet'
        //console.log('Initially in tablet mode');
    } 
    else {
        desktopMenu()
        currentMode='desktop'
        //console.log('Initially in desktop mode');
    }

    fixpageheight()

    window.addEventListener('resize',()=>{
        //changes menu appearance based on window width during resizes
        const width= window.innerWidth
        const height=window.innerHeight

        if (width <= 500) {
            phoneMenu()
            currentMode='phone'
            //console.log('Phone mode');
        } 
        else if (width <= 800) {
            tabletMenu()
            currentMode='tablet'
            //console.log('Tablet mode');
        } 
        else {
            desktopMenu()
            currentMode='desktop'
            //console.log('Desktop mode');
        }

        fixpageheight()
    });

    // Show button after scrolling backToTopDist
    window.addEventListener("scroll", () => {
        if (document.documentElement.scrollTop > backToTopDist) {
            backToTopBtn.style.display = "block";
        } 
        else {
            backToTopBtn.style.display = "none";
        }
    });

    // Scroll smoothly to top when clicked
    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
        top: 0,
        behavior: "smooth"
        });
    });

    if (isSignedIn){
        setMenutoLogout()
        if (Auth.getActiveType()!='customer'){
            employeeSignedIn()
            if (Auth.getActiveType()!='employee'){
                managerSingedIn()
            }
        }
        else{
            customerSignedIn()
        }
    }
    else {
        setMenutoLogin()
        if (isAccountPage||isOrderPage){
            window.location.href='login.html'
        }
    }
});
