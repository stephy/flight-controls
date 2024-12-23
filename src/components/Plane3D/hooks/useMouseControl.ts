import { useEffect, useRef } from 'react';

interface MouseControlOptions {
  onDrag: (deltaX: number, deltaY: number) => void;
  sensitivity?: number;
}

export const useMouseControl = (elementId: string, { onDrag, sensitivity = 1 }: MouseControlOptions) => {
  const isDragging = useRef(false);
  const lastPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const element = document.getElementById(elementId);
    if (!element) return;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      lastPosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;

      const deltaX = (e.clientX - lastPosition.current.x) * sensitivity;
      const deltaY = (e.clientY - lastPosition.current.y) * sensitivity;
      
      onDrag(deltaX, deltaY);
      
      lastPosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    element.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      element.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [elementId, onDrag, sensitivity]);
};