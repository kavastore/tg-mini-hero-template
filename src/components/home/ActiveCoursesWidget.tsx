import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Pill, AlertCircle, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface Course {
  id: string;
  medicationName: string;
  progress: number;
  remainingPills: number;
  totalPills: number;
  daysLeft: number;
  totalDays: number;
  needsToBuy: boolean;
}

const mockCourses: Course[] = [
  {
    id: "1",
    medicationName: "Витамин D3",
    progress: 65,
    remainingPills: 14,
    totalPills: 40,
    daysLeft: 14,
    totalDays: 40,
    needsToBuy: false,
  },
  {
    id: "2",
    medicationName: "Омега-3",
    progress: 85,
    remainingPills: 6,
    totalPills: 40,
    daysLeft: 6,
    totalDays: 40,
    needsToBuy: true,
  },
];

export const ActiveCoursesWidget = () => {
  const navigate = useNavigate();

  if (mockCourses.length === 0) return null;

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-semibold text-foreground">Активные курсы</h3>
        <Badge variant="secondary" className="text-xs">
          {mockCourses.length}
        </Badge>
      </div>

      <div className="space-y-3">
        {mockCourses.map((course) => (
          <div
            key={course.id}
            onClick={() => navigate(`/reminders/${course.id}`)}
            className="p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-smooth"
          >
            <div className="flex items-start gap-3 mb-2">
              <div className="p-1.5 bg-primary/10 rounded-md">
                <Pill className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-foreground text-sm truncate">
                    {course.medicationName}
                  </h4>
                  {course.needsToBuy && (
                    <Badge
                      variant="outline"
                      className="bg-warning/10 text-warning border-warning/30 text-xs shrink-0"
                    >
                      <ShoppingCart className="h-3 w-3 mr-1" />
                      Купить
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{course.daysLeft} из {course.totalDays} дней</span>
                  <span>•</span>
                  <span className={cn(
                    course.needsToBuy && "text-warning font-medium"
                  )}>
                    {course.remainingPills} таб.
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <Progress value={course.progress} className="h-2" />
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{course.progress}% пройдено</span>
                {course.needsToBuy && (
                  <span className="text-warning flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    Заканчиваются
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
