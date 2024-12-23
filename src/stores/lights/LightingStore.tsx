import { makeAutoObservable } from "mobx";

export class LightingStore {
  navLights = false;
  beacon = false;
  landingLight = false;
  strobeLights = false;

  constructor() {
    makeAutoObservable(this);
  }

  toggleNavLights() {
    this.navLights = !this.navLights;
  }

  toggleBeacon() {
    this.beacon = !this.beacon;
  }

  toggleLandingLight() {
    this.landingLight = !this.landingLight;
  }

  toggleStrobeLights() {
    this.strobeLights = !this.strobeLights;
  }

  resetLights() {
    this.navLights = false;
    this.beacon = false;
    this.landingLight = false;
    this.strobeLights = false;
  }
}
