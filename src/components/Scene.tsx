import { useRef, forwardRef, Ref } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import {
  Text,
  Html,
  Float,
  OrbitControls,
  TransformControls,
  PivotControls,
  MeshReflectorMaterial,
} from '@react-three/drei'
import rubikDirt from '../fonts/rubik-dirt-v2-latin-regular.woff'
// import CustomObject from './CustomObject'

/**
 * PivotControls
 * 造型更好看，還可以自訂軸線造型、位置、顏色。
 * 有PerspectiveCamera的視角，拉遠會變小（TransformControls則不會）。
 */
type TSphereProps = {
  cubeRef: React.RefObject<THREE.Mesh>
}
const Sphere = forwardRef(({ cubeRef }: TSphereProps, ref) => (
  <>
    <PivotControls
      anchor={[0, 0, 0]}
      depthTest={false} // 避免被其他物件擋住
      lineWidth={2}
      axisColors={['#9381ff', '#ff4d6d', '#7ae582']}
    >
      <mesh ref={ref as Ref<THREE.Mesh>} position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
        <Html
          position-y={1.5}
          distanceFactor={10}
          center
          occlude={[cubeRef, ref as React.RefObject<THREE.Mesh>]}
        >
          <div className="position-absolute w-[200px] left-[-100px] text-center bg-[#00000088] text-white p-[14px] rounded-[30px]">
            This is a ball 😎
          </div>
        </Html>
      </mesh>
    </PivotControls>
  </>
))

const Box = forwardRef((props, ref) => (
  <>
    <mesh
      ref={ref as Ref<THREE.Mesh>}
      position-x={2}
      scale={1.5}
      rotation-y={Math.PI * 0.25}
    >
      <boxGeometry />
      <meshStandardMaterial color="mediumpurple" />
    </mesh>
    {/**
     * 與其將 TransformControls 包住 mesh，
     * 不如將 TransformControls 放置於 mesh 下方，
     * 並用ref將彼此綁定。
     * 好處是，若未來可能將 TransformControls 移除，
     * 可以輕易的解除綁定。
     */}
    <TransformControls object={ref as Ref<THREE.Mesh>} mode="rotate" />
  </>
))

const Ground = () => (
  <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
    <planeGeometry />
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
  const cubeRef = useRef<THREE.Mesh>(null!)
  const sphereRef = useRef<THREE.Mesh>(null!)
  const groupRef = useRef<THREE.Group>(null!)
  const { gl, camera } = useThree()

  useFrame((state, delta) => {
    const rotateCamera = () => {
      const angle = state.clock.elapsedTime * 0.5
      const camera = state.camera
      camera.position.x = Math.cos(angle) * 8
      camera.position.z = Math.sin(angle) * 8
      camera.lookAt(0, 0, 0)
    }

    if (cubeRef.current) {
      // rotateCamera()
      // cubeRef.current.rotation.y += delta
      // groupRef.current.rotation.y += delta
    }
  })

  return (
    <>
      <directionalLight position={[1, 2, 2]} intensity={5} />
      <ambientLight intensity={2} />
      <group ref={groupRef}>
        <Sphere ref={sphereRef} cubeRef={cubeRef} />
        <Box ref={cubeRef} />
      </group>
      {/* <CustomObject /> */}
      <Ground />
      {/* <primitive object={new THREE.AxesHelper(2)} /> */}
      <Float speed={3} floatIntensity={2}>
        <Text
          font={rubikDirt}
          color="salmon"
          fontSize={1}
          position-y={2}
          maxWidth={3}
          textAlign="center"
        >
          I Love R3F
          {/* <meshToonMaterial /> */}
        </Text>
      </Float>
      <OrbitControls makeDefault args={[camera, gl.domElement]} />
      {/* makeDefault: 操控TransformControls時，不會與OrbitControls衝突 */}
    </>
  )
}

export default Scene
