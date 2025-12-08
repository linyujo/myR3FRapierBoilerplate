import { useRef, forwardRef, Ref, Suspense } from 'react'
import { useFrame } from '@react-three/fiber'
import { OrbitControls, ContactShadows } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { useControls, button } from 'leva'
import { FlightHelmet, WireFrameFallback, Hamburger } from './gltfModels'

const Ground = () => (
  <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
    <planeGeometry args={[1, 1]} />
    <meshStandardMaterial color="#81a968" />
  </mesh>
)

function Scene() {
  const cubeRef = useRef<THREE.Mesh>(null)
  const { perfVisible } = useControls({ perfVisible: true })
  useFrame((state, delta) => {
    if (cubeRef.current) {
      cubeRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5 + 1
    }
  })

  return (
    <>
      <ambientLight intensity={2} />
      <directionalLight
        color="#FFFFFF"
        castShadow
        position={[1, 2, 3]}
        intensity={5}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={5}
        shadow-camera-right={5}
        shadow-camera-bottom={-5}
        shadow-camera-left={-5}
        shadow-mapSize={[512, 512]}
      />
      <ContactShadows
        position={[0, -0.99, 0]}
        scale={10}
        resolution={512}
        far={5}
        color="#062032"
        opacity={0.4}
        blur={1.5}
      />
      <Ground />
      {/* <Suspense fallback={<FlightHelmetFallback position={[0, 1, 0]} scale={[2, 2.5, 2]} />}>
        <FlightHelmet />
      </Suspense> */}
      <Suspense fallback={<WireFrameFallback position={[0, 1, 0]} scale={[3, 2, 3]} />}>
        <Hamburger scale={0.35} />
      </Suspense>
      <OrbitControls />
      {perfVisible && <Perf position="top-left" />}
    </>
  )
}

export default Scene
