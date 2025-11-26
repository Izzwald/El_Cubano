import * as Menu from "./auth.js";




document.addEventListener('DOMContentLoaded', () => {

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


});