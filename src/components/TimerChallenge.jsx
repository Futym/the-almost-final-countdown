import { useRef, useState } from "react";
import { ResultModal } from "./ResultModal";

export const TimerChallenge = ({ title, challengeTime }) => {
  const timer = useRef();
  const dialog = useRef();

  const [timeRemaining, setTimeRemaining] = useState(challengeTime * 1000);

  const isTimerActive =
    timeRemaining > 0 && timeRemaining < challengeTime * 1000;

  if (timeRemaining <=0) {
    clearInterval(timer.current)
    dialog.current.open()
  }

  const handleReset = () => {
    setTimeRemaining(challengeTime * 1000)

  }

  const handleStart = () => {
    timer.current = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
    }, 10);
  };

  const handleStop = () => {
    clearInterval(timer.current);
    dialog.current.open()
    // setTimeRemaining(challengeTime * 1000)
  };

  return (
    <>
      <ResultModal ref={dialog} challengeTime={challengeTime} timeRemaining={timeRemaining} onClose={handleReset} />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {challengeTime} second{challengeTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={isTimerActive ? handleStop : handleStart}>
            {isTimerActive? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={isTimerActive ? "active" : undefined}>
          {isTimerActive ? "Time is runnung..." : "Timer inactive"}
        </p>
      </section>
    </>
  );
};
