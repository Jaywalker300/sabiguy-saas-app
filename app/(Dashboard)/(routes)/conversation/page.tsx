"use client";

import axios from "axios";
import * as z from "zod";
import Heading from "@/components/heading";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ChatCompletionMessage } from "openai/resources/chat/index.mjs";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import UserAvatar from "@/components/user-avatar"
import BotAvatar from "@/components/bot-avatar"

import { formSchema } from "./constants";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Empty from "@/components/empty";
import Loader from "@/components/loader";
import { cn } from "@/lib/utils";
import { useProModal } from "@/hooks/use-pro-modal";
import toast from "react-hot-toast";

const ConversationPage = () => {
  const proModal= useProModal()
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionMessage[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      
      const userMessage: ChatCompletionMessage = {
        role: "user",
        content: values.prompt,
      };
      const newMessages = [...messages, userMessage];

      const response = await axios.post("/api/conversation", {
        messages: newMessages,
      });

      setMessages((current) => [...current, userMessage, response.data]);

      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403){
       proModal.onOpen()
      }else{
        toast.error("Something went wrong")
      }
      
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      {/* Heading component */}
      <Heading
        title="Conversation"
        description="A chat buddie that is here for you at all times. "
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />

      <div className="px-4 lg:px-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="rounded-lg border w-full p-4 px-4 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m-0 p-0">
                    <Input
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      disabled={isLoading}
                      placeholder="How do i build a rocket ship?"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button className="col-span-12 lg:col-span-2" disabled={isLoading}>
              Generate
            </Button>
          </form>
        </Form>

        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
          <Loader/>
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <div>
             <Empty label="Hey 👋,  what's on your mind today ?"/>
            </div>
          )}
        <div className="flex flex-col-reverse gap-y-4">
          {messages.map((message) => (
            <div key={message.content} className={cn("p-8 w-full flex items-start gap-x-8 rounded-lg", message.role === "user"? "bg-white border border-black/10":"bg-muted")}>
              {message.role === "user"? <UserAvatar/>: <BotAvatar/>}
              <p className="text-sm">
              {message.content}
              </p>
              </div>
          ))}
        </div>
      </div>
      </div>
      {/* 
    Messages Content */}

  

    </div>
  );
};

export default ConversationPage;
