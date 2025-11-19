import { ReactNode } from "react";
import { BottomNav } from "./BottomNav";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: ReactNode;
  showBottomNav?: boolean;
  className?: string;
}

export const MainLayout = ({ 
  children, 
  showBottomNav = true,
  className
}: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <main className={cn(
        "pb-3 animate-fade-in",
        showBottomNav && "pb-20",
        className
      )}>
        <div className="container max-w-2xl mx-auto px-3">
          {children}
        </div>
      </main>

      {showBottomNav && <BottomNav />}
    </div>
  );
};
