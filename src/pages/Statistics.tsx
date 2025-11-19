import { MainLayout } from "@/components/layout/MainLayout";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  TrendingUp, 
  Calendar, 
  CheckCircle2, 
  XCircle,
  Download,
  Clock,
  Pill
} from "lucide-react";

const Statistics = () => {
  const navigate = useNavigate();

  const stats = {
    todayTaken: 3,
    todayTotal: 4,
    weekCompliance: 85,
    monthCompliance: 78,
    currentStreak: 12,
    missedThisWeek: 2,
  };

  const recentMedications = [
    { name: "Парацетамол", time: "09:00", status: "taken", date: "Сегодня" },
    { name: "Витамин D", time: "12:00", status: "taken", date: "Сегодня" },
    { name: "Омега-3", time: "18:00", status: "taken", date: "Сегодня" },
    { name: "Магний", time: "21:00", status: "pending", date: "Сегодня" },
    { name: "Парацетамол", time: "09:00", status: "missed", date: "Вчера" },
  ];

  return (
    <MainLayout showBottomNav>
      <div className="fixed top-0 left-0 right-0 z-40 bg-card border-b px-3 py-3 flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/")}
          className="shrink-0"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold text-foreground">
          Статистика
        </h1>
      </div>

      <div className="pt-14 pb-6 space-y-3">
        {/* Сегодня */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-foreground">Сегодня</h2>
            <Badge variant={stats.todayTaken === stats.todayTotal ? "default" : "secondary"}>
              {stats.todayTaken} из {stats.todayTotal}
            </Badge>
          </div>
          <Progress 
            value={(stats.todayTaken / stats.todayTotal) * 100} 
            className="h-2 mb-2"
          />
          <p className="text-sm text-muted-foreground">
            {stats.todayTaken === stats.todayTotal 
              ? "Все лекарства приняты ✓" 
              : `Осталось принять: ${stats.todayTotal - stats.todayTaken}`
            }
          </p>
        </Card>

        {/* Основная статистика */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-success/10 rounded-lg">
                <TrendingUp className="h-4 w-4 text-success" />
              </div>
              <span className="text-sm text-muted-foreground">Неделя</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{stats.weekCompliance}%</p>
            <p className="text-xs text-muted-foreground mt-1">соблюдение</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Calendar className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Месяц</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{stats.monthCompliance}%</p>
            <p className="text-xs text-muted-foreground mt-1">соблюдение</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-accent/10 rounded-lg">
                <CheckCircle2 className="h-4 w-4 text-accent" />
              </div>
              <span className="text-sm text-muted-foreground">Стрик</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{stats.currentStreak}</p>
            <p className="text-xs text-muted-foreground mt-1">дней подряд</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-destructive/10 rounded-lg">
                <XCircle className="h-4 w-4 text-destructive" />
              </div>
              <span className="text-sm text-muted-foreground">Пропуски</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{stats.missedThisWeek}</p>
            <p className="text-xs text-muted-foreground mt-1">за неделю</p>
          </Card>
        </div>

        {/* Последние приемы */}
        <Card className="p-4">
          <h2 className="font-semibold text-foreground mb-3">История приемов</h2>
          <div className="space-y-2">
            {recentMedications.map((med, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className={`p-2 rounded-lg ${
                  med.status === "taken" 
                    ? "bg-success/10" 
                    : med.status === "pending"
                    ? "bg-warning/10"
                    : "bg-destructive/10"
                }`}>
                  {med.status === "taken" ? (
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  ) : med.status === "pending" ? (
                    <Clock className="h-4 w-4 text-warning" />
                  ) : (
                    <XCircle className="h-4 w-4 text-destructive" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground truncate">{med.name}</p>
                  <p className="text-xs text-muted-foreground">{med.date} в {med.time}</p>
                </div>
                <Badge variant={
                  med.status === "taken" 
                    ? "default" 
                    : med.status === "pending"
                    ? "secondary"
                    : "destructive"
                } className="text-xs">
                  {med.status === "taken" ? "Принято" : med.status === "pending" ? "Ожидает" : "Пропущено"}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Экспорт */}
        <Card className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Pill className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">Отчет для врача</h3>
              <p className="text-sm text-muted-foreground">
                Экспортируйте историю приема лекарств
              </p>
            </div>
          </div>
          <Button variant="outline" className="w-full">
            <Download className="h-4 w-4 mr-2" />
            Скачать PDF отчет
          </Button>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Statistics;
