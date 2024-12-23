import { makeAutoObservable } from 'mobx';

export class FlightControlStore {
  flaps = 0;
  ailerons = 0;
  elevator = 0;
  rudder = 0;
  trimTab = 0;
  controlsChecked = false;

  constructor() {
    makeAutoObservable(this);
  }

  setFlaps(value: number) {
    this.flaps = Math.max(0, Math.min(30, value));
  }

  setAilerons(value: number) {
    this.ailerons = Math.max(-30, Math.min(30, value));
  }

  setElevator(value: number) {
    // Updated to allow ±30 degrees instead of ±15
    this.elevator = Math.max(-30, Math.min(30, value));
  }

  setRudder(value: number) {
    this.rudder = Math.max(-30, Math.min(30, value));
  }

  setTrimTab(value: number) {
    this.trimTab = Math.max(-10, Math.min(10, value));
  }

  setControlsChecked(value: boolean) {
    this.controlsChecked = value;
  }

  resetControls() {
    this.flaps = 0;
    this.ailerons = 0;
    this.elevator = 0;
    this.rudder = 0;
    this.trimTab = 0;
    this.controlsChecked = false;
  }

  areControlsCentered() {
    return (
      Math.abs(this.elevator) < 1 &&
      Math.abs(this.ailerons) < 1 &&
      Math.abs(this.rudder) < 1
    );
  }
}