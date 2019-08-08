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
    console.log(history)
    if(!history.length) {
      return
    }console.log("getting mode")
    setMode(history.pop())
    console.log(history)
  }
  return {
    mode, 
    transition,
    back
  };
}