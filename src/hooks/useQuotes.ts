import { useState, useEffect } from "react";
import { QUOTES } from "@/data/quotes";

const HOUR_MS = 60 * 60 * 1000;

const getShuffledQuotes = (): string[] => {
  const arr = [...QUOTES];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const getQuoteIndex = (): number => {
  const hoursSinceEpoch = Math.floor(Date.now() / HOUR_MS);
  return hoursSinceEpoch % QUOTES.length;
};

export const useQuote = () => {
  const [shuffled] = useState(() => {
    const stored = sessionStorage.getItem("trackit_quotes");
    if (stored) return JSON.parse(stored) as string[];
    const s = getShuffledQuotes();
    sessionStorage.setItem("trackit_quotes", JSON.stringify(s));
    return s;
  });

  const [quote, setQuote] = useState(() => shuffled[getQuoteIndex()]);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuote(shuffled[getQuoteIndex()]);
    }, HOUR_MS);
    return () => clearInterval(interval);
  }, [shuffled]);

  return quote;
};
