import { useState, useEffect, useRef } from 'react';

export const useChefBot = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isConnected] = useState(true);
const [connectionStatus] = useState({
  className: 'connected',
  text: 'Ready',
  icon: 'fas fa-check-circle',
});

  const [statusBar, setStatusBar] = useState({
    visible: false,
    icon: '',
    title: '',
    subtitle: '',
    indicatorType: 'pulse',
  });

  const mediaRecorderRef = useRef(null);
  const audioStreamRef = useRef(null);
  const audioChunksRef = useRef([]);
  const recordingStartTimeRef = useRef(0);

  const getTimeString = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const addMessage = (type, content, audioBase64) => {
    setMessages((prev) => [
      ...prev,
      { type, content, time: getTimeString(), audioBase64 },
    ]);
  };

  const showStatus = (icon, title, subtitle, indicatorType) => {
    setStatusBar({ visible: true, icon, title, subtitle, indicatorType });
  };

  const hideStatus = () => {
    setStatusBar((prev) => ({ ...prev, visible: false }));
  };

  useEffect(() => {
    const welcomeMessage = {
      type: 'bot',
      content: `👋 <strong>Welcome to SGH Room Service!</strong>
<strong>مرحباً بكم في خدمة الغرف</strong><br>
I'm your AI-powered hospital room service assistant. I can help you order meals, check allergen information, and find dishes that match your dietary needs.

<strong>🍽️ Available Services:</strong>
• Fresh Salads & Sandwiches (Grab & Go)
• Daily Hot Specials (Seafood, Chicken, Beef/Lamb, Pasta)
• Desserts & Beverages
• Room delivery available<br>
<strong>🎤 Voice Commands Ready!</strong>
Press and hold the microphone button to start talking in any language, or use one of the quick actions below.`,
      time: getTimeString(),
    };
    setMessages([welcomeMessage]);
  }, []);

  const startRecording = async () => {
    if (!isConnected || isRecording) return;

    try {
      recordingStartTimeRef.current = Date.now();
      audioChunksRef.current = [];

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioStreamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      setIsRecording(true);

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        processCompleteRecording();
      };

      mediaRecorder.start(250);
      showStatus('microphone-alt', 'Listening', 'Speak clearly into your microphone', 'pulse');
    } catch (error) {
      console.error('Recording error:', error);
      showStatus('exclamation-triangle', 'Error', 'Microphone access denied', 'error');
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (!isRecording) return;

    const recordingDuration = Date.now() - recordingStartTimeRef.current;
    if (recordingDuration < 500) {
      setTimeout(() => stopRecordingReal(), 500 - recordingDuration);
    } else {
      stopRecordingReal();
    }
  };

  const stopRecordingReal = () => {
    if (!isRecording) return;
    setIsRecording(false);

    try {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
      if (audioStreamRef.current) {
        audioStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      showStatus('brain', 'Processing', 'Analyzing your request with AI', 'processing');
    } catch (error) {
      console.error('Stop recording error:', error);
    }
  };

  const processCompleteRecording = async () => {
    if (audioChunksRef.current.length === 0) {
      showStatus('exclamation-triangle', 'Error', 'No audio recorded', 'error');
      return;
    }

    // Simulate processing
    hideStatus();
    setTimeout(() => {
      addMessage('user', 'Demo: Voice recording captured (backend not connected)');
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addMessage(
          'bot',
          'This is a demo UI. To enable voice processing, you need to set up the backend with SignalR and speech processing endpoints.'
        );
      }, 1500);
    }, 500);

    audioChunksRef.current = [];
  };

  const sendQuickQuery = (query) => {
    addMessage('user', query);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      addMessage(
        'bot',
        `Thank you for asking about "${query}". This is a demo response. To get real AI-powered responses, you need to connect the backend with speech processing and AI services.`
      );
    }, 1500);
  };

  return {
    messages,
    isTyping,
    isRecording,
    isConnected,
    connectionStatus,
    statusBar,
    startRecording,
    stopRecording,
    sendQuickQuery,
  };
};
