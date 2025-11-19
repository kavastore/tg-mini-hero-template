import { Home, MessageSquare, Calendar, Bell, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { id: "home", icon: Home, label: "Главная", path: "/" },
  { id: "reminders", icon: Bell, label: "Напоминания", path: "/reminders" },
  { id: "chat", icon: MessageSquare, label: "Чат", path: "/chat" },
  { id: "calendar", icon: Calendar, label: "Календарь", path: "/calendar" },
  { id: "profile", icon: User, label: "Профиль", path: "/profile" },
];

export const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-card/95 backdrop-blur-lg supports-[backdrop-filter]:bg-card/90 safe-area-inset-bottom">
      <div className="flex h-16 items-center justify-around px-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-2 py-2 rounded-xl transition-smooth min-w-[56px] flex-1",
                active
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground active:scale-95"
              )}
            >
              <div className="relative">
                <Icon className={cn(
                  "h-5 w-5 transition-smooth",
                  active && "scale-110"
                )} />
                {active && (
                  <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                )}
              </div>
              <span className={cn(
                "text-[10px] font-medium",
                active && "font-semibold"
              )}>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
