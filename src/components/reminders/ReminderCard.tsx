import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Pill, Calendar, Sparkles, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReminderCardProps {
  id: string;
  title: string;
  message: string;
  type: "medication" | "appointment" | "custom" | "text";
  active: boolean;
  nextFireAt: string;
  schedule: string;
  onClick?: () => void;
}

const typeConfig = {
  medication: { icon: Pill, label: "Лекарство", color: "text-success" },
  appointment: { icon: Calendar, label: "Встреча", color: "text-primary" },
  custom: { icon: Sparkles, label: "Другое", color: "text-accent" },
  text: { icon: Clock, label: "Напоминание", color: "text-muted-foreground" },
};

export const ReminderCard = ({ 
  title, 
  message, 
  type, 
  active, 
  nextFireAt, 
  schedule,
  onClick 
}: ReminderCardProps) => {
  const config = typeConfig[type];
  const Icon = config.icon;
  const nextDate = new Date(nextFireAt);
  const isToday = nextDate.toDateString() === new Date().toDateString();

  return (
    <Card 
      className={cn(
        "p-4 transition-smooth cursor-pointer hover:shadow-smooth-md",
        !active && "opacity-60"
      )}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <div className={cn(
          "p-2 rounded-lg",
          active ? "bg-primary/10" : "bg-muted"
        )}>
          <Icon className={cn("h-5 w-5", active ? config.color : "text-muted-foreground")} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-semibold text-foreground truncate">{title}</h3>
            <Switch 
              checked={active}
              onClick={(e) => e.stopPropagation()}
              className="shrink-0"
            />
          </div>
          
          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{message}</p>
          
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="secondary" className="text-xs">
              {config.label}
            </Badge>
            {isToday && active && (
              <Badge className="text-xs bg-primary text-primary-foreground">
                Сегодня
              </Badge>
            )}
          </div>
          
          <div className="mt-2 text-xs text-muted-foreground">
            <Clock className="h-3 w-3 inline mr-1" />
            {schedule}
          </div>
        </div>
      </div>
    </Card>
  );
};
