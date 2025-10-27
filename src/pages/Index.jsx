import "../styles/chefbot.css";
import ChefBotSidebar from '../components/ChefBotSidebar';
import ChatMessages from '../components/ChatMessages';
import QuickActions from '../components/QuickActions';
import StatusBar from '../components/StatusBar';
import { useChefBot } from '../hooks/useChefBot'; // ✅ Correct import

const Index = () => {
  const {
    messages,
    isTyping,
    isRecording,
    isConnected,
    connectionStatus,
    statusBar,
    startRecording,
    stopRecording,
    sendQuickQuery,
  } = useChefBot();

  return (
    <div className="chefbot-container">
      <ChefBotSidebar
        isRecording={isRecording}
        isConnected={isConnected}
        connectionStatus={connectionStatus}
        onRecordStart={startRecording}
        onRecordStop={stopRecording}
      />

      <div className="chefbot-main">
        <div className="chefbot-header">
          <h2>SGH Room Service &amp; Grab'n Go</h2>
          <StatusBar
            visible={statusBar.visible}
            icon={statusBar.icon}
            title={statusBar.title}
            subtitle={statusBar.subtitle}
            indicatorType={statusBar.indicatorType}
          />
        </div>

        <ChatMessages messages={messages} isTyping={isTyping} />

        <QuickActions onQuickQuery={sendQuickQuery} />
      </div>
    </div>
  );
};

export default Index;
