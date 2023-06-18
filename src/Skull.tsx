import { useGLTF } from '@react-three/drei'

export default function Skull() {
  const gltf = useGLTF('skull/scene.gltf')

  return <primitive object={gltf.scene} position={[0, 1, 0]} scale={1} />
}
