

let signedIn = false;
let activeUser = "guest";
let currentEmployeeNum = 100;

function getSignedIn() { return signedIn; }
function setSignedIn(status) { signedIn = status; }

function getActiveUser() { return activeUser; }
function setActiveUser(user) {
    activeUser = user;
    sessionStorage.setItem("activeUser", JSON.stringify(user));
}

function getActiveType() {
    let user = getActiveUser();
    if (user === "guest") return "guest";
    else return user.type;
}

//function getCurrentEmployeeNum() { return currentEmployeeNum; }
//function incrementEmployeeNum() { return ++currentEmployeeNum; }

// -------------------- CLASSES --------------------
class Customer {
    constructor(firstname, username, password) {
        this.username = username;
        this.password = password;
        this.firstname = firstname;
        this.type = "customer";
        this.favorites = [];
    }

    validatePassword(inputPassword) { return this.password === inputPassword; }

    changePassword(oldPassword, newPassword) {
        if (this.validatePassword(oldPassword)) {
            this.password = newPassword;
            saveCustomers();
            return true;
        }
    }

    setLastname(lastname) { this.lastname = lastname; }
    setDefaultPayment(cardnumber) { this.default_payment_method = cardnumber; }
}

class Employee {
    constructor(firstname, lastname, password, type) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.password = password;
        this.type = type;
        this.id = ++currentEmployeeNum;
    }

    validatePassword(inputPassword) { return this.password === inputPassword; }

    changePassword(oldPassword, newPassword) {
        if (this.validatePassword(oldPassword)) {
            this.password = newPassword;
            saveEmployees();
            return true;
        }
    }

    promote() {
        if (this.type === "employee") {
            this.type = "manager";
            saveEmployees();
        }
    }

    demote() {
        if (this.type === "manager") {
            this.type = "employee";
            saveEmployees();
        }
    }

    fireEmployee() {
        employees = employees.filter(emp => emp.id !== this.id);
        saveEmployees();
    }
}

// -------------------- STORAGE HELPERS --------------------
function saveCustomers() {
    localStorage.setItem("customers", JSON.stringify(customers));
}
function saveEmployees() {
    localStorage.setItem("employees", JSON.stringify(employees));
}

function loadCustomers() {
    const data = JSON.parse(localStorage.getItem("customers")) || [];
    return data.map(c => new Customer(c.firstname, c.username, c.password));
}
function loadEmployees() {
    const data = JSON.parse(localStorage.getItem("employees")) || [];
    return data.map(e => new Employee(e.firstname, e.lastname, e.password, e.type));
}

// -------------------- INITIALIZATION --------------------
let customers = loadCustomers();
if (customers.length === 0) {
    customers = [new Customer("Aizaer", "aizaer@gmail.com", "1234")];
    saveCustomers();
}

let employees = loadEmployees();
if (employees.length === 0) {
    employees = [
        new Employee("Kaden", "Grisafi", "1234", "manager"),
        new Employee("Israel", "Acosta", "1234", "employee")
    ];
    saveEmployees();
}

// Restore active user from sessionStorage
const savedUser = sessionStorage.getItem("activeUser");
if (savedUser) {
    activeUser = JSON.parse(savedUser);
    signedIn = true;
}

// -------------------- FUNCTIONS --------------------
function newCustomer(name, username, password) {
    let newcustomer = new Customer(name, username, password);
    customers.push(newcustomer);
    saveCustomers();
    return newcustomer;
}

function login(username, password) {
    // Search customers
    let user = customers.find(c => c.username === username && c.validatePassword(password));
    if (!user) {
        // Search employees (by id here)
        user = employees.find(e => e.id === Number(username) && e.validatePassword(password));
    }

    if (user) {
        signedIn = true;
        setActiveUser(user); // also saves to sessionStorage
        return true;
    }
    return false;
}

function logout() {
    signedIn = false;
    activeUser = "guest";
    sessionStorage.removeItem("activeUser");
}

const getUsers = () => [customers, employees];

function isValidPassword(password) {
    if (password.length < 8) return false;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
    return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
}

// -------------------- EXPORTS --------------------
export {
    getUsers, employees, customers, Employee, Customer, newCustomer,
    getActiveType, getSignedIn, setSignedIn, getActiveUser, setActiveUser,
    login, logout, isValidPassword
};
