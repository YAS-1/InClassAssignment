import bcrypt from "bcrypt"; // For encrypting user passwords
import fs from "fs";// For reading and writing files
import readline from "readline";


const users = "users.json";

// Loading the file information
const LoadFile = () =>{
    if(!fs.existsSync(users)){
        return `File is empty`
    }
    return JSON.parse(fs.readFileSync(users, 'utf8'));
}