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
        const {prompt, amount = "1", resolution = "512x512"} = body

        if(!userId){
        return new NextResponse("unauthorized", {status:401})}

        if(!openai){
            return new NextResponse("Api key not configured", {status:500})
        }

        if(!prompt){
            return new NextResponse("A prompt is required", {status:400})
        }
        if(!amount){
            return new NextResponse("An amount is required", {status:400})
        }
        if(!resolution){
            return new NextResponse("A resolution is required", {status:400})
        }
        
        // checking for free trial
        const freeTrial = await checkApiLimit()

        if(!freeTrial){
            return new NextResponse("sorry your free trial has expired", {status: 403})
        }

        const response = await openai.images.generate({
            prompt,
            n:parseInt(amount,10),
            size: resolution,
        })

        await increaseApiLimit()

        return NextResponse.json(response.data)
    
    } catch (error) {
        console.log("IMAGE_ERROR")
        return new NextResponse("Internal error", {status:500})
    }

}


