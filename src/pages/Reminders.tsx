import { MainLayout } from "@/components/layout/MainLayout";
import { ReminderCard } from "@/components/reminders/ReminderCard";
import { SearchBar } from "@/components/reminders/SearchBar";
import { FilterTabs } from "@/components/reminders/FilterTabs";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Reminders = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  // Mock данные
  const reminders: Array<{
    id: string;
    title: string;
    message: string;
    type: "medication" | "appointment" | "custom" | "text";
    active: boolean;
    nextFireAt: string;
    schedule: string;
  }> = [
    {
      id: "1",
      title: "Принять лекарство",
      message: "Не забудь принять витамины",
      type: "medication",
      active: true,
      nextFireAt: "2025-11-19T10:00:00",
      schedule: "Каждый день в 10:00",
    },
    {
      id: "2",
      title: "Встреча с командой",
      message: "Обсудить план на неделю",
      type: "appointment",
      active: true,
      nextFireAt: "2025-11-19T14:30:00",
      schedule: "Сегодня в 14:30",
    },
    {
      id: "3",
      title: "Занятие английским",
      message: "Урок с преподавателем",
      type: "custom",
      active: false,
      nextFireAt: "2025-11-20T18:00:00",
      schedule: "Каждый ПН и СР в 18:00",
    },
  ];

  const filteredReminders = reminders.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         r.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || 
                         (filter === "active" && r.active) ||
                         (filter === "inactive" && !r.active);
    return matchesSearch && matchesFilter;
  });

  return (
    <MainLayout showBottomNav>
      <div className="pt-3 space-y-3">
        <h1 className="text-2xl font-bold text-foreground mb-2">Напоминания</h1>
        
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        
        <FilterTabs 
          activeFilter={filter} 
          onFilterChange={setFilter}
          counts={{ all: 3, active: 2, inactive: 1 }}
        />

        <div className="space-y-3">
        {filteredReminders.map((reminder) => (
          <ReminderCard 
            key={reminder.id}
            {...reminder}
            onClick={() => navigate(`/reminders/${reminder.id}`)}
          />
        ))}
        </div>

        {filteredReminders.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              {searchQuery ? "Ничего не найдено" : "Нет напоминаний"}
            </div>
            {!searchQuery && (
              <Button onClick={() => navigate("/reminders/create")}>
                <Plus className="h-4 w-4 mr-2" />
                Создать напоминание
              </Button>
            )}
          </div>
        )}
      </div>

      <Button
        size="lg"
        className="fixed bottom-20 right-4 md:bottom-4 h-14 w-14 rounded-full shadow-glow"
        onClick={() => navigate("/reminders/create")}
      >
        <Plus className="h-6 w-6" />
      </Button>
    </MainLayout>
  );
};

export default Reminders;
