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
    resetTerminal();

    pushToHistory(<>
      <div><strong>Welcome!</strong> to the terminal.</div>
      <div style={{fontSize: 20}}>It contains <span style={{color: 'yellow'}}><strong>HTML</strong></span>. Awesome, right?</div>
      <br/>
      <div>You can write: start or alert, to execute some commands.</div>
    </>);

  }, [pushToHistory, resetTerminal]);

  const commands = useMemo(() => ({
    'start': async () => {
      await pushToHistory(<>
        <div>
          <strong>Starting</strong> the server... <span style={{color: 'green'}}>Done</span>
        </div>
      </>);
    },
    'alert': async () => {
      alert('Hello!');
      await pushToHistory(<>
        <div>
          <strong>Alert</strong>
          <span style={{color: 'orange', marginLeft: 10}}>
            <strong>Shown in the browser</strong>
          </span>
        </div>
      </>);
    },
  }), [pushToHistory]);

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
          promptLabel={<>Write something awesome:</>}
          commands={commands}
        />
      </div>
    </section>
  );
};

export default TerminalIntegration;
