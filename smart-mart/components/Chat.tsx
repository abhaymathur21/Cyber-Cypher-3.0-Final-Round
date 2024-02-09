import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const Chat = () => {
  const chatVariant = cva("max-w-[90%] rounded-md p-2 text-pretty", {
    variants: {
      variant: {
        user: " bg-primary text-white rounded-br-none ml-auto",
        agent: "bg-secondary text-gray-950 rounded-bl-none mr-auto",
      },
    },
  });

  return (
    <Card className="grid grid-rows-[auto_1fr_auto] border-2">
      <CardHeader className="p-4">
        <CardTitle className="flex gap-4 text-secondary">
          <Image src="/chat.svg" alt="Chat" width={32} height={32} />
          AI Agent
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-end gap-2 border-y-2 p-2">
        <CardDescription className={chatVariant({ variant: "agent" })}>
          Hi there! How can I help you today?
        </CardDescription>

        <CardDescription className={chatVariant({ variant: "user" })}>
          I need help with my order.
        </CardDescription>
      </CardContent>
      <CardFooter className="p-4">
        <form className="relative grid w-full">
          <Input id="chat" placeholder="Send a Message..." />
          <Button
            variant="ghost"
            className="absolute right-0 aspect-square p-2"
          >
            <Image src="/send.svg" alt="Send" width={24} height={24} />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};
export default Chat;
