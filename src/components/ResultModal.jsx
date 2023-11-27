import { forwardRef, useImperativeHandle, useRef } from "react";
import {createPortal} from 'react-dom';

export const ResultModal = forwardRef(function ResultModal(
  {challengeTime, timeRemaining, onClose},
  ref
) {
  const dialog = useRef();
  const userLost = timeRemaining <= 0
  const timeRemainingFormatted = (timeRemaining/1000).toFixed(2)
  const score = Math.round((1 - (timeRemaining / (challengeTime * 1000)))*100)

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog ref={dialog} className="result-modal"  onClose={onClose}>
      {userLost && <h2>You lost!</h2>}
      {!userLost && <h2>Your score: {score}</h2>}
      <p>
        The target time was {challengeTime} second{challengeTime > 1 ? "s" : ""}
      </p>
      <p>
        You stopped the timer with: <strong> {timeRemainingFormatted} seconds left.</strong>
      </p>
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>, 
    document.getElementById("modal")
  );
});
