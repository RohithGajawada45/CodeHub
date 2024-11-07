import React, { useEffect, useMemo } from 'react';
import styles, { layout } from "../style";
import Button from "./Button";
import Terminal from "./Terminal";
import { useTerminal } from "../hooks/useTerminal";

const TerminalIntegration = () => {
  const {
    history,
    pushToHistory,
    setTerminalRef,
    resetTerminal,
  } = useTerminal();

  useEffect(() => {
    resetTerminal(); // Call this only on component mount
    pushToHistory(
      <>
        <div><strong>Welcome!</strong> to the CodeHub terminal.</div>
        <div className="stylish-text">Learn Git Server Creation. Awesome, right?</div>
        <br/>
        <div>You can type commands like <code>start</code> or <code>alert</code> to try them out.</div>
      </>
    );
  }, []); // Empty dependency array to ensure this only runs once

  // Define the commands available in the terminal
  const commands = useMemo(() => ({
    'start': async () => {
      pushToHistory(
        <div>
          <strong>Starting</strong> the server... <span style={{ color: 'green' }}>Done</span>
        </div>
      );
    },
    'alert': async () => {
      alert('Hello!');
      pushToHistory(
        <div>
          <strong>Alert:</strong>
          <span style={{ color: 'orange', marginLeft: 10 }}>Shown in the browser</span>
        </div>
      );
    },
    'SSH key pair generation': async () => {
      pushToHistory(
        <div>
          <pre>
            # Switch to your .ssh directory<br />
            cd ~/.ssh<br /><br />

            # If the directory does not exist, create it via:<br />
            # mkdir .ssh<br /><br />

            # Manually backup all existing content of this dir!!!<br /><br />

            # Afterwards generate the ssh key<br />
            ssh-keygen -t rsa -b 4096 -C "your_email@youremail.com"<br /><br />

            # Press enter to select the default directory<br />
            # You will be prompted for an optional passphrase<br />
            # A passphrase protects your private key<br />
            # but you have to enter it manually during ssh operations
          </pre>
        </div>
      );
    },
  }), [pushToHistory]); // Include only relevant dependencies

  return (
    <section className={layout.section}>
      <div className={layout.sectionInfo}>
        <h2 className={styles.heading2}>
          Start Your Terminal Session <br className="sm:block hidden" /> in just a few clicks.
        </h2>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          Access a fully integrated terminal to practice your commands and workflows. Learn, code, and experiment directly in the browser.
        </p>

        <Button styles={`mt-10`} />
      </div>

      <div className={layout.sectionImg}>
        <Terminal
          history={history}
          ref={setTerminalRef}
          promptLabel="Write something awesome:"
          commands={commands}
        />
      </div>
    </section>
  );
};

export default TerminalIntegration;
