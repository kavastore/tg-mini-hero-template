import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="text-8xl font-bold gradient-primary bg-clip-text text-transparent">
          404
        </div>
        <h1 className="text-3xl font-bold text-foreground">Страница не найдена</h1>
        <p className="text-lg text-muted-foreground">
          К сожалению, запрашиваемая страница не существует
        </p>
        <div className="flex gap-3 justify-center">
          <Button onClick={() => navigate(-1)} variant="outline">
            <ArrowLeft className="h-4 w-4" />
            Назад
          </Button>
          <Button onClick={() => navigate("/")}>
            <Home className="h-4 w-4" />
            На главную
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
