import { MainLayout } from "@/components/layout/MainLayout";
import { ChatThreadCard } from "@/components/chat/ChatThreadCard";
import { SearchBar } from "@/components/reminders/SearchBar";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Chat = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Mock данные
  const threads = [
    {
      id: "1",
      title: "Советы по здоровью",
      lastMessage: "Да, я могу помочь тебе составить план тренировок...",
      lastMessageAt: "2025-11-19T15:30:00",
      messageCount: 15,
    },
    {
      id: "2",
      title: "Планирование недели",
      lastMessage: "Вот оптимальное расписание на следующую неделю...",
      lastMessageAt: "2025-11-18T10:20:00",
      messageCount: 8,
    },
    {
      id: "3",
      title: "Изучение английского",
      lastMessage: "Let's practice some common phrases...",
      lastMessageAt: "2025-11-17T18:45:00",
      messageCount: 23,
    },
  ];

  const filteredThreads = threads.filter(t =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout showBottomNav>
      <div className="pt-3 space-y-3">
        <h1 className="text-2xl font-bold text-foreground mb-2">AI Чат</h1>
        
        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        <div className="space-y-3">
          {filteredThreads.map((thread) => (
            <ChatThreadCard
              key={thread.id}
              {...thread}
              onClick={() => navigate(`/chat/${thread.id}`)}
            />
          ))}
        </div>

        {filteredThreads.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              {searchQuery ? "Ничего не найдено" : "Нет чатов"}
            </div>
            {!searchQuery && (
              <Button onClick={() => navigate("/chat/new")}>
                <Plus className="h-4 w-4 mr-2" />
                Новый чат
              </Button>
            )}
          </div>
        )}
      </div>

      <Button
        size="lg"
        className="fixed bottom-20 right-4 md:bottom-4 h-14 w-14 rounded-full shadow-glow"
        onClick={() => navigate("/chat/new")}
      >
        <Plus className="h-6 w-6" />
      </Button>
    </MainLayout>
  );
};

export default Chat;
