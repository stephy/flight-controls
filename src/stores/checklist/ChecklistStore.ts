import { makeAutoObservable } from 'mobx';
import { ChecklistType } from '../../utils/checklistTypes';
import { RootStore } from '../RootStore';

export class ChecklistStore {
  activeChecklist: ChecklistType = 'startup';
  private rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {
      rootStore: false
    });
  }

  setActiveChecklist(type: ChecklistType) {
    // Only allow switching to takeoff if engine is started
    if (type === 'takeoff' && !this.rootStore.engine.engineStarted) {
      return;
    }
    this.activeChecklist = type;
  }

  isStartupComplete() {
    const { engine, controls } = this.rootStore;
    return (
      engine.mixture === 100 &&
      controls.areControlsCentered() &&
      controls.flaps === 0 &&
      engine.throttle >= 10 &&
      engine.throttle <= 20
    );
  }

  isTakeoffReady() {
    const { engine, controls } = this.rootStore;
    return (
      controls.controlsChecked &&
      controls.flaps === 10 &&
      Math.abs(controls.trimTab) < 1 &&
      engine.throttle === 100 &&
      engine.mixture === 100
    );
  }
}