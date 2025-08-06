import { useRef, forwardRef, Ref } from 'react'
import { useFrame } from '@react-three/fiber'
import { OrbitControls, ContactShadows } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { useControls, button } from 'leva'

const Sphere = () => {
  const { position, color, visible } = useControls('sphere', {
    position: {
      value: { x: -2, z: 0 },
      min: -4,
      max: 4,
      step: 0.2,
      joystick: 'invertZ',
    },
    color: '#FFA07A',
    visible: true,
    clickMe: button(() => {
      console.log('sphere click')
    }),
  })
  return (
    <>
      <mesh castShadow visible={visible} position={[position.x, 0, position.z]}>
        <sphereGeometry />
        <meshStandardMaterial color={color} />
      </mesh>
    </>
  )
}

const Box = forwardRef<THREE.Mesh, {}>((props, ref) => {
  const { position, color, visible, rotationX } = useControls('cube', {
    position: {
      value: { x: 2, z: 0 },
      min: -4,
      max: 4,
      step: 0.2,
      joystick: 'invertZ',
    },
    rotationX: {
      value: 0,
      step: Math.PI * 0.25,
      min: -Math.PI * 2,
      max: Math.PI * 2,
    },
    color: '#9370DB',
    visible: true,
    clickMe: button(() => {
      console.log('cube click')
    }),
  })
  return (
    <mesh
      ref={ref}
      castShadow
      visible={visible}
      position={[position.x, 1, position.z]}
      scale={1.5}
      rotation-x={rotationX}
      rotation-y={Math.PI * 0.25}
    >
      <boxGeometry />
      <meshStandardMaterial color={color} />
    </mesh>
  )
})

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
      <Sphere />
      <Box ref={cubeRef} />
      <Ground />
      <OrbitControls />
      {perfVisible && <Perf position="top-left" />}
    </>
  )
}

export default Scene
