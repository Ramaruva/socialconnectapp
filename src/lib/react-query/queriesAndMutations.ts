import { INewUser } from "@/types"
import { useMutation } from "@tanstack/react-query"
import { createSignInAccount, createUserAccount } from "../appwrite/api"


export const useCreateUserAccountMutation = ()=>{
    return useMutation({
        mutationFn:(user:INewUser)=>createUserAccount(user)
    })
}

export const useSignInAccount = ()=>{
    return useMutation({
        mutationFn:(user:{
            email:string;password:string
        })=>createSignInAccount(user)
    })
}