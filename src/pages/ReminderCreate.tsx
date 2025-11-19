import { MainLayout } from "@/components/layout/MainLayout";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useState } from "react";

const ReminderCreate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    type: "text",
    schedule: "simple",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.message) {
      toast.error("Заполните все обязательные поля");
      return;
    }
    toast.success("Напоминание создано!");
    setTimeout(() => navigate("/reminders"), 500);
  };

  return (
    <MainLayout
      title="Создать напоминание"
      showBack
      onBack={() => navigate("/reminders")}
      showBottomNav={false}
    >
      <form onSubmit={handleSubmit} className="py-4 space-y-4">
        <Card className="p-5 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Название *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Например: Принять лекарство"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Сообщение *</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Подробное описание напоминания"
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Тип</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => setFormData({ ...formData, type: value })}
            >
              <SelectTrigger id="type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Напоминание</SelectItem>
                <SelectItem value="medication">Лекарство</SelectItem>
                <SelectItem value="appointment">Встреча</SelectItem>
                <SelectItem value="custom">Другое</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="schedule">Расписание</Label>
            <Select
              value={formData.schedule}
              onValueChange={(value) => setFormData({ ...formData, schedule: value })}
            >
              <SelectTrigger id="schedule">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="simple">Разовое</SelectItem>
                <SelectItem value="course">Курс (на N дней)</SelectItem>
                <SelectItem value="indefinite">Постоянное</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={() => navigate("/reminders")}
          >
            Отмена
          </Button>
          <Button type="submit" className="flex-1">
            Создать
          </Button>
        </div>
      </form>
    </MainLayout>
  );
};

export default ReminderCreate;
