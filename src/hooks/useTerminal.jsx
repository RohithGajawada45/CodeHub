import { useState, useCallback, useRef } from 'react';

export const useTerminal = () => {
  const [history, setHistory] = useState([]);
  const terminalRef = useRef(null);

  const pushToHistory = (content) => {
    setHistory(prevHistory => [...prevHistory, content]);
  };

  const setTerminalRef = useCallback((ref) => {
    terminalRef.current = ref;
  }, []);

  const resetTerminal = () => {
    setHistory([]);
  };

  return {
    history,
    pushToHistory,
    setTerminalRef,
    resetTerminal,
  };
};
