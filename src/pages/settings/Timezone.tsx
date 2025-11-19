import { MainLayout } from "@/components/layout/MainLayout";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState } from "react";
import { ArrowLeft, Check, Search } from "lucide-react";

const Timezone = () => {
  const navigate = useNavigate();
  const [selectedTimezone, setSelectedTimezone] = useState("Europe/Moscow");
  const [searchQuery, setSearchQuery] = useState("");

  const timezones = [
    { code: "Europe/Moscow", name: "Москва", offset: "UTC+3" },
    { code: "Europe/Kaliningrad", name: "Калининград", offset: "UTC+2" },
    { code: "Europe/Samara", name: "Самара", offset: "UTC+4" },
    { code: "Asia/Yekaterinburg", name: "Екатеринбург", offset: "UTC+5" },
    { code: "Asia/Omsk", name: "Омск", offset: "UTC+6" },
    { code: "Asia/Krasnoyarsk", name: "Красноярск", offset: "UTC+7" },
    { code: "Asia/Irkutsk", name: "Иркутск", offset: "UTC+8" },
    { code: "Asia/Yakutsk", name: "Якутск", offset: "UTC+9" },
    { code: "Asia/Vladivostok", name: "Владивосток", offset: "UTC+10" },
    { code: "Asia/Magadan", name: "Магадан", offset: "UTC+11" },
    { code: "Asia/Kamchatka", name: "Камчатка", offset: "UTC+12" },
    { code: "Europe/Kyiv", name: "Киев", offset: "UTC+2" },
    { code: "Asia/Almaty", name: "Алматы", offset: "UTC+6" },
    { code: "Asia/Tashkent", name: "Ташкент", offset: "UTC+5" },
  ];

  const filteredTimezones = timezones.filter(tz =>
    tz.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tz.offset.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectTimezone = (code: string) => {
    setSelectedTimezone(code);
    toast.success("Часовой пояс изменен");
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
          Часовой пояс
        </h1>
      </div>

      <div className="pt-14 pb-6 space-y-3">
        <div className="px-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск города или UTC..."
              className="pl-9"
            />
          </div>
        </div>

        <Card className="divide-y">
          {filteredTimezones.length > 0 ? (
            filteredTimezones.map((tz) => (
              <button
                key={tz.code}
                onClick={() => handleSelectTimezone(tz.code)}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-muted/50 transition-colors"
              >
                <div className="text-left">
                  <p className="font-medium text-foreground">{tz.name}</p>
                  <p className="text-sm text-muted-foreground">{tz.offset}</p>
                </div>
                {selectedTimezone === tz.code && (
                  <Check className="h-5 w-5 text-primary" />
                )}
              </button>
            ))
          ) : (
            <div className="px-4 py-6 text-center text-sm text-muted-foreground">
              Ничего не найдено
            </div>
          )}
        </Card>

        <Card className="p-4">
          <p className="text-sm text-muted-foreground">
            Часовой пояс используется для точного времени напоминаний о приеме лекарств.
          </p>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Timezone;
