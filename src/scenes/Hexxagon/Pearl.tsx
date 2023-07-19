import { GradientTexture, GradientType } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useControls } from 'leva'
import { useRef } from 'react'
import { Group, Mesh, RingGeometry, SphereGeometry } from 'three'

type Props = JSX.IntrinsicElements['group']

export function Pearl(props: Props) {
  const config = useControls('pearl', { outer: true }, { collapsed: true })

  const innerRef = useRef<Mesh>(null!)
  const outerRef = useRef<Mesh>(null!)
  const groupRef = useRef<Group>(null!)

  const { camera } = useThree()
  useFrame(() => {
    outerRef.current.lookAt(camera.position)
    innerRef.current.lookAt(camera.position)
  })

  return (
    <group {...props} ref={groupRef}>
      <mesh geometry={ringGeometry} ref={outerRef} visible={config.outer}>
        <meshBasicMaterial color={'#d7d7d7'} />
      </mesh>

      <mesh geometry={geometry} ref={innerRef} scale={0.82}>
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

const geometry = new SphereGeometry(5.5)
  // .rotateZ(Math.PI * 0.1)
  .scale(1.16, 1, 1)

const ringGeometry = new RingGeometry(4, 5)
  // .rotateZ(Math.PI * 0.2)
  .scale(1.16, 1, 1)
