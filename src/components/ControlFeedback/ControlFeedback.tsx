import React from 'react';
import { observer } from 'mobx-react-lite';
import { css } from 'glamor';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { store } from '../../stores';

const styles = {
  container: css({
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'none',
    zIndex: 1000
  }),
  overlay: css({
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: '#fff',
    transition: 'opacity 0.2s',
    gap: '10px'
  }),
  up: css({
    top: '-120px',
    left: '50%',
    transform: 'translateX(-50%)'
  }),
  down: css({
    bottom: '-120px',
    left: '50%',
    transform: 'translateX(-50%)'
  }),
  left: css({
    left: '-120px',
    top: '50%',
    transform: 'translateY(-50%)'
  }),
  right: css({
    right: '-120px',
    top: '50%',
    transform: 'translateY(-50%)'
  }),
  text: css({
    fontSize: '18px',
    fontWeight: 'bold'
  })
};

export const ControlFeedback = observer(() => {
  const { elevator, ailerons } = store.controls;
  const elevatorActive = Math.abs(elevator) > 1;
  const aileronsActive = Math.abs(ailerons) > 1;

  return (
    <div {...styles.container}>
      {/* Pull (nose up) */}
      <div
        {...css(
          styles.overlay,
          styles.up,
          { opacity: elevator < -1 ? 1 : 0 }
        )}
      >
        <ArrowUp size={24} />
        <span {...styles.text}>PULL</span>
      </div>

      {/* Push (nose down) */}
      <div
        {...css(
          styles.overlay,
          styles.down,
          { opacity: elevator > 1 ? 1 : 0 }
        )}
      >
        <ArrowDown size={24} />
        <span {...styles.text}>PUSH</span>
      </div>

      {/* Roll left */}
      <div
        {...css(
          styles.overlay,
          styles.left,
          { opacity: ailerons < -1 ? 1 : 0 }
        )}
      >
        <ArrowLeft size={24} />
        <span {...styles.text}>ROLL LEFT</span>
      </div>

      {/* Roll right */}
      <div
        {...css(
          styles.overlay,
          styles.right,
          { opacity: ailerons > 1 ? 1 : 0 }
        )}
      >
        <ArrowRight size={24} />
        <span {...styles.text}>ROLL RIGHT</span>
      </div>
    </div>
  );
});