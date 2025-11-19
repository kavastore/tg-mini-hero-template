import { MainLayout } from "@/components/layout/MainLayout";
import { ReminderCard } from "@/components/reminders/ReminderCard";
import { SearchBar } from "@/components/reminders/SearchBar";
import { FilterTabs } from "@/components/reminders/FilterTabs";
import { FloatingActionButton } from "@/components/layout/FloatingActionButton";
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
    courseProgress?: number;
    remainingPills?: number;
    needsToBuy?: boolean;
  }> = [
    {
      id: "1",
      title: "Витамин D3",
      message: "Принимать по 1 таблетке после еды",
      type: "medication",
      active: true,
      nextFireAt: "2025-11-19T10:00:00",
      schedule: "Каждый день в 10:00",
      courseProgress: 65,
      remainingPills: 14,
      needsToBuy: false,
    },
    {
      id: "2",
      title: "Омега-3",
      message: "2 капсулы во время завтрака",
      type: "medication",
      active: true,
      nextFireAt: "2025-11-19T09:00:00",
      schedule: "Каждый день в 09:00",
      courseProgress: 85,
      remainingPills: 6,
      needsToBuy: true,
    },
    {
      id: "3",
      title: "Прием у кардиолога",
      message: "Плановый осмотр",
      type: "appointment",
      active: true,
      nextFireAt: "2025-11-20T14:30:00",
      schedule: "20 ноября в 14:30",
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
      
      <FloatingActionButton />
    </MainLayout>
  );
};

export default Reminders;
