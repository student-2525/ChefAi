import { useEffect, useRef } from 'react';
import AudioPlayer from './AudioPlayer';

const ChatMessages = ({ messages, isTyping }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const parseMarkdown = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/\n/g, '<br>');
  };

  return (
    <div className="chat-messages">
      {messages.map((message, index) => (
        <div key={index} className={`message ${message.type}`}>
          <div
            className="message-content"
            dangerouslySetInnerHTML={{ __html: parseMarkdown(message.content) }}
          />
          {message.audioBase64 && message.type === 'bot' && (
            <AudioPlayer audioBase64={message.audioBase64} />
          )}
          <div className="message-time">{message.time}</div>
        </div>
      ))}

      {isTyping && (
        <div className="typing-indicator show">
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages; // Yahan default export kar diya gaya