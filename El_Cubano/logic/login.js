import * as Auth from "./auth.js";
import * as Ui from "./ui.js";
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

        console.log("Login submitted:", { username, password });
        let status=Auth.login(username,password)
        if (!status) alert("Wrong username or password entered")
        else{
            Ui.setMenutoLogout()
            window.location.href = "../index.html";
        } 
    });

    // Signup form submission
    const signupForm = document.getElementById("signup");
    signupForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent page reload
        let name = document.getElementById("name").value;
        let newUsername = document.getElementById("new_username").value;
        let password = document.getElementById("new_password")
        let newPassword = password.value;

        if (!Auth.isValidPassword(newPassword)){
            password.value=""
            alert("Password too weak, please create a stronger password")
        }
        else{
            let newcustomer=Auth.newCustomer(name,newUsername,newPassword)
            Auth.setActiveUser(newcustomer)
            Auth.setSignedIn(true)
            alert("Account succesfully created!")
            window.location.href = "../index.html";
        }

        console.log("Signup submitted:", { name, newUsername, newPassword });
    });
});
