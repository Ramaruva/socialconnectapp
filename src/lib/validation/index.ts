import * as z from "zod"

export const signUpValidations = z.object({
    name:z.string().min(2,{message:"Name should atleast 2 characters"}),
    username: z.string().min(2,{message:"Username should have atleast 2 characters"}),
    email:z.string().email({message:"Please entire valid email address"}),
    password:z.string().min(8,{message:"Passwors should have atleast 8 characters"})
  })