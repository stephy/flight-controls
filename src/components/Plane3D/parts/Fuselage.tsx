import React from 'react';
import { Cylinder, Box } from '@react-three/drei';
import { COLORS } from '../../../utils/colors';

export const Fuselage = () => {
  return (
    <group>
      {/* Main fuselage body */}
      <Cylinder args={[0.3, 0.5, 4, 10]} position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial color={COLORS.FUSELAGE} />
      </Cylinder>
      
      {/* Nose cone */}
      <Cylinder 
        args={[0.5, 0.2, 1, 8]} 
        position={[2, 0, 0]} 
        rotation={[0, 0, Math.PI / 2]}
      >
        <meshStandardMaterial color={COLORS.FUSELAGE} />
      </Cylinder>

      {/* Windshield */}
      <Box 
        args={[1.3, 0.5, 1]} 
        position={[0.7, 0.5, 0]}
        rotation={[0, 0, -Math.PI / 100]}
      >
        <meshStandardMaterial color={COLORS.WINDSHIELD} transparent opacity={0.6} />
      </Box>
    </group>
  );
};