"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cva } from "class-variance-authority";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Chat = () => {
  const [messages, setMessages] = useState<
    {
      user: "agent" | "user";
      message: string;
    }[]
  >([{ user: "agent", message: "Hi there! How can I help you today?" }]);

  const [input, setInput] = useState("");

  const chatVariant = cva("max-w-[90%] rounded-md p-2 text-pretty", {
    variants: {
      variant: {
        user: " bg-primary text-white rounded-br-none ml-auto",
        agent: "bg-secondary text-gray-950 rounded-bl-none mr-auto",
      },
    },
  });

  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessages((prev) => [...prev, { user: "user", message: input }]);
    setInput("");
    console.log("sent message to server: ", input);

    const response = await fetch("http://localhost:5000/llm_input", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ string: input }),
    });
    const data = await response.text();
    const products = data.split("\n").map((product) => {
      const [id, name] = product.split("-").map((item) => item.trim());
      return { name, id };
    });
    const agent_message = `I found ${products.length} products for you! Here are some of them: ${products.map((product) => product.name).join(",\n")}`;
    setMessages((prev) => [...prev, { user: "agent", message: agent_message }]);
    const ids = products.map((product) => product.id).join(",");
    router.push(`/search?id=${ids}`);
  };

  return (
    <Card className="grid grid-rows-[auto_1fr_auto] border-2">
      <CardHeader className="p-4">
        <CardTitle className="flex gap-4 text-secondary">
          <Image src="/chat.svg" alt="Chat" width={32} height={32} />
          AI Agent
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-end gap-2 border-y-2 p-2">
        {messages.map((message, index) => (
          <CardDescription
            key={index}
            className={chatVariant({ variant: message.user })}
          >
            {message.message}
          </CardDescription>
        ))}
      </CardContent>
      <CardFooter className="p-4">
        <form className="relative grid w-full" onSubmit={handleSubmit}>
          <Input
            id="chat"
            placeholder="Send a Message..."
            name="chat"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <Button
            variant="ghost"
            className="absolute right-0 aspect-square p-2"
            type="submit"
          >
            <Image src="/send.svg" alt="Send" width={24} height={24} />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};
export default Chat;
