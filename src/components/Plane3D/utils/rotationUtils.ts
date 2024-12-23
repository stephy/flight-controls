import * as THREE from "three";
import { EngineStore } from "../../../stores/engine/EngineStore";
import { calculateAerodynamicEffects } from "./flightDynamics";
import { FlightControlStore } from "../../../stores/controls/FlightControlStore";

export const updatePlaneRotation = (
  plane: THREE.Group,
  controls: FlightControlStore,
  engine: EngineStore
) => {
  // Convert control inputs to radians
  const rollAngle = THREE.MathUtils.degToRad(controls.ailerons);
  const { leftTurnTendency, rollInducedPitch } = calculateAerodynamicEffects(
    engine,
    controls.ailerons
  );

  const pitchAngle = THREE.MathUtils.degToRad(
    controls.elevator + rollInducedPitch
  );
  const yawAngle = THREE.MathUtils.degToRad(
    -controls.rudder * 0.3 + leftTurnTendency
  );

  const quaternion = new THREE.Quaternion();

  // Apply rotations in the correct order:
  // 1. Y rotation for yaw
  // 2. X rotation for pitch
  // 3. Z rotation for roll
  quaternion.setFromEuler(
    new THREE.Euler(
      rollAngle, // Z - Roll
      yawAngle, // Y - Yaw
      pitchAngle, // X - Pitch
      "YXZ" // Updated rotation order
    )
  );

  plane.setRotationFromQuaternion(quaternion);
};

export const updateControlSurfaces = ({
  leftFlapRef,
  rightFlapRef,
  leftAileronRef,
  rightAileronRef,
  elevatorRef,
  trimTabRef,
  rudderRef,
  controls,
  engine,
}: {
  leftFlapRef: React.RefObject<THREE.Mesh>;
  rightFlapRef: React.RefObject<THREE.Mesh>;
  leftAileronRef: React.RefObject<THREE.Mesh>;
  rightAileronRef: React.RefObject<THREE.Mesh>;
  elevatorRef: React.RefObject<THREE.Mesh>;
  trimTabRef: React.RefObject<THREE.Mesh>;
  rudderRef: React.RefObject<THREE.Mesh>;
  controls: FlightControlStore;
  engine: EngineStore;
}) => {
  const { leftTurnTendency } = calculateAerodynamicEffects(
    engine,
    controls.ailerons
  );

  // Update flaps
  if (leftFlapRef.current && rightFlapRef.current) {
    const flapAngle = THREE.MathUtils.degToRad(controls.flaps);
    leftFlapRef.current.rotation.z = flapAngle;
    rightFlapRef.current.rotation.z = flapAngle;
  }

  // Update ailerons - Note: opposite rotation for correct roll effect
  if (leftAileronRef.current && rightAileronRef.current) {
    const aileronAngle = THREE.MathUtils.degToRad(controls.ailerons);
    leftAileronRef.current.rotation.z = -aileronAngle;
    rightAileronRef.current.rotation.z = aileronAngle;
  }

  // Update elevator and trim tab
  if (elevatorRef.current) {
    const elevatorAngle = THREE.MathUtils.degToRad(-controls.elevator);
    elevatorRef.current.rotation.z = elevatorAngle;
  }

  if (trimTabRef.current) {
    const trimTabAngle = THREE.MathUtils.degToRad(controls.trimTab);
    trimTabRef.current.rotation.z = trimTabAngle;
  }

  // Update rudder
  if (rudderRef.current) {
    const rudderAngle = THREE.MathUtils.degToRad(
      controls.rudder + leftTurnTendency
    );
    rudderRef.current.rotation.y = rudderAngle;
  }
};
