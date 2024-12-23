import React from 'react';
import { PerspectiveCamera } from '@react-three/drei';
import { View } from '@react-three/fiber';
import { Yoke } from './parts/Yoke';
import { RudderPedals } from './parts/RudderPedals';
import { PlaneStore } from '../../stores/PlaneStore';

interface ControlViewportsProps {
  store: PlaneStore;
}

export const ControlViewports = ({ store }: ControlViewportsProps) => {
  return (
    <>
      {/* Yoke Viewport */}
      <View track={document.getElementById('yoke-view')!}>
        <PerspectiveCamera makeDefault position={[0, 0, 2]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Yoke store={store} />
      </View>

      {/* Rudder Pedals Viewport */}
      <View track={document.getElementById('rudder-view')!}>
        <PerspectiveCamera makeDefault position={[0, 1, 2]} rotation={[-0.3, 0, 0]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <RudderPedals store={store} />
      </View>
    </>
  );
};