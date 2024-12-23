import { makeAutoObservable } from 'mobx';
import { ChecklistType } from '../utils/checklistTypes';
import { startupSteps } from '../utils/startupSteps';
import { takeoffSteps } from '../utils/takeoffChecklist';

export class PlaneStore {
  // Flight controls
  flaps = 0;
  ailerons = 0;
  elevator = 0;
  rudder = 0;
  trimTab = 0;

  // Engine controls
  throttle = 0;
  mixture = 100;
  propellerSpeed = 0;
  engineStarted = false;

  // Checklists
  activeChecklist: ChecklistType = 'startup';
  completedSteps: string[] = [];
  controlsChecked = false;

  constructor() {
    makeAutoObservable(this);
  }

  setActiveChecklist(type: ChecklistType) {
    this.activeChecklist = type;
    this.completedSteps = [];
  }

  getCompletedSteps() {
    const steps = this.activeChecklist === 'startup' ? startupSteps : takeoffSteps;
    return steps.filter(step => step.check(this)).map(step => step.id);
  }

  isStepCompleted(stepId: string) {
    const steps = this.activeChecklist === 'startup' ? startupSteps : takeoffSteps;
    const step = steps.find(s => s.id === stepId);
    return step ? step.check(this) : false;
  }

  // ... rest of the existing methods ...
}