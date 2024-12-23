import { EngineStore } from "../../../stores/engine/EngineStore";

export const calculateAerodynamicEffects = (
  engine: EngineStore,
  rollAngle: number
) => {
  // Engine effects (P-factor, torque, slipstream)
  const powerFactor = engine.engineStarted ? engine.throttle / 100 : 0;
  const leftTurnTendency = -5 * powerFactor;

  // Calculate pitch change due to roll (proverse roll)
  // Less pronounced at higher speeds, more at lower speeds
  const rollInducedPitch = Math.abs(rollAngle) * 0.1;

  return {
    leftTurnTendency,
    rollInducedPitch,
  };
};
