import { MainLayout } from "@/components/layout/MainLayout";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft,
  Crown,
  Calendar,
  CreditCard,
  TrendingUp,
  Bell,
  MessageSquare,
  Image as ImageIcon
} from "lucide-react";

const CurrentSubscription = () => {
  const navigate = useNavigate();

  const subscription = {
    plan: "Pro Plan",
    status: "active",
    startDate: "2025-11-01",
    endDate: "2025-12-01",
    autoRenew: true,
    price: 299,
    currency: "₽",
  };

  const usage = {
    reminders: { used: 12, limit: -1 },
    chats: { used: 3, limit: -1 },
    imageAnalysis: { used: 5, limit: 100 },
  };

  const payments = [
    {
      id: "1",
      date: "2025-11-01",
      amount: 299,
      status: "paid",
      method: "Карта •••• 1234",
    },
    {
      id: "2",
      date: "2025-10-01",
      amount: 299,
      status: "paid",
      method: "Карта •••• 1234",
    },
  ];

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
        <h1 className="text-lg font-semibold text-foreground">
          Моя подписка
        </h1>
      </div>

      <div className="pt-14 pb-4 space-y-3">
        {/* Текущая подписка */}
        <Card className="p-5 border-primary/20">
          <div className="flex items-start gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Crown className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-bold text-foreground">
                  {subscription.plan}
                </h2>
                <Badge className="bg-success text-success-foreground">
                  Активна
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {subscription.price} {subscription.currency} / месяц
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-3 border-t">
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1">
                <div className="text-xs text-muted-foreground">
                  Следующий платеж
                </div>
                <div className="text-sm font-medium">
                  {new Date(subscription.endDate).toLocaleDateString("ru-RU")}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1">
                <div className="text-xs text-muted-foreground">
                  Способ оплаты
                </div>
                <div className="text-sm font-medium">
                  Карта •••• 1234
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => navigate("/subscription")}
            >
              Сменить план
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => alert("Управление платежами")}
            >
              Оплата
            </Button>
          </div>
        </Card>

        {/* Использование */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold">Использование</h3>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Напоминания</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {usage.reminders.used} / ∞
                </span>
              </div>
              <div className="text-xs text-muted-foreground">
                Неограниченно
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">AI чаты</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {usage.chats.used} / ∞
                </span>
              </div>
              <div className="text-xs text-muted-foreground">
                Неограниченно
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Анализ изображений</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {usage.imageAnalysis.used} / {usage.imageAnalysis.limit}
                </span>
              </div>
              <Progress 
                value={(usage.imageAnalysis.used / usage.imageAnalysis.limit) * 100} 
                className="h-2"
              />
              <div className="text-xs text-muted-foreground mt-1">
                Осталось {usage.imageAnalysis.limit - usage.imageAnalysis.used} запросов
              </div>
            </div>
          </div>
        </Card>

        {/* История платежей */}
        <Card className="p-4">
          <h3 className="text-sm font-semibold mb-3">История платежей</h3>
          <div className="space-y-2">
            {payments.map((payment) => (
              <div
                key={payment.id}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
              >
                <div>
                  <div className="text-sm font-medium">
                    {payment.amount} {subscription.currency}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(payment.date).toLocaleDateString("ru-RU")}
                  </div>
                </div>
                <div className="text-right">
                  <Badge className="bg-success text-success-foreground text-xs">
                    Оплачено
                  </Badge>
                  <div className="text-xs text-muted-foreground mt-1">
                    {payment.method}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Отмена подписки */}
        <Card className="p-4">
          <Button
            variant="outline"
            className="w-full text-destructive hover:bg-destructive/10"
            onClick={() => navigate("/subscription/cancel")}
          >
            Отменить подписку
          </Button>
          <p className="text-xs text-center text-muted-foreground mt-2">
            Подписка будет активна до {new Date(subscription.endDate).toLocaleDateString("ru-RU")}
          </p>
        </Card>
      </div>
    </MainLayout>
  );
};

export default CurrentSubscription;
