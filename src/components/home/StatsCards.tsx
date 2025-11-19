import { Bell, MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardsProps {
  remindersCount: number;
  chatsCount: number;
}

export const StatsCards = ({ remindersCount, chatsCount }: StatsCardsProps) => {
  const stats = [
    {
      icon: Bell,
      count: remindersCount,
      label: "Напоминаний",
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      icon: MessageSquare,
      count: chatsCount,
      label: "Чатов",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 mb-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card 
            key={stat.label}
            className="p-4 hover:shadow-smooth-md transition-smooth cursor-pointer group"
          >
            <div className={cn(
              "inline-flex p-2.5 rounded-xl mb-3",
              stat.bgColor
            )}>
              <Icon className={cn("h-5 w-5", stat.color)} />
            </div>
            <div className="text-3xl font-bold text-foreground mb-1 group-hover:scale-105 transition-smooth">
              {stat.count}
            </div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </Card>
        );
      })}
    </div>
  );
};
