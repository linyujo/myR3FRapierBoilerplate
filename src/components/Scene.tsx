import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { OrbitControls, Center } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { useControls, button } from 'leva'
import ToastBar from './ToastBar'

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
      <Center>
        <ToastBar />
      </Center>
      <OrbitControls />
      {perfVisible && <Perf position="top-left" />}
    </>
  )
}

export default Scene
