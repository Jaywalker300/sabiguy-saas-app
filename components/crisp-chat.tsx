"use client"

import React from 'react'
import { useEffect } from "react"
import {Crisp} from "crisp-sdk-web"

const CrispChat = () => {
  useEffect(()=>{
   Crisp.configure("d260bb0c-a971-461c-9b71-4a53989de9e1")
  },[])

  return null
}

export default CrispChat