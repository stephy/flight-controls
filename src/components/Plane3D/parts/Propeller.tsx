import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Cylinder } from '@react-three/drei';
import * as THREE from 'three';
import { observer } from 'mobx-react-lite';
import { store } from '../../../stores';
import { COLORS } from '../../../utils/colors';

export const Propeller = observer(() => {
  const propRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (propRef.current) {
      propRef.current.rotation.x += store.engine.propellerSpeed * delta * 10;
    }
  });

  return (
    <group ref={propRef} position={[2.5, 0, 0]}>
      {/* Propeller hub */}
      <Cylinder args={[0.1, 0.1, 0.1, 16]} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial color={COLORS.STRUTS} />
      </Cylinder>

      {/* Propeller blades */}
      <group>
    
        {/* Horizontal blade */}
        <Box args={[0.05, 0.15, 2]} position={[0, 0, 0]}>
          <meshStandardMaterial color={COLORS.STRUTS} />
        </Box>
      </group>
    </group>
  );
});