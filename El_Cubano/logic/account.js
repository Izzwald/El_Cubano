import * as Auth from "./auth.js";
import * as Message from "./message.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".change_password form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const currentPassword = document.getElementById("current-password").value;
    const newPassword = document.getElementById("new-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    
    let user = Auth.getActiveUser();

    // If getActiveUser returned a plain object (from sessionStorage),
    // search the arrays to get the real instance:
    if (!(user instanceof Auth.Customer) && !(user instanceof Auth.Employee)) {
        if (user.type === "customer") {
            user = Auth.customers.find(c => c.username === user.username);
        } 
        else if (user.type) {
            user = Auth.employees.find(e => e.id === user.id);
        }
    }

    let success = false;

    if (user.validatePassword(currentPassword)){
        if (!Auth.isValidPassword(newPassword)) {
            Message.showBanner("Password must be at least 8 characters long, have 1 special character, 1 number, 1 uppercase letter, and 1 lowecase letter",{type:'error',duration:10000,position:'top'})
        }
        else{
            if (newPassword !== confirmPassword) {
                Message.showBanner("New password and confirmation do not match",{type:'error',duration:5000,position:'top'});
            }
            else{
                success = user.changePassword(currentPassword, newPassword);
            }   
        }                
    }
    else {
        Message.showBanner("Current password is not correct",{type:'error',duration:5000,position:'top'});
    }

    if (success) {
        Message.showBanner("Password changed successfully!");
        form.reset();
    } 
    
  });
});
