import { MainLayout } from "@/components/layout/MainLayout";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

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

  return (
    <MainLayout
      title={threadId === "new" ? "Новый чат" : "Советы по здоровью"}
      showBack
      onBack={() => navigate("/chat")}
      showBottomNav={false}
    >
      <div className="flex flex-col h-[calc(100vh-4rem)]">
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
