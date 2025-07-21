const FirstGeometry = () => (
	<mesh>
		<torusKnotGeometry />
		<meshNormalMaterial />
	</mesh>
)

function Scene() {
  return (
    <>
      <FirstGeometry />
    </>
  )
}

export default Scene