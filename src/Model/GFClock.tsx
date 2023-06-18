import { useGLTF } from '@react-three/drei'

export default function GFClock() {
  const gltf = useGLTF('gf-clock/vintage_grandfather_clock_01_1k.gltf')

  return <primitive object={gltf.scene} position={[0, 1, -10]} scale={10} />
}
