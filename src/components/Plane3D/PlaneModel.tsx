import { useRef } from 'react';
import { observer } from 'mobx-react-lite';
import * as THREE from 'three';
import { Fuselage } from './parts/Fuselage';
import { Wings } from './parts/Wings';
import { TailSection } from './parts/TailSection';
import { Propeller } from './parts/Propeller';
import { LandingGear } from './parts/LandingGear';
import { useRotationControls } from './hooks/useRotationControls';

export const PlaneModel = observer(() => {
  const planeRef = useRef<THREE.Group>(null);
  const leftFlapRef = useRef<THREE.Mesh>(null);
  const rightFlapRef = useRef<THREE.Mesh>(null);
  const leftAileronRef = useRef<THREE.Mesh>(null);
  const rightAileronRef = useRef<THREE.Mesh>(null);
  const elevatorRef = useRef<THREE.Mesh>(null);
  const trimTabRef = useRef<THREE.Mesh>(null);
  const rudderRef = useRef<THREE.Mesh>(null);

  useRotationControls({
    planeRef,
    leftFlapRef,
    rightFlapRef,
    leftAileronRef,
    rightAileronRef,
    elevatorRef,
    trimTabRef,
    rudderRef,
  });

  return (
    <group ref={planeRef} position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
      <Fuselage />
      <Wings
        leftFlapRef={leftFlapRef}
        rightFlapRef={rightFlapRef}
        leftAileronRef={leftAileronRef}
        rightAileronRef={rightAileronRef}
      />
      <TailSection
        elevatorRef={elevatorRef}
        trimTabRef={trimTabRef}
        rudderRef={rudderRef}
      />
      <Propeller />
      <LandingGear />
    </group>
  );
});