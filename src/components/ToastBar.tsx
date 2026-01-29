import { useGLTF, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useMemo, useLayoutEffect, useRef } from 'react'
import type { GLTF } from 'three-stdlib'

type GLTFPortal = GLTF & {
  nodes: {
    ConveyorVert: THREE.Mesh
    ConveyorWheel: THREE.Mesh
    ConveyorPathMesh: THREE.Mesh
  }
}

// Helper: Extract all vertices from position attribute
function extractVertices(positionAttribute: THREE.BufferAttribute | THREE.InterleavedBufferAttribute): THREE.Vector3[] {
  const vertices: THREE.Vector3[] = []
  for (let i = 0; i < positionAttribute.count; i++) {
    const v = new THREE.Vector3()
    v.fromBufferAttribute(positionAttribute, i)
    vertices.push(v)
  }
  return vertices
}

// Helper: Detect how many vertices each node has
function detectVerticesPerNode(vertices: THREE.Vector3[]): number {
  // Sample first 50 distances to detect pattern
  const distances: number[] = []
  for (let i = 0; i < Math.min(vertices.length - 1, 50); i++) {
    distances.push(vertices[i].distanceTo(vertices[i + 1]))
  }

  const sortedDistances = [...distances].sort((a, b) => a - b)
  const medianDistance = sortedDistances[Math.floor(sortedDistances.length / 2)]

  // Count large gaps (node boundaries)
  let nodesDetected = 0
  for (let i = 0; i < distances.length; i++) {
    if (distances[i] > medianDistance * 2) {
      nodesDetected++
    }
  }

  const verticesPerNode = nodesDetected > 0 ? Math.round(distances.length / nodesDetected) : 4

  // Fallback to 4 if result is unreasonable
  return verticesPerNode >= 3 && verticesPerNode <= 6 ? verticesPerNode : 4
}

// Helper: Groupa vertices and calculate center point for ech node
function groupVerticesIntoNodes(vertices: THREE.Vector3[], verticesPerNode: number): THREE.Vector3[] {
  const nodeCount = Math.floor(vertices.length / verticesPerNode)
  const points: THREE.Vector3[] = []

  for (let i = 0; i < nodeCount; i++) {
    const startIdx = i * verticesPerNode
    const endIdx = Math.min(startIdx + verticesPerNode, vertices.length)
    const groupVertices = vertices.slice(startIdx, endIdx)

    if (groupVertices.length > 0) {
      const center = new THREE.Vector3()
      groupVertices.forEach(v => center.add(v))
      center.divideScalar(groupVertices.length)
      points.push(center)
    }
  }

  return points
}

// Helper: Validate node point distribution quality
function validateNodeDistribution(points: THREE.Vector3[]): void {
  const distances: number[] = []
  for (let i = 0; i < points.length - 1; i++) {
    distances.push(points[i].distanceTo(points[i + 1]))
  }

  const avgDistance = distances.reduce((sum, d) => sum + d, 0) / distances.length
  const maxDistance = Math.max(...distances)
  const ratio = maxDistance / avgDistance

  console.log('📏 Average distance between nodes:', avgDistance.toFixed(3))
  console.log('📏 Max distance between nodes:', maxDistance.toFixed(3))
  console.log('📏 Ratio (max/avg):', ratio.toFixed(2))

  if (ratio > 3) {
    console.warn('⚠️ Node points might be out of order! Max/Avg ratio is high.')
  }
}

const ToastBar = () => {
  const { nodes } = useGLTF('/static/models/project2/project2_2_conveyorVert_to_mesh.glb') as unknown as GLTFPortal
  const bakedTexture = useTexture('/static/models/project2/project2_baked_2.jpg')
  bakedTexture.flipY = false

  console.log('🌦️ nodes', nodes);

  const conveyorVert = nodes.ConveyorVert.geometry
  const conveyorWheel = nodes.ConveyorWheel.geometry
  const conveyorPath = nodes.ConveyorPathMesh.geometry

  const wheelRef = useRef<THREE.InstancedMesh>(null)

  // Extract evenly distributed node points from ConveyorPathMesh (auto-detect count)
  const nodePoints = useMemo(() => {
    const positionAttribute = conveyorPath.attributes.position

    console.log('📊 ConveyorPathMesh vertices:', positionAttribute.count)
    console.log('📊 BufferAttribute array length:', positionAttribute.array.length)

    // Step 1: Extract all vertices
    const vertices = extractVertices(positionAttribute)

    // Step 2: Auto-detect vertices per node
    const verticesPerNode = detectVerticesPerNode(vertices)
    console.log('🔍 Detected vertices per node:', verticesPerNode)

    // Step 3: Group vertices into nodes and calculate centers
    const points = groupVerticesIntoNodes(vertices, verticesPerNode)
    console.log('🎯 Extracted node points:', points.length)

    // Step 4: Validate distribution quality
    validateNodeDistribution(points)

    return points
  }, [conveyorPath])

  // Position wheels at the 44 node points
  useLayoutEffect(() => {
    if (!wheelRef.current) return

    const tempObject = new THREE.Object3D()
    const count = nodePoints.length

    for (let i = 0; i < count; i++) {
      const position = nodePoints[i]

      // Calculate smoothed tangent using previous and next points
      const prevIndex = (i - 1 + count) % count
      const nextIndex = (i + 1) % count

      const prevPosition = nodePoints[prevIndex]
      const nextPosition = nodePoints[nextIndex]

      // Average direction from previous to next point (smoother at corners)
      const tangent = new THREE.Vector3()
        .subVectors(nextPosition, prevPosition)
        .normalize()

      // Project to horizontal plane (ignore Y changes)
      tangent.y = 0
      tangent.normalize()

      // Set position
      tempObject.position.copy(position)

      // Align the X axis to the tangent (wheel faces forward)
      tempObject.quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0), tangent)

      tempObject.updateMatrix()
      wheelRef.current.setMatrixAt(i, tempObject.matrix)
    }

    wheelRef.current.instanceMatrix.needsUpdate = true
    console.log('✅ Positioned', count, 'wheels')
  }, [nodePoints])

  // Animate wheels rotation
  useFrame((_state, delta) => {
    if (!wheelRef.current) return

    const rotationSpeed = 3 // Adjust rotation speed here
    const tempObject = new THREE.Object3D()

    for (let i = 0; i < nodePoints.length; i++) {
      // Get current matrix
      wheelRef.current.getMatrixAt(i, tempObject.matrix)
      tempObject.matrix.decompose(tempObject.position, tempObject.quaternion, tempObject.scale)

      // Rotate around Y axis (vertical axis)
      tempObject.rotateZ(delta * rotationSpeed)

      tempObject.updateMatrix()
      wheelRef.current.setMatrixAt(i, tempObject.matrix)
    }

    wheelRef.current.instanceMatrix.needsUpdate = true
  })


  return (
    <>
      <mesh name="conveyorVert" geometry={conveyorVert}>
        <meshBasicMaterial map={bakedTexture} />
      </mesh>

      <instancedMesh ref={wheelRef} args={[conveyorWheel, undefined, nodePoints.length]}>
        <meshBasicMaterial map={bakedTexture} />
      </instancedMesh>
    </>
  )
}

export default ToastBar