let signed_in=false

class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    validatePassword(inputPassword) {
        return this.password === inputPassword;
    }

    changePassword(oldPassword, newPassword) {
        if (this.validatePassword(oldPassword)) {
            this.password = newPassword;
            return true;
        }
    }
}

let users = [];

const storedUsers = localStorage.getItem("users");
if (storedUsers) {
    users = JSON.parse(storedUsers).map(userData => new User(userData.username, userData.password));
}
else {
    users.push(new User("kaden", "password123"));
    users.push(new User("israel", "mypassword"));
}

const currentUser = sessionStorage.getItem("signed_in_user");
if (currentUser) {
    signed_in = true;
    console.log(`User ${currentUser} is signed in.`);
}

function signIn(username, password) {
    for (let user of users) {
        if (user.username === username && user.validatePassword(password)) {
            signed_in = true;
            sessionStorage.setItem("signed_in_user", username);
            console.log(`User ${username} signed in successfully.`);
            window.location.href = "index.html";
            return true;
        }
    }
}

function signOut() {
    signed_in = false;
    sessionStorage.removeItem("signed_in_user");
}

function signUp(username, password) {
    let userExists = false
    for (let user of users) {
        if (user.username === username) {
            userExists = true;
            alert("Username already exists!");
            break;
        }
    }
    if (!userExists) {
        let newUser = new User(username, password);
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        sessionStorage.setItem("signed_in_user", username);
        signed_in = true;
        alert("Account created successfully!");
        window.location.href = "index.html";
    }
}

document.addEventListener('DOMContentLoaded',()=>{

    let form1=document.getElementById('login');
    if (form1){
        form1.addEventListener('submit',function(event){
            event.preventDefault();
            let username=form1.username.value;
            let password=form1.password.value;
            signIn(username, password);
            //console.log(username,password);
        });
    }

    let form2=document.getElementById('signup');
    if (form2){
        form2.addEventListener('submit',function(event){
            event.preventDefault();
            let username=form2.new_username.value;
            let password=form2.new_password.value;
            signUp(username, password);
            //console.log(username,password);
        });
    }
});

if((window.location.pathname.endsWith("index.html"))&&(signed_in)){
    let div=document.getElementsByClassName("hello_there")[0];
    div.remove()
    let newDiv=document.createElement("div");
    newDiv.innerHTML=`<h1>Hello, ${sessionStorage.getItem("signed_in_user")}!</h1> <p style="margin:10px 0px 20px 0;">Welcome back to Envidiea.</p> <button class="button" onclick="signOut(); location.reload();">Sign Out</button>`;
    newDiv.className="hello_there";
    document.getElementsByClassName("main_content")[0].prepend(newDiv);
}