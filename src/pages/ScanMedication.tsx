import { MainLayout } from "@/components/layout/MainLayout";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { ArrowLeft, Camera, Image as ImageIcon, ScanLine, CheckCircle2 } from "lucide-react";

const ScanMedication = () => {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<any>(null);

  const handleCapture = () => {
    setIsScanning(true);
    // Имитация сканирования
    setTimeout(() => {
      setIsScanning(false);
      setScannedData({
        name: "Парацетамол",
        activeIngredient: "Paracetamol",
        form: "Таблетки",
        dosage: "500 мг",
        manufacturer: "Фармстандарт",
        quantity: 20,
      });
      toast.success("Упаковка распознана");
    }, 2000);
  };

  const handleConfirm = () => {
    toast.success("Лекарство добавлено");
    navigate("/reminders/create", { state: { scannedData } });
  };

  return (
    <MainLayout showBottomNav={false}>
      <div className="fixed top-0 left-0 right-0 z-40 bg-card border-b px-3 py-3 flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="shrink-0"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold text-foreground">
          Сканировать упаковку
        </h1>
      </div>

      <div className="pt-14 pb-6 space-y-3">
        {!scannedData ? (
          <>
            <Card className="p-4">
              <div className="aspect-[4/3] bg-muted rounded-lg flex items-center justify-center mb-4 relative overflow-hidden">
                {isScanning ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-full h-full">
                      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="space-y-3 text-center">
                          <ScanLine className="h-12 w-12 text-primary mx-auto animate-pulse" />
                          <p className="text-sm font-medium">Сканирование...</p>
                          <p className="text-xs text-muted-foreground">Наведите камеру на упаковку</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-2">
                    <Camera className="h-12 w-12 text-muted-foreground mx-auto" />
                    <p className="text-sm text-muted-foreground">Камера готова</p>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleCapture}
                  disabled={isScanning}
                >
                  <Camera className="h-5 w-5 mr-2" />
                  {isScanning ? "Сканирование..." : "Сделать фото"}
                </Button>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => toast.info("Выберите фото из галереи")}
                  disabled={isScanning}
                >
                  <ImageIcon className="h-5 w-5 mr-2" />
                  Загрузить из галереи
                </Button>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold text-foreground mb-2">Как использовать</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary">1.</span>
                  <span>Наведите камеру на упаковку лекарства</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">2.</span>
                  <span>Убедитесь, что название и дозировка видны четко</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">3.</span>
                  <span>Сделайте фото или загрузите из галереи</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">4.</span>
                  <span>Проверьте распознанные данные и подтвердите</span>
                </li>
              </ul>
            </Card>
          </>
        ) : (
          <>
            <Card className="p-4 space-y-3">
              <div className="flex items-center gap-2 text-success">
                <CheckCircle2 className="h-5 w-5" />
                <p className="font-semibold">Упаковка успешно распознана</p>
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Название:</span>
                  <span className="font-medium">{scannedData.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Действующее вещество:</span>
                  <span className="font-medium">{scannedData.activeIngredient}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Форма выпуска:</span>
                  <span className="font-medium">{scannedData.form}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Дозировка:</span>
                  <span className="font-medium">{scannedData.dosage}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Производитель:</span>
                  <span className="font-medium">{scannedData.manufacturer}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Количество в упаковке:</span>
                  <span className="font-medium">{scannedData.quantity} шт</span>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <p className="text-sm text-muted-foreground mb-3">
                Проверьте правильность распознанных данных. Вы сможете отредактировать их при создании напоминания.
              </p>
              <div className="space-y-2">
                <Button className="w-full" onClick={handleConfirm}>
                  Продолжить создание напоминания
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setScannedData(null)}
                >
                  Сканировать заново
                </Button>
              </div>
            </Card>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default ScanMedication;
