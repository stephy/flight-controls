import { Cylinder } from "@react-three/drei";
import { COLORS } from "../../../utils/colors";

export const LandingGear = () => {
  return (
    <group>
      {/* Main landing gear (left) */}
      <group position={[0, -1, -0.6]}>
        <Cylinder
          args={[0.05, 0.05, 1]}
          position={[0, 0.4, 0]}
          rotation={[Math.PI / -1.5, 0, 0]}
        >
          <meshStandardMaterial color={COLORS.STRUTS} />
        </Cylinder>
      </group>

      <group position={[0, -0.8, -1]}>
        {/* tire */}
        <Cylinder args={[0.15, 0.15, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#333333" />
        </Cylinder>
      </group>

      {/* Main landing gear (right) */}
      <group position={[0, -1, 0.6]}>
        <Cylinder
          args={[0.05, 0.05, 1]}
          position={[0, 0.4, 0]}
          rotation={[Math.PI / 1.5, 0, 0]}
        >
          <meshStandardMaterial color={COLORS.STRUTS} />
        </Cylinder>
      </group>

      {/* tire */}
      <group position={[0, -0.8, 1]}>
        <Cylinder args={[0.15, 0.15, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#333333" />
        </Cylinder>
      </group>

      {/* Nose gear */}
      <group position={[1.8, -0.8, 0]}>
        <Cylinder args={[0.04, 0.04, 0.6]} position={[0, 0.3, 0]}>
          <meshStandardMaterial color={COLORS.STRUTS} />
        </Cylinder>
        <Cylinder args={[0.12, 0.12, 0.15]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#333333" />
        </Cylinder>
      </group>

      {/* Wheel fairings */}
      <group>
        {/* Left fairing, white box on top of the tire */}
        <mesh position={[0, -0.7, -1]}>
          <boxGeometry args={[0.3, 0.2, 0.25]} />
          <meshStandardMaterial color={COLORS.FUSELAGE} />
        </mesh>
        {/* Right fairing  white box on top of the tire*/}
        <mesh position={[0, -0.7, 1]}>
          <boxGeometry args={[0.3, 0.2, 0.25]} />
          <meshStandardMaterial color={COLORS.FUSELAGE} />
        </mesh>
      </group>
    </group>
  );
};
