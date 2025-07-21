import { useMemo, useRef, useEffect } from 'react'
import * as THREE from 'three'

const CustomObject = () => {
	const meshRef = useRef<THREE.Mesh>(null!)
	const verticesCount = 10 * 3;
	const positions = useMemo(() => {
		const positions = new Float32Array(verticesCount * 3)
		for(let i = 0; i < verticesCount * 3; i++) {
			positions[i] = (Math.random() - 0.5) * 3
		}
		return positions
	}, [verticesCount])

	useEffect(() => {
		if (meshRef.current) {
			/**
			 * 在 geometry 中，每個頂點的「法向量（normal vector）」資料，是用來計算光照的關鍵，
			 * 它會告訴光線：「這個表面朝哪個方向」。
			 * 在 bufferGeometry 中，頂點的資料是分散在不同的 bufferAttribute 中，
			 * 因此需要手動計算法向量。
			 */
			meshRef.current.geometry.computeVertexNormals();
		}
	}, [meshRef])

	return (
		<mesh ref={meshRef}>
			<bufferGeometry>
				<bufferAttribute
					attach="attributes-position"
					count={verticesCount}
					itemSize={3}
					array={positions}
				/>
			</bufferGeometry>
			<meshStandardMaterial color="red" side={THREE.DoubleSide} />
		</mesh>
	)
}

export default CustomObject