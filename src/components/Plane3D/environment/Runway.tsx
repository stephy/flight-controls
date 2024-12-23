import React from "react";
import { Plane } from "@react-three/drei";

export const Runway = () => {
  return (
    <group>
      {/* Main runway */}
      <Plane
        args={[60, 3]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[30, -0.9, 0]}
      >
        <meshStandardMaterial color="#333333" />
      </Plane>

      {/* Runway markings */}
      <group position={[30, -0.89, 0]}>
        {/* Centerline */}
        <Plane args={[60, 0.1]} rotation={[-Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#FFFFFF" />
        </Plane>

        {/* Distance markers */}
        {Array.from({ length: 12 }).map((_, i) => (
          <Plane
            key={i}
            args={[0.6, 0.15]}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[-27 + i * 5, 0, 0]}
          >
            <meshStandardMaterial color="#FFFFFF" />
          </Plane>
        ))}
      </group>
    </group>
  );
};
