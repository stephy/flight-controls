import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { observer } from "mobx-react-lite";
import * as THREE from "three";
import { store } from "../../../stores";

export const AircraftLights = observer(() => {
  const beaconRef = useRef<THREE.PointLight>(null);
  const strobeLeftRef = useRef<THREE.PointLight>(null);
  const strobeRightRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    // Beacon flash pattern (slower)
    if (beaconRef.current && store.lights.beacon) {
      beaconRef.current.intensity =
        Math.sin(clock.getElapsedTime() * 4) * 2 + 2;
    }

    // Strobe flash pattern (quick double flash)
    if (
      strobeLeftRef.current &&
      strobeRightRef.current &&
      store.lights.strobeLights
    ) {
      const t = clock.getElapsedTime() * 2;
      const flash = t % 2 < 0.1 || (t + 0.2) % 2 < 0.1 ? 3 : 0;
      strobeLeftRef.current.intensity = flash;
      strobeRightRef.current.intensity = flash;
    }
  });

  return (
    <group>
      {/* Navigation Lights */}
      {store.lights.navLights && (
        <>
          {/* Red left wing */}
          <pointLight
            position={[-0.2, 0.75, -4]}
            color="#FF0000"
            intensity={2}
            distance={20}
          />
          {/* Green right wing */}
          <pointLight
            position={[1, 0.74, 4]}
            color="#00FF00"
            intensity={2}
            distance={20}
          />
          {/* White tail */}
          <pointLight
            position={[-2.5, 0.4, 0]}
            color="#FFFFFF"
            intensity={2}
            distance={0}
          />
        </>
      )}

      {/* Beacon (red, flashing) */}
      {store.lights.beacon && (
        <pointLight
          ref={beaconRef}
          position={[0, 1.2, 0]}
          color="#FF0000"
          intensity={0}
          distance={30}
        />
      )}

      {/* Landing Light */}
      {store.lights.landingLight && (
        <spotLight
          position={[2.2, -0.2, 0]}
          angle={0.3}
          penumbra={0.2}
          intensity={5}
          color="#FFFFFF"
          distance={100}
          target-position={[10, -1, 0]}
        />
      )}

      {/* Strobe Lights */}
      {store.lights.strobeLights && (
        <>
          <pointLight
            ref={strobeLeftRef}
            position={[-0.2, 0.75, -4.2]}
            color="#FFFFFF"
            intensity={0}
            distance={50}
          />
          <pointLight
            ref={strobeRightRef}
            position={[-0.2, 0.75, 4.2]}
            color="#FFFFFF"
            intensity={0}
            distance={50}
          />
        </>
      )}
    </group>
  );
});
