import { INewUser } from "@/types";
import { account, appwriteConfig, avatars, databases } from "./config";
import { ID, Query } from "appwrite";

export async function createUserAccount(user:INewUser) {
   try {
    console.log(user,'pranita')
    const newAccount = await account.create(
        ID.unique(),
        user.email,
        user.password,
        user.name
    )
    if(!newAccount){
        throw Error;
    }
    const avatarUrl = avatars.getInitials(user.name);
    const newUser =  await saveUserToDb({
        accountId:newAccount.$id,
        name:newAccount.name,
        email:newAccount.email,
        username:user.username,
        imageUrl:avatarUrl
    })
    return newUser;
   } catch (error) {
    console.log(error);
    return error;
   } 
}


export async function saveUserToDb(user:{
  accountId:string,
  name:string,
  email:string,
  username?:string
  imageUrl:URL,
}) {
     try {
      console.log(user,"pranita")
         const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            user
         )
         return newUser;
     } catch (error) {
        console.log(error)  
     }
}

export async function createSignInAccount(user:{email:string,password:string}){
  try {
    const session = await account.createEmailSession(user.email,user.password);
    return session;
  } catch (error) {
      console.log(error)
  }
}

export async function getCurrentAccount() {
  try {
    const currentAccount = await account.get();
    if(!currentAccount) throw Error;
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal('accountId',currentAccount.$id)]
    )
    if(!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
}