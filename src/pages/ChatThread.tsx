import { MainLayout } from "@/components/layout/MainLayout";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const ChatThread = () => {
  const navigate = useNavigate();
  const { threadId } = useParams();
  const [messages, setMessages] = useState([
    {
      id: "1",
      role: "assistant" as const,
      content: "Привет! Я твой AI-помощник. Как я могу помочь тебе сегодня?",
      timestamp: "2025-11-19T10:00:00",
    },
    {
      id: "2",
      role: "user" as const,
      content: "Помоги мне составить план тренировок на неделю",
      timestamp: "2025-11-19T10:01:00",
    },
    {
      id: "3",
      role: "assistant" as const,
      content:
        "Конечно! Давай составим эффективный план тренировок. Для начала, расскажи:\n\n1. Какой у тебя уровень подготовки?\n2. Сколько дней в неделю ты готов тренироваться?\n3. Есть ли какие-то цели (набор массы, похудение, выносливость)?\n4. Есть ли доступ к спортзалу или будем тренироваться дома?",
      timestamp: "2025-11-19T10:01:30",
    },
  ]);

  const handleSendMessage = (content: string) => {
    const newMessage = {
      id: Date.now().toString(),
      role: "user" as const,
      content,
      timestamp: new Date().toISOString(),
    };
    setMessages([...messages, newMessage]);

    // Симуляция ответа AI
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        role: "assistant" as const,
        content: "Отлично! Теперь я могу составить для тебя персональный план тренировок...",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const chatTitle = threadId === "new" ? "Новый чат" : "Советы по здоровью";

  return (
    <MainLayout showBottomNav={false}>
      <div className="fixed top-0 left-0 right-0 z-40 bg-card border-b px-3 py-3 flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/chat")}
          className="shrink-0"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold text-foreground truncate">
          {chatTitle}
        </h1>
      </div>

      <div className="flex flex-col h-[calc(100vh-3.5rem)] pt-14">
        <div className="flex-1 overflow-y-auto space-y-4 py-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} {...message} />
          ))}
        </div>

        <ChatInput onSend={handleSendMessage} />
      </div>
    </MainLayout>
  );
};

export default ChatThread;
