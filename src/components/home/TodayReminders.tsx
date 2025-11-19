import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pill, CheckCircle2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface TodayReminder {
  id: string;
  medicationName: string;
  time: string;
  dosage: string;
  taken: boolean;
}

const mockTodayReminders: TodayReminder[] = [
  {
    id: "1",
    medicationName: "Витамин D3",
    time: "09:00",
    dosage: "1 таблетка",
    taken: true,
  },
  {
    id: "2",
    medicationName: "Омега-3",
    time: "14:00",
    dosage: "2 капсулы",
    taken: false,
  },
  {
    id: "3",
    medicationName: "Витамин D3",
    time: "21:00",
    dosage: "1 таблетка",
    taken: false,
  },
];

export const TodayReminders = () => {
  const handleMarkAsTaken = (id: string) => {
    toast.success("Прием отмечен!");
  };

  const nextReminder = mockTodayReminders.find((r) => !r.taken);

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-semibold text-foreground">Сегодня</h3>
        <Badge variant="secondary" className="text-xs">
          {mockTodayReminders.filter((r) => !r.taken).length} осталось
        </Badge>
      </div>

      {nextReminder && (
        <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg mb-3">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Следующий прием</span>
          </div>
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <p className="font-medium text-foreground text-sm mb-0.5">
                {nextReminder.medicationName}
              </p>
              <p className="text-xs text-muted-foreground">
                {nextReminder.time} • {nextReminder.dosage}
              </p>
            </div>
            <Button
              size="sm"
              onClick={() => handleMarkAsTaken(nextReminder.id)}
              className="shrink-0"
            >
              <CheckCircle2 className="h-4 w-4 mr-1" />
              Принял
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {mockTodayReminders.map((reminder) => (
          <div
            key={reminder.id}
            className={cn(
              "flex items-center gap-3 p-2 rounded-lg transition-smooth",
              reminder.taken ? "opacity-50" : "hover:bg-muted"
            )}
          >
            <div
              className={cn(
                "p-1.5 rounded-md",
                reminder.taken ? "bg-success/10" : "bg-muted"
              )}
            >
              {reminder.taken ? (
                <CheckCircle2 className="h-4 w-4 text-success" />
              ) : (
                <Pill className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p
                className={cn(
                  "text-sm font-medium",
                  reminder.taken
                    ? "line-through text-muted-foreground"
                    : "text-foreground"
                )}
              >
                {reminder.medicationName}
              </p>
              <p className="text-xs text-muted-foreground">
                {reminder.time} • {reminder.dosage}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
