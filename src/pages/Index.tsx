import { useAuth } from "@/hooks/useAuth";
import AuthPage from "./AuthPage";
import DashboardHub from "./DashboardHub";

const Index = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground font-body animate-pulse">Loading...</p>
      </div>
    );
  }

  return user ? <DashboardHub /> : <AuthPage />;
};

export default Index;
