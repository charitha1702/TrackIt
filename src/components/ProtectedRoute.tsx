import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground font-body animate-pulse">Loading...</p>
      </div>
    );
  }

  if (!user) return <Navigate to="/" replace />;

  return <>{children}</>;
};

export default ProtectedRoute;
