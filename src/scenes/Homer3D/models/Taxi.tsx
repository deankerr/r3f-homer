/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.3 scene.gltf --types --transform --root /public/model --output ../../src/Model/Taxi2.tsx
Author: 8sianDude (https://sketchfab.com/haoliu95)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/2001-crown-victoria-taxi-game-prop-2429a825ff1646568e8e6e1453f9c501
Title: 2001 Crown Victoria Taxi Game Prop
*/
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    crown_vic_taxi_main_frame_0: THREE.Mesh
    crown_vic_taxi_interior2_0: THREE.Mesh
    crown_vic_taxi_plate_0: THREE.Mesh
    crown_vic_taxi_glass_0: THREE.Mesh
    crown_vic_taxi_glass_window_0: THREE.Mesh
    crown_vic_taxi_interior_bottom_0: THREE.Mesh
    crown_vic_taxi_wheels_and_parts_0: THREE.Mesh
    taxi_sign_taxi_sign_0: THREE.Mesh
  }
  materials: {
    main_frame: THREE.MeshStandardMaterial
    interior2: THREE.MeshStandardMaterial
    plate: THREE.MeshStandardMaterial
    glass: THREE.MeshStandardMaterial
    glass_window: THREE.MeshStandardMaterial
    interior_bottom: THREE.MeshStandardMaterial
    wheels_and_parts: THREE.MeshStandardMaterial
    taxi_sign: THREE.MeshStandardMaterial
  }
}

export function Taxi(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF(
    'model/taxi-transformed.glb'
  ) as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.crown_vic_taxi_main_frame_0.geometry}
        material={materials.main_frame}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        geometry={nodes.crown_vic_taxi_interior2_0.geometry}
        material={materials.interior2}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        geometry={nodes.crown_vic_taxi_plate_0.geometry}
        material={materials.plate}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        geometry={nodes.crown_vic_taxi_glass_0.geometry}
        material={materials.glass}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        geometry={nodes.crown_vic_taxi_glass_window_0.geometry}
        material={materials.glass_window}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        geometry={nodes.crown_vic_taxi_interior_bottom_0.geometry}
        material={materials.interior_bottom}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        geometry={nodes.crown_vic_taxi_wheels_and_parts_0.geometry}
        material={materials.wheels_and_parts}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        geometry={nodes.taxi_sign_taxi_sign_0.geometry}
        material={materials.taxi_sign}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  )
}

useGLTF.preload('model/taxi-transformed.glb')
