import { MainLayout } from "@/components/layout/MainLayout";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { useState } from "react";
import { ArrowLeft, Camera } from "lucide-react";

const ProfileEdit = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "Александр Иванов",
    username: "alexander_iv",
    email: "alexander@example.com",
    phone: "+7 (999) 123-45-67",
    birthDate: "1990-01-15",
    bloodType: "A(II) Rh+",
    allergies: "Пенициллин",
    chronicDiseases: "",
    emergencyContact: "+7 (999) 000-00-00",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Профиль обновлен");
    setTimeout(() => navigate("/profile"), 500);
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
          Редактировать профиль
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="pt-14 pb-24 space-y-3">
        <Card className="p-4">
          <div className="flex flex-col items-center gap-3 mb-4">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" />
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  АИ
                </AvatarFallback>
              </Avatar>
              <Button
                type="button"
                size="icon"
                className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full shadow-md"
                onClick={() => toast.info("Функция загрузки фото скоро будет доступна")}
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">Изменить фото профиля</p>
          </div>

          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="name">Имя</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ваше имя"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder="@username"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="email@example.com"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="phone">Телефон</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+7 (999) 123-45-67"
              />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h2 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-primary" />
            Медицинская информация
          </h2>
          
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="birthDate">Дата рождения</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="bloodType">Группа крови</Label>
                <Input
                  id="bloodType"
                  value={formData.bloodType}
                  onChange={(e) => setFormData({ ...formData, bloodType: e.target.value })}
                  placeholder="A(II) Rh+"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="allergies">Аллергии</Label>
              <Input
                id="allergies"
                value={formData.allergies}
                onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                placeholder="Укажите аллергены"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="chronicDiseases">Хронические заболевания</Label>
              <Input
                id="chronicDiseases"
                value={formData.chronicDiseases}
                onChange={(e) => setFormData({ ...formData, chronicDiseases: e.target.value })}
                placeholder="Через запятую"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="emergencyContact">Экстренный контакт</Label>
              <Input
                id="emergencyContact"
                type="tel"
                value={formData.emergencyContact}
                onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                placeholder="+7 (999) 000-00-00"
              />
            </div>
          </div>
        </Card>

        <div className="fixed bottom-0 left-0 right-0 p-3 bg-background border-t">
          <div className="container max-w-2xl mx-auto flex gap-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => navigate("/profile")}
            >
              Отмена
            </Button>
            <Button type="submit" className="flex-1">
              Сохранить
            </Button>
          </div>
        </div>
      </form>
    </MainLayout>
  );
};

export default ProfileEdit;
