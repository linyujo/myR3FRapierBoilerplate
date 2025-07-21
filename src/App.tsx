import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import Scene from './components/Scene'

function App() {
  return (
    <div className="w-full h-screen bg-black position-fixed top-0 left-0 outline-none">
      <Canvas gl={{ alpha: true }}>
        <Physics>
          <Scene />
        </Physics>
      </Canvas>
    </div>
  )
}

export default App