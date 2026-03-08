import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import GoalTrackerPage from "./pages/GoalTrackerPage";
import SleepPage from "./pages/SleepPage";
import WaterPage from "./pages/WaterPage";
import MoodPage from "./pages/MoodPage";
import StudyPage from "./pages/StudyPage";
import MeditationPage from "./pages/MeditationPage";
import PersonalCarePage from "./pages/PersonalCarePage";
import NutritionPage from "./pages/NutritionPage";
import MenstrualPage from "./pages/MenstrualPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const P = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute>{children}</ProtectedRoute>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/goals" element={<P><GoalTrackerPage /></P>} />
            <Route path="/sleep" element={<P><SleepPage /></P>} />
            <Route path="/water" element={<P><WaterPage /></P>} />
            <Route path="/mood" element={<P><MoodPage /></P>} />
            <Route path="/study" element={<P><StudyPage /></P>} />
            <Route path="/meditation" element={<P><MeditationPage /></P>} />
            <Route path="/personal-care" element={<P><PersonalCarePage /></P>} />
            <Route path="/nutrition" element={<P><NutritionPage /></P>} />
            <Route path="/menstrual" element={<P><MenstrualPage /></P>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
