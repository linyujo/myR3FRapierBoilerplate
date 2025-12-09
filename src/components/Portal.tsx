import { useGLTF, useTexture, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import type { GLTF } from 'three-stdlib';

type GLTFPortal = GLTF & {
  nodes: {
    baked: THREE.Mesh
    poleLightA: THREE.Mesh
    poleLightB: THREE.Mesh
    portalLight: THREE.Mesh
  }
}
const Portal = () => {
  const { nodes } = useGLTF('/static/models/portal.glb') as unknown as GLTFPortal
  // console.log('🌦️ nodes', nodes);
  const bakedTexture = useTexture('/static/models/portal_baked.jpg')
  bakedTexture.flipY = false

  return (
    <>
      <mesh
        name="Portal"
        geometry={nodes.baked.geometry}
      >
        <meshBasicMaterial map={bakedTexture} />
      </mesh>
      <mesh geometry={nodes.poleLightA.geometry} position={nodes.poleLightA.position}>
        <meshBasicMaterial color="#FFFFE5" />
      </mesh>
      <mesh geometry={nodes.poleLightB.geometry} position={nodes.poleLightB.position}>
        <meshBasicMaterial color="#FFFFE5" />
      </mesh>
      <mesh geometry={nodes.portalLight.geometry} position={nodes.portalLight.position} rotation={nodes.portalLight.rotation}>
        <meshBasicMaterial color="#FFFFE5" />
      </mesh>
      <Sparkles
        size={4}
        count={40}
        scale={[4, 2, 4]}
        position-y={1}
        speed={0.3}
      />
    </>
  )
}

export default Portal