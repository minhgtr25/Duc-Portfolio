import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Demos } from './components/Demos';
import { Services } from './components/Services';
import { Experience } from './components/Experience';
import { Gallery } from './components/Gallery';
import { Contact } from './components/Contact';
import { PlayerProvider } from './context/PlayerContext';
import { MusicPlayer } from './components/MusicPlayer';
import { SmoothScroll } from './components/SmoothScroll';
import { CustomCursor } from './components/CustomCursor';
import { useData } from './context/DataContext';

export function MainSite() {
  const { isLoading } = useData();

  if (isLoading) {
    return (
      <div className="min-h-[100dvh] bg-black text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="relative w-12 h-12 mx-auto">
            <div className="absolute inset-0 border border-zinc-800 rounded-full"></div>
            <div className="absolute inset-0 border border-t-white rounded-full animate-spin"></div>
          </div>
          <p className="text-zinc-500 font-mono tracking-widest text-xs uppercase animate-pulse">Loading Portfolio</p>
        </div>
      </div>
    );
  }

  return (
    <PlayerProvider>
      <SmoothScroll>
        <CustomCursor />
        <div className="size-full pb-24">
          <Hero />
          <About />
          <Projects />
          <Demos />

          <Services />
          <Experience />
          <Gallery />
          <Contact />
        </div>
        <MusicPlayer />
      </SmoothScroll>
    </PlayerProvider>
  );
}
