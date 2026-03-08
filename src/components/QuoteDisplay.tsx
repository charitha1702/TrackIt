import { motion, AnimatePresence } from "framer-motion";
import { useQuote } from "@/hooks/useQuotes";

const QuoteDisplay = () => {
  const quote = useQuote();

  return (
    <AnimatePresence mode="wait">
      <motion.p
        key={quote}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        transition={{ duration: 0.6 }}
        className="text-sm text-muted-foreground font-body italic text-center"
      >
        "{quote}"
      </motion.p>
    </AnimatePresence>
  );
};

export default QuoteDisplay;
