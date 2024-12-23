import React from 'react';
import { Box } from '@react-three/drei';
import * as THREE from 'three';
import { COLORS } from '../../../utils/colors';

interface WingsProps {
  leftFlapRef: React.RefObject<THREE.Mesh>;
  rightFlapRef: React.RefObject<THREE.Mesh>;
  leftAileronRef: React.RefObject<THREE.Mesh>;
  rightAileronRef: React.RefObject<THREE.Mesh>;
}

export const Wings = ({
  leftFlapRef,
  rightFlapRef,
  leftAileronRef,
  rightAileronRef,
}: WingsProps) => {
  return (
    <group position={[1, 0.75, 0]}>
      {/* Main Wings */}
      <group>
        {/* Left Wing */}
        <Box args={[1.2, 0.05, 4]} position={[-0.2, 0, -2]}>
          <meshStandardMaterial color={COLORS.FUSELAGE} />
        </Box>
        {/* Right Wing */}
        <Box args={[1.2, 0.05, 4]} position={[-0.2, 0, 2]}>
          <meshStandardMaterial color={COLORS.FUSELAGE} />
        </Box>

        {/* Left Wing Control Surfaces */}
        <group position={[-0.2, 0, -2]}>
          {/* Left Flap - Inboard */}
          <group position={[0, 0, 1]}>
            <mesh ref={leftFlapRef} position={[-0.45, 0, 0]}>
              <boxGeometry args={[1, 0.03, 2]} />
              <meshStandardMaterial color={COLORS.FLAPS} />
            </mesh>
          </group>

          {/* Left Aileron - Outboard */}
          <group position={[0, 0, -1]}>
            <mesh ref={leftAileronRef} position={[-0.45, 0, 0]}>
              <boxGeometry args={[1, 0.03, 2]} />
              <meshStandardMaterial color={COLORS.AILERONS} />
            </mesh>
          </group>
        </group>

        {/* Right Wing Control Surfaces */}
        <group position={[-0.2, 0, 2]}>
          {/* Right Flap - Inboard */}
          <group position={[0, 0, -1]}>
            <mesh ref={rightFlapRef} position={[-0.45, 0, 0]}>
              <boxGeometry args={[1, 0.03, 2]} />
              <meshStandardMaterial color={COLORS.FLAPS} />
            </mesh>
          </group>

          {/* Right Aileron - Outboard */}
          <group position={[0, 0, 1]}>
            <mesh ref={rightAileronRef} position={[-0.45, 0, 0]}>
              <boxGeometry args={[1, 0.06, 2]} />
              <meshStandardMaterial color={COLORS.AILERONS} />
            </mesh>
          </group>
        </group>

        {/* Wing struts */}
        <group>
          {/* Left strut */}
          <mesh position={[-0.2, -0.5, -1.1]} rotation={[-1, 0, Math.PI * 1]}>
            <cylinderGeometry args={[0.02, 0.1,2]} />
            <meshStandardMaterial color={COLORS.STRUTS} />
          </mesh>
          {/* Right strut */}
          <mesh position={[-0.2, -0.5, 1.1]} rotation={[1, 0.5, Math.PI * 1]}>
            <cylinderGeometry args={[0.02, 0.1, 2]} />
            <meshStandardMaterial color={COLORS.STRUTS} />
          </mesh>
        </group>
      </group>
    </group>
  );
};
