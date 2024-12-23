import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cylinder, Box } from '@react-three/drei';
import * as THREE from 'three';
import { observer } from 'mobx-react-lite';
import { store } from '../../../stores';
import { COLORS } from '../../../utils/colors';

export const Yoke = observer(() => {
  const yokeRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (yokeRef.current) {
      // Match plane's coordinate system:
      // - Roll (ailerons) = Z rotation (negative for correct direction)
      // - Pitch (elevator) = X rotation (positive = nose down)
      const rollAngle = THREE.MathUtils.degToRad(-store.controls.ailerons / 2);
      const pitchAngle = THREE.MathUtils.degToRad(store.controls.elevator / 2);
      
      // Apply rotations in the same order as the plane (XYZ)
      yokeRef.current.rotation.set(pitchAngle, 0, rollAngle);
    }
  });

  return (
    <group ref={yokeRef}>
      <group rotation={[-0.2, 0, 0]} position={[0, -0.5, 0]}>
        {/* Yoke base */}
        <Cylinder args={[0.1, 0.15, 0.3, 16]} position={[0, 0, 0]}>
          <meshStandardMaterial color={COLORS.STRUTS} />
        </Cylinder>

        {/* Yoke shaft */}
        <Cylinder args={[0.05, 0.05, 0.5, 16]} position={[0, 0.4, 0]}>
          <meshStandardMaterial color={COLORS.STRUTS} />
        </Cylinder>

        {/* W-shaped yoke handle */}
        <group position={[0, 0.6, 0]}>
          {/* Center section */}
          <Box args={[0.3, 0.08, 0.08]} position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <meshStandardMaterial color={COLORS.STRUTS} />
          </Box>

          {/* Left diagonal */}
          <Box args={[0.25, 0.08, 0.08]} position={[-0.15, 0, -0.15]} rotation={[0, Math.PI / 4, 0]}>
            <meshStandardMaterial color={COLORS.STRUTS} />
          </Box>

          {/* Right diagonal */}
          <Box args={[0.25, 0.08, 0.08]} position={[-0.15, 0, 0.15]} rotation={[0, -Math.PI / 4, 0]}>
            <meshStandardMaterial color={COLORS.STRUTS} />
          </Box>

          {/* Left grip */}
          <group position={[-0.3, 0, -0.3]}>
            <Cylinder args={[0.04, 0.04, 0.15, 16]} rotation={[Math.PI / 2, 0, 0]}>
              <meshStandardMaterial color="#000000" />
            </Cylinder>
          </group>

          {/* Right grip */}
          <group position={[-0.3, 0, 0.3]}>
            <Cylinder args={[0.04, 0.04, 0.15, 16]} rotation={[Math.PI / 2, 0, 0]}>
              <meshStandardMaterial color="#000000" />
            </Cylinder>
          </group>
        </group>
      </group>
    </group>
  );
});