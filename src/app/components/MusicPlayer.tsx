import { useEffect, useState } from 'react';
import { usePlayer } from '../context/PlayerContext';
import { Play, Pause, SkipBack, SkipForward, Volume2, Repeat, Shuffle } from 'lucide-react';

export function MusicPlayer() {
  const { 
    currentTrack, isPlaying, togglePlay, audioRef, 
    playNext, playPrevious, toggleShuffle, toggleRepeat, 
    isShuffle, isRepeat 
  } = usePlayer();
  
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((err) => console.log('Audio playback prevented', err));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack, audioRef]);

  const handleTimeUpdate = () => {
    if (audioRef.current && !isNaN(audioRef.current.currentTime)) {
      setProgress(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current && !isNaN(audioRef.current.duration)) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setProgress(time);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time) || !isFinite(time)) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 lg:h-24 bg-[#181818] border-t border-[#282828] text-white px-3 md:px-6 flex flex-col md:flex-row items-center justify-between z-[100] shadow-xl py-3 md:py-0">
      
      {/* Mobile absolute top progress bar (only visible on mobile) */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gray-600 md:hidden overflow-hidden">
        <div 
          className="h-full bg-white transition-all duration-100 ease-linear" 
          style={{ width: `${duration ? (progress / duration) * 100 : 0}%` }} 
        />
        <input
            type="range"
            min={0}
            max={duration || 100}
            value={progress}
            onChange={handleSeek}
            className="absolute -top-2 left-0 w-full h-4 opacity-0 cursor-pointer"
        />
      </div>

      <audio
        ref={audioRef}
        src={currentTrack.audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => playNext()}
        loop={isRepeat}
      />
      
      {/* Track Info */}
      <div className="flex items-center gap-3 w-full md:w-1/3 mb-4 md:mb-0">
        <img src={currentTrack.image} alt={currentTrack.title} className="w-12 h-12 md:w-14 md:h-14 object-cover rounded" />
        <div className="flex-1 overflow-hidden pr-2">
          <h4 className="text-sm font-medium truncate">{currentTrack.title}</h4>
          <p className="text-xs text-gray-400 truncate">{currentTrack.artist}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center flex-1 max-w-2xl px-2 w-full">
        <div className="flex items-center justify-between md:justify-center w-full md:w-auto gap-4 md:gap-6 mb-1 md:mb-2">
          <button 
            onClick={toggleShuffle} 
            className={`transition px-2 py-1 ${isShuffle ? 'text-green-500' : 'text-gray-400 hover:text-white'}`}
          >
            <Shuffle className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          
          <button onClick={playPrevious} className="text-gray-400 hover:text-white transition p-1">
            <SkipBack className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          
          <button 
            onClick={togglePlay}
            className="w-10 h-10 md:w-10 md:h-10 flex items-center justify-center bg-white text-black rounded-full hover:scale-105 transition shrink-0"
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
          </button>
          
          <button onClick={playNext} className="text-gray-400 hover:text-white transition p-1">
            <SkipForward className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          
          <button 
            onClick={toggleRepeat} 
            className={`transition px-2 py-1 ${isRepeat ? 'text-green-500' : 'text-gray-400 hover:text-white'}`}
          >
            <Repeat className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
        
        {/* Desktop Progress Bar */}
        <div className="hidden md:flex items-center gap-2 w-full text-xs text-gray-400">
          <span className="w-10 text-right">{formatTime(progress)}</span>
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={progress}
            onChange={handleSeek}
            className="flex-1 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-white"
          />
          <span className="w-10">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Volume (Hidden on Mobile) */}
      <div className="hidden md:flex items-center justify-end gap-3 w-1/3 text-gray-400">
        <Volume2 className="w-5 h-5" />
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => {
            const v = Number(e.target.value);
            setVolume(v);
            if (audioRef.current) audioRef.current.volume = v;
          }}
          className="w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-white"
        />
      </div>
    </div>
  );
}
