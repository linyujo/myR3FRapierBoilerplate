import { StrictMode } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { Physics } from '@react-three/rapier'
import { Leva } from 'leva'

import Scene from './components/Scene'

function App() {
  return (
    <StrictMode>
      <div className="w-full h-screen position-fixed top-0 left-0 outline-none">
        <Leva collapsed />
        <Canvas
          // orthographic
          shadows
          gl={{
            alpha: true,
            antialias: true, // 抗鋸齒
            toneMapping: THREE.ACESFilmicToneMapping, // 膠卷風格，如果使用HDR 環境貼圖，推薦使用
            outputColorSpace: THREE.SRGBColorSpace, // 若使用 PBR 材質、HDR 環境貼圖、Texture 推薦使用，預設是 SRGBColorSpace
          }}
          camera={{
            fov: 45,
            // zoom: 100,
            near: 0.1,
            far: 200,
            position: new THREE.Vector3(-4, 3, 6),
          }}
          onCreated={state => {
            console.log('state', state)
          }}
        >
          <Physics>
            {/* <color attach="background" args={['#E0FFFF']} /> */}
            <Scene />
          </Physics>
        </Canvas>
      </div>
    </StrictMode>
  )
}

export default App
