import { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

export default function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const newTime = (parseFloat(e.target.value) / 100) * video.duration;
    video.currentTime = newTime;
    setProgress(parseFloat(e.target.value));
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[60vh] md:h-[100vh] overflow-hidden bg-charcoal"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        ref={videoRef}
        src="/videos/atmosphere.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div
        className={`absolute bottom-[10%] left-1/2 -translate-x-1/2 flex items-center gap-6 bg-white/10 backdrop-blur-md px-8 py-4 transition-all duration-500 ${
          showControls
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4'
        }`}
      >
        <button
          onClick={togglePlay}
          className="text-white hover:text-earth transition-colors duration-300"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>

        <div className="flex items-center gap-3">
          <span className="font-display text-[10px] uppercase tracking-[1px] text-white/60">
            Progress
          </span>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleScrub}
            className="w-32 md:w-48 h-0.5 appearance-none bg-white/30 outline-none cursor-pointer accent-earth"
            style={{
              background: `linear-gradient(to right, #6F5E4F ${progress}%, rgba(255,255,255,0.3) ${progress}%)`,
            }}
          />
        </div>

        <button
          onClick={toggleMute}
          className="text-white hover:text-earth transition-colors duration-300"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      </div>
    </section>
  );
}
