import { StrictMode } from 'react'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import Scene from './components/Scene'
import { Leva } from 'leva'

function App() {
  return (
    <StrictMode>
      <div className="w-full h-screen position-fixed top-0 left-0 outline-none">
        <Leva collapsed />
        <Canvas gl={{ alpha: true }}>
          <Physics>
            <Scene />
          </Physics>
        </Canvas>
      </div>
    </StrictMode>
  )
}

export default App
