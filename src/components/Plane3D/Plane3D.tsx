import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { observer } from "mobx-react-lite";
import { PlaneModel } from "./PlaneModel";
import { Yoke } from "./parts/Yoke";
import { RudderPedals } from "./parts/RudderPedals";
import { useYokeControl } from "./hooks/useYokeControl";
import { useKeyboardControls } from "../../hooks/useKeyboardControls";
import { useControlSounds } from "../../hooks/useControlSounds";
import { useEngineSounds } from "../../hooks/useEngineSounds";
import { styles } from "./styles";

export const Plane3D = observer(() => {
  useYokeControl("yoke-view", {
    sensitivity: 0.3,
    returnToCenter: true,
  });
  useKeyboardControls();
  useControlSounds();
  useEngineSounds();

  return (
    <div {...styles.container}>
      {/* Main viewport */}
      <Canvas {...styles.mainCanvas}>
        <PerspectiveCamera makeDefault position={[8, 4, 8]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <PlaneModel />
        <OrbitControls target={[0, 0, 0]} />
        <gridHelper args={[20, 20, "#444444", "#222222"]} />
      </Canvas>

      {/* Yoke viewport */}
      <div {...styles.yokeView} id="yoke-view">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 2]} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <Yoke />
        </Canvas>
      </div>

      {/* Rudder viewport */}
      <div {...styles.rudderView} id="rudder-view">
        <Canvas>
          <PerspectiveCamera
            makeDefault
            position={[0, 1, 2]}
            rotation={[-0.3, 0, 0]}
          />
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <RudderPedals />
        </Canvas>
      </div>

      {/* Controls help */}
      <div {...styles.controls}>
        Use arrow keys to control the yoke:
        <br />
        ↑ Push forward (nose down)
        <br />
        ↓ Pull back (nose up)
        <br />
        ← Roll left
        <br />
        → Roll right
        <br />
        A/D for rudder
      </div>
    </div>
  );
});
