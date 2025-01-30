import bcrypt from "bcrypt"; // For encrypting user passwords
import fs from "fs";// For reading and writing files
import readline from "readline";


const users = "users.json";

// Loading the file information
const LoadFile = () =>{
    if(!fs.existsSync(users)){
        return {}
    }
    return JSON.parse(fs.readFileSync(users, 'utf8'));
}



// Menu function
const userMenu = (rl,email, name, callback) =>{
    console.log(`\nWelcome ${name}\n`)
    console.log(`\n1. View Profile\n`)
    console.log(`\n2. Logout\n`);


    rl.question("\nSelect an option: ", (option) => {
        option = option.trim(); // Trim any extra spaces from input

        if (option === " ") {
            console.log("\nInput cannot be empty. Please try again.\n");
            return userMenu(rl, email, name, callback); // Ask again for a valid input
        }

        switch(option){
            case "1":
                console.log(`\n--- Profile ---\nName: ${name}\nEmail: ${email}`);
                userMenu(rl,email, name, callback);
                break;
            
            case "2":
                console.log("\nLogging out...\n");
                callback(); // return to main menu
                break;

            default:
                console.log("\nInvalid option. Please try again.\n");
                userMenu(rl,email, name, callback);
        }
    });
}

// Handling Login
const LoginUser = (rl,callback) => {
    rl.question("Enter your email: ", (email)=>{
        let user = LoadFile();

        if (!user[email]){
            console.log("User not found");
            return callback();
        }

        rl.question("Enter password: ", (password) => {
            if(bcrypt.compareSync(password, user[email].password)){ // comparing the entered password with the stored password
                console.log("\nLogin Successful\n");
                userMenu(rl,email, user[email].name, callback);
            }
            else{
                console.log("\nIncorrect Password\n");
                return callback();
            }
        });
    });
};

export {LoginUser}