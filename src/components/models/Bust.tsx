/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.3 ../../raw-assets/marble_bust_01_1k.gltf --types --transform --root /public/model --output ../../src/Bust.tsx
*/
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    marble_bust_01: THREE.Mesh
  }
  materials: {
    marble_bust_01: THREE.MeshStandardMaterial
  }
}

export function Bust(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF(
    'model/marble_bust_01_1k-transformed.glb'
  ) as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.marble_bust_01.geometry}
        material={materials.marble_bust_01}
        position={[0, 0.028, 0]}
      />
    </group>
  )
}

useGLTF.preload('model/marble_bust_01_1k-transformed.glb')