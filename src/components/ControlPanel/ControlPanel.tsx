import React from 'react';
import { observer } from 'mobx-react-lite';
import { RotateCcw, Check } from 'lucide-react';
import { store } from '../../stores';
import { COLORS } from '../../utils/colors';
import { styles } from './styles';

const formatDegrees = (value: number) => value.toFixed(1);

const FlapMarks = () => (
  <div {...styles.flapMarks}>
    <div {...styles.flapMark} style={{ left: '0%' }}>
      <div {...styles.flapMarkLine} />
      <span {...styles.flapMarkLabel}>0°</span>
    </div>
    <div {...styles.flapMark} style={{ left: '33.33%' }}>
      <div {...styles.flapMarkLine} />
      <span {...styles.flapMarkLabel}>10°</span>
    </div>
    <div {...styles.flapMark} style={{ left: '66.66%' }}>
      <div {...styles.flapMarkLine} />
      <span {...styles.flapMarkLabel}>20°</span>
    </div>
    <div {...styles.flapMark} style={{ left: '100%' }}>
      <div {...styles.flapMarkLine} />
      <span {...styles.flapMarkLabel}>30°</span>
    </div>
  </div>
);

export const ControlPanel = observer(() => {
  // Track maximum deflection of each control
  const maxDeflection = React.useRef({
    ailerons: 0,
    elevator: 0,
    rudder: 0
  });

  const handleControlCheck = () => {
    // Update maximum deflections
    maxDeflection.current = {
      ailerons: Math.max(maxDeflection.current.ailerons, Math.abs(store.controls.ailerons)),
      elevator: Math.max(maxDeflection.current.elevator, Math.abs(store.controls.elevator)),
      rudder: Math.max(maxDeflection.current.rudder, Math.abs(store.controls.rudder))
    };

    // Mark controls as checked if they've been moved through sufficient range
    if (
      maxDeflection.current.ailerons >= 25 &&
      maxDeflection.current.elevator >= 25 &&
      maxDeflection.current.rudder >= 25
    ) {
      store.controls.setControlsChecked(true);
    }
  };

  // Add event listeners for control movements
  React.useEffect(() => {
    handleControlCheck();
  }, [store.controls.ailerons, store.controls.elevator, store.controls.rudder]);

  return (
    <div>
      <div {...styles.section}>
        <h3 {...styles.sectionTitle}>Primary Controls</h3>
        
        <div {...styles.controlGroup}>
          <div {...styles.label}>
            <span>Ailerons</span>
            <span {...styles.value} style={{ color: COLORS.AILERONS }}>{formatDegrees(store.controls.ailerons)}°</span>
          </div>
          <input
            type="range"
            min="-30"
            max="30"
            value={store.controls.ailerons}
            onChange={(e) => store.controls.setAilerons(Number(e.target.value))}
            {...styles.createSlider(COLORS.AILERONS)}
          />
        </div>

        <div {...styles.controlGroup}>
          <div {...styles.label}>
            <span>Elevator</span>
            <span {...styles.value} style={{ color: COLORS.ELEVATOR }}>{formatDegrees(store.controls.elevator)}°</span>
          </div>
          <input
            type="range"
            min="-30"
            max="30"
            value={store.controls.elevator}
            onChange={(e) => store.controls.setElevator(Number(e.target.value))}
            {...styles.createSlider(COLORS.ELEVATOR)}
          />
        </div>

        <div {...styles.controlGroup}>
          <div {...styles.label}>
            <span>Rudder</span>
            <span {...styles.value} style={{ color: COLORS.RUDDER }}>{formatDegrees(store.controls.rudder)}°</span>
          </div>
          <input
            type="range"
            min="-30"
            max="30"
            value={store.controls.rudder}
            onChange={(e) => store.controls.setRudder(Number(e.target.value))}
            {...styles.createSlider(COLORS.RUDDER)}
          />
        </div>

        {store.controls.controlsChecked && (
          <div {...styles.controlChecked}>
            <Check size={16} />
            Controls checked through full range
          </div>
        )}
      </div>

      <div {...styles.section}>
        <h3 {...styles.sectionTitle}>Secondary Controls</h3>
        
        <div {...styles.controlGroup}>
          <div {...styles.label}>
            <span>Flaps</span>
            <span {...styles.value} style={{ color: COLORS.FLAPS }}>{formatDegrees(store.controls.flaps)}°</span>
          </div>
          <div {...styles.flapControl}>
            <input
              type="range"
              min="0"
              max="30"
              step="1"
              value={store.controls.flaps}
              onChange={(e) => store.controls.setFlaps(Number(e.target.value))}
              {...styles.createSlider(COLORS.FLAPS)}
            />
            <FlapMarks />
          </div>
        </div>

        <div {...styles.controlGroup}>
          <div {...styles.label}>
            <span>Trim Tab</span>
            <span {...styles.value} style={{ color: COLORS.TRIM_TAB }}>{formatDegrees(store.controls.trimTab)}°</span>
          </div>
          <input
            type="range"
            min="-10"
            max="10"
            value={store.controls.trimTab}
            onChange={(e) => store.controls.setTrimTab(Number(e.target.value))}
            {...styles.createSlider(COLORS.TRIM_TAB)}
          />
        </div>
      </div>

      <button {...styles.resetButton} onClick={() => store.controls.resetControls()}>
        <RotateCcw size={16} />
        Reset Controls
      </button>
    </div>
  );
});