/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.3 bottlenose_dolphin.glb --types --transform --root /public/model --output ../../src/Model/Dolphin.tsx
Author: DigitalLife3D (https://sketchfab.com/DigitalLife3D)
License: CC-BY-NC-4.0 (http://creativecommons.org/licenses/by-nc/4.0/)
Source: https://sketchfab.com/3d-models/model-61a-bottlenose-dolphin-2ec20f15b08c4c2fb16e4df5d837b893
Title: Model 61A - Bottlenose Dolphin
*/
import { useGLTF } from '@react-three/drei'
import { PositionalAudio } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import { Suspense, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

import { useTaxiStore } from '@/store'

type GLTFResult = GLTF & {
  nodes: {
    Object_7: THREE.SkinnedMesh
    Object_8: THREE.SkinnedMesh
    GLTF_created_0_rootJoint: THREE.Bone
  }
  materials: {
    Dolphin_Body: THREE.MeshStandardMaterial
    Dolphin_Eyes: THREE.MeshStandardMaterial
  }
}

const clickFreq = 10

function DolphinAudio() {
  const ref = useRef<THREE.PositionalAudio>(null!)
  const timeToClickRef = useRef<number>(0)

  const { volume } = useControls('dolphin volume', { volume: 0 })

  if (ref.current) {
    console.log(volume)
    ref.current.setVolume(volume)
  }

  useFrame((state, dt) => {
    timeToClickRef.current -= dt
    if (timeToClickRef.current <= 0) {
      ref.current.play()
      timeToClickRef.current = clickFreq
    }
  })

  return (
    <PositionalAudio
      ref={ref}
      url="sounds/dolphin_clicks.ogg"
      distance={10}
      loop={false}
      load
    />
  )
}

export function Dolphin(props: JSX.IntrinsicElements['group']) {
  const canStartAudio = useTaxiStore((state) => state.canStartAudio)

  const { nodes, materials } = useGLTF(
    'model/bottlenose_dolphin-transformed.glb'
  ) as GLTFResult
  return (
    <group {...props}>
      <Suspense>{canStartAudio && <DolphinAudio />}</Suspense>
      <group name="Sketchfab_Scene">
        <primitive object={nodes.GLTF_created_0_rootJoint} />
        <skinnedMesh
          name="Object_7"
          geometry={nodes.Object_7.geometry}
          material={materials.Dolphin_Body}
          skeleton={nodes.Object_7.skeleton}
        />
        <skinnedMesh
          name="Object_8"
          geometry={nodes.Object_8.geometry}
          material={materials.Dolphin_Eyes}
          skeleton={nodes.Object_8.skeleton}
        />
      </group>
    </group>
  )
}

useGLTF.preload('model/bottlenose_dolphin-transformed.glb')
