import { useRef, forwardRef, Ref, useEffect } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import {
  Text,
  Html,
  Float,
  useHelper,
  SoftShadows,
  BakeShadows,
  RandomizedLight,
  AccumulativeShadows,
  OrbitControls,
  // TransformControls,
  PivotControls,
  MeshReflectorMaterial,
} from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { useControls, button } from 'leva'
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
const Sphere = forwardRef(({ cubeRef }: TSphereProps, ref) => {
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
      <PivotControls
        enabled={false}
        anchor={[0, 0, 0]}
        depthTest={false} // 避免被其他物件擋住
        lineWidth={2}
        axisColors={['#9381ff', '#ff4d6d', '#7ae582']}
      >
        <mesh
          castShadow
          visible={visible}
          ref={ref as Ref<THREE.Mesh>}
          position={[position.x, 0, position.z]}
        >
          <sphereGeometry />
          <meshStandardMaterial color={color} />
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
  )
})

const Box = forwardRef((props, ref) => {
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
    <>
      <mesh
        castShadow
        visible={visible}
        ref={ref as Ref<THREE.Mesh>}
        position={[position.x, 0, position.z]}
        scale={1.5}
        rotation-x={rotationX}
        rotation-y={Math.PI * 0.25}
      >
        <boxGeometry />
        <meshStandardMaterial color={color} />
      </mesh>
      {/**
       * 與其將 TransformControls 包住 mesh，
       * 不如將 TransformControls 放置於 mesh 下方，
       * 並用ref將彼此綁定。
       * 好處是，若未來可能將 TransformControls 移除，
       * 可以輕易的解除綁定。
       */}
      {/* <TransformControls object={ref as Ref<THREE.Mesh>} mode="rotate" /> */}
    </>
  )
})

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
  const directionalLight = useRef<THREE.DirectionalLight>(null!)
  const shadowCamHelper = useRef<THREE.CameraHelper>(null!)
  const { gl, camera, scene } = useThree()
  const { perfVisible } = useControls({
    perfVisible: true,
  })
  // useHelper(directionalLight, THREE.DirectionalLightHelper, 1)

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

  useEffect(() => {
    if (directionalLight.current) {
      const shadowCam = directionalLight.current.shadow.camera
      const cameraHelper = new THREE.CameraHelper(shadowCam)
      shadowCamHelper.current = cameraHelper
      // scene.add(cameraHelper)

      return () => {
        scene.remove(cameraHelper)
        cameraHelper.dispose?.()
      }
    }
    scene.background = new THREE.Color('lightblue')
  }, [scene])

  return (
    <>
      {/* <BakeShadows /> */}
      {/* <SoftShadows size={25} samples={10} focus={0} /> */}
      <directionalLight
        castShadow
        ref={directionalLight}
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
      <ambientLight intensity={2} />
      <AccumulativeShadows
        position={[0, -0.99, 0]}
        opacity={0.7}
        color="#316d39"
        frames={Infinity}
        blend={150}
        temporal
      >
        <RandomizedLight
          position={[1, 2, 3]}
          amount={8}
          radius={1}
          intensity={3}
          bias={0.001}
        />
      </AccumulativeShadows>
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
      {perfVisible && <Perf position="top-left" />}
    </>
  )
}

export default Scene
