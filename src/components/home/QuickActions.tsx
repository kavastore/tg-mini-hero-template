import { Plus, MessageSquarePlus, Settings, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

export const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      icon: Plus,
      label: "Создать напоминание",
      onClick: () => navigate("/reminders/create"),
      color: "text-accent",
      bgColor: "bg-accent/10 group-hover:bg-accent/20",
    },
    {
      icon: MessageSquarePlus,
      label: "Новый чат",
      onClick: () => navigate("/chat/new"),
      color: "text-primary",
      bgColor: "bg-primary/10 group-hover:bg-primary/20",
    },
    {
      icon: Settings,
      label: "Настройки",
      onClick: () => navigate("/settings"),
      color: "text-muted-foreground",
      bgColor: "bg-muted group-hover:bg-muted-foreground/20",
    },
  ];

  return (
    <Card className="p-5 mb-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 bg-primary/10 rounded-lg">
          <Zap className="h-4 w-4 text-primary" />
        </div>
        <h3 className="text-base font-semibold text-foreground">Быстрые действия</h3>
      </div>
      <div className="space-y-2">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.label}
              onClick={action.onClick}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-smooth group text-left"
            >
              <div className={cn(
                "p-2 rounded-lg transition-smooth",
                action.bgColor
              )}>
                <Icon className={cn("h-5 w-5", action.color)} />
              </div>
              <span className="text-sm font-medium text-foreground">
                {action.label}
              </span>
            </button>
          );
        })}
      </div>
    </Card>
  );
};
