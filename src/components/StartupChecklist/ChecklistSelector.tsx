import React from 'react';
import { css } from 'glamor';
import { observer } from 'mobx-react-lite';
import { store } from '../../stores';
import { ChecklistType } from '../../utils/checklistTypes';

const styles = {
  container: css({
    marginBottom: '20px'
  }),
  tabs: css({
    display: 'flex',
    gap: '1px',
    backgroundColor: '#2a2a2a',
    padding: '4px',
    borderRadius: '6px'
  }),
  tab: css({
    flex: 1,
    padding: '8px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: 'transparent',
    color: '#888',
    cursor: 'pointer',
    transition: 'all 0.2s',
    ':hover:not(:disabled)': {
      color: '#fff',
      backgroundColor: '#3a3a3a'
    },
    ':disabled': {
      opacity: 0.5,
      cursor: 'not-allowed'
    }
  }),
  activeTab: css({
    backgroundColor: '#3a3a3a',
    color: '#fff'
  })
};

export const ChecklistSelector = observer(() => {
  const handleSelect = (type: ChecklistType) => {
    store.checklist.setActiveChecklist(type);
  };

  const isTakeoffEnabled = store.engine.engineStarted;

  return (
    <div {...styles.container}>
      <div {...styles.tabs}>
        <button
          {...css(styles.tab, store.checklist.activeChecklist === 'startup' && styles.activeTab)}
          onClick={() => handleSelect('startup')}
        >
          Startup
        </button>
        <button
          {...css(styles.tab, store.checklist.activeChecklist === 'takeoff' && styles.activeTab)}
          onClick={() => handleSelect('takeoff')}
          disabled={!isTakeoffEnabled}
          title={!isTakeoffEnabled ? 'Complete engine startup first' : undefined}
        >
          Takeoff
        </button>
      </div>
    </div>
  );
});