import { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ForestBackground2D from "@/components/ForestBackground2D";
import ThemeToggle from "@/components/ThemeToggle";
import QuoteDisplay from "@/components/QuoteDisplay";

interface TrackerLayoutProps {
  title: string;
  icon: string;
  children: ReactNode;
}

const TrackerLayout = ({ title, icon, children }: TrackerLayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative">
      <WaterBackground3D />
      <div className="max-w-lg mx-auto px-4 py-8 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <button
            onClick={() => navigate("/")}
            className="glass-card p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-display font-semibold text-foreground">
            {title} {icon}
          </h1>
          <ThemeToggle />
        </motion.div>
        <QuoteDisplay />
        {children}
      </div>
    </div>
  );
};

export default TrackerLayout;
