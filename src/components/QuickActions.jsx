import React, { useState } from "react";

const quickButtons = [
  { icon: "leaf", text: "Fresh Salads", query: "What salads do you have?" },
  { icon: "bread-slice", text: "Sandwiches", query: "Show me sandwiches" },
  { icon: "fish", text: "Seafood Special", query: "What is today's seafood special?" },
  { icon: "drumstick-bite", text: "Chicken Dishes", query: "Show me chicken dishes" },
  { icon: "birthday-cake", text: "Desserts", query: "What desserts are available?" },
  { icon: "shield-alt", text: "Gluten-Free", query: "I need gluten-free options" },
  { icon: "seedling", text: "Vegetarian", query: "Show me vegetarian meals" },
  { icon: "coffee", text: "Beverages", query: "What beverages do you have?" },
];

const QuickActions = ({ onQuickQuery }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`quick-actions ${isExpanded ? "expanded" : ""}`}>
      <div
        className="quick-actions-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3>Quick Actions - Try These!</h3>
        <i className="fas fa-chevron-down"></i>
      </div>

      <div className="quick-buttons-container">
        <div className="quick-buttons">
          {quickButtons.map((button, index) => (
            <div
              key={index}
              className="quick-btn"
              onClick={() => onQuickQuery(button.query)}
            >
              <i className={`fas fa-${button.icon}`}></i>
              <span>{button.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
