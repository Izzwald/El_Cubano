import * as Auth from "./auth.js";
import * as Message from "./message.js";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".change_password form");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const currentPassword = document.getElementById("current-password").value;
        const currentpass = document.getElementById("current-password")
        const newPassword = document.getElementById("new-password").value;
        const newpass = document.getElementById("new-password")
        const confirmPassword = document.getElementById("confirm-password").value;
        const confirmpass = document.getElementById("confirm-password")
    
        let user = Auth.getActiveUser();

        function resetformbox(...inputs){
            for (let inputspot of inputs){
                inputspot.value=""
            }
        }

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
                Message.showBanner("Password must be at least 8 characters long, have 1 special character, 1 number, 1 uppercase letter, and 1 lowercase letter",{type:'error',duration:10000,position:'top'})
                resetformbox(newpass,confirmpass);
            }
            else{
                if (newPassword !== confirmPassword) {
                    Message.showBanner("New password and confirmation do not match",{type:'error',duration:5000,position:'top'});
                    resetformbox(newpass,confirmpass);
                }
                else{
                    if (currentPassword==newPassword){
                        Message.showBanner("New password must be different from current password",{type:'warning',duration:5000,position:'top'});
                        resetformbox(newpass,confirmpass);
                    }
                    else{
                        success = user.changePassword(currentPassword, newPassword);
                    }
                }   
            }                
        }
        else {
            Message.showBanner("Current password is not correct",{type:'error',duration:5000,position:'top'});
            form.reset();
        }

        if (success) {
            Message.showBanner("Password changed successfully!");
            form.reset();
        } 
    });
});
