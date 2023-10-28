"use client"
import { Button } from "./ui/button"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import Sidebar from "./sidebar"
import { useState ,useEffect } from "react"

interface MobileSidebarProps {
  apiLimitCount : number
}

export const MobileSidebar = ({apiLimitCount}: MobileSidebarProps) => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(()=>{
        setIsMounted(true)
    }, [])

    if (!isMounted){
        return null
    }
  return (
    <Sheet>
    <SheetTrigger>

    <Button variant='ghost' size='icon' className='md:hidden'>
            <Menu/>
    </Button>
    </SheetTrigger>
    <SheetContent side="left" className="p-0">
        <Sidebar apiLimitCount={apiLimitCount}/>
    </SheetContent>
  </Sheet>
  )
}