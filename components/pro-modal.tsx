"use client"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader,DialogTitle } from "@/components/ui/dialog"
import { Check, CodeIcon, ImageIcon, MessageSquare,Music, VideoIcon, Zap } from "lucide-react";
import { Badge } from "./ui/badge"
import { cn } from "@/lib/utils";
import { useProModal } from "@/hooks/use-pro-modal"
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { useState } from "react";

const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    color:"text-violet-500",
    bgColor: "bg-violet-500/10",
   
  },
  {
    label: "Music Generation",
    icon: Music,
    color:"text-emerald-500",
    bgColor: "bg-emerald-500/10",

  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
    
  },
  {
    label: "Code Generation",
    icon: CodeIcon,
    color: "text-green-700",
    bgColor: "bg-green-700/10",
    
  },
];




export const ProModal = () =>{
  const proModal = useProModal()
  const [loading, setLoading] = useState(false)
      

  //TO-DO: an onSubscribe (try and cath block.) webhook goes here and also a react hot toast to display errors to the user
    return (
      <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
                  Upgrade to SabiGuy
                  <div className="flex items-center gap-x-2 font-bold py-1">

                  <Badge variant ="premium" className="uppercase text-sm py-1">
                    pro
                  </Badge>
                  </div>
                </DialogTitle>
                <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
                {tools.map((tool)=>(
                  <Card
                  key={tool.label}
                  className="p-3 border-black/5 flex items-center justify-between">
                    <div className="flex items-center gap-x-4">
                      <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                        <tool.icon className={cn("w-6 h-6", tool.color)}/>
                      </div>
                      <div className="font-semibold text-sm">
                        {tool.label}
                      </div>
                      
                    </div>
                  <Check className="text-primary w-5 h-5"/>
                  </Card>
                ))}
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
              disabled={loading}
              size="lg"
              variant="premium"
              className="w-full">
                Upgrade
                <Zap className="w-4 h-4 ml-s fill-white"/>

              </Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>
    )
}