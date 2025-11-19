import { MainLayout } from "@/components/layout/MainLayout";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ArrowLeft, Download, Upload, Trash2, Database, HardDrive } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const DataManagement = () => {
  const navigate = useNavigate();

  const storageData = {
    total: 50, // MB
    used: 1.2,
    medications: 0.5,
    photos: 0.6,
    other: 0.1,
  };

  const handleExport = () => {
    toast.success("Данные экспортированы в файл");
  };

  const handleImport = () => {
    toast.info("Выберите файл для импорта");
  };

  const handleClearCache = () => {
    toast.success("Кэш очищен");
  };

  const handleDeleteAll = () => {
    navigate("/delete-confirm/all-data");
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
          Хранилище данных
        </h1>
      </div>

      <div className="pt-14 pb-6 space-y-3">
        <Card className="p-4 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <HardDrive className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">Использовано хранилище</p>
              <p className="text-sm text-muted-foreground">
                {storageData.used} МБ из {storageData.total} МБ
              </p>
            </div>
          </div>
          <Progress value={(storageData.used / storageData.total) * 100} className="h-2" />
          
          <div className="space-y-2 pt-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Лекарства</span>
              <span className="font-medium">{storageData.medications} МБ</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Фотографии</span>
              <span className="font-medium">{storageData.photos} МБ</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Прочее</span>
              <span className="font-medium">{storageData.other} МБ</span>
            </div>
          </div>
        </Card>

        <Card className="p-4 space-y-3">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <Database className="h-4 w-4" />
            Управление данными
          </h3>
          
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={handleExport}
          >
            <Download className="h-4 w-4 mr-2" />
            Экспортировать все данные
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={handleImport}
          >
            <Upload className="h-4 w-4 mr-2" />
            Импортировать данные
          </Button>

          <div className="pt-2 border-t">
            <p className="text-xs text-muted-foreground mb-3">
              Экспорт создаст файл со всеми вашими данными (лекарства, напоминания, история). 
              Импорт восстановит данные из ранее сохраненного файла.
            </p>
          </div>
        </Card>

        <Card className="p-4 space-y-3">
          <h3 className="font-semibold text-foreground">Очистка</h3>
          
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={handleClearCache}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Очистить кэш
          </Button>

          <div className="pt-2 border-t">
            <Button
              variant="destructive"
              className="w-full"
              onClick={handleDeleteAll}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Удалить все данные
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              ⚠️ Это действие нельзя отменить. Все ваши лекарства, напоминания и история будут удалены.
            </p>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default DataManagement;
