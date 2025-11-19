import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Reminders from "./pages/Reminders";
import ReminderCreate from "./pages/ReminderCreate";
import ReminderDetail from "./pages/ReminderDetail";
import ReminderEdit from "./pages/ReminderEdit";
import DeleteConfirm from "./pages/DeleteConfirm";
import Chat from "./pages/Chat";
import ChatThread from "./pages/ChatThread";
import Calendar from "./pages/Calendar";
import Profile from "./pages/Profile";
import Subscription from "./pages/Subscription";
import CurrentSubscription from "./pages/CurrentSubscription";
import Settings from "./pages/Settings";
import ProfileEdit from "./pages/settings/ProfileEdit";
import Help from "./pages/settings/Help";
import Language from "./pages/settings/Language";
import Timezone from "./pages/settings/Timezone";
import Privacy from "./pages/settings/Privacy";
import DataManagement from "./pages/settings/DataManagement";
import ShareAccount from "./pages/settings/ShareAccount";
import Appearance from "./pages/settings/Appearance";
import ScanMedication from "./pages/ScanMedication";
import Statistics from "./pages/Statistics";
import MedicalCard from "./pages/MedicalCard";
import DiagnosisCreate from "./pages/DiagnosisCreate";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reminders" element={<Reminders />} />
          <Route path="/reminders/create" element={<ReminderCreate />} />
          <Route path="/reminders/:id" element={<ReminderDetail />} />
          <Route path="/reminders/:id/edit" element={<ReminderEdit />} />
          <Route path="/reminders/delete-confirm/:id" element={<DeleteConfirm />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/chat/:threadId" element={<ChatThread />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/subscription/current" element={<CurrentSubscription />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/settings/profile-edit" element={<ProfileEdit />} />
          <Route path="/settings/help" element={<Help />} />
          <Route path="/settings/language" element={<Language />} />
          <Route path="/settings/timezone" element={<Timezone />} />
          <Route path="/settings/privacy" element={<Privacy />} />
          <Route path="/settings/data-management" element={<DataManagement />} />
          <Route path="/settings/share-account" element={<ShareAccount />} />
          <Route path="/settings/appearance" element={<Appearance />} />
          <Route path="/scan-medication" element={<ScanMedication />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/medical-card" element={<MedicalCard />} />
          <Route path="/diagnosis/create" element={<DiagnosisCreate />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
