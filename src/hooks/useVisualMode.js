import {React, useState, useEffect} from "react"

export function useVisualMode(val, replace) {
  const [mode, setMode] = useState(val)
  const [history, setHistory] = useState([])

  function transition(val, replace) {
    if(replace) {
      setMode(val)
      return
    }
    setHistory([...history, mode])
    setMode(val)
  }

  function back() {
    if(!history.length) {
      return
    }
    setMode(history.pop())
  }
  return {
    mode, 
    transition,
    back
  };
}