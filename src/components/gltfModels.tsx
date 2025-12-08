import { useEffect, useState } from 'react'
import { useGLTF, Clone, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { useControls } from 'leva'
import * as THREE from 'three'

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
      <mesh name="BottomBum"
        receiveShadow
        castShadow
        geometry={nodes.BottomBum.geometry}
        material={materials.BumMaterial}
      />
      <mesh
        name="Meat"
        receiveShadow
        castShadow
        geometry={nodes.Meat.geometry}
        material={materials.meatMaterial}
      />
      <mesh
        name="Cheese"
        receiveShadow castShadow
        geometry={nodes.Cheese.geometry}
        material={materials.cheeseMaterial}
      />
      <mesh
        name="TopBum"
        receiveShadow
        castShadow
        geometry={nodes.TopBum.geometry}
        material={materials.BumMaterial}
        position={[0, 4.674, 0.001]}
        rotation={[3.132, 0, 0]}
      />
    </group>
  );
}

const Fox = () => {
  const { scene: fox, animations: foxAnimations } = useGLTF('/static/Fox/glTF/Fox.gltf');
  const { actions: animateActions, names: animateNames } = useAnimations(foxAnimations, fox);

  const animationControls = useControls({
    animationType: {
      options: animateNames,
    },
  });

  // 因爲GLTF模型通常包含多個子mesh，需要foreach每個子mesh來啟用影子
  useEffect(() => {
    fox.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [fox]);

  useEffect(() => {
    const currentAnimationType = animationControls.animationType;
    if (currentAnimationType) {
      animateActions[currentAnimationType]
        ?.reset()
        .fadeIn(0.5)
        .play();
    }
    return () => {
      animateActions[currentAnimationType]?.fadeOut(0.5);
    }
  }, [animationControls.animationType]);

  return (
    <primitive
      object={fox}
      scale={0.03}
      position={[-2.5, -1, 2]}
      rotation-y={Math.PI / 4}
    />
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

export { FlightHelmet, WireFrameFallback, Hamburger, Fox }