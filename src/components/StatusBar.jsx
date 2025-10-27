import React from "react";

const StatusBar = ({
  visible,
  icon,
  title,
  subtitle,
  indicatorType,
}) => {
  if (!visible) return null;

  const renderIndicator = () => {
    switch (indicatorType) {
      case "pulse":
        return <div className="pulse-dot"></div>;
      case "processing":
        return (
          <div className="processing-dots">
            <div className="processing-dot"></div>
            <div className="processing-dot"></div>
            <div className="processing-dot"></div>
          </div>
        );
      case "error":
        return <div className="error-dot"></div>;
      default:
        return null;
    }
  };

  return (
    <div className="status-bar">
      <div className="status-content">
        <div className="status-icon">
          <i className={`fas fa-${icon}`}></i>
        </div>
        <div className="status-text">
          <span className="status-title">{title}</span>
          <span className="status-subtitle">{subtitle}</span>
        </div>
        <div className="status-indicator">{renderIndicator()}</div>
      </div>
    </div>
  );
};

export default StatusBar;
