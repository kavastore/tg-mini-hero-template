import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Heart,
  FileText,
  Pill,
  Activity,
  Calendar,
  TrendingUp,
  Plus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const MedicalCard = () => {
  const navigate = useNavigate();

  const medicalData = {
    diagnoses: [
      {
        id: "1",
        name: "Дефицит витамина D",
        date: "2024-03-15",
        status: "active" as const,
        doctor: "Терапевт Иванова А.И.",
      },
      {
        id: "2",
        name: "Гипертония 1 степени",
        date: "2023-11-20",
        status: "monitoring" as const,
        doctor: "Кардиолог Петров С.М.",
      },
    ],
    prescriptions: [
      {
        id: "1",
        medication: "Витамин D3",
        doctor: "Иванова А.И.",
        date: "2024-03-15",
        duration: "3 месяца",
        status: "active" as const,
      },
      {
        id: "2",
        medication: "Омега-3",
        doctor: "Иванова А.И.",
        date: "2024-03-15",
        duration: "2 месяца",
        status: "active" as const,
      },
    ],
    completedCourses: [
      {
        id: "1",
        medication: "Магний B6",
        startDate: "2024-01-10",
        endDate: "2024-02-10",
        totalDays: 30,
        adherence: 96,
      },
      {
        id: "2",
        medication: "Витамин C",
        startDate: "2023-12-01",
        endDate: "2023-12-31",
        totalDays: 30,
        adherence: 100,
      },
    ],
    stats: {
      totalCourses: 5,
      activeCourses: 2,
      averageAdherence: 94,
      totalMedications: 12,
    },
  };

  return (
    <MainLayout showBottomNav={false}>
      <div className="fixed top-0 left-0 right-0 z-40 bg-card border-b px-3 py-3 flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/profile")}
          className="shrink-0"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold text-foreground truncate">
          Медицинская карта
        </h1>
      </div>

      <div className="pt-14 pb-4 space-y-3">
        {/* Общая статистика */}
        <Card className="p-4">
          <h2 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" />
            Общая статистика
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-foreground mb-1">
                {medicalData.stats.totalCourses}
              </div>
              <div className="text-xs text-muted-foreground">Всего курсов</div>
            </div>
            <div className="p-3 bg-primary/5 rounded-lg">
              <div className="text-2xl font-bold text-primary mb-1">
                {medicalData.stats.activeCourses}
              </div>
              <div className="text-xs text-muted-foreground">Активных</div>
            </div>
            <div className="p-3 bg-success/5 rounded-lg">
              <div className="text-2xl font-bold text-success mb-1">
                {medicalData.stats.averageAdherence}%
              </div>
              <div className="text-xs text-muted-foreground">Соблюдение</div>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-foreground mb-1">
                {medicalData.stats.totalMedications}
              </div>
              <div className="text-xs text-muted-foreground">Лекарств принято</div>
            </div>
          </div>
        </Card>

        {/* Диагнозы */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
              <Heart className="h-4 w-4 text-primary" />
              Диагнозы
            </h2>
            <Button variant="ghost" size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-3">
            {medicalData.diagnoses.map((diagnosis, index) => (
              <div key={diagnosis.id}>
                {index > 0 && <Separator className="my-3" />}
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-medium text-foreground text-sm">
                      {diagnosis.name}
                    </h3>
                    <Badge
                      variant={diagnosis.status === "active" ? "default" : "secondary"}
                      className="text-xs shrink-0"
                    >
                      {diagnosis.status === "active" ? "Активный" : "Наблюдение"}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">
                      Врач: {diagnosis.doctor}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Дата: {new Date(diagnosis.date).toLocaleDateString("ru-RU")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Назначения */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              Текущие назначения
            </h2>
            <Badge variant="secondary" className="text-xs">
              {medicalData.prescriptions.length}
            </Badge>
          </div>
          <div className="space-y-3">
            {medicalData.prescriptions.map((prescription, index) => (
              <div key={prescription.id}>
                {index > 0 && <Separator className="my-3" />}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Pill className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground text-sm mb-1">
                      {prescription.medication}
                    </h3>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">
                        Врач: {prescription.doctor}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Курс: {prescription.duration}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Назначено: {new Date(prescription.date).toLocaleDateString("ru-RU")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Пройденные курсы */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              Пройденные курсы
            </h2>
            <Button variant="ghost" size="sm" onClick={() => navigate("/statistics")}>
              Все
            </Button>
          </div>
          <div className="space-y-3">
            {medicalData.completedCourses.slice(0, 3).map((course, index) => (
              <div key={course.id}>
                {index > 0 && <Separator className="my-3" />}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-success/10 rounded-lg">
                    <TrendingUp className="h-4 w-4 text-success" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-foreground text-sm">
                        {course.medication}
                      </h3>
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-xs",
                          course.adherence >= 90
                            ? "bg-success/10 text-success border-success/30"
                            : "bg-warning/10 text-warning border-warning/30"
                        )}
                      >
                        {course.adherence}%
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">
                        {course.totalDays} дней
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(course.startDate).toLocaleDateString("ru-RU")} -{" "}
                        {new Date(course.endDate).toLocaleDateString("ru-RU")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default MedicalCard;
