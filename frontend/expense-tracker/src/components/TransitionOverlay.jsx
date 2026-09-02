import React from "react";

const TransitionOverlay = ({ message }) => {
  return (
    <div className="transition-overlay" role="status" aria-live="polite">
      <div className="transition-panel">
        <span className="transition-pulse" aria-hidden="true" />
        <p>{message}</p>
        <span className="transition-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </div>
    </div>
  );
};

export default TransitionOverlay;
