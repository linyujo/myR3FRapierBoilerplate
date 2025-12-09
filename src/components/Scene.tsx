import { OrbitControls, Center } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { useControls } from 'leva'
import Portal from './Portal'

function Scene() {
  const { perfVisible } = useControls({ perfVisible: true })

  return (
    <>
      <Center>
        <Portal />
      </Center>
      <OrbitControls />
      {perfVisible && <Perf position="top-left" />}
    </>
  )
}

export default Scene
