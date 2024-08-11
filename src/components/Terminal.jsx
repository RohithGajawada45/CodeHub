import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import './Terminal.css'; // Add your CSS file for styling

const Terminal = forwardRef(({ history, promptLabel, commands }, ref) => {
  const terminalRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      if (terminalRef.current) {
        terminalRef.current.focus();
      }
    }
  }));

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const input = event.target.value.trim();
      event.target.value = '';
      if (input) {
        if (commands[input]) {
          commands[input]();
        } else {
          history.push(<div><strong>Error:</strong> Command not found.</div>);
        }
      }
    }
  };

  return (
    <div className="terminal-container">
      <div className="terminal-history">
        {history}
      </div>
      <input
        type="text"
        className="terminal-input"
        onKeyDown={handleKeyDown}
        ref={terminalRef}
        placeholder="Type your command..."
      />
      <div className="terminal-prompt">{promptLabel}</div>
    </div>
  );
});

export default Terminal;
