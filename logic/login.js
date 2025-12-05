import * as Auth from "./auth.js";
import * as Ui from "./ui.js";
import * as Message from "./message.js";

const loginContainer = document.getElementById("login_container");
const signupContainer = document.getElementById("signup_container");

// switch from login to signup 
document.querySelectorAll(".login_switcher").forEach(btn => {
  btn.addEventListener("click", () => {
    // Toggle visibility
    if (loginContainer.style.display !== "none") {
        loginContainer.style.display = "none";
        signupContainer.style.display = "block";
    } 
    else {
        loginContainer.style.display = "block";
        signupContainer.style.display = "none";
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
    // Login form submission
    const loginForm = document.getElementById("login");
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent page reload
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        let status=Auth.login(username,password)
        if (!status) Message.showBanner("Wrong username or password entered",{ type:'error', duration:3000, position:'top' })
        else{
            Ui.setMenutoLogout()
            const bannerData = {message: `Welcome back ${(Auth.getActiveUser()).firstname}`,type:'success',duration: 3000,position:'top'};
            localStorage.setItem("bannerMessage", JSON.stringify(bannerData));
            window.location.href = "../index.html";
        } 
    });

    // Signup form submission
    const signupForm = document.getElementById("signup");
    signupForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent page reload
        let name = document.getElementById("name").value;
        let username = document.getElementById("new_username")
        let newUsername = document.getElementById("new_username").value;
        let password = document.getElementById("new_password")
        let newPassword = password.value;

        if (!Auth.isValidPassword(newPassword)){
            password.value=""
            Message.showBanner("Password must be at least 8 characters long, have 1 special character, 1 number, 1 uppercase letter, and 1 lowecase letter",{type:'error',duration:10000,position:'top'})
        }
        else if(!Auth.isUniqueUserName(newUsername)){
            username.value=""
            Message.showBanner("Username already exists, please choose something different",{type:'warning',duration:5000,position:'top'})
        }
        else{
            let newcustomer=Auth.newCustomer(name,newUsername,newPassword)
            Auth.setActiveUser(newcustomer)
            Auth.setSignedIn(true)
            const bannerData = {message: `Account created succesfully`,type:'success',duration: 5000,position:'top'};
            localStorage.setItem("bannerMessage", JSON.stringify(bannerData));
            window.location.href = "../index.html";
        }
    });
});
