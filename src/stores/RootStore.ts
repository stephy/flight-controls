import { makeAutoObservable } from 'mobx';
import { EngineStore } from './engine/EngineStore';
import { FlightControlStore } from './controls/FlightControlStore';
import { ChecklistStore } from './checklist/ChecklistStore';

export class RootStore {
  engine: EngineStore;
  controls: FlightControlStore;
  checklist: ChecklistStore;

  constructor() {
    this.engine = new EngineStore();
    this.controls = new FlightControlStore();
    this.checklist = new ChecklistStore(this);

    makeAutoObservable(this);
  }

  resetAll() {
    this.engine.shutdown();
    this.controls.resetControls();
    this.checklist.setActiveChecklist('startup');
  }
}