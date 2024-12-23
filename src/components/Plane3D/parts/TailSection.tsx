import React from 'react';
import { Box } from '@react-three/drei';
import { COLORS } from '../../../utils/colors';

interface TailSectionProps {
  elevatorRef: React.RefObject<THREE.Mesh>;
  trimTabRef: React.RefObject<THREE.Mesh>;
  rudderRef: React.RefObject<THREE.Mesh>;
}

export const TailSection = ({ elevatorRef, trimTabRef, rudderRef }: TailSectionProps) => {
  return (
    <group>
      {/* Vertical stabilizer */}
      <Box args={[0.8, 1.2, 0.1]} position={[-2, 0.4, 0]}>
        <meshStandardMaterial color={COLORS.FUSELAGE} />
      </Box>

      {/* Rudder */}
      <mesh ref={rudderRef} position={[-2.5, 0.4, 0]}>
        <boxGeometry args={[0.4, 1.2, 0.1]} />
        <meshStandardMaterial color={COLORS.RUDDER} />
      </mesh>

      {/* Horizontal stabilizer */}
      <Box args={[0.5, 0.05, 2]} position={[-2, 0, 0]}>
        <meshStandardMaterial color={COLORS.FUSELAGE} />
      </Box>

      {/* Elevator - Now using group for proper rotation */}
      <group position={[-2.4, 0, 0]}>
        <mesh ref={elevatorRef} position={[0, 0, 0]}>
          <boxGeometry args={[0.3, 0.05, 2]} />
          <meshStandardMaterial color={COLORS.ELEVATOR} />
        </mesh>

        {/* Trim tab - Positioned relative to the elevator */}
        <mesh ref={trimTabRef} position={[-0.2, 0, 0.4]}>
          <boxGeometry args={[0.1, 0.05, 0.5]} />
          <meshStandardMaterial color={COLORS.TRIM_TAB} />
        </mesh>
      </group>
    </group>
  );
};