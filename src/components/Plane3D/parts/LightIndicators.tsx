import { observer } from "mobx-react-lite";
import { store } from "../../../stores";

export const LightIndicators = observer(() => {
  return (
    <group>
      {/* Navigation Light Indicators */}
      {store.lights.navLights && (
        <>
          {/* Left wing (red) */}
          <mesh position={[1.4, 0.75, -4]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial
              color="#FF0000"
              emissive="#FF0000"
              emissiveIntensity={1}
            />
          </mesh>
          {/* Right wing (green) */}
          <mesh position={[1.4, 0.75, 4]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial
              color="#00FF00"
              emissive="#00FF00"
              emissiveIntensity={1}
            />
          </mesh>
          {/* Tail (white) */}
          <mesh position={[-2.5, 0.4, 0]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial
              color="#FFFFFF"
              emissive="#FFFFFF"
              emissiveIntensity={1}
            />
          </mesh>
        </>
      )}

      {/* Beacon Indicator */}
      {store.lights.beacon && (
        <mesh position={[-2.5, 1, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color="#FF0000"
            emissive="#FF0000"
            emissiveIntensity={1}
          />
        </mesh>
      )}

      {/* Strobe Light Indicators */}
      {store.lights.strobeLights && (
        <>
          <mesh position={[-0.2, 0.75, -4]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial
              color="#FFFFFF"
              emissive="#FFFFFF"
              emissiveIntensity={1}
            />
          </mesh>
          <mesh position={[-0.2, 0.75, 4]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial
              color="#FFFFFF"
              emissive="#FFFFFF"
              emissiveIntensity={1}
            />
          </mesh>
        </>
      )}
    </group>
  );
});
