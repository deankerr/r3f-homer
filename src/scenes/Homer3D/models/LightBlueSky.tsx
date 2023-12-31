/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.3 uploads_files_4381654_LightBlueSky.glb --types --transform --root /public/model --output ../../src/Model/LightBlueSky.tsx
*/
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Skybox: THREE.Mesh
  }
  materials: {
    Skybox_mat: THREE.MeshBasicMaterial
  }
}

export function LightBlueSky(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF(
    'model/LightBlueSky-transformed.glb'
  ) as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Skybox.geometry} material={materials.Skybox_mat} />
    </group>
  )
}

useGLTF.preload('model/LightBlueSky-transformed.glb')
