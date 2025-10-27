import { useState, useRef, useEffect } from 'react';


const AudioPlayer = ({ audioBase64 }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    const audioBlob = base64ToBlob(audioBase64, 'audio/mpeg');
    const audioUrl = URL.createObjectURL(audioBlob);

    if (audioRef.current) {
      audioRef.current.src = audioUrl;
      audioRef.current.load();
    }

    return () => URL.revokeObjectURL(audioUrl);
  }, [audioBase64]);

  const base64ToBlob = (base64, mimeType) => {
    const byteCharacters = atob(base64);
    const byteNumbers = Array.from(byteCharacters, char => char.charCodeAt(0));
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  const handleProgressClick = (e) => {
    if (audioRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      audioRef.current.currentTime = percent * duration;
    }
  };

  return (
    <div className={`audio-player ${isLoading ? 'loading' : ''}`}>
      <audio
        ref={audioRef}
        onCanPlay={() => setIsLoading(false)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => {
          setIsPlaying(false);
          if (audioRef.current) audioRef.current.currentTime = 0;
        }}
      />
      <div className="audio-controls">
        <button
          className={`audio-play-btn ${isPlaying ? 'playing' : ''}`}
          onClick={togglePlayPause}
        >
          <i className={`fas fa-${isPlaying ? 'pause' : 'play'}`}></i>
        </button>
        <div className="audio-info">
          <div className="audio-title">
            <i className="fas fa-wave-square audio-wave-icon"></i> ChefBOT Response
          </div>
          <div className="audio-progress-container" onClick={handleProgressClick}>
            <div
              className="audio-progress-bar"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            ></div>
          </div>
        </div>
        <div className="audio-time">{formatTime(currentTime)}</div>
      </div>
    </div>
  );
};

export default AudioPlayer; // default export