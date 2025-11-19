import { MainLayout } from "@/components/layout/MainLayout";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const DeleteConfirm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDelete = () => {
    toast.success("Напоминание удалено");
    navigate("/reminders");
  };

  return (
    <MainLayout showBottomNav={false} className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md px-4">
        <Card className="p-6 space-y-4">
          <div className="flex justify-center">
            <div className="p-3 bg-destructive/10 rounded-full">
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
          </div>

          <div className="text-center space-y-2">
            <h2 className="text-xl font-bold text-foreground">
              Удалить напоминание?
            </h2>
            <p className="text-sm text-muted-foreground">
              Это действие нельзя отменить. Напоминание и вся его история будут удалены навсегда.
            </p>
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <Button
              variant="destructive"
              onClick={handleDelete}
              className="w-full"
            >
              Да, удалить
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate(`/reminders/${id}`)}
              className="w-full"
            >
              Отмена
            </Button>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default DeleteConfirm;
