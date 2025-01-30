import bcrypt from "bcrypt"; // For encrypting user passwords
import fs from "fs"; // For reading files
import readline from "readline"; // For getting user input


const users = "users.json";

// Loading the file information
const LoadFile  = () =>{
    if(!fs.existsSync(users)){
        return `File empty`;
    }
    return JSON.parse(fs.readFileSync(users, 'utf8')); // Used to read from the JSON fille storing users
}

// Saving users to file
const SaveUsers = (user) => {
    fs.writeFileSync(users, JSON.stringify(user, null, 2)); //Formats the json details to string
};


// Using readline to create an interface to get user input
const register = readline.createInterface({
    input: process.stdin, // for getting input
    output: process.stdout // for displaying output
});

const registerUser = () => {
    register.question('Enter your name: ', (name) => {
        register.question('Enter your email: ', (email) => {
            let user = LoadFile();

            if (user[email]){
                console.log("User already exists");
                register.close();
                return;
            }

            register.question('Enter your password: ', (password) => {
                //Encrypting the password
                const hashedPassword = bcrypt.hashSync(password, 10); // hashing the users password

                //store details
                user[email] = { name, password: hashedPassword};

                SaveUsers(user);

                console.log("Registration Successful");

                register.close();
            })
        });
    });
}

registerUser();
