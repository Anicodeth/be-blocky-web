import { z } from "zod";

export const signInSchema = z.object({
    email: z.string({ required_error: "Please provide valid email address!" }).email("Please provide valid email address!"),
    password: z.string({ required_error: "Please provide password!" }).refine(pass => pass.length >= 8, "Password is less than 8 characters"),
})

export const signUpSchema = z.object({
    role: z.string({ required_error: "Please select one of the roles!" }),
    name: z.string({ required_error: "Please provide valid name!" }).refine(name => name.includes(" "), "Please provide full name."),
    email: z.string({ required_error: "Please provide valid email address!" }).email("Please provide valid email address!"),
    password: z.string({ required_error: "Please provide password!" }).refine(pass => pass.length >= 8, "Password is less than 8 characters"),
    repeatPassword: z.string({ required_error: "Please provide repeated password!" }),
    plan: z.string({ required_error: "Please select one of the plans!" }),
    terms: z.boolean({ required_error: "Please accept terms and conditions before signing up." }).refine(accept => accept, "Please accept terms and conditions before signing up.")
}).refine(args => args.password === args.repeatPassword, "Password doesn't match!")

export const addChildSchema = z.object({
    name: z.string({ required_error: "Please provide valid name!" }).refine(name => name.includes(" "), "Please provide full name."),
    email: z.string({ required_error: "Please provide valid email address!" }).email("Please provide valid email address!"),
    password: z.string({ required_error: "Please provide password!" }).refine(pass => pass.length >= 8, "Password is less than 8 characters"),
    repeatPassword: z.string({ required_error: "Please provide repeated password!" }),
}).refine(args => args.password === args.repeatPassword, "Password doesn't match!")


export type SignUpSchema = z.infer<typeof signUpSchema>
export type SignInSchema = z.infer<typeof signInSchema>
export type AddChildSchema = z.infer<typeof addChildSchema>