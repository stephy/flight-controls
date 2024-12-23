import { useEffect, useRef } from 'react';
import { store } from '../../../stores';

interface YokeControlOptions {
  sensitivity?: number;
  returnToCenter?: boolean;
  centeringSpeed?: number;
}

export const useYokeControl = (elementId: string, options: YokeControlOptions = {}) => {
  const {
    sensitivity = 0.3,
    returnToCenter = true,
    centeringSpeed = 0.05
  } = options;

  const isDragging = useRef(false);
  const lastPosition = useRef({ x: 0, y: 0 });
  const centeringInterval = useRef<number>();

  const startCentering = () => {
    if (!returnToCenter) return;
    
    const animate = () => {
      const aileronCentering = -store.controls.ailerons * centeringSpeed;
      const elevatorCentering = -store.controls.elevator * centeringSpeed;
      
      store.controls.setAilerons(store.controls.ailerons + aileronCentering);
      store.controls.setElevator(store.controls.elevator + elevatorCentering);

      if (Math.abs(store.controls.ailerons) > 0.1 || Math.abs(store.controls.elevator) > 0.1) {
        centeringInterval.current = requestAnimationFrame(animate);
      }
    };

    centeringInterval.current = requestAnimationFrame(animate);
  };

  const stopCentering = () => {
    if (centeringInterval.current) {
      cancelAnimationFrame(centeringInterval.current);
    }
  };

  useEffect(() => {
    const element = document.getElementById(elementId);
    if (!element) return;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      lastPosition.current = { x: e.clientX, y: e.clientY };
      stopCentering();
      element.style.cursor = 'grabbing';
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;

      const deltaX = (e.clientX - lastPosition.current.x) * sensitivity;
      const deltaY = (e.clientY - lastPosition.current.y) * sensitivity;
      
      // Update control surfaces with momentum
      store.controls.setAilerons(store.controls.ailerons + deltaX);
      store.controls.setElevator(store.controls.elevator + deltaY);
      
      lastPosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      startCentering();
      element.style.cursor = 'grab';
    };

    const handleMouseLeave = () => {
      if (isDragging.current) {
        isDragging.current = false;
        startCentering();
        element.style.cursor = 'grab';
      }
    };

    element.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      element.removeEventListener('mouseleave', handleMouseLeave);
      stopCentering();
    };
  }, [elementId, sensitivity, returnToCenter, centeringSpeed]);
};