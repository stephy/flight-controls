import React, { useState } from 'react';
import { css } from 'glamor';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const styles = {
  drawer: (side: 'left' | 'right') => css({
    position: 'fixed',
    top: 0,
    [side]: 0,
    height: '100vh',
    backgroundColor: '#2a2a2a',
    transition: 'transform 0.3s ease-in-out',
    zIndex: 1000,
    display: 'flex'
  }),
  content: css({
    padding: '20px',
    width: '300px',
    height: '100%',
    overflowY: 'auto'
  }),
  toggle: css({
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: '#2a2a2a',
    border: 'none',
    color: '#fff',
    padding: '12px 4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '0 4px 4px 0',
    ':hover': {
      backgroundColor: '#3a3a3a'
    }
  })
};

interface DrawerProps {
  side: 'left' | 'right';
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

export const Drawer = ({ 
  side, 
  title, 
  children, 
  defaultOpen = true,
  isOpen: controlledIsOpen,
  onOpenChange 
}: DrawerProps) => {
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(defaultOpen);
  
  const isOpen = controlledIsOpen ?? uncontrolledIsOpen;
  const setIsOpen = (value: boolean) => {
    setUncontrolledIsOpen(value);
    onOpenChange?.(value);
  };

  const toggleButton = side === 'left' ? (
    <button
      {...styles.toggle}
      style={{ right: '-28px' }}
      onClick={() => setIsOpen(!isOpen)}
      aria-label={isOpen ? 'Close drawer' : 'Open drawer'}
    >
      {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
    </button>
  ) : (
    <button
      {...styles.toggle}
      style={{ left: '-28px' }}
      onClick={() => setIsOpen(!isOpen)}
      aria-label={isOpen ? 'Close drawer' : 'Open drawer'}
    >
      {isOpen ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
    </button>
  );

  return (
    <div
      {...styles.drawer(side)}
      style={{
        transform: isOpen ? 'translateX(0)' : `translateX(${side === 'left' ? '-100%' : '100%'})`
      }}
    >
      <div {...styles.content}>
        {children}
      </div>
      {toggleButton}
    </div>
  );
};