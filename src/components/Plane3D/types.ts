import * as THREE from 'three';

export interface RotationControlsProps {
  planeRef: React.RefObject<THREE.Group>;
  leftFlapRef: React.RefObject<THREE.Mesh>;
  rightFlapRef: React.RefObject<THREE.Mesh>;
  leftAileronRef: React.RefObject<THREE.Mesh>;
  rightAileronRef: React.RefObject<THREE.Mesh>;
  elevatorRef: React.RefObject<THREE.Mesh>;
  trimTabRef: React.RefObject<THREE.Mesh>;
  rudderRef: React.RefObject<THREE.Mesh>;
}