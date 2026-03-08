import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import GoalTrackerPage from "./pages/GoalTrackerPage";
import SleepPage from "./pages/SleepPage";
import WaterPage from "./pages/WaterPage";
import MoodPage from "./pages/MoodPage";
import StudyPage from "./pages/StudyPage";
import MeditationPage from "./pages/MeditationPage";
import PersonalCarePage from "./pages/PersonalCarePage";
import ScreenTimePage from "./pages/ScreenTimePage";
import NutritionPage from "./pages/NutritionPage";
import MenstrualPage from "./pages/MenstrualPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/goals" element={<GoalTrackerPage />} />
            <Route path="/sleep" element={<SleepPage />} />
            <Route path="/water" element={<WaterPage />} />
            <Route path="/mood" element={<MoodPage />} />
            <Route path="/study" element={<StudyPage />} />
            <Route path="/meditation" element={<MeditationPage />} />
            <Route path="/personal-care" element={<PersonalCarePage />} />
            <Route path="/screen-time" element={<ScreenTimePage />} />
            <Route path="/nutrition" element={<NutritionPage />} />
            <Route path="/menstrual" element={<MenstrualPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
