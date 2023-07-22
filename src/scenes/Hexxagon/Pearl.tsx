import { GradientTexture, GradientType } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useControls } from 'leva'
import { useRef } from 'react'
import { Group, Mesh, RingGeometry, SphereGeometry } from 'three'

type Props = JSX.IntrinsicElements['group']

export function Pearl(props: Props) {
  const config = useControls('pearl', { outer: true, lookAt: true }, { collapsed: true })

  const innerRef = useRef<Mesh>(null!)
  const outerRef = useRef<Mesh>(null!)
  const groupRef = useRef<Group>(null!)

  // const { camera } = useThree()
  // useFrame(() => {
  //   outerRef.current.lookAt(camera.position)
  //   if (config.lookAt) {
  //     innerRef.current.lookAt(camera.position)
  //   } else {
  //     innerRef.current.rotation.set(0, 0, 0)
  //   }
  // })

  return (
    <group {...props} ref={groupRef}>
      <mesh geometry={geometry.outer} material-color="#d7d7d7" ref={outerRef} visible={config.outer} />

      <mesh geometry={geometry.main} ref={innerRef} scale={0.82}>
        <meshPhongMaterial>
          <GradientTexture
            stops={[0.2, 0.5, 0.8]}
            colors={['blue', 'thistle', 'magenta']}
            //@ts-expect-error incorrectly typed as undefined?
            type={GradientType.Linear}
          />
        </meshPhongMaterial>
      </mesh>
    </group>
  )
}

//* geometry
const geometry = (() => {
  return {
    main: new SphereGeometry(),
    outer: new RingGeometry(),
  }
})()
