import { Crown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SubscriptionCardProps {
  planName: string;
  status: "active" | "expired";
  expiresAt?: string;
}

export const SubscriptionCard = ({ planName, status, expiresAt }: SubscriptionCardProps) => {
  return (
    <Card className="p-5 mb-4 border-primary/20 hover:shadow-smooth-md transition-smooth">
      <div className="flex items-start gap-3 mb-4">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Crown className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-muted-foreground mb-1">Подписка</h3>
          <div className="flex items-center gap-2 mb-1">
            <p className="text-lg font-bold text-foreground">{planName}</p>
            <Badge 
              variant={status === "active" ? "default" : "secondary"}
              className={status === "active" ? "bg-success text-success-foreground" : ""}
            >
              {status === "active" ? "Активна" : "Истекла"}
            </Badge>
          </div>
          {status === "active" && expiresAt && (
            <p className="text-sm text-muted-foreground">
              До {new Date(expiresAt).toLocaleDateString("ru-RU")}
            </p>
          )}
        </div>
      </div>
      <Button variant="outline" className="w-full">
        Управление подпиской
      </Button>
    </Card>
  );
};
