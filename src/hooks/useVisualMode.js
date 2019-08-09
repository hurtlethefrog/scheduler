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

  function back() {
    if(!history.length) {
      return
    }
    setMode(history.pop())
    setHistory(history => ([...history, val]))
  }
  return {
    mode, 
    transition,
    back
  };
}