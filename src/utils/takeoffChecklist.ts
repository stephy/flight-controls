import { ChecklistStep } from './checklistTypes';
import { RootStore } from '../stores/RootStore';

export const takeoffSteps: ChecklistStep[] = [
  {
    id: 'controls-free',
    description: '1. Flight controls - FREE and CORRECT',
    explanation: 'Verify all flight controls (ailerons, elevator, rudder) move freely through their full range of motion and deflect in the correct direction.',
    check: (store: RootStore) => store.controls.controlsChecked,
    hint: 'Move each control through its full range'
  },
  {
    id: 'trim-takeoff',
    description: '2. Trim - SET FOR TAKEOFF',
    explanation: 'Set the trim tab to the neutral position for takeoff. This reduces control forces needed during the takeoff roll.',
    check: (store: RootStore) => Math.abs(store.controls.trimTab) < 1,
    hint: 'Center the trim'
  },
  {
    id: 'flaps-takeoff',
    description: '3. Flaps - SET FOR TAKEOFF (10°)',
    explanation: 'Set flaps to takeoff position. For the Cessna 172, this is typically 10 degrees to provide extra lift during takeoff while minimizing drag.',
    check: (store: RootStore) => store.controls.flaps === 10,
    hint: 'Set flaps to 10 degrees'
  },
  {
    id: 'mixture-rich',
    description: '4. Mixture - RICH',
    explanation: 'Ensure mixture is set to full rich for maximum power during takeoff. This provides adequate fuel flow for the high power setting.',
    check: (store: RootStore) => store.engine.mixture === 100,
    hint: 'Set mixture to 100%'
  },
  {
    id: 'throttle-full',
    description: '5. Throttle - FULL POWER',
    explanation: 'Advance throttle smoothly to full power. This provides maximum power for takeoff and helps ensure engine parameters are stable.',
    check: (store: RootStore) => store.engine.throttle === 100,
    hint: 'Set throttle to 100%'
  }
];