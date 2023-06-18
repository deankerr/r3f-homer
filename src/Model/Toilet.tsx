/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.3 uploads_files_2406324_Toilet.gltf --types --transform --root /public/model --output ../../src/Model/Toilet.tsx
*/
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Toilet: THREE.Mesh
  }
  materials: {
    Toilet: THREE.MeshStandardMaterial
  }
}

export function Toilet(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF(
    'model/toilet-transformed.glb'
  ) as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Toilet.geometry} material={materials.Toilet} />
    </group>
  )
}

useGLTF.preload('model/toilet-transformed.glb')
