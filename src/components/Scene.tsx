import { useRef, forwardRef, Ref } from 'react'
import { useFrame } from '@react-three/fiber'
import { OrbitControls, MeshReflectorMaterial } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { useControls } from 'leva'

const FirstGeometry = forwardRef((props, ref) => (
  <mesh position-y={1} ref={ref as Ref<THREE.Mesh>}>
    <torusKnotGeometry />
    <meshNormalMaterial />
  </mesh>
))

const Ground = () => (
  <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
    <planeGeometry args={[1, 1]} />
    <MeshReflectorMaterial
      resolution={512}
      blur={[1000, 1000]}
      mixBlur={0.5}
      mirror={0.5}
      color="mediumAquamarine"
    />
  </mesh>
)

function Scene() {
  const { perfVisible } = useControls({ perfVisible: true })
  const torusKnotRef = useRef<THREE.Mesh>(null!)
  useFrame((state, delta) => {
    if (torusKnotRef.current) {
      torusKnotRef.current.rotation.y += delta * 0.5
    }
  })
  return (
    <>
      <ambientLight intensity={3} />
      <directionalLight position={[1, 2, 3]} intensity={5} />
      <FirstGeometry ref={torusKnotRef} />
      <Ground />
      <OrbitControls />
      {perfVisible && <Perf position="top-left" />}
    </>
  )
}

export default Scene
