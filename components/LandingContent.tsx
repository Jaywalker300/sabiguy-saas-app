"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

const testimonials = [
    {
        name: "Mr Krabs",
        avatar: "MK",
        title: "Restaurateur",
        description: " Found the responses tailored to my preferences. Just what i needed."

    },
    {
        name: "SpongeBob",
        avatar: "SB",
        title: "Clerk at Bikini Bottom",
        description: " its so easy to use..even patrick understands it."

    },
    {
        name: "Squid ward",
        avatar: "SW",
        title: "Cook",
        description: " yeah great! just what i needed, more AI tools to make less me grumpy."

    },
    {
        name: "Sandy",
        avatar: "SS",
        title: "Astronaut",
        description: " Generating coordinates on the fly.I mean you cant navigate without this thing"

    },
]

const LandingContent = () => {
  return (
    <div className='px-10 pb-20'>
        <h2 className='text-center text-4xl text-white font-extrabold mb-10'>
            Testimonials
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {testimonials.map((item)=>(
               <Card 
               key ={item.description}
               className='bg-[#192339] border-none text-white'>
                 <CardHeader>
                    <CardTitle className='flex items-center gap-x-2'>
                        <div>
                            <p className='text-lg'>{item.name}</p>
                            <p className='text-zinc-400 text-sm'>{item.title}</p>
                        </div>

                    </CardTitle>
                    <CardContent className='pt-4px-0'>
                        {item.description}
                    </CardContent>
                 </CardHeader>
               </Card>
            ))}
        </div>

    </div>
  )
}

export default LandingContent
