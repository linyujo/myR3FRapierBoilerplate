import { useGLTF, Clone } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

const FlightHelmet = () => {
  const { scene: flightHelmet } = useGLTF('/static/FlightHelmet/glTF/FlightHelmet.gltf')
  return <primitive object={flightHelmet} scale={4} position={[0, 0, 0]} />
}

const WireFrameFallback = (props: { scale: [number, number, number], position: [number, number, number] }) => {
  return (
    <mesh {...props}>
      <boxGeometry />
      <meshStandardMaterial wireframe color="red" />
    </mesh>
  )
}

type GLTFHamburger = GLTF & {
  nodes: {
    BottomBum: THREE.Mesh
    Meat: THREE.Mesh
    Cheese: THREE.Mesh
    TopBum: THREE.Mesh
  }
  materials: {
    BumMaterial: THREE.MeshStandardMaterial
    meatMaterial: THREE.MeshStandardMaterial
    cheeseMaterial: THREE.MeshStandardMaterial
  }
}

const Hamburger = (props: { scale: number }) => {
  const { nodes, materials } = useGLTF('/static/hamburger.glb') as unknown as GLTFHamburger;
  return (
    <group dispose={null} scale={props.scale}>
      <mesh name="BottomBum" geometry={nodes.BottomBum.geometry} material={materials.BumMaterial} />
      <mesh name="Meat" geometry={nodes.Meat.geometry} material={materials.meatMaterial} />
      <mesh name="Cheese" geometry={nodes.Cheese.geometry} material={materials.cheeseMaterial} />
      <mesh
        name="TopBum"
        geometry={nodes.TopBum.geometry}
        material={materials.BumMaterial}
        position={[0, 4.674, 0.001]}
        rotation={[3.132, 0, 0]}
      />
    </group>
  );
}

/*
const Hamburgers = () => {
  const { scene: hamburger } = useGLTF('/static/hamburger.glb');
  const scale = 0.2;
  return (
    <>
      <Clone object={hamburger} scale={scale} position-x={-3}  />
      <Clone object={hamburger} scale={scale} />
      <Clone object={hamburger} scale={scale} position-x={3} />
    </>
  );
}
*/

export { FlightHelmet, WireFrameFallback, Hamburger }