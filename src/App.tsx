import { StrictMode } from 'react'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import Scene from '@/components/Scene'
import { Leva } from 'leva'

function App() {
  return (
    <StrictMode>
      <div className="w-full h-screen position-fixed top-0 left-0 outline-none">
        <Leva collapsed />
        <Canvas
          flat
          camera={{
            fov: 45,
            near: 0.1,
            far: 200,
            position: [-4, 3, 6],
          }}
          gl={{ alpha: true }}
          shadows={false}
        >
          <Physics>
            <Scene />
            <color attach="background" args={['#2A1D5C']} />
          </Physics>
        </Canvas>
      </div>
    </StrictMode>
  )
}

export default App
