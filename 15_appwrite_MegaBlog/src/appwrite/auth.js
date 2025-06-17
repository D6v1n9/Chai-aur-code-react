import conf from '../conf/conf.js'; // To get the access to env variables

import { Client, Account, ID } from "appwrite";

// M-1
// export class AuthService {}
// export default AuthService
// Inside this method we exported the class thus when using this we have to create an Object and use it  
// M-2 // Better approch to create an object and export this object so when we use it we can directly access the class methods
export class AuthService {
    client = new Client();
    account;
    // We are not directly writing by .setEndpoint() and .setProject() will be waste of resources
    // After creation of object we want this functions to work thus call them inside constructor
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
            
    }
    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method
                return this.login({email, password});
            } else {
               return  userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {

        try {
            await this.account.deleteSessions(); // So that he get logout from all places 
            // Another method is deleteSession('current') // To log out current session ## THE DIFFERENCE is session and sessions extra 's'
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}


const authService = new AuthService(); // authService is an Object
export default authService
// As you have export the Object so now you can access all the functions/ async functions with dot operator
// If in future any Backend service gets changes than only cahnges in this file to make 