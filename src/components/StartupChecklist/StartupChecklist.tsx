import React from 'react';
import { observer } from 'mobx-react-lite';
import { css } from 'glamor';
import { Power, Info } from 'lucide-react';
import { store } from '../../stores';
import { startupSteps } from '../../utils/startupSteps';
import { takeoffSteps } from '../../utils/takeoffChecklist';
import { ChecklistStep } from './ChecklistStep';
import { ChecklistSelector } from './ChecklistSelector';

const styles = {
  checklist: css({
    color: '#fff'
  }),
  title: css({
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '15px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  }),
  startButton: css({
    marginTop: '20px',
    padding: '10px',
    width: '100%',
    backgroundColor: '#34D399',
    border: 'none',
    borderRadius: '5px',
    color: '#fff',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    ':disabled': {
      backgroundColor: '#4B5563',
      cursor: 'not-allowed'
    }
  }),
  resetButton: css({
    marginTop: '10px',
    padding: '8px',
    width: '100%',
    backgroundColor: '#EF4444',
    border: 'none',
    borderRadius: '5px',
    color: '#fff',
    cursor: 'pointer',
    ':disabled': {
      backgroundColor: '#4B5563',
      cursor: 'not-allowed'
    }
  }),
  engineInfo: css({
    marginTop: '15px',
    padding: '10px',
    backgroundColor: '#1E293B',
    borderRadius: '5px',
    fontSize: '14px',
    lineHeight: '1.4',
    display: 'flex',
    gap: '8px',
    alignItems: 'flex-start'
  })
};

export const StartupChecklist = observer(() => {
  const activeSteps = store.checklist.activeChecklist === 'startup' ? startupSteps : takeoffSteps;
  const isStartupComplete = store.checklist.isStartupComplete();
  const isTakeoffReady = store.checklist.isTakeoffReady();

  const handleStartEngine = () => {
    const success = store.engine.startEngine();
    if (!success) {
      alert('Please complete all checklist items before starting the engine.');
    }
  };

  return (
    <div {...styles.checklist}>
      <div {...styles.title}>
        <Power size={20} />
        {store.checklist.activeChecklist === 'startup' ? 'Engine Startup' : 'Takeoff'} Checklist
      </div>

      <ChecklistSelector />

      {activeSteps.map((step) => (
        <ChecklistStep
          key={step.id}
          step={step}
          isCompleted={step.check(store)}
        />
      ))}

      {store.checklist.activeChecklist === 'startup' && (
        <>
          <div {...styles.engineInfo}>
            <Info size={16} style={{ marginTop: '2px' }} />
            <div>
              Starting the engine requires:
              <ul style={{ marginTop: '4px', marginLeft: '16px', listStyle: 'disc' }}>
                <li>Controls centered to prevent sudden movements</li>
                <li>Flaps retracted to avoid prop wash damage</li>
                <li>Rich mixture for reliable cold start</li>
                <li>Throttle at idle (10-20%) to maintain proper RPM</li>
              </ul>
              Once started, the propeller will begin spinning and you can proceed to the takeoff checklist.
            </div>
          </div>

          <button
            {...styles.startButton}
            onClick={handleStartEngine}
            disabled={store.engine.engineStarted || !isStartupComplete}
          >
            <Power size={16} />
            {store.engine.engineStarted ? 'Engine Running' : 'Start Engine'}
          </button>

          {store.engine.engineStarted && (
            <button
              {...styles.resetButton}
              onClick={() => store.resetAll()}
            >
              Reset Startup Sequence
            </button>
          )}
        </>
      )}
    </div>
  );
});