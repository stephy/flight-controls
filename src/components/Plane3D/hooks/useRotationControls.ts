import { useFrame } from "@react-three/fiber";
import { store } from "../../../stores";
import { RotationControlsProps } from "../types";
import {
  updatePlaneRotation,
  updateControlSurfaces,
} from "../utils/rotationUtils";

export const useRotationControls = ({
  planeRef,
  leftFlapRef,
  rightFlapRef,
  leftAileronRef,
  rightAileronRef,
  elevatorRef,
  trimTabRef,
  rudderRef,
}: RotationControlsProps) => {
  useFrame(() => {
    // Update main plane rotation (pitch, roll, yaw)
    if (planeRef.current) {
      updatePlaneRotation(planeRef.current, store.controls, store.engine);
    }

    // Update all control surfaces
    updateControlSurfaces({
      leftFlapRef,
      rightFlapRef,
      leftAileronRef,
      rightAileronRef,
      elevatorRef,
      trimTabRef,
      rudderRef,
      controls: store.controls,
      engine: store.engine,
    });
  });
};
