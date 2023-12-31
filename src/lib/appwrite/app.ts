import { INewUser } from "@/types";
import {ID} from "appwrite"
import { account } from "./config";
export async function CreateUserAccount(user:INewUser) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        )
        return newAccount;
    } catch (error) {
         console.log(error,'pranita');
         return error;
    }   
}