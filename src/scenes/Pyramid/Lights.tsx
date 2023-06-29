// import { useHelper } from '@react-three/drei'
import { useRef } from 'react'
import { DirectionalLight, DirectionalLightHelper } from 'three'

export function Lights() {
  const dirLightRef = useRef<DirectionalLight>(null!)
  // useHelper(dirLightRef, DirectionalLightHelper, 1, 'red')

  return (
    <>
      <directionalLight
        position={[30, 20, 0]}
        color={'red'}
        // intensity={0.5}
        ref={dirLightRef}
        visible={true}
      />
      {/* <ambientLight intensity={1} /> */}
    </>
  )
}
