import { MainLayout } from "@/components/layout/MainLayout";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Moon, Sun, Smartphone } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const Appearance = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState<"auto" | "light" | "dark">("auto");

  useEffect(() => {
    // Загружаем сохраненную тему из localStorage
    const savedTheme = localStorage.getItem("theme") as "auto" | "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    }
  }, []);

  const applyTheme = (selectedTheme: "auto" | "light" | "dark") => {
    const root = document.documentElement;
    
    if (selectedTheme === "auto") {
      // Следовать системной теме
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.toggle("dark", prefersDark);
    } else if (selectedTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  const handleThemeChange = (newTheme: "auto" | "light" | "dark") => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
    
    const themeNames = {
      auto: "Авто (как в Telegram)",
      light: "Светлая",
      dark: "Темная"
    };
    toast.success(`Тема изменена: ${themeNames[newTheme]}`);
  };

  const themeOptions = [
    {
      value: "auto" as const,
      icon: Smartphone,
      label: "Авто (как в Telegram)",
      description: "Следовать системной теме"
    },
    {
      value: "light" as const,
      icon: Sun,
      label: "Светлая",
      description: "Всегда светлая тема"
    },
    {
      value: "dark" as const,
      icon: Moon,
      label: "Темная",
      description: "Всегда темная тема"
    }
  ];

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
          Тема оформления
        </h1>
      </div>

      <div className="pt-14 pb-20 px-3 space-y-3">
        {themeOptions.map((option) => {
          const Icon = option.icon;
          const isSelected = theme === option.value;
          
          return (
            <Card
              key={option.value}
              className={`p-4 cursor-pointer transition-all ${
                isSelected 
                  ? "border-primary bg-primary/5" 
                  : "border-border hover:border-primary/50"
              }`}
              onClick={() => handleThemeChange(option.value)}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  isSelected ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-foreground">{option.label}</div>
                  <div className="text-sm text-muted-foreground">{option.description}</div>
                </div>
                {isSelected && (
                  <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-primary-foreground" />
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </MainLayout>
  );
};

export default Appearance;
