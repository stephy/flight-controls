import { makeAutoObservable } from 'mobx';

export class EngineStore {
  throttle = 0;
  mixture = 100;
  propellerSpeed = 0;
  engineStarted = false;

  constructor() {
    makeAutoObservable(this);
  }

  setThrottle(value: number) {
    this.throttle = Math.max(0, Math.min(100, value));
    if (this.engineStarted) {
      this.propellerSpeed = this.throttle * 0.6;
    }
  }

  setMixture(value: number) {
    this.mixture = Math.max(0, Math.min(100, value));
  }

  startEngine() {
    if (this.isReadyToStart()) {
      this.engineStarted = true;
      this.propellerSpeed = this.throttle * 0.6;
      return true;
    }
    return false;
  }

  shutdown() {
    this.engineStarted = false;
    this.propellerSpeed = 0;
  }

  private isReadyToStart() {
    return (
      this.mixture === 100 &&
      this.throttle >= 10 &&
      this.throttle <= 20
    );
  }
}