import { ChevronLeft, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AppBarProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  showMenu?: boolean;
}

export const AppBar = ({ title, showBack = false, onBack, showMenu = true }: AppBarProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b bg-card/95 backdrop-blur-md supports-[backdrop-filter]:bg-card/80">
      <div className="flex h-full items-center justify-between px-4">
        <div className="flex items-center gap-2 flex-1">
          {showBack && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onBack}
              className="hover:bg-muted transition-smooth"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          )}
          <h1 className="text-lg font-semibold text-foreground truncate">{title}</h1>
        </div>

        {showMenu && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-muted transition-smooth">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Профиль</DropdownMenuItem>
              <DropdownMenuItem>Настройки</DropdownMenuItem>
              <DropdownMenuItem>Подписка</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Выйти</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
};
