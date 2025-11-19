import { MainLayout } from "@/components/layout/MainLayout";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);

  // Mock данные - история приемов по датам
  const medicationHistory: Record<number, Array<{ name: string; taken: boolean; time: string }>> = {
    15: [
      { name: "Витамин D3", taken: true, time: "10:00" },
      { name: "Омега-3", taken: true, time: "09:00" },
    ],
    16: [
      { name: "Витамин D3", taken: true, time: "10:00" },
      { name: "Омега-3", taken: false, time: "09:00" },
    ],
    17: [
      { name: "Витамин D3", taken: true, time: "10:00" },
      { name: "Омега-3", taken: true, time: "09:00" },
    ],
    18: [
      { name: "Витамин D3", taken: false, time: "10:00" },
      { name: "Омега-3", taken: true, time: "09:00" },
    ],
    19: [
      { name: "Витамин D3", taken: true, time: "10:00" },
      { name: "Омега-3", taken: true, time: "09:00" },
    ],
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const monthName = currentDate.toLocaleDateString("ru-RU", { month: "long", year: "numeric" });
  const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

  return (
    <MainLayout showBottomNav>
      <div className="pt-3 space-y-3">
        <h1 className="text-2xl font-bold text-foreground mb-2">Календарь</h1>
        
        <Card className="p-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold capitalize">{monthName}</h2>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={prevMonth}
                className="h-9 w-9"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextMonth}
                className="h-9 w-9"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((day) => (
              <div
                key={day}
                className="text-center text-xs font-medium text-muted-foreground py-2"
              >
                {day}
              </div>
            ))}

            {Array.from({ length: startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1 }).map(
              (_, i) => (
                <div key={`empty-${i}`} />
              )
            )}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isToday = day === new Date().getDate() && 
                            currentDate.getMonth() === new Date().getMonth() &&
                            currentDate.getFullYear() === new Date().getFullYear();
              const dayHistory = medicationHistory[day];
              const hasHistory = dayHistory && dayHistory.length > 0;
              const allTaken = dayHistory?.every(h => h.taken);
              const someMissed = dayHistory?.some(h => !h.taken);

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(day === selectedDate ? null : day)}
                  className={cn(
                    "relative aspect-square flex flex-col items-center justify-center rounded-lg text-sm transition-smooth",
                    isToday
                      ? "bg-primary text-primary-foreground font-bold"
                      : "hover:bg-muted",
                    hasHistory && !isToday && "font-semibold",
                    selectedDate === day && "ring-2 ring-primary ring-offset-2"
                  )}
                >
                  <span>{day}</span>
                  {hasHistory && (
                    <div className="absolute bottom-1 flex gap-0.5">
                      {allTaken && (
                        <div className="h-1.5 w-1.5 rounded-full bg-success" />
                      )}
                      {someMissed && !allTaken && (
                        <div className="h-1.5 w-1.5 rounded-full bg-warning" />
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </Card>

        {/* История выбранного дня */}
        {selectedDate && medicationHistory[selectedDate] && (
          <Card className="p-4 animate-in slide-in-from-top-2">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-foreground">
                {selectedDate} {currentDate.toLocaleDateString("ru-RU", { month: "long" })}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedDate(null)}
              >
                Закрыть
              </Button>
            </div>
            <div className="space-y-2">
              {medicationHistory[selectedDate].map((record, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-2 rounded-lg bg-muted/50"
                >
                  {record.taken ? (
                    <CheckCircle2 className="h-5 w-5 text-success shrink-0" />
                  ) : (
                    <XCircle className="h-5 w-5 text-warning shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {record.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{record.time}</p>
                  </div>
                  <Badge
                    variant={record.taken ? "default" : "secondary"}
                    className={cn(
                      "text-xs",
                      record.taken
                        ? "bg-success/10 text-success border-success/30"
                        : "bg-warning/10 text-warning border-warning/30"
                    )}
                  >
                    {record.taken ? "Принял" : "Пропустил"}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Легенда */}
        <Card className="p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">Обозначения</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <div className="h-3 w-3 rounded-full bg-success" />
              <span className="text-muted-foreground">Все приемы выполнены</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="h-3 w-3 rounded-full bg-warning" />
              <span className="text-muted-foreground">Есть пропущенные приемы</span>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Calendar;
