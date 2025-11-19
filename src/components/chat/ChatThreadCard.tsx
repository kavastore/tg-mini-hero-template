import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";

interface ChatThreadCardProps {
  id: string;
  title: string;
  lastMessage: string;
  lastMessageAt: string;
  messageCount: number;
  onClick?: () => void;
}

export const ChatThreadCard = ({
  title,
  lastMessage,
  lastMessageAt,
  messageCount,
  onClick,
}: ChatThreadCardProps) => {
  const timeAgo = formatDistanceToNow(new Date(lastMessageAt), {
    addSuffix: true,
    locale: ru,
  });

  return (
    <Card
      className="p-4 transition-smooth cursor-pointer hover:shadow-smooth-md group"
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-smooth">
          <MessageSquare className="h-5 w-5 text-primary" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-semibold text-foreground truncate">{title}</h3>
            <Badge variant="secondary" className="text-xs shrink-0">
              {messageCount}
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
            {lastMessage}
          </p>

          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="h-3 w-3 mr-1" />
            {timeAgo}
          </div>
        </div>
      </div>
    </Card>
  );
};
