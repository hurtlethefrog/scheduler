import {React, useState, useEffect} from "react"

export function useVisualMode(val, skip) {
  const [mode, setMode] = useState(val)
  const [history, setHistory] = useState([val])

  function transition(val, skip) {
    if(skip) {
      setMode(val)
      return
    }
    setHistory(history => ([...history, val]))
    setMode(val)
  }

  const back = () => {
    if (history.length > 1) {
      console.log(history)
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