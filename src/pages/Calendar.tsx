import { MainLayout } from "@/components/layout/MainLayout";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

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

  // Mock данные - напоминания по датам
  const reminders: Record<number, number> = {
    19: 3,
    20: 1,
    21: 2,
    25: 4,
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
    <MainLayout title="Календарь" showBottomNav>
      <div className="py-4 space-y-4">
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
              const hasReminders = reminders[day];

              return (
                <button
                  key={day}
                  className={cn(
                    "relative aspect-square flex flex-col items-center justify-center rounded-lg text-sm transition-smooth",
                    isToday
                      ? "bg-primary text-primary-foreground font-bold"
                      : "hover:bg-muted",
                    hasReminders && !isToday && "font-semibold"
                  )}
                >
                  <span>{day}</span>
                  {hasReminders && (
                    <Badge
                      variant="secondary"
                      className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px]"
                    >
                      {hasReminders}
                    </Badge>
                  )}
                </button>
              );
            })}
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <CalendarIcon className="h-4 w-4 text-primary" />
            <h3 className="font-semibold">Сегодня</h3>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
              <span className="text-sm">Принять лекарство</span>
              <span className="text-xs text-muted-foreground">10:00</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
              <span className="text-sm">Встреча с командой</span>
              <span className="text-xs text-muted-foreground">14:30</span>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}

export default Calendar;
