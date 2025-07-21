import { useRef, forwardRef, Ref } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import CustomObject from './CustomObject';

const Sphere = () => (
	<mesh position-x={ - 2 }>
		<sphereGeometry />
		<meshStandardMaterial color="orange" />
	</mesh>
)

const Box = forwardRef((props, ref) => (
	<mesh ref={ref as Ref<THREE.Mesh>} position-x={2} scale={1.5} rotation-y={ Math.PI * 0.25 }>
		<boxGeometry />
    <meshStandardMaterial color="mediumpurple" />
	</mesh>
));

const Ground = () => (
	<mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
		<planeGeometry args={[1, 1]} />
		<meshStandardMaterial color="greenyellow" />
	</mesh>
)

function Scene() {
	const cubeRef = useRef<THREE.Mesh>(null!)
	const groupRef = useRef<THREE.Group>(null!)
	const { gl, camera } = useThree()

	useFrame((state, delta) => {

		const rotateCamera = () => {
			const angle = state.clock.elapsedTime * 0.5;
			const camera = state.camera;
			camera.position.x = Math.cos(angle) * 8;
			camera.position.z = Math.sin(angle) * 8;
			camera.lookAt(0, 0, 0);
		}

		if (cubeRef.current) {
			// rotateCamera()
			cubeRef.current.rotation.y += delta
			// groupRef.current.rotation.y += delta
		}
	})
	
	return (
		<>
			<directionalLight position={[1, 2, 2]} intensity={5} />
			<ambientLight intensity={ 3 } />
			<group ref={groupRef}>
				<Sphere />
				<Box ref={cubeRef} />
			</group>
			<CustomObject />
			<Ground />
			<primitive object={new THREE.AxesHelper(2)} />
			<OrbitControls enableDamping args={[camera, gl.domElement]} />
    </>
  )
}

export default Scene