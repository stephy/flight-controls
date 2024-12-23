import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Cylinder } from '@react-three/drei';
import * as THREE from 'three';
import { observer } from 'mobx-react-lite';
import { store } from '../../../stores';
import { COLORS } from '../../../utils/colors';

export const RudderPedals = observer(() => {
  const leftPedalRef = useRef<THREE.Group>(null);
  const rightPedalRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (leftPedalRef.current && rightPedalRef.current) {
      // Convert rudder angle to pedal movement
      // Positive rudder = right pedal forward, left pedal back
      const pedalOffset = store.controls.rudder * 0.005;
      leftPedalRef.current.position.z = -pedalOffset;
      rightPedalRef.current.position.z = pedalOffset;
    }
  });

  return (
    <group position={[0, -0.2, 0]}>
      {/* Base structure */}
      <Box args={[0.8, 0.05, 0.6]} position={[0, 0, 0]}>
        <meshStandardMaterial color={COLORS.STRUTS} />
      </Box>

      {/* Guide rails */}
      <Cylinder args={[0.02, 0.02, 0.6, 8]} position={[-0.3, 0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color={COLORS.STRUTS} />
      </Cylinder>
      <Cylinder args={[0.02, 0.02, 0.6, 8]} position={[0.3, 0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color={COLORS.STRUTS} />
      </Cylinder>

      {/* Left Pedal */}
      <group ref={leftPedalRef} position={[0, 0, -0.15]}>
        <Box args={[0.2, 0.3, 0.05]} position={[0, 0.3, 0]} rotation={[-0.3, 0, 0]}>
          <meshStandardMaterial color={COLORS.RUDDER} />
        </Box>
        <Box args={[0.2, 0.05, 0.15]} position={[0, 0.15, 0]}>
          <meshStandardMaterial color={COLORS.RUDDER} />
        </Box>
      </group>

      {/* Right Pedal */}
      <group ref={rightPedalRef} position={[0, 0, 0.15]}>
        <Box args={[0.2, 0.3, 0.05]} position={[0, 0.3, 0]} rotation={[-0.3, 0, 0]}>
          <meshStandardMaterial color={COLORS.RUDDER} />
        </Box>
        <Box args={[0.2, 0.05, 0.15]} position={[0, 0.15, 0]}>
          <meshStandardMaterial color={COLORS.RUDDER} />
        </Box>
      </group>
    </group>
  );
});