import { MainLayout } from "@/components/layout/MainLayout";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Crown, 
  Check, 
  Ticket,
  Zap,
  MessageSquare,
  Bell,
  Calendar
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Subscription = () => {
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState("");

  const currentPlan = {
    id: "pro",
    name: "Pro Plan",
    active: true,
  };

  const plans = [
    {
      id: "free",
      name: "Free",
      price: 0,
      currency: "₽",
      period: "месяц",
      description: "Для начинающих пользователей",
      features: [
        "5 напоминаний",
        "1 AI чат",
        "Базовые функции",
      ],
      limits: {
        reminders: 5,
        chats: 1,
        imageAnalysis: false,
      },
    },
    {
      id: "pro",
      name: "Pro",
      price: 299,
      currency: "₽",
      period: "месяц",
      description: "Для активных пользователей",
      popular: true,
      features: [
        "Неограниченные напоминания",
        "Неограниченные AI чаты",
        "Анализ изображений",
        "Приоритетная поддержка",
      ],
      limits: {
        reminders: -1,
        chats: -1,
        imageAnalysis: true,
      },
    },
    {
      id: "premium",
      name: "Premium",
      price: 599,
      currency: "₽",
      period: "месяц",
      description: "Максимальные возможности",
      features: [
        "Все из Pro",
        "Расширенная аналитика",
        "Кастомные интеграции",
        "Персональный менеджер",
      ],
      limits: {
        reminders: -1,
        chats: -1,
        imageAnalysis: true,
        analytics: true,
      },
    },
  ];

  const handleApplyPromo = () => {
    if (!promoCode.trim()) {
      toast.error("Введите промокод");
      return;
    }
    toast.success("Промокод применен!");
    setPromoCode("");
  };

  const handleSelectPlan = (planId: string) => {
    if (planId === currentPlan.id) {
      navigate("/subscription/current");
    } else {
      navigate(`/subscription/checkout/${planId}`);
    }
  };

  return (
    <MainLayout showBottomNav={false}>
      <div className="pt-3 pb-4 space-y-3">
        <div className="flex items-center gap-3 px-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Crown className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Подписки</h1>
            <p className="text-sm text-muted-foreground">
              Выберите подходящий план
            </p>
          </div>
        </div>

        {/* Промокод */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Ticket className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold">Есть промокод?</h3>
          </div>
          <div className="flex gap-2">
            <Input
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Введите промокод"
              className="flex-1"
            />
            <Button onClick={handleApplyPromo} variant="outline">
              Применить
            </Button>
          </div>
        </Card>

        {/* Планы */}
        <div className="space-y-3">
          {plans.map((plan) => {
            const isCurrent = plan.id === currentPlan.id;
            
            return (
              <Card
                key={plan.id}
                className={`p-4 space-y-4 ${
                  plan.popular ? "border-primary/50 shadow-md" : ""
                } ${isCurrent ? "border-primary" : ""}`}
              >
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-foreground">
                          {plan.name}
                        </h3>
                        {plan.popular && (
                          <Badge className="bg-primary text-primary-foreground">
                            Популярный
                          </Badge>
                        )}
                        {isCurrent && (
                          <Badge className="bg-success text-success-foreground">
                            Текущий
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {plan.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-baseline gap-1 mb-3">
                    <span className="text-3xl font-bold text-foreground">
                      {plan.price}
                    </span>
                    <span className="text-lg text-foreground">{plan.currency}</span>
                    <span className="text-sm text-muted-foreground">
                      / {plan.period}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="p-0.5 bg-success/10 rounded-full">
                          <Check className="h-3 w-3 text-success" />
                        </div>
                        <span className="text-sm text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    onClick={() => handleSelectPlan(plan.id)}
                    variant={isCurrent ? "outline" : "default"}
                    className="w-full"
                  >
                    {isCurrent ? "Управление" : "Выбрать план"}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Сравнение функций */}
        <Card className="p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">
            Сравнение возможностей
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
              <Bell className="h-4 w-4 text-primary" />
              <div className="flex-1">
                <div className="text-sm font-medium">Напоминания</div>
                <div className="text-xs text-muted-foreground">
                  Free: 5 • Pro: ∞ • Premium: ∞
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
              <MessageSquare className="h-4 w-4 text-primary" />
              <div className="flex-1">
                <div className="text-sm font-medium">AI чаты</div>
                <div className="text-xs text-muted-foreground">
                  Free: 1 • Pro: ∞ • Premium: ∞
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
              <Zap className="h-4 w-4 text-primary" />
              <div className="flex-1">
                <div className="text-sm font-medium">Анализ изображений</div>
                <div className="text-xs text-muted-foreground">
                  Free: ✗ • Pro: ✓ • Premium: ✓
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Subscription;
