import { Plus, MessageSquarePlus, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const FloatingActionButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Определяем контекст страницы
  const isHomePage = location.pathname === "/";
  const isRemindersPage = location.pathname === "/reminders";
  const isChatPage = location.pathname === "/chat";

  const handleAction = (action: "reminder" | "chat") => {
    if (action === "reminder") {
      navigate("/reminders/create");
    } else {
      navigate("/chat");
      // Здесь можно добавить логику создания нового чата
    }
    setIsOpen(false);
  };

  // Прямое действие на специфичных страницах
  if (isRemindersPage) {
    return (
      <Button
        size="icon"
        className="fixed bottom-20 right-4 z-50 h-14 w-14 rounded-full shadow-smooth-lg hover:shadow-smooth-lg hover:scale-110 transition-all duration-200 animate-fade-in"
        onClick={() => navigate("/reminders/create")}
      >
        <Bell className="h-6 w-6" />
      </Button>
    );
  }

  if (isChatPage) {
    return (
      <Button
        size="icon"
        className="fixed bottom-20 right-4 z-50 h-14 w-14 rounded-full shadow-smooth-lg hover:shadow-smooth-lg hover:scale-110 transition-all duration-200 animate-fade-in"
        onClick={() => handleAction("chat")}
      >
        <MessageSquarePlus className="h-6 w-6" />
      </Button>
    );
  }

  // Меню на главной странице
  if (isHomePage) {
    return (
      <div className="fixed bottom-20 right-4 z-50">
        {/* Опции меню */}
        <div
          className={cn(
            "absolute bottom-16 right-0 flex flex-col gap-2 transition-all duration-300",
            isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
          )}
        >
          <Button
            size="icon"
            variant="secondary"
            className="h-12 w-12 rounded-full shadow-smooth-md hover:scale-110 transition-all duration-200"
            onClick={() => handleAction("reminder")}
          >
            <Bell className="h-5 w-5" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="h-12 w-12 rounded-full shadow-smooth-md hover:scale-110 transition-all duration-200"
            onClick={() => handleAction("chat")}
          >
            <MessageSquarePlus className="h-5 w-5" />
          </Button>
        </div>

        {/* Главная кнопка */}
        <Button
          size="icon"
          className={cn(
            "h-14 w-14 rounded-full shadow-smooth-lg hover:shadow-smooth-lg transition-all duration-300 animate-fade-in",
            isOpen && "rotate-45"
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return null;
};
