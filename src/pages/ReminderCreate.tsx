import { MainLayout } from "@/components/layout/MainLayout";
import { useNavigate, useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useState } from "react";
import { ArrowLeft, Camera, Plus, Minus, Clock } from "lucide-react";

const ReminderCreate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const scannedData = location.state?.scannedData;

  const [formData, setFormData] = useState({
    // Тип напоминания
    reminderType: "medication",
    
    // Основная информация
    name: scannedData?.name || "",
    activeIngredient: scannedData?.activeIngredient || "",
    form: scannedData?.form || "tablets",
    notes: "",
    
    // Для процедур
    procedureType: "",
    duration: "",
    
    // Для приема у врача
    doctorName: "",
    specialty: "",
    clinic: "",
    appointmentDate: "",
    appointmentTime: "",
    
    // Дозировка
    dosageAmount: scannedData?.dosage?.match(/\d+/)?.[0] || "1",
    dosageUnit: "tablets",
    concentration: scannedData?.dosage || "",
    intakeMethod: "oral",
    
    // Расписание
    timesPerDay: "2",
    scheduleType: "fixed",
    times: ["09:00", "21:00"],
    withFood: "no",
    selectedDays: [1, 2, 3, 4, 5, 6, 0], // Все дни
    
    // Курс лечения
    courseType: "indefinite",
    startDate: new Date().toISOString().split('T')[0],
    endDate: "",
    courseDays: "",
    
    // Запасы
    quantityPerPackage: scannedData?.quantity || "",
    currentStock: "",
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
    if (!formData.name && formData.reminderType !== "other") {
      toast.error("Заполните обязательные поля");
      return;
    }
    const typeNames = {
      medication: "Лекарство",
      procedure: "Процедура",
      doctor: "Прием у врача",
      other: "Напоминание"
    };
    toast.success(`${typeNames[formData.reminderType as keyof typeof typeNames]} добавлено!`);
    setTimeout(() => navigate("/reminders"), 500);
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
          onClick={() => navigate("/reminders")}
          className="shrink-0"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold text-foreground">
          Создать напоминание
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="pt-14 pb-24">
        <div className="space-y-3">
          {/* Тип напоминания */}
          <Card className="p-4 space-y-3">
            <h2 className="font-semibold text-foreground">Тип напоминания</h2>
            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant={formData.reminderType === "medication" ? "default" : "outline"}
                className="h-auto py-3 flex-col gap-1"
                onClick={() => setFormData({ ...formData, reminderType: "medication" })}
              >
                <span className="text-sm font-medium">💊 Лекарство</span>
              </Button>
              <Button
                type="button"
                variant={formData.reminderType === "procedure" ? "default" : "outline"}
                className="h-auto py-3 flex-col gap-1"
                onClick={() => setFormData({ ...formData, reminderType: "procedure" })}
              >
                <span className="text-sm font-medium">🏥 Процедура</span>
              </Button>
              <Button
                type="button"
                variant={formData.reminderType === "doctor" ? "default" : "outline"}
                className="h-auto py-3 flex-col gap-1"
                onClick={() => setFormData({ ...formData, reminderType: "doctor" })}
              >
                <span className="text-sm font-medium">👨‍⚕️ Прием у врача</span>
              </Button>
              <Button
                type="button"
                variant={formData.reminderType === "other" ? "default" : "outline"}
                className="h-auto py-3 flex-col gap-1"
                onClick={() => setFormData({ ...formData, reminderType: "other" })}
              >
                <span className="text-sm font-medium">📝 Другое</span>
              </Button>
            </div>
          </Card>

          {/* Основная информация */}
          <Card className="p-4 space-y-3">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-semibold text-foreground">Основная информация</h2>
              {formData.reminderType === "medication" && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/scan-medication")}
                >
                  <Camera className="h-4 w-4 mr-1" />
                  Сканировать
                </Button>
              )}
            </div>

            {formData.reminderType === "medication" && (
              <>
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
              </>
            )}

            {formData.reminderType === "procedure" && (
              <>
                <div className="space-y-1.5">
                  <Label htmlFor="procedureType">Название процедуры *</Label>
                  <Input
                    id="procedureType"
                    value={formData.procedureType}
                    onChange={(e) => setFormData({ ...formData, procedureType: e.target.value })}
                    placeholder="Например: Физиотерапия"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="duration">Длительность</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="Например: 30 минут"
                  />
                </div>
              </>
            )}

            {formData.reminderType === "doctor" && (
              <>
                <div className="space-y-1.5">
                  <Label htmlFor="doctorName">Имя врача *</Label>
                  <Input
                    id="doctorName"
                    value={formData.doctorName}
                    onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
                    placeholder="Например: Иванов И.И."
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="specialty">Специальность</Label>
                  <Input
                    id="specialty"
                    value={formData.specialty}
                    onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                    placeholder="Например: Терапевт"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="clinic">Клиника</Label>
                  <Input
                    id="clinic"
                    value={formData.clinic}
                    onChange={(e) => setFormData({ ...formData, clinic: e.target.value })}
                    placeholder="Название клиники"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="appointmentDate">Дата приема</Label>
                    <Input
                      id="appointmentDate"
                      type="date"
                      value={formData.appointmentDate}
                      onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="appointmentTime">Время</Label>
                    <Input
                      id="appointmentTime"
                      type="time"
                      value={formData.appointmentTime}
                      onChange={(e) => setFormData({ ...formData, appointmentTime: e.target.value })}
                    />
                  </div>
                </div>
              </>
            )}

            {formData.reminderType === "other" && (
              <div className="space-y-1.5">
                <Label htmlFor="name">Название напоминания *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="О чем напомнить?"
                  required
                />
              </div>
            )}

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

          {/* Дозировка - только для лекарств */}
          {formData.reminderType === "medication" && (
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
                    <SelectItem value="inhalation">Ингаляция</SelectItem>
                    <SelectItem value="injection">Инъекция</SelectItem>
                    <SelectItem value="eye">Глазные капли</SelectItem>
                    <SelectItem value="ear">Ушные капли</SelectItem>
                    <SelectItem value="nasal">Назальный спрей</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </Card>
          )}

          {/* Расписание приема */}
          {formData.reminderType !== "doctor" && (
            <Card className="p-4 space-y-3">
              <h2 className="font-semibold text-foreground">Расписание</h2>

              <div className="space-y-1.5">
                <Label>Время напоминаний</Label>
                <div className="space-y-2">
                  {formData.times.map((time, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        type="time"
                        value={time}
                        onChange={(e) => handleTimeChange(index, e.target.value)}
                        className="flex-1"
                      />
                      {formData.times.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
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
              </div>

              {formData.reminderType === "medication" && (
                <div className="space-y-1.5">
                  <Label>Прием пищи</Label>
                  <Select
                    value={formData.withFood}
                    onValueChange={(value) => setFormData({ ...formData, withFood: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no">Не важно</SelectItem>
                      <SelectItem value="with">Во время еды</SelectItem>
                      <SelectItem value="before">До еды</SelectItem>
                      <SelectItem value="after">После еды</SelectItem>
                      <SelectItem value="empty">На голодный желудок</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-1.5">
                <Label>Дни недели</Label>
                <div className="flex gap-1.5">
                  {weekDays.map((day) => (
                    <Button
                      key={day.value}
                      type="button"
                      variant={formData.selectedDays.includes(day.value) ? "default" : "outline"}
                      size="sm"
                      className="flex-1 px-0"
                      onClick={() => toggleDay(day.value)}
                    >
                      {day.label}
                    </Button>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {/* Курс лечения */}
          {formData.reminderType !== "doctor" && (
            <Card className="p-4 space-y-3">
              <h2 className="font-semibold text-foreground">Курс</h2>

              <div className="space-y-1.5">
                <Label>Длительность курса</Label>
                <Select
                  value={formData.courseType}
                  onValueChange={(value) => setFormData({ ...formData, courseType: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="indefinite">Постоянно</SelectItem>
                    <SelectItem value="days">Определенное количество дней</SelectItem>
                    <SelectItem value="dates">По датам</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.courseType === "days" && (
                <div className="space-y-1.5">
                  <Label htmlFor="courseDays">Количество дней</Label>
                  <Input
                    id="courseDays"
                    type="number"
                    min="1"
                    value={formData.courseDays}
                    onChange={(e) => setFormData({ ...formData, courseDays: e.target.value })}
                  />
                </div>
              )}

              {formData.courseType === "dates" && (
                <div className="grid grid-cols-2 gap-3">
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
                </div>
              )}
            </Card>
          )}

          {/* Управление запасами - только для лекарств */}
          {formData.reminderType === "medication" && (
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
                    placeholder="15"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Уведомить о низком запасе</Label>
                  <p className="text-sm text-muted-foreground">
                    Когда запас закончится
                  </p>
                </div>
                <Switch
                  checked={formData.notifyWhenLow}
                  onCheckedChange={(checked) => setFormData({ ...formData, notifyWhenLow: checked })}
                />
              </div>

              {formData.notifyWhenLow && (
                <div className="space-y-1.5">
                  <Label htmlFor="lowStockThreshold">Минимальный запас</Label>
                  <Input
                    id="lowStockThreshold"
                    type="number"
                    min="1"
                    value={formData.lowStockThreshold}
                    onChange={(e) => setFormData({ ...formData, lowStockThreshold: e.target.value })}
                  />
                </div>
              )}
            </Card>
          )}
        </div>

        {/* Fixed Footer */}
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t px-3 py-3 flex gap-2">
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
