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

export function MainSite() {
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
