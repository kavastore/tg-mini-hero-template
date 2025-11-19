import { MainLayout } from "@/components/layout/MainLayout";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useState } from "react";
import { ArrowLeft, Plus, Minus, Clock } from "lucide-react";

const ReminderEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    // Основная информация
    name: "Парацетамол",
    activeIngredient: "Paracetamol",
    form: "tablets",
    notes: "Принимать при головной боли",
    
    // Дозировка
    dosageAmount: "1",
    dosageUnit: "tablets",
    concentration: "500 мг",
    intakeMethod: "oral",
    
    // Расписание
    timesPerDay: "2",
    scheduleType: "fixed",
    times: ["09:00", "21:00"],
    withFood: "with",
    selectedDays: [1, 2, 3, 4, 5, 6, 0],
    
    // Курс лечения
    courseType: "indefinite",
    startDate: new Date().toISOString().split('T')[0],
    endDate: "",
    courseDays: "",
    
    // Запасы
    quantityPerPackage: "20",
    currentStock: "15",
    notifyWhenLow: true,
    lowStockThreshold: "5",
  });

  const handleAddTime = () => {
    setFormData({
      ...formData,
      times: [...formData.times, "12:00"]
    });
  };

  const handleRemoveTime = (index: number) => {
    setFormData({
      ...formData,
      times: formData.times.filter((_, i) => i !== index)
    });
  };

  const handleTimeChange = (index: number, value: string) => {
    const newTimes = [...formData.times];
    newTimes[index] = value;
    setFormData({ ...formData, times: newTimes });
  };

  const toggleDay = (day: number) => {
    const newDays = formData.selectedDays.includes(day)
      ? formData.selectedDays.filter(d => d !== day)
      : [...formData.selectedDays, day];
    setFormData({ ...formData, selectedDays: newDays });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) {
      toast.error("Введите название лекарства");
      return;
    }
    toast.success("Лекарство обновлено!");
    setTimeout(() => navigate(`/reminders/${id}`), 500);
  };

  const weekDays = [
    { value: 1, label: "Пн" },
    { value: 2, label: "Вт" },
    { value: 3, label: "Ср" },
    { value: 4, label: "Чт" },
    { value: 5, label: "Пт" },
    { value: 6, label: "Сб" },
    { value: 0, label: "Вс" },
  ];

  return (
    <MainLayout showBottomNav={false}>
      <div className="fixed top-0 left-0 right-0 z-40 bg-card border-b px-3 py-3 flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(`/reminders/${id}`)}
          className="shrink-0"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold text-foreground">
          Редактировать
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="pt-14 pb-24">
        <div className="space-y-3">
          {/* Основная информация */}
          <Card className="p-4 space-y-3">
            <h2 className="font-semibold text-foreground">Основная информация</h2>

            <div className="space-y-1.5">
              <Label htmlFor="name">Название лекарства *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Например: Парацетамол"
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="activeIngredient">Действующее вещество</Label>
              <Input
                id="activeIngredient"
                value={formData.activeIngredient}
                onChange={(e) => setFormData({ ...formData, activeIngredient: e.target.value })}
                placeholder="Например: Paracetamol"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="form">Форма выпуска</Label>
              <Select
                value={formData.form}
                onValueChange={(value) => setFormData({ ...formData, form: value })}
              >
                <SelectTrigger id="form">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tablets">Таблетки</SelectItem>
                  <SelectItem value="capsules">Капсулы</SelectItem>
                  <SelectItem value="syrup">Сироп</SelectItem>
                  <SelectItem value="drops">Капли</SelectItem>
                  <SelectItem value="injection">Инъекция</SelectItem>
                  <SelectItem value="ointment">Мазь</SelectItem>
                  <SelectItem value="spray">Спрей</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="notes">Примечания</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Дополнительная информация"
                rows={2}
              />
            </div>
          </Card>

          {/* Дозировка */}
          <Card className="p-4 space-y-3">
            <h2 className="font-semibold text-foreground">Дозировка</h2>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="dosageAmount">Количество</Label>
                <Input
                  id="dosageAmount"
                  type="number"
                  min="0.5"
                  step="0.5"
                  value={formData.dosageAmount}
                  onChange={(e) => setFormData({ ...formData, dosageAmount: e.target.value })}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="dosageUnit">Единица</Label>
                <Select
                  value={formData.dosageUnit}
                  onValueChange={(value) => setFormData({ ...formData, dosageUnit: value })}
                >
                  <SelectTrigger id="dosageUnit">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tablets">таблеток</SelectItem>
                    <SelectItem value="capsules">капсул</SelectItem>
                    <SelectItem value="ml">мл</SelectItem>
                    <SelectItem value="mg">мг</SelectItem>
                    <SelectItem value="drops">капель</SelectItem>
                    <SelectItem value="puffs">доз</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="concentration">Концентрация</Label>
              <Input
                id="concentration"
                value={formData.concentration}
                onChange={(e) => setFormData({ ...formData, concentration: e.target.value })}
                placeholder="Например: 500 мг"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="intakeMethod">Способ приема</Label>
              <Select
                value={formData.intakeMethod}
                onValueChange={(value) => setFormData({ ...formData, intakeMethod: value })}
              >
                <SelectTrigger id="intakeMethod">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="oral">Перорально (внутрь)</SelectItem>
                  <SelectItem value="sublingual">Под язык</SelectItem>
                  <SelectItem value="topical">Наружно</SelectItem>
                  <SelectItem value="injection">Инъекция</SelectItem>
                  <SelectItem value="inhalation">Ингаляция</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>

          {/* Расписание */}
          <Card className="p-4 space-y-3">
            <h2 className="font-semibold text-foreground">Расписание приема</h2>

            <div className="space-y-1.5">
              <Label htmlFor="timesPerDay">Количество приемов в день</Label>
              <Select
                value={formData.timesPerDay}
                onValueChange={(value) => setFormData({ ...formData, timesPerDay: value })}
              >
                <SelectTrigger id="timesPerDay">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 раз в день</SelectItem>
                  <SelectItem value="2">2 раза в день</SelectItem>
                  <SelectItem value="3">3 раза в день</SelectItem>
                  <SelectItem value="4">4 раза в день</SelectItem>
                  <SelectItem value="custom">Свое расписание</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Время приема</Label>
              {formData.times.map((time, index) => (
                <div key={index} className="flex gap-2">
                  <div className="flex-1 relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="time"
                      value={time}
                      onChange={(e) => handleTimeChange(index, e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  {formData.times.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => handleRemoveTime(index)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddTime}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-1" />
                Добавить время
              </Button>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="withFood">Прием с едой</Label>
              <Select
                value={formData.withFood}
                onValueChange={(value) => setFormData({ ...formData, withFood: value })}
              >
                <SelectTrigger id="withFood">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no">Не важно</SelectItem>
                  <SelectItem value="before">До еды</SelectItem>
                  <SelectItem value="with">Во время еды</SelectItem>
                  <SelectItem value="after">После еды</SelectItem>
                  <SelectItem value="empty">На голодный желудок</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Дни недели</Label>
              <div className="flex gap-1">
                {weekDays.map((day) => (
                  <Button
                    key={day.value}
                    type="button"
                    variant={formData.selectedDays.includes(day.value) ? "default" : "outline"}
                    size="sm"
                    className="flex-1 h-9"
                    onClick={() => toggleDay(day.value)}
                  >
                    {day.label}
                  </Button>
                ))}
              </div>
            </div>
          </Card>

          {/* Курс лечения */}
          <Card className="p-4 space-y-3">
            <h2 className="font-semibold text-foreground">Курс лечения</h2>

            <div className="space-y-1.5">
              <Label htmlFor="courseType">Тип курса</Label>
              <Select
                value={formData.courseType}
                onValueChange={(value) => setFormData({ ...formData, courseType: value })}
              >
                <SelectTrigger id="courseType">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="indefinite">Постоянный прием</SelectItem>
                  <SelectItem value="date">По дату окончания</SelectItem>
                  <SelectItem value="days">Определенное количество дней</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.courseType === "date" && (
              <>
                <div className="space-y-1.5">
                  <Label htmlFor="startDate">Дата начала</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="endDate">Дата окончания</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  />
                </div>
              </>
            )}

            {formData.courseType === "days" && (
              <div className="space-y-1.5">
                <Label htmlFor="courseDays">Количество дней</Label>
                <Input
                  id="courseDays"
                  type="number"
                  min="1"
                  value={formData.courseDays}
                  onChange={(e) => setFormData({ ...formData, courseDays: e.target.value })}
                  placeholder="Например: 10"
                />
              </div>
            )}
          </Card>

          {/* Запасы */}
          <Card className="p-4 space-y-3">
            <h2 className="font-semibold text-foreground">Управление запасами</h2>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="quantityPerPackage">В упаковке</Label>
                <Input
                  id="quantityPerPackage"
                  type="number"
                  min="1"
                  value={formData.quantityPerPackage}
                  onChange={(e) => setFormData({ ...formData, quantityPerPackage: e.target.value })}
                  placeholder="20"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="currentStock">Текущий остаток</Label>
                <Input
                  id="currentStock"
                  type="number"
                  min="0"
                  value={formData.currentStock}
                  onChange={(e) => setFormData({ ...formData, currentStock: e.target.value })}
                  placeholder="20"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notifyWhenLow">Напоминать о покупке</Label>
                <p className="text-xs text-muted-foreground">
                  Когда останется мало таблеток
                </p>
              </div>
              <Switch
                id="notifyWhenLow"
                checked={formData.notifyWhenLow}
                onCheckedChange={(checked) => setFormData({ ...formData, notifyWhenLow: checked })}
              />
            </div>

            {formData.notifyWhenLow && (
              <div className="space-y-1.5">
                <Label htmlFor="lowStockThreshold">Порог уведомления</Label>
                <Input
                  id="lowStockThreshold"
                  type="number"
                  min="1"
                  value={formData.lowStockThreshold}
                  onChange={(e) => setFormData({ ...formData, lowStockThreshold: e.target.value })}
                  placeholder="5"
                />
                <p className="text-xs text-muted-foreground">
                  Напомнить, когда останется меньше этого количества
                </p>
              </div>
            )}
          </Card>
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-3 bg-background border-t">
          <div className="container max-w-2xl mx-auto flex gap-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => navigate(`/reminders/${id}`)}
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

export default ReminderEdit;
