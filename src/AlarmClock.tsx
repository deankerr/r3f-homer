/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.3 ../alarm-clock/alarm_clock_01_1k.gltf --types --printwidth80 -r /public -o ../../src/AlarmClock.tsx
*/
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Cylinder030: THREE.Mesh
    Cylinder030_1: THREE.Mesh
    houd_hand: THREE.Mesh
    minute_hand: THREE.Mesh
    second_hand: THREE.Mesh
  }
  materials: {
    alarm_clock_01: THREE.MeshStandardMaterial
    alarm_clock_01_Glass: THREE.MeshStandardMaterial
  }
}

export function AlarmClock(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF(
    'alarm-clock/alarm_clock_01_1k.gltf'
  ) as GLTFResult
  return (
    <group {...props} dispose={null}>
      <group
        position={[0, 0.065, 0]}
        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
      >
        <mesh
          geometry={nodes.Cylinder030.geometry}
          material={materials.alarm_clock_01}
        />
        <mesh
          geometry={nodes.Cylinder030_1.geometry}
          material={materials.alarm_clock_01_Glass}
        />
      </group>
      <mesh
        geometry={nodes.houd_hand.geometry}
        material={materials.alarm_clock_01}
        position={[0, 0.065, 0]}
        rotation={[-Math.PI / 2, 1.197, Math.PI]}
      />
      <mesh
        geometry={nodes.minute_hand.geometry}
        material={materials.alarm_clock_01}
        position={[0, 0.065, 0]}
        rotation={[Math.PI / 2, -0.51, 0]}
      />
      <mesh
        geometry={nodes.second_hand.geometry}
        material={materials.alarm_clock_01}
        position={[0, 0.065, 0]}
        rotation={[-Math.PI / 2, -1.159, -Math.PI / 2]}
      />
    </group>
  )
}

useGLTF.preload('alarm-clock/alarm_clock_01_1k.gltf')
