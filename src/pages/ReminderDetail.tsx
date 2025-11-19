import { MainLayout } from "@/components/layout/MainLayout";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Send, 
  Clock, 
  Calendar as CalendarIcon,
  Pill,
  CheckCircle2,
  XCircle,
  Clock3
} from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

const ReminderDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [active, setActive] = useState(true);

  // Mock данные
  const reminder = {
    id: id || "1",
    title: "Принять лекарство",
    message: "Не забудь принять витамины с едой",
    type: "medication",
    active: active,
    schedule: "Каждый день в 10:00 и 22:00",
    nextFireAt: "2025-11-19T22:00:00",
    lastFireAt: "2025-11-19T10:00:00",
    createdAt: "2025-11-10T12:00:00",
  };

  const logs = [
    {
      id: "1",
      firedAt: "2025-11-19T10:00:00",
      status: "responded",
      response: "Принял",
    },
    {
      id: "2",
      firedAt: "2025-11-18T22:00:00",
      status: "responded",
      response: "Принял",
    },
    {
      id: "3",
      firedAt: "2025-11-18T10:00:00",
      status: "responded",
      response: "Пропустил",
    },
  ];

  const handleToggleActive = () => {
    setActive(!active);
    toast.success(active ? "Напоминание отключено" : "Напоминание включено");
  };

  const handleTestSend = () => {
    toast.success("Тестовое уведомление отправлено!");
  };

  const handleDelete = () => {
    navigate("/reminders/delete-confirm/" + id);
  };

  const getStatusConfig = (status: string, response?: string) => {
    if (status === "responded" && response === "Принял") {
      return {
        icon: CheckCircle2,
        label: "Принял",
        color: "text-success",
        bg: "bg-success/10",
      };
    }
    if (status === "responded" && response === "Пропустил") {
      return {
        icon: XCircle,
        label: "Пропустил",
        color: "text-warning",
        bg: "bg-warning/10",
      };
    }
    return {
      icon: Clock3,
      label: "Отправлено",
      color: "text-muted-foreground",
      bg: "bg-muted",
    };
  };

  return (
    <MainLayout showBottomNav={false}>
      <div className="fixed top-0 left-0 right-0 z-40 bg-card border-b px-3 py-3 flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/reminders")}
          className="shrink-0"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold text-foreground truncate flex-1">
          {reminder.title}
        </h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(`/reminders/${id}/edit`)}
          className="shrink-0"
        >
          <Edit className="h-5 w-5" />
        </Button>
      </div>

      <div className="pt-14 pb-4 space-y-3">
        {/* Основная информация */}
        <Card className="p-4 space-y-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Pill className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-foreground mb-1">
                {reminder.title}
              </h2>
              <p className="text-sm text-muted-foreground mb-3">
                {reminder.message}
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Лекарство</Badge>
                <Badge variant={active ? "default" : "secondary"} className={active ? "bg-success" : ""}>
                  {active ? "Активно" : "Неактивно"}
                </Badge>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t space-y-3">
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1">
                <div className="text-xs text-muted-foreground">Расписание</div>
                <div className="text-sm font-medium">{reminder.schedule}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1">
                <div className="text-xs text-muted-foreground">Следующее</div>
                <div className="text-sm font-medium">
                  {new Date(reminder.nextFireAt).toLocaleString("ru-RU")}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Действия */}
        <Card className="p-3 space-y-2">
          <div className="flex items-center justify-between p-2">
            <div className="flex items-center gap-3">
              <Switch checked={active} onCheckedChange={handleToggleActive} />
              <span className="text-sm font-medium">Активно</span>
            </div>
          </div>

          <button
            onClick={handleTestSend}
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-smooth"
          >
            <div className="p-2 bg-primary/10 rounded-lg">
              <Send className="h-4 w-4 text-primary" />
            </div>
            <span className="text-sm font-medium flex-1 text-left">
              Тестовая отправка
            </span>
          </button>

          <button
            onClick={handleDelete}
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-destructive/10 transition-smooth"
          >
            <div className="p-2 bg-destructive/10 rounded-lg">
              <Trash2 className="h-4 w-4 text-destructive" />
            </div>
            <span className="text-sm font-medium text-destructive flex-1 text-left">
              Удалить напоминание
            </span>
          </button>
        </Card>

        {/* История */}
        <Card className="p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">
            История срабатываний
          </h3>
          <div className="space-y-2">
            {logs.map((log) => {
              const config = getStatusConfig(log.status, log.response);
              const Icon = config.icon;
              
              return (
                <div
                  key={log.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                >
                  <div className={`p-2 ${config.bg} rounded-lg`}>
                    <Icon className={`h-4 w-4 ${config.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium">{config.label}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(log.firedAt).toLocaleString("ru-RU")}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ReminderDetail;
