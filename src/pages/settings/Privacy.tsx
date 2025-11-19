import { MainLayout } from "@/components/layout/MainLayout";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useState } from "react";
import { ArrowLeft, Shield, Eye, Lock, Database } from "lucide-react";

const Privacy = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    shareData: false,
    analytics: true,
    personalizedAds: false,
    biometric: false,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    toast.success("Настройка обновлена");
  };

  return (
    <MainLayout showBottomNav={false}>
      <div className="fixed top-0 left-0 right-0 z-40 bg-card border-b px-3 py-3 flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/settings")}
          className="shrink-0"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold text-foreground">
          Конфиденциальность
        </h1>
      </div>

      <div className="pt-14 pb-6 space-y-3">
        <Card className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3 flex-1">
              <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                <Database className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground">Делиться анонимными данными</p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Помогает улучшить приложение
                </p>
              </div>
            </div>
            <Switch
              checked={settings.shareData}
              onCheckedChange={() => handleToggle("shareData")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3 flex-1">
              <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                <Eye className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground">Аналитика использования</p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Отслеживание взаимодействий
                </p>
              </div>
            </div>
            <Switch
              checked={settings.analytics}
              onCheckedChange={() => handleToggle("analytics")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3 flex-1">
              <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                <Shield className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground">Персонализированная реклама</p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Показывать релевантные объявления
                </p>
              </div>
            </div>
            <Switch
              checked={settings.personalizedAds}
              onCheckedChange={() => handleToggle("personalizedAds")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3 flex-1">
              <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                <Lock className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground">Биометрическая защита</p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Вход по отпечатку или Face ID
                </p>
              </div>
            </div>
            <Switch
              checked={settings.biometric}
              onCheckedChange={() => handleToggle("biometric")}
            />
          </div>
        </Card>

        <Card className="p-4 space-y-3">
          <h3 className="font-semibold text-foreground">Ваши данные</h3>
          <p className="text-sm text-muted-foreground">
            Все медицинские данные надежно зашифрованы и хранятся локально на вашем устройстве. 
            Мы не передаем вашу информацию третьим лицам без вашего согласия.
          </p>
          <Button variant="outline" className="w-full" onClick={() => navigate("/settings/data-management")}>
            Управление данными
          </Button>
        </Card>

        <Card className="p-4">
          <p className="text-sm text-muted-foreground">
            Подробнее о том, как мы обрабатываем ваши данные, читайте в{" "}
            <a href="#" className="text-primary hover:underline">Политике конфиденциальности</a>.
          </p>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Privacy;
