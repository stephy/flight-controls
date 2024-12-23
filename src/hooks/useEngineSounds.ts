import { useEffect, useRef } from 'react';
import { reaction } from 'mobx';
import { store } from '../stores';

const SOUND_URLS = {
  startup: '/sounds/engine-start.mp3',
  running: '/sounds/engine-idle.mp3',
  shutdown: '/sounds/engine-stop.mp3'
};

export const useEngineSounds = () => {
  const sounds = useRef<{ [key: string]: HTMLAudioElement }>({});
  const engineLoop = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Preload sounds
    Object.entries(SOUND_URLS).forEach(([key, url]) => {
      const audio = new Audio(url);
      if (key === 'running') {
        audio.loop = true;
      }
      sounds.current[key] = audio;
    });

    // Use MobX reaction to observe engine state changes
    const dispose = reaction(
      () => store.engine.engineStarted,
      (started) => {
        if (started) {
          // Play startup sound followed by running loop
          const startupSound = sounds.current.startup;
          const runningSound = sounds.current.running;
          
          startupSound.currentTime = 0;
          startupSound.volume = 0.7;
          runningSound.volume = 0;
          
          // Play startup sound
          startupSound.play().catch(() => {});
          
          // Fade in running sound as startup completes
          const fadeStart = setTimeout(() => {
            runningSound.play().catch(() => {});
            let volume = 0;
            const fadeInterval = setInterval(() => {
              volume = Math.min(0.5, volume + 0.1);
              runningSound.volume = volume;
              if (volume >= 0.5) clearInterval(fadeInterval);
            }, 200);
          }, 2000);

          engineLoop.current = runningSound;
          
          return () => {
            clearTimeout(fadeStart);
          };
        } else {
          // Play shutdown sound and stop running loop
          if (engineLoop.current) {
            engineLoop.current.pause();
            engineLoop.current = null;
          }
          
          const shutdownSound = sounds.current.shutdown;
          shutdownSound.currentTime = 0;
          shutdownSound.volume = 0.7;
          shutdownSound.play().catch(() => {});
        }
      }
    );

    return () => {
      dispose();
      // Clean up all sounds
      Object.values(sounds.current).forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
      });
    };
  }, []);
};