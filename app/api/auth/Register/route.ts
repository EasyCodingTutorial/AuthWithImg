// For Connection
import ConnectToDb from "@/utils/connectToDb";

// For Schema
import userSchema from "@/Schema/userSchema";


import { NextResponse } from "next/server";

import bcrypt from 'bcryptjs'


export async function POST(req: Request) {
    try {

        // For Connection
        await ConnectToDb()

        const { name, email, password, imageUpload } = await req.json()

        // Lets Hash The Password   
        const hashedPassword = await bcrypt.hash(password, 14)

        const NewUser = await userSchema.create({
            name, email, password: hashedPassword, imageUpload
        })

        if (NewUser) {
            return NextResponse.json({
                success: true,
            })
        } else {
            return NextResponse.json({
                success: false,
            })
        }





    } catch (error) {
        return NextResponse.json({
            error: error
        }, {
            status: 500
        })
    }
}

