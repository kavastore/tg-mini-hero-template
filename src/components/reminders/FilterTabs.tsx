import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FilterTabsProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  counts: {
    all: number;
    active: number;
    inactive: number;
  };
}

export const FilterTabs = ({ activeFilter, onFilterChange, counts }: FilterTabsProps) => {
  return (
    <Tabs value={activeFilter} onValueChange={onFilterChange} className="w-full">
      <TabsList className="w-full grid grid-cols-3 bg-muted/50">
        <TabsTrigger value="all" className="gap-1.5">
          Все
          <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">
            {counts.all}
          </span>
        </TabsTrigger>
        <TabsTrigger value="active" className="gap-1.5">
          Активные
          <span className="text-xs bg-success/10 text-success px-1.5 py-0.5 rounded-full">
            {counts.active}
          </span>
        </TabsTrigger>
        <TabsTrigger value="inactive" className="gap-1.5">
          Неактивные
          <span className="text-xs bg-muted-foreground/10 text-muted-foreground px-1.5 py-0.5 rounded-full">
            {counts.inactive}
          </span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
