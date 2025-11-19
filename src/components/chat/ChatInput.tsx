import { useState } from "react";
import { Send, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  onSend: (message: string) => void;
}

export const ChatInput = ({ onSend }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="sticky bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur-md p-4">
      <div className="flex items-end gap-2">
        <Button
          variant="outline"
          size="icon"
          className="shrink-0 h-10 w-10"
          onClick={() => alert("Функция загрузки изображений скоро будет доступна!")}
        >
          <Image className="h-4 w-4" />
        </Button>

        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Напишите сообщение..."
          className="min-h-[40px] max-h-[120px] resize-none"
          rows={1}
        />

        <Button
          onClick={handleSend}
          disabled={!message.trim()}
          size="icon"
          className="shrink-0 h-10 w-10"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
