import { useEffect, useRef } from 'react';
import { store } from '../stores';

const CONTROL_SPEED = 1; // Degrees per frame
const RETURN_SPEED = 0.5; // Speed of controls returning to center

export const useKeyboardControls = () => {
  const pressedKeys = useRef(new Set<string>());
  const animationFrame = useRef<number>();

  // Update controls based on pressed keys
  const updateControls = () => {
    // Elevator control (up/down)
    if (pressedKeys.current.has('ArrowUp')) {
      // Pull back = nose up = negative elevator
      store.controls.setElevator(store.controls.elevator - CONTROL_SPEED);
    }
    if (pressedKeys.current.has('ArrowDown')) {
      // Push forward = nose down = positive elevator
      store.controls.setElevator(store.controls.elevator + CONTROL_SPEED);
    }

    // Aileron control (left/right)
    if (pressedKeys.current.has('ArrowLeft')) {
      store.controls.setAilerons(store.controls.ailerons - CONTROL_SPEED);
    }
    if (pressedKeys.current.has('ArrowRight')) {
      store.controls.setAilerons(store.controls.ailerons + CONTROL_SPEED);
    }

    // Rudder control (A/D)
    if (pressedKeys.current.has('a') || pressedKeys.current.has('A')) {
      store.controls.setRudder(store.controls.rudder - CONTROL_SPEED);
    }
    if (pressedKeys.current.has('d') || pressedKeys.current.has('D')) {
      store.controls.setRudder(store.controls.rudder + CONTROL_SPEED);
    }

    // Return controls to center when no keys are pressed
    if (!pressedKeys.current.has('ArrowUp') && !pressedKeys.current.has('ArrowDown')) {
      if (Math.abs(store.controls.elevator) > 0) {
        store.controls.setElevator(
          store.controls.elevator > 0 
            ? Math.max(0, store.controls.elevator - RETURN_SPEED)
            : Math.min(0, store.controls.elevator + RETURN_SPEED)
        );
      }
    }

    if (!pressedKeys.current.has('ArrowLeft') && !pressedKeys.current.has('ArrowRight')) {
      if (Math.abs(store.controls.ailerons) > 0) {
        store.controls.setAilerons(
          store.controls.ailerons > 0
            ? Math.max(0, store.controls.ailerons - RETURN_SPEED)
            : Math.min(0, store.controls.ailerons + RETURN_SPEED)
        );
      }
    }

    // Return rudder to center
    if (!pressedKeys.current.has('a') && !pressedKeys.current.has('A') &&
        !pressedKeys.current.has('d') && !pressedKeys.current.has('D')) {
      if (Math.abs(store.controls.rudder) > 0) {
        store.controls.setRudder(
          store.controls.rudder > 0
            ? Math.max(0, store.controls.rudder - RETURN_SPEED)
            : Math.min(0, store.controls.rudder + RETURN_SPEED)
        );
      }
    }

    // Continue animation loop
    animationFrame.current = requestAnimationFrame(updateControls);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      pressedKeys.current.add(e.key);
      if (!animationFrame.current) {
        animationFrame.current = requestAnimationFrame(updateControls);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      pressedKeys.current.delete(e.key);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);
};