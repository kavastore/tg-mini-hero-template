import { MainLayout } from "@/components/layout/MainLayout";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { ArrowLeft, Check } from "lucide-react";

const Language = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState("ru");

  const languages = [
    { code: "ru", name: "Русский", nativeName: "Русский" },
    { code: "en", name: "English", nativeName: "English" },
    { code: "uk", name: "Ukrainian", nativeName: "Українська" },
    { code: "kk", name: "Kazakh", nativeName: "Қазақша" },
    { code: "uz", name: "Uzbek", nativeName: "O'zbekcha" },
  ];

  const handleSelectLanguage = (code: string) => {
    setSelectedLanguage(code);
    toast.success("Язык изменен");
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
          Язык приложения
        </h1>
      </div>

      <div className="pt-14 pb-6 space-y-3">
        <Card className="divide-y">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleSelectLanguage(lang.code)}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-muted/50 transition-colors"
            >
              <div className="text-left">
                <p className="font-medium text-foreground">{lang.nativeName}</p>
                <p className="text-sm text-muted-foreground">{lang.name}</p>
              </div>
              {selectedLanguage === lang.code && (
                <Check className="h-5 w-5 text-primary" />
              )}
            </button>
          ))}
        </Card>

        <Card className="p-4">
          <p className="text-sm text-muted-foreground">
            Изменение языка применится ко всему приложению и будет сохранено в ваших настройках.
          </p>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Language;
