import { useEffect, useRef } from 'react';
import { reaction } from 'mobx';
import { store } from '../stores';

// For now, we'll use placeholder URLs. In production, these should be real sound files
const SOUND_URLS = {
  pull: '/sounds/pull.mp3',
  push: '/sounds/push.mp3',
  rollLeft: '/sounds/roll-left.mp3',
  rollRight: '/sounds/roll-right.mp3'
};

export const useControlSounds = () => {
  const sounds = useRef<{ [key: string]: HTMLAudioElement }>({});
  const lastPlayed = useRef<{ [key: string]: number }>({});
  const minPlayInterval = 500; // Minimum time between sound plays (ms)

  useEffect(() => {
    // Preload sounds
    Object.entries(SOUND_URLS).forEach(([key, url]) => {
      const audio = new Audio(url);
      audio.volume = 0.5;
      sounds.current[key] = audio;
      lastPlayed.current[key] = 0;
    });

    // Use MobX reaction to observe control changes
    const dispose = reaction(
      () => ({
        elevator: store.controls.elevator,
        ailerons: store.controls.ailerons
      }),
      ({ elevator, ailerons }) => {
        const now = Date.now();

        // Play pull sound
        if (elevator < -1 && now - lastPlayed.current.pull > minPlayInterval) {
          sounds.current.pull.currentTime = 0;
          sounds.current.pull.play().catch(() => {
            // Ignore audio play errors (common in browsers before user interaction)
          });
          lastPlayed.current.pull = now;
        }

        // Play push sound
        if (elevator > 1 && now - lastPlayed.current.push > minPlayInterval) {
          sounds.current.push.currentTime = 0;
          sounds.current.push.play().catch(() => {});
          lastPlayed.current.push = now;
        }

        // Play roll left sound
        if (ailerons < -1 && now - lastPlayed.current.rollLeft > minPlayInterval) {
          sounds.current.rollLeft.currentTime = 0;
          sounds.current.rollLeft.play().catch(() => {});
          lastPlayed.current.rollLeft = now;
        }

        // Play roll right sound
        if (ailerons > 1 && now - lastPlayed.current.rollRight > minPlayInterval) {
          sounds.current.rollRight.currentTime = 0;
          sounds.current.rollRight.play().catch(() => {});
          lastPlayed.current.rollRight = now;
        }
      }
    );

    return () => {
      dispose();
      Object.values(sounds.current).forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
      });
    };
  }, []);
};