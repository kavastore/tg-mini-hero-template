import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Pill, Calendar, Sparkles, Clock, ShoppingCart, AlertCircle, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ReminderCardProps {
  id: string;
  title: string;
  message: string;
  type: "medication" | "appointment" | "custom" | "text";
  active: boolean;
  nextFireAt: string;
  schedule: string;
  courseProgress?: number;
  remainingPills?: number;
  needsToBuy?: boolean;
}

const typeConfig = {
  medication: { icon: Pill, label: "Лекарство", color: "text-success" },
  appointment: { icon: Calendar, label: "Встреча", color: "text-primary" },
  custom: { icon: Sparkles, label: "Другое", color: "text-accent" },
  text: { icon: Clock, label: "Напоминание", color: "text-muted-foreground" },
};

export const ReminderCard = ({ 
  id,
  title, 
  message, 
  type, 
  active, 
  nextFireAt, 
  schedule,
  courseProgress,
  remainingPills,
  needsToBuy
}: ReminderCardProps) => {
  const navigate = useNavigate();
  const config = typeConfig[type];
  const Icon = config.icon;
  const nextDate = new Date(nextFireAt);
  const isToday = nextDate.toDateString() === new Date().toDateString();
  
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    
    if (diff > -80 && diff < 80) {
      setSwipeOffset(diff);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    
    if (swipeOffset > 50) {
      toast.success("Прием отмечен", {
        icon: <Check className="h-4 w-4" />,
      });
      setSwipeOffset(0);
    } else if (swipeOffset < -50) {
      toast.info("Прием отложен на 30 минут", {
        icon: <Clock className="h-4 w-4" />,
      });
      setSwipeOffset(0);
    } else {
      setSwipeOffset(0);
    }
  };

  const handleClick = () => {
    if (Math.abs(swipeOffset) < 5) {
      navigate(`/reminders/${id}`);
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Фоновые индикаторы свайпа */}
      <div className="absolute inset-0 flex items-center justify-between px-6 pointer-events-none">
        <div
          className={cn(
            "flex items-center gap-2 text-success transition-opacity duration-200",
            swipeOffset > 20 ? "opacity-100" : "opacity-0"
          )}
        >
          <Check className="h-5 w-5" />
          <span className="text-sm font-medium">Принято</span>
        </div>
        <div
          className={cn(
            "flex items-center gap-2 text-warning transition-opacity duration-200",
            swipeOffset < -20 ? "opacity-100" : "opacity-0"
          )}
        >
          <span className="text-sm font-medium">Отложить</span>
          <Clock className="h-5 w-5" />
        </div>
      </div>

      {/* Основная карточка */}
      <Card 
        className={cn(
          "p-4 transition-all cursor-pointer hover:shadow-smooth-md",
          !active && "opacity-60",
          isDragging && "shadow-lg"
        )}
        style={{
          transform: `translateX(${swipeOffset}px)`,
          transition: isDragging ? "none" : "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handleClick}
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
            {needsToBuy && active && (
              <Badge
                variant="outline"
                className="text-xs bg-warning/10 text-warning border-warning/30"
              >
                <ShoppingCart className="h-3 w-3 mr-1" />
                Купить
              </Badge>
            )}
          </div>
          
          <div className="mt-2 text-xs text-muted-foreground">
            <Clock className="h-3 w-3 inline mr-1" />
            {schedule}
          </div>

          {/* Прогресс курса */}
          {type === "medication" && courseProgress !== undefined && (
            <div className="mt-3 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Прогресс курса</span>
                {remainingPills !== undefined && (
                  <span className={cn(
                    "font-medium",
                    needsToBuy ? "text-warning flex items-center gap-1" : "text-foreground"
                  )}>
                    {needsToBuy && <AlertCircle className="h-3 w-3" />}
                    {remainingPills} таб.
                  </span>
                )}
              </div>
              <Progress value={courseProgress} className="h-1.5" />
              <div className="text-xs text-muted-foreground">
                {courseProgress}% пройдено
              </div>
            </div>
          )}
        </div>
      </div>
      </Card>
    </div>
  );
};
