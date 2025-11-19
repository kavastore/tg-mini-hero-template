import { MainLayout } from "@/components/layout/MainLayout";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  ArrowLeft,
  Bell,
  Moon,
  Globe,
  Clock,
  Smartphone,
  Shield,
  Database,
  ChevronRight
} from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

const navigate = useNavigate();

const Settings = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);

  const handleToggleNotifications = () => {
    setNotifications(!notifications);
    toast.success(notifications ? "Уведомления отключены" : "Уведомления включены");
  };

  const settingsSections = [
    {
      title: "Уведомления",
      items: [
        {
          icon: Bell,
          label: "Push-уведомления",
          type: "toggle",
          value: notifications,
          onChange: handleToggleNotifications,
        },
        {
          icon: Smartphone,
          label: "Звук уведомлений",
          type: "toggle",
          value: soundEnabled,
          onChange: () => {
            setSoundEnabled(!soundEnabled);
            toast.success(soundEnabled ? "Звук отключен" : "Звук включен");
          },
        },
        {
          icon: Smartphone,
          label: "Вибрация",
          type: "toggle",
          value: vibrationEnabled,
          onChange: () => {
            setVibrationEnabled(!vibrationEnabled);
            toast.success(vibrationEnabled ? "Вибрация отключена" : "Вибрация включена");
          },
        },
      ],
    },
    {
      title: "Внешний вид",
      items: [
        {
          icon: Moon,
          label: "Тема оформления",
          subtitle: "Следует за Telegram",
          type: "link",
          onClick: () => toast.info("Тема задается автоматически из Telegram"),
        },
      ],
    },
    {
      title: "Региональные настройки",
      items: [
        {
          icon: Globe,
          label: "Язык",
          subtitle: "Русский",
          type: "link",
          onClick: () => navigate("/settings/language"),
        },
        {
          icon: Clock,
          label: "Часовой пояс",
          subtitle: "UTC+3 (Москва)",
          type: "link",
          onClick: () => navigate("/settings/timezone"),
        },
      ],
    },
    {
      title: "Данные и конфиденциальность",
      items: [
        {
          icon: Shield,
          label: "Конфиденциальность",
          type: "link",
          onClick: () => navigate("/settings/privacy"),
        },
        {
          icon: Database,
          label: "Хранилище данных",
          subtitle: "1.2 МБ используется",
          type: "link",
          onClick: () => navigate("/settings/data-management"),
        },
      ],
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
          Настройки
        </h1>
      </div>

      <div className="pt-14 pb-4 space-y-3">
        {settingsSections.map((section, sectionIndex) => (
          <Card key={sectionIndex} className="overflow-hidden">
            <div className="px-4 pt-3 pb-2">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {section.title}
              </h3>
            </div>
            <div className="divide-y divide-border">
              {section.items.map((item, itemIndex) => {
                const Icon = item.icon;
                
                if (item.type === "toggle") {
                  return (
                    <div
                      key={itemIndex}
                      className="flex items-center gap-3 p-4"
                    >
                      <div className="p-2 bg-muted rounded-lg">
                        <Icon className="h-4 w-4 text-foreground" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-foreground">
                          {item.label}
                        </div>
                        {item.subtitle && (
                          <div className="text-xs text-muted-foreground">
                            {item.subtitle}
                          </div>
                        )}
                      </div>
                      <Switch
                        checked={item.value}
                        onCheckedChange={item.onChange}
                      />
                    </div>
                  );
                }

                return (
                  <button
                    key={itemIndex}
                    onClick={item.onClick}
                    className="w-full flex items-center gap-3 p-4 hover:bg-muted/50 transition-smooth active:scale-[0.98]"
                  >
                    <div className="p-2 bg-muted rounded-lg">
                      <Icon className="h-4 w-4 text-foreground" />
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <div className="text-sm font-medium text-foreground">
                        {item.label}
                      </div>
                      {item.subtitle && (
                        <div className="text-xs text-muted-foreground">
                          {item.subtitle}
                        </div>
                      )}
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                  </button>
                );
              })}
            </div>
          </Card>
        ))}

        {/* О приложении */}
        <Card className="p-4">
          <div className="text-center space-y-1">
            <div className="text-sm font-medium text-foreground">
              MiniApp v1.0.0
            </div>
            <div className="text-xs text-muted-foreground">
              Telegram Mini App
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Settings;
