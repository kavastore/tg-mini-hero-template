import { MainLayout } from "@/components/layout/MainLayout";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useState } from "react";
import { ArrowLeft, Stethoscope } from "lucide-react";

const DiagnosisCreate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    diagnosis: "",
    doctor: "",
    specialization: "",
    date: new Date().toISOString().split('T')[0],
    status: "active",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Диагноз добавлен в медицинскую карту");
    setTimeout(() => navigate("/medical-card"), 500);
  };

  return (
    <MainLayout showBottomNav={false}>
      <div className="fixed top-0 left-0 right-0 z-40 bg-card border-b px-3 py-3 flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/medical-card")}
          className="shrink-0"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <Stethoscope className="h-5 w-5 text-primary shrink-0" />
        <h1 className="text-lg font-semibold text-foreground">Добавить диагноз</h1>
      </div>

      <form onSubmit={handleSubmit} className="pt-14 pb-24 space-y-3">
        <Card className="p-4 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="diagnosis">Диагноз *</Label>
            <Input
              id="diagnosis"
              value={formData.diagnosis}
              onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
              placeholder="Например: ОРВИ, Гипертония"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="doctor">Врач *</Label>
              <Input
                id="doctor"
                value={formData.doctor}
                onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                placeholder="Иванов И.И."
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="specialization">Специализация</Label>
              <Input
                id="specialization"
                value={formData.specialization}
                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                placeholder="Терапевт"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="date">Дата постановки *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="status">Статус</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Активный</SelectItem>
                  <SelectItem value="monitoring">Наблюдение</SelectItem>
                  <SelectItem value="cured">Вылечен</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="notes">Примечания</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Дополнительная информация о диагнозе..."
              rows={3}
            />
          </div>
        </Card>

        <div className="fixed bottom-0 left-0 right-0 p-3 bg-card border-t flex gap-2">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={() => navigate("/medical-card")}
          >
            Отмена
          </Button>
          <Button type="submit" className="flex-1">
            Добавить
          </Button>
        </div>
      </form>
    </MainLayout>
  );
};

export default DiagnosisCreate;
