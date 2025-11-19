import { Card } from "@/components/ui/card";
import { Flame, TrendingUp, Award } from "lucide-react";

export const StreakCounter = () => {
  // Mock data - будет из API
  const streakData = {
    currentStreak: 7,
    bestStreak: 15,
    adherenceRate: 94,
  };

  return (
    <Card className="p-4 bg-gradient-to-br from-primary/10 via-accent/5 to-success/10 border-primary/20">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center animate-pulse-glow">
            <Flame className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Серия дней</p>
            <p className="text-2xl font-bold text-foreground">{streakData.currentStreak}</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="flex items-center gap-1 text-success mb-1">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm font-medium">{streakData.adherenceRate}%</span>
          </div>
          <p className="text-xs text-muted-foreground">Соблюдение</p>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-3 border-t border-border/50">
        <Award className="h-4 w-4 text-accent" />
        <p className="text-sm text-muted-foreground">
          Лучшая серия: <span className="font-semibold text-foreground">{streakData.bestStreak} дней</span>
        </p>
      </div>
    </Card>
  );
};
