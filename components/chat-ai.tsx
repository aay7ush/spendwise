"use client";

import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowUpIcon,
  BotMessageSquareIcon,
  MessageCircleIcon,
} from "lucide-react";
import { FormEvent, useRef, useState } from "react";
import { chatSession } from "@/lib/ai";
import { ChatAIProps } from "@/types";

export default function ChatAI({ user, transactions }: ChatAIProps) {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState(
    "Hello, how can I assist you today?"
  );
  const [chatHistory, setChatHistory] = useState<
    { type: string; message: string }[]
  >([{ type: "ai", message: "Hello, how can I assist you today?" }]);
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const prompt = formData.get("prompt") as string;
    setPrompt("");

    setChatHistory((prevHistory) => [
      ...prevHistory,
      { type: "user", message: prompt },
    ]);

    if (inputRef.current) {
      inputRef.current.value = "";
    }

    setIsLoading(true);
    try {
      const userContext = {
        username: user.name,
        recentTransactions: transactions,
      };

      const result = await chatSession.sendMessage(
        `${JSON.stringify(userContext)}\n\nUser: ${prompt}`
      );

      const aiMessage = await result.response.text();
      setResponse(aiMessage);
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { type: "ai", message: aiMessage },
      ]);
    } catch (error) {
      console.error("Error in AI response:", error);
      setResponse("Sorry, I encountered an error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="rounded-full size-12" size="icon">
            <MessageCircleIcon className="size-7" />
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[400px] rounded-xl shadow-lg bg-background text-foreground">
          <ScrollArea className="h-[400px] p-4">
            <div className="grid gap-4">
              {chatHistory.map((message, index) => {
                if (message.type === "ai") {
                  return (
                    <div key={index} className="flex items-start gap-3">
                      <Avatar>
                        <BotMessageSquareIcon className="size-10 p-1 rounded-full bg-white text-neutral-500" />
                      </Avatar>
                      <div className="rounded-lg bg-card p-3 text-sm text-card-foreground">
                        <p>{message.message}</p>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={index}
                      className="flex justify-end items-start gap-3"
                    >
                      <div className="rounded-lg bg-primary p-3 text-sm text-primary-foreground">
                        <p>{message.message}</p>
                      </div>
                      <Avatar>
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>AA</AvatarFallback>
                      </Avatar>
                    </div>
                  );
                }
              })}

              {isLoading && (
                <div className="flex items-center gap-2">
                  <BotMessageSquareIcon className="size-10 p-1 rounded-full bg-white text-neutral-500" />
                  <div className="animate-pulse">Thinking...</div>
                </div>
              )}
            </div>
          </ScrollArea>
          <div className="border-t border-muted px-4 py-3">
            <form className="relative" onSubmit={handleSubmit}>
              <Textarea
                name="prompt"
                placeholder="Type your message..."
                className="min-h-[48px] rounded-2xl resize-none p-4 pr-16 border border-neutral-400 shadow-sm bg-background text-foreground"
                ref={inputRef}
              />
              <Button
                type="submit"
                size="icon"
                className="absolute w-8 h-8 top-3 right-3 hover:bg-muted/50"
              >
                <ArrowUpIcon className="w-4 h-4" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
