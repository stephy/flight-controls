import React from 'react';
import { observer } from 'mobx-react-lite';
import { css } from 'glamor';
import { store } from '../../stores';

const styles = {
  section: css({
    backgroundColor: '#333',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '20px'
  }),
  sectionTitle: css({
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '15px',
    borderBottom: '1px solid #444',
    paddingBottom: '8px'
  }),
  controlGroup: css({
    marginBottom: '15px',
    '&:last-child': {
      marginBottom: 0
    }
  }),
  label: css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
    fontSize: '14px',
    color: '#aaa'
  }),
  value: css({
    color: '#FF9500',
    fontSize: '14px',
    fontWeight: 'bold'
  }),
  slider: css({
    width: '100%',
    height: '20px',
    backgroundColor: '#444',
    borderRadius: '10px',
    appearance: 'none',
    outline: 'none',
    '::-webkit-slider-thumb': {
      appearance: 'none',
      width: '20px',
      height: '20px',
      backgroundColor: '#FF9500',
      borderRadius: '50%',
      cursor: 'pointer',
      border: '2px solid #fff'
    }
  }),
  engineStatus: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2a2a2a',
    padding: '10px',
    borderRadius: '6px',
    marginTop: '15px'
  }),
  statusLabel: css({
    color: '#aaa',
    fontSize: '14px'
  }),
  statusValue: css({
    color: '#34D399',
    fontSize: '14px',
    fontWeight: 'bold'
  })
};

export const EngineControls = observer(() => {
  return (
    <div>
      <div {...styles.section}>
        <h3 {...styles.sectionTitle}>Engine Controls</h3>
        
        <div {...styles.controlGroup}>
          <div {...styles.label}>
            <span>Throttle</span>
            <span {...styles.value}>{store.engine.throttle}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={store.engine.throttle}
            onChange={(e) => store.engine.setThrottle(Number(e.target.value))}
            {...styles.slider}
          />
        </div>

        <div {...styles.controlGroup}>
          <div {...styles.label}>
            <span>Mixture</span>
            <span {...styles.value}>{store.engine.mixture}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={store.engine.mixture}
            onChange={(e) => store.engine.setMixture(Number(e.target.value))}
            {...styles.slider}
          />
        </div>

        <div {...styles.engineStatus}>
          <span {...styles.statusLabel}>Propeller Speed</span>
          <span {...styles.statusValue}>{Math.round(store.engine.propellerSpeed)}%</span>
        </div>
      </div>
    </div>
  );
});