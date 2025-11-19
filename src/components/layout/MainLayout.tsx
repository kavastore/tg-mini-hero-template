import { ReactNode } from "react";
import { AppBar } from "./AppBar";
import { BottomNav } from "./BottomNav";

interface MainLayoutProps {
  children: ReactNode;
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  showBottomNav?: boolean;
  showMenu?: boolean;
}

export const MainLayout = ({ 
  children, 
  title, 
  showBack = false, 
  onBack,
  showBottomNav = true,
  showMenu = true 
}: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <AppBar 
        title={title} 
        showBack={showBack} 
        onBack={onBack}
        showMenu={showMenu}
      />
      
      <main className={cn(
        "pt-16 pb-4 animate-fade-in",
        showBottomNav && "md:pb-4 pb-20"
      )}>
        <div className="container max-w-2xl mx-auto px-4">
          {children}
        </div>
      </main>

      {showBottomNav && <BottomNav />}
    </div>
  );
};

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
