import React from 'react'

import { Avatar, AvatarFallback,AvatarImage } from './ui/avatar'

const BotAvatar = () => {
  return (
    <Avatar>
        <AvatarImage className='p-1' 
        src='/logo.png'/>
    </Avatar> 
  )
}

export default BotAvatar