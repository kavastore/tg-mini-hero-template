import { Hand } from "lucide-react";
import { Card } from "@/components/ui/card";

interface WelcomeCardProps {
  userName: string;
  todayRemindersCount: number;
}

export const WelcomeCard = ({ userName, todayRemindersCount }: WelcomeCardProps) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Доброе утро";
    if (hour < 18) return "Добрый день";
    return "Добрый вечер";
  };

  return (
    <Card className="p-6 gradient-primary text-primary-foreground border-0 shadow-smooth-lg mb-4">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
          <Hand className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-1">{getGreeting()}, {userName}!</h2>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold">{todayRemindersCount}</span>
            <span className="text-primary-foreground/80">
              {todayRemindersCount === 1 ? "напоминание" : 
               todayRemindersCount < 5 ? "напоминания" : "напоминаний"} на сегодня
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};
