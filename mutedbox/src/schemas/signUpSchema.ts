import {z} from "zod";

export const usernameValidationSchema=z.
    string()
    .min(2,"username must be atleast 2 characters")
    .max(20,"username must not have more than 20 characters")
    .regex(/^[a-zA-Z0-9]+$/,"username must not contain special characters");

export const signUpSchema=z.object(
    {
        username:usernameValidationSchema,
        email:z.string().email({message:'Invalid email address'}),
        password:z.string().min(6,{message:'password must be atleast 6 characters'})
    }
)