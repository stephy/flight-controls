import React from 'react';
import { Box, Text } from '@react-three/drei';

export const OrientationCube = () => {
  return (
    <group position={[-3, 2, 3]} scale={0.2}>
      {/* Main cube */}
      <Box args={[1, 1, 1]}>
        <meshStandardMaterial color="#444444" transparent opacity={0.8} />
      </Box>

      {/* Axis indicators */}
      <group>
        {/* X axis - Red - Roll */}
        <Box args={[2, 0.1, 0.1]} position={[1, 0, 0]}>
          <meshStandardMaterial color="#FF0000" />
        </Box>
        
        {/* Y axis - Green - Pitch */}
        <Box args={[0.1, 2, 0.1]} position={[0, 1, 0]}>
          <meshStandardMaterial color="#00FF00" />
        </Box>
        
        {/* Z axis - Blue - Yaw */}
        <Box args={[0.1, 0.1, 2]} position={[0, 0, 1]}>
          <meshStandardMaterial color="#0000FF" />
        </Box>
      </group>

      {/* Axis Labels */}
      <group>
        {/* X axis labels */}
        <Text position={[1.2, 0, 0]} color="#FF0000" fontSize={0.3} anchorX="left">X</Text>
        <Text position={[1, 0, 0]} color="#FF0000" fontSize={0.2} anchorX="right">+1</Text>
        <Text position={[-1, 0, 0]} color="#FF0000" fontSize={0.2} anchorX="left">-1</Text>

        {/* Y axis labels */}
        <Text position={[0, 1.2, 0]} color="#00FF00" fontSize={0.3} anchorY="bottom">Y</Text>
        <Text position={[0, 1, 0]} color="#00FF00" fontSize={0.2} anchorY="bottom">+1</Text>
        <Text position={[0, -1, 0]} color="#00FF00" fontSize={0.2} anchorY="top">-1</Text>

        {/* Z axis labels */}
        <Text position={[0, 0, 1.2]} color="#0000FF" fontSize={0.3} anchorZ="front">Z</Text>
        <Text position={[0, 0, 1]} color="#0000FF" fontSize={0.2} anchorZ="front">+1</Text>
        <Text position={[0, 0, -1]} color="#0000FF" fontSize={0.2} anchorZ="back">-1</Text>
      </group>

      {/* Coordinate labels at corners */}
      <group>
        {/* Front corners */}
        <Text position={[0.6, 0.6, 0.6]} color="#ffffff" fontSize={0.15}>(1,1,1)</Text>
        <Text position={[-0.6, 0.6, 0.6]} color="#ffffff" fontSize={0.15}>(-1,1,1)</Text>
        <Text position={[0.6, -0.6, 0.6]} color="#ffffff" fontSize={0.15}>(1,-1,1)</Text>
        <Text position={[-0.6, -0.6, 0.6]} color="#ffffff" fontSize={0.15}>(-1,-1,1)</Text>
        
        {/* Back corners */}
        <Text position={[0.6, 0.6, -0.6]} color="#ffffff" fontSize={0.15}>(1,1,-1)</Text>
        <Text position={[-0.6, 0.6, -0.6]} color="#ffffff" fontSize={0.15}>(-1,1,-1)</Text>
        <Text position={[0.6, -0.6, -0.6]} color="#ffffff" fontSize={0.15}>(1,-1,-1)</Text>
        <Text position={[-0.6, -0.6, -0.6]} color="#ffffff" fontSize={0.15}>(-1,-1,-1)</Text>
      </group>
    </group>
  );
};