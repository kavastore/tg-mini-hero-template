import { MainLayout } from "@/components/layout/MainLayout";
import { WelcomeCard } from "@/components/home/WelcomeCard";
import { StatsCards } from "@/components/home/StatsCards";
import { SubscriptionCard } from "@/components/home/SubscriptionCard";
import { QuickActions } from "@/components/home/QuickActions";
import { TodayReminders } from "@/components/home/TodayReminders";
import { ActiveCoursesWidget } from "@/components/home/ActiveCoursesWidget";

const Home = () => {
  // Mock data - в реальном приложении будет из API
  const userData = {
    name: "Александр",
    todayReminders: 5,
    totalReminders: 12,
    totalChats: 3,
  };

  const subscription = {
    planName: "Pro Plan",
    status: "active" as const,
    expiresAt: "2025-12-31",
  };

  return (
    <MainLayout showBottomNav>
      <div className="pt-3 space-y-3">
        <WelcomeCard 
          userName={userData.name}
          todayRemindersCount={userData.todayReminders}
        />
        
        <TodayReminders />

        <ActiveCoursesWidget />
        
        <StatsCards 
          remindersCount={userData.totalReminders}
          chatsCount={userData.totalChats}
        />

        <SubscriptionCard {...subscription} />

        <QuickActions />
      </div>
    </MainLayout>
  );
};

export default Home;
