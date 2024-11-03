// For Connection
import ConnectToDb from "./connectToDb"

// For Schema
import userSchema from "@/Schema/userSchema"

// For BcryptJS
import bcrypt from 'bcryptjs'

import type { NextAuthOptions } from "next-auth"


import CredentialsProvider from "next-auth/providers/credentials"


export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            credentials: {},

            async authorize(credentials) {
                const { email, password } = credentials as { email: string, password: string }


                try {

                    await ConnectToDb()
                    const UserEmailCheck = await userSchema.findOne({ email });

                    if (!UserEmailCheck) {
                        return null
                    }

                    // if we found the email then check for the password
                    const isPasswordCorrect = await bcrypt.compare(password, UserEmailCheck.password)

                    // if Password is Not Correct then
                    if (!isPasswordCorrect) {
                        return null
                    }

                    // if The Email & Password is Correct Then
                    return {
                        id: UserEmailCheck._id,
                        email: UserEmailCheck.email,
                        name: UserEmailCheck.name,
                        image: UserEmailCheck.imageUpload
                    };

                } catch (error) {
                    console.log("AUTH ERROR", error)
                    return null
                }

            }

        })
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/",
        signOut: "/"
    }
}
