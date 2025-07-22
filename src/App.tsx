import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { Physics } from '@react-three/rapier'
import Scene from './components/Scene'

function App() {
  return (
    <div className="w-full h-screen bg-blue-200 position-fixed top-0 left-0 outline-none">
      <Canvas
        // orthographic
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
          position: new THREE.Vector3(3, 2, 6),
        }}
      >
        <Physics>
          <Scene />
        </Physics>
      </Canvas>
    </div>
  )
}

export default App
