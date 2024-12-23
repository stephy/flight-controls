import { ChecklistStep } from './checklistTypes';
import { RootStore } from '../stores/RootStore';

export const startupSteps: ChecklistStep[] = [
  {
    id: 'controls-neutral',
    description: '1. Center all flight controls',
    explanation: 'Centering the flight controls (ailerons, elevator, and rudder) ensures there\'s no unexpected movement when the engine starts. This also allows you to verify the controls move freely.',
    check: (store: RootStore) => store.controls.areControlsCentered(),
    hint: 'Center the yoke and rudder pedals'
  },
  {
    id: 'flaps-up',
    description: '2. Flaps up (0°)',
    explanation: 'Flaps should be retracted during startup to prevent damage from prop wash (air pushed by the propeller). It also establishes a known configuration for the aircraft.',
    check: (store: RootStore) => store.controls.flaps === 0,
    hint: 'Raise the flaps completely'
  },
  {
    id: 'mixture-rich',
    description: '3. Set mixture to rich (100%)',
    explanation: 'The mixture control adjusts the ratio of fuel to air entering the engine. During startup, a rich mixture (more fuel) is necessary because a cold engine needs extra fuel to start reliably.',
    check: (store: RootStore) => store.engine.mixture === 100,
    hint: 'Move the mixture control to 100%'
  },
  {
    id: 'throttle-closed',
    description: '4. Close throttle (0%)',
    explanation: 'Starting with throttle closed prevents the engine from running too fast when it catches. This is similar to not pressing the gas pedal when starting a car.',
    check: (store: RootStore) => store.engine.throttle === 0,
    hint: 'Move throttle to 0%'
  },
  {
    id: 'throttle-crack',
    description: '5. Crack throttle open (15%)',
    explanation: 'Once ready to start, open the throttle slightly to provide enough fuel for the engine to start and maintain idle. Too much throttle could flood the engine.',
    check: (store: RootStore) => store.engine.throttle >= 10 && store.engine.throttle <= 20,
    hint: 'Move throttle to 10-20%'
  }
];