import { Home, MessageSquare, Calendar, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { id: "home", icon: Home, label: "Главная", path: "/" },
  { id: "chat", icon: MessageSquare, label: "Чат", path: "/chat" },
  { id: "calendar", icon: Calendar, label: "Календарь", path: "/calendar" },
  { id: "reminders", icon: Bell, label: "Напоминания", path: "/reminders" },
];

export const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 h-16 border-t bg-card/95 backdrop-blur-md supports-[backdrop-filter]:bg-card/80 md:hidden">
      <div className="flex h-full items-center justify-around px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-smooth min-w-[60px]",
                active
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <div className="relative">
                <Icon className={cn(
                  "h-5 w-5 transition-smooth",
                  active && "scale-110"
                )} />
                {active && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary animate-pulse" />
                )}
              </div>
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
