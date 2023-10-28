"use client"

import { Button } from "@/components/ui/button"

import { Zap } from "lucide-react"

interface SubscriptionButtonProps {
    isPro: boolean
}

const SubscriptionButton = ({isPro}:SubscriptionButtonProps) => {
  return (
   <Button>
    {isPro? "Manage Subscription": "Upgrade"}
    {!isPro && <Zap className="w-4 h-4 ml-2 fill-white"/>}
   </Button>
  )
}

export default SubscriptionButton