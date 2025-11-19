import { MainLayout } from "@/components/layout/MainLayout";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useState } from "react";
import { ArrowLeft, Copy, Users, Stethoscope, Heart, Share2 } from "lucide-react";

type AccessType = "family" | "doctor" | "caregiver";

interface DataPermission {
  id: string;
  label: string;
  checked: boolean;
}

const ShareAccount = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<AccessType | null>(null);
  const [shareCode, setShareCode] = useState("");
  const [inputCode, setInputCode] = useState("");
  const [permissions, setPermissions] = useState<DataPermission[]>([
    { id: "profile", label: "Личные данные", checked: false },
    { id: "medical", label: "Медицинская информация", checked: false },
    { id: "reminders", label: "Напоминания и приемы", checked: false },
    { id: "history", label: "История приемов", checked: false },
    { id: "diagnoses", label: "Диагнозы", checked: false },
  ]);

  const accessTypes = [
    {
      type: "family" as AccessType,
      icon: Heart,
      label: "Семья",
      description: "Члены семьи могут помогать с приемом лекарств",
      color: "text-pink-500",
      bgColor: "bg-pink-500/10",
    },
    {
      type: "doctor" as AccessType,
      icon: Stethoscope,
      label: "Врач",
      description: "Врач может просматривать медицинскую информацию",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      type: "caregiver" as AccessType,
      icon: Users,
      label: "Патронаж",
      description: "Патронажная служба для ухода и контроля",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
  ];

  const generateCode = () => {
    if (!selectedType) {
      toast.error("Выберите тип доступа");
      return;
    }

    const checkedPermissions = permissions.filter(p => p.checked);
    if (checkedPermissions.length === 0) {
      toast.error("Выберите хотя бы одну категорию данных");
      return;
    }

    const code = Math.random().toString(36).substring(2, 10).toUpperCase();
    setShareCode(code);
    toast.success("Код доступа создан");
  };

  const copyCode = () => {
    navigator.clipboard.writeText(shareCode);
    toast.success("Код скопирован");
  };

  const connectWithCode = () => {
    if (!inputCode.trim()) {
      toast.error("Введите код доступа");
      return;
    }
    toast.success("Подключение выполнено успешно");
    setInputCode("");
  };

  const togglePermission = (id: string) => {
    setPermissions(prev =>
      prev.map(p => (p.id === id ? { ...p, checked: !p.checked } : p))
    );
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
        <h1 className="text-lg font-semibold text-foreground">
          Поделиться аккаунтом
        </h1>
      </div>

      <div className="pt-14 pb-6 space-y-3">
        {/* Access Types */}
        <Card className="p-4">
          <h2 className="text-base font-semibold text-foreground mb-3">
            Выберите тип доступа
          </h2>
          <div className="space-y-2">
            {accessTypes.map((type) => {
              const Icon = type.icon;
              const isSelected = selectedType === type.type;
              return (
                <button
                  key={type.type}
                  onClick={() => setSelectedType(type.type)}
                  className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${type.bgColor}`}>
                      <Icon className={`h-5 w-5 ${type.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{type.label}</p>
                      <p className="text-sm text-muted-foreground">
                        {type.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </Card>

        {/* Data Permissions */}
        <Card className="p-4">
          <h2 className="text-base font-semibold text-foreground mb-3">
            Какими данными поделиться
          </h2>
          <div className="space-y-3">
            {permissions.map((permission) => (
              <div key={permission.id} className="flex items-center space-x-3">
                <Checkbox
                  id={permission.id}
                  checked={permission.checked}
                  onCheckedChange={() => togglePermission(permission.id)}
                />
                <Label
                  htmlFor={permission.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {permission.label}
                </Label>
              </div>
            ))}
          </div>
        </Card>

        {/* Generate Code */}
        <Card className="p-4">
          <h2 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
            <Share2 className="h-5 w-5 text-primary" />
            Создать код доступа
          </h2>
          <Button onClick={generateCode} className="w-full mb-3">
            Сгенерировать код
          </Button>

          {shareCode && (
            <div className="p-3 bg-muted rounded-lg">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Код доступа
                  </p>
                  <p className="text-2xl font-bold text-foreground tracking-wider">
                    {shareCode}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={copyCode}
                  className="shrink-0"
                >
                  <Copy className="h-5 w-5" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Отправьте этот код пользователю для доступа к выбранным данным
              </p>
            </div>
          )}
        </Card>

        {/* Connect with Code */}
        <Card className="p-4">
          <h2 className="text-base font-semibold text-foreground mb-3">
            Подключиться по коду
          </h2>
          <p className="text-sm text-muted-foreground mb-3">
            Введите код доступа, полученный от другого пользователя
          </p>
          <div className="flex gap-2">
            <Input
              placeholder="Введите код"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value.toUpperCase())}
              className="flex-1"
            />
            <Button onClick={connectWithCode}>Подключить</Button>
          </div>
        </Card>

        {/* Connected Users */}
        <Card className="p-4">
          <h2 className="text-base font-semibold text-foreground mb-3">
            Подключенные пользователи
          </h2>
          <div className="space-y-2">
            <div className="p-3 bg-muted rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Stethoscope className="h-4 w-4 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Иванова М.С.
                  </p>
                  <p className="text-xs text-muted-foreground">Врач</p>
                </div>
              </div>
              <Badge variant="outline" className="text-xs">
                Активен
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground text-center py-2">
              Подключенные пользователи отобразятся здесь
            </p>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ShareAccount;
