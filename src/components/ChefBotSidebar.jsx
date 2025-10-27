import React from "react";

const ChefBotSidebar = ({
  isRecording,
  isConnected,
  connectionStatus,
  onRecordStart,
  onRecordStop,
}) => {
  const handleMouseDown = (e) => {
    e.preventDefault();
    if (!isRecording) onRecordStart();
  };

  const handleMouseUp = (e) => {
    e.preventDefault();
    if (isRecording) onRecordStop();
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
    if (!isRecording) onRecordStart();
  };

  const handleTouchEnd = (e) => {
    e.preventDefault();
    if (isRecording) onRecordStop();
  };

  return (
    <div className="sidebar">
      <div className="logo-section">
        <div className="logo">
          <div className="logo-icon">
            <i className="fas fa-robot"></i>
          </div>
          <div className="logo-text">
            <h1>ChefBOT</h1>
            <p>Hospital Room Service</p>
          </div>
        </div>

        <div className={`connection-status status-${connectionStatus.className}`}>
          {connectionStatus.icon === "loading-spinner" ? (
            <div className="loading-spinner"></div>
          ) : (
            <i className={connectionStatus.icon}></i>
          )}
          <span>{connectionStatus.text}</span>
        </div>
      </div>

      <div className="voice-controls">
        <button
          className={`record-button ${isRecording ? "recording" : ""}`}
          disabled={!isConnected}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => isRecording && onRecordStop()}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <i className={`fas fa-${isRecording ? "stop" : "microphone"}`}></i>
        </button>

        <div className="record-instructions">
          <strong>Hold to Talk</strong>
          <br />
          Press and hold the button firmly
          <br />
          Keep holding while speaking
          <br />
          Release when finished
        </div>
      </div>
    </div>
  );
};

export default ChefBotSidebar;
