import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Settings, 
  CreditCard, 
  HelpCircle,
  LogOut,
  ChevronRight,
  Crown
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

interface MenuItem {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  badge?: string;
  subtitle?: string;
}

const Profile = () => {
  const navigate = useNavigate();

  const profileData = {
    name: "Александр Иванов",
    username: "@alexander_iv",
    email: "alexander@example.com",
    plan: "Pro Plan",
    planStatus: "active" as const,
  };

  const menuSections: Array<{ title: string; items: MenuItem[] }> = [
    {
      title: "Аккаунт",
      items: [
        {
          icon: User,
          label: "Личные данные",
          onClick: () => navigate("/settings/profile-edit"),
        },
        {
          icon: CreditCard,
          label: "Подписка",
          badge: profileData.plan,
          onClick: () => navigate("/subscription"),
        },
      ],
    },
    {
      title: "Настройки",
      items: [
        {
          icon: Settings,
          label: "Настройки приложения",
          onClick: () => navigate("/settings"),
        },
      ],
    },
    {
      title: "Поддержка",
      items: [
        {
          icon: HelpCircle,
          label: "Помощь",
          onClick: () => navigate("/settings/help"),
        },
      ],
    },
  ];

  return (
    <MainLayout showBottomNav>
      <div className="pt-3 space-y-3 pb-6">
        {/* Profile Header */}
        <Card className="p-5">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" />
              <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                АИ
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold text-foreground truncate">
                {profileData.name}
              </h2>
              <p className="text-sm text-muted-foreground">
                {profileData.username}
              </p>
            </div>
          </div>

          {profileData.email && (
            <div className="text-sm text-muted-foreground mb-4">
              {profileData.email}
            </div>
          )}

          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => navigate("/settings/profile-edit")}
          >
            <User className="h-4 w-4 mr-2" />
            Редактировать профиль
          </Button>
        </Card>

        {/* Subscription Status */}
        <Card className="p-4 border-primary/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Crown className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">
                {profileData.plan}
              </p>
              <p className="text-xs text-muted-foreground">
                Подписка активна
              </p>
            </div>
            <Badge className="bg-success text-success-foreground">
              Активна
            </Badge>
          </div>
        </Card>

        {/* Menu Sections */}
        {menuSections.map((section, sectionIndex) => (
          <Card key={sectionIndex} className="overflow-hidden">
            {section.title && (
              <div className="px-4 pt-3 pb-2">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {section.title}
                </h3>
              </div>
            )}
            <div className="divide-y divide-border">
              {section.items.map((item, itemIndex) => {
                const Icon = item.icon;
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
                    {item.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {item.badge}
                      </Badge>
                    )}
                    <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                  </button>
                );
              })}
            </div>
          </Card>
        ))}

        {/* Logout Button */}
        <Card className="overflow-hidden">
          <button
            onClick={() => {
              if (confirm("Вы уверены, что хотите выйти?")) {
                alert("Выход из аккаунта");
              }
            }}
            className="w-full flex items-center gap-3 p-4 hover:bg-destructive/10 transition-smooth active:scale-[0.98]"
          >
            <div className="p-2 bg-destructive/10 rounded-lg">
              <LogOut className="h-4 w-4 text-destructive" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-sm font-medium text-destructive">
                Выйти из аккаунта
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-destructive shrink-0" />
          </button>
        </Card>

        {/* App Version */}
        <div className="text-center text-xs text-muted-foreground pt-2">
          Версия 1.0.0
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
