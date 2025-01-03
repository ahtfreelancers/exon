"use server"

import { AuthError } from "next-auth"
import * as z from "zod"

import { signIn } from "../../auth"
import { LoginSchema } from "@/schemas"

const DEFAULT_LOGIN_REDIRECT = '/exon-admin/products'

export const login = async (values: z.infer<typeof LoginSchema>, callbackUrl?: string | null) => {
    const validatedFields = LoginSchema.safeParse(values)

    if(!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { email, password } = validatedFields.data

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT
        })
    } catch (error) {
        if(error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials!" }
                default:
                    return { error: "Something went wrong!" }
            }
        }

        throw error;
    }
}
