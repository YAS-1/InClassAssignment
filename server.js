import express from "express";
import readline from "readline";

import { registerUser } from "./register.js";
import { LoginUser } from "./authentication.js";

const app = express();

const PORT = 3000;

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const MainMenu = () => {
        console.log("\n---WELCOME---");
        console.log("1. Register");
        console.log("2. Login");
        console.log("3. Exit");
        

        rl.question("\nSelect an option: ",(choice) =>{
            choice = choice.trim();
            
            if (choice === "") {
                console.log("Input cannot be empty. Please try again.");
                return MainMenu(); // Ask for input again
            }


            switch(choice){
                case "1":
                    registerUser(rl,MainMenu); // Register user and return main menu
                    break;

                case "2":
                    LoginUser(rl,MainMenu);
                    break;

                case "3":
                    console.log("Existing application...\n");
                    rl.close();
                    break;

                default:
                    console.log("Invalid choice. Please try again.");
                    return MainMenu();
            }
        })
    }

    MainMenu();
})