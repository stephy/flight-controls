import * as THREE from 'three';
import { FlightControlStore } from '../../../stores/FlightControlStore';
import { EngineStore } from '../../../stores/engine/EngineStore';
import { calculateAerodynamicEffects } from './flightDynamics';

export const updatePlaneRotation = (
  plane: THREE.Group,
  controls: FlightControlStore,
  engine: EngineStore
) => {
  // Convert control inputs to radians
  const rollAngle = THREE.MathUtils.degToRad(-controls.ailerons); // Negative for correct roll direction
  
  // Get aerodynamic effects
  const { leftTurnTendency, rollInducedPitch } = calculateAerodynamicEffects(engine, controls.ailerons);

  // Calculate final angles with corrections
  // Using full range for pitch angle (no multiplier)
  const pitchAngle = THREE.MathUtils.degToRad(controls.elevator + rollInducedPitch);
  const yawAngle = THREE.MathUtils.degToRad((controls.rudder * 0.3) + leftTurnTendency);

  // Create a quaternion for smooth rotation
  const quaternion = new THREE.Quaternion();

  // Apply rotations in the correct order:
  // 1. Initial -90° Y rotation to face forward
  // 2. X rotation for pitch
  // 3. Y rotation for yaw
  // 4. Z rotation for roll
  quaternion.setFromEuler(
    new THREE.Euler(
      pitchAngle,      // X - Pitch
      -Math.PI/2 + yawAngle, // Y - Yaw (with initial rotation)
      rollAngle,       // Z - Roll
      'XYZ'           // Rotation order
    )
  );

  // Apply the rotation
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
  engine
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
  const { leftTurnTendency } = calculateAerodynamicEffects(engine, controls.ailerons);

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
    const rudderAngle = THREE.MathUtils.degToRad(controls.rudder + leftTurnTendency);
    rudderRef.current.rotation.y = rudderAngle;
  }
};