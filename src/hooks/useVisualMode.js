import { useState } from "react";

export function useVisualMode(val, skip) {
  const [mode, setMode] = useState(val);
  const [history, setHistory] = useState([val]);

  function transition(val, skip) {
    setMode(val);
    if (skip) {
      return;
    }
    setHistory([...history, val]);
  }

  const back = () => {
    if (history.length > 1) {
      setMode(history[history.length - 2]);
      setHistory(prev => [...prev.slice(0, prev.length - 1)]);
    }
  };

  return {
    mode,
    transition,
    back
  };
}
