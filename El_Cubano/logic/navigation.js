document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('header_child_3_menu_btn');
    const menu = document.getElementById('header_child_2');
    let isOpen = false;
    let midFrame = 0;
    let total = 0;
   
    const isIndexPage = window.location.pathname.endsWith('index.html');
    let animationPath = (isIndexPage)  ? 'resources/icons/menu.json':'../resources/icons/menu.json'

    let animation = lottie.loadAnimation({
        container: button,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: animationPath
    });

    animation.addEventListener('DOMLoaded', () => {
        total = animation.totalFrames;
        midFrame = total / 2;
        animation.goToAndStop(0, true); // Start at hamburger
    });

    button.addEventListener('click', () => {
        if (!animation || total === 0) return;

        isOpen = !isOpen;

        if (isOpen) {
            animation.playSegments([0, midFrame], true); // hamburger → X
            menu.classList.add('open');
        } 
        else {
            animation.playSegments([midFrame, total], true); // X → hamburger
            menu.classList.remove('open');
        }

        button.setAttribute('aria-expanded', isOpen.toString());
    });


});
