import { Button } from '@/components/ui/button'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signUpValidations } from '@/lib/validation'
import * as z from "zod"
import Loader from '@/components/shared/Loader'
import { Link } from 'react-router-dom'
import { CreateUserAccount } from '@/lib/appwrite/app'



const SignUpForm = () => {
  const isLoading=false;
  const form = useForm<z.infer<typeof signUpValidations>>({
    resolver: zodResolver(signUpValidations),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: ""
    },
  })

  // 2. Define a submit handler.
 async function onSubmit(values: z.infer<typeof signUpValidations>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    const newUser = await CreateUserAccount(values);
    console.log(newUser,"pranita");
    //dd 
  }
  return (
    <Form {...form}>
      <div className='sm:w-420 flex-center flex-col'>
        <img
          src='/assets/images/logo.svg'
        />
        <h2 className='h3-bold md:h2-bold pt-5 sm:pt-12'>Create New Account</h2>
        <p className='text-light-3 small-medium md:base-regular'>To use Connect, Please Enter your Details</p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex  flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>name</FormLabel>
                <FormControl>
                  <Input type='text' {...field}  className='shad-input'/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type='text' {...field} className='shad-input' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>email</FormLabel>
                <FormControl>
                  <Input type='email' {...field} className='shad-input' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>password</FormLabel>
                <FormControl>
                  <Input type='password' {...field} className='shad-input' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className='shad-button_primary'>
            {
              isLoading ? 
              (<div className='flex-center gap-2'>
               <Loader/>
              </div>):
              (
                "Sign up"
              )
            }
          </Button>
          <p className='text-small-regular text-light-2 text-center mt-2'>
              Already have an account? <Link to='/sign-in' className='text-primary-500 text-small-semibold ml-1'>Sign In</Link>
          </p>
        </form>
      </div>
    </Form>
  )
}

export default SignUpForm
