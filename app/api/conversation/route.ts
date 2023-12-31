import { NextResponse } from "next/server"

import OpenAIApi from "openai"
import { auth } from "@clerk/nextjs"
import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit"




const openai = new OpenAIApi({apiKey: process.env.OPENAI_SECRET_KEY,})

export async function POST(
    req:Request)
{
    try {
        const {userId} = auth()
        const body = await req.json()
        const {messages} = body

        if(!userId){
        return new NextResponse("unauthorized", {status:401})}

        if(!openai){
            return new NextResponse("Api key not configured", {status:500})
        }

        if(!messages){
            return new NextResponse("Messages are required", {status:400})
        }

        const freeTrial = await checkApiLimit()

        if(!freeTrial){
            return new NextResponse("sorry your free trial has expired", {status: 403})
        }

        const response = await openai.chat.completions.create({
            model:"gpt-3.5-turbo",
            messages
        })

        await increaseApiLimit()

        return NextResponse.json(response.choices[0].message)
    
    } catch (error) {
        console.log("CONVERSATION_ERROR")
        return new NextResponse("Internal error", {status:500})
    }

}


