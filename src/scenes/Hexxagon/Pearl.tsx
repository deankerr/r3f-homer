import { GradientTexture, GradientType } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useControls } from 'leva'
import { useRef } from 'react'
import { Mesh, SphereGeometry, Vector3 } from 'three'

type Props = JSX.IntrinsicElements['group']

const vec0 = new Vector3()

export function Pearl(props: Props) {
  const config = useControls('pearl', {
    outer: true,
    transparent: true,
    opacity: { value: 0.5, min: 0, max: 1, step: 0.1 },
  })

  const innerRef = useRef<Mesh>(null!)
  const { camera } = useThree()
  useFrame(() => {
    innerRef.current.lookAt(camera.position)
  })

  return (
    <group {...props}>
      <mesh scale={1.1} visible={config.outer}>
        <sphereGeometry args={[5.5]} />
        <meshLambertMaterial
          transparent={config.transparent}
          opacity={config.opacity}
        />
      </mesh>

      {/* <Billboard> */}
      <mesh geometry={geometry} rotation={[0, 0, 0.77]} ref={innerRef}>
        <meshBasicMaterial>
          <GradientTexture
            stops={[0.2, 0.5, 0.8]}
            colors={['blue', 'thistle', 'magenta']}
            //@ts-expect-error should not be undefined?
            type={GradientType.Linear}
          />
        </meshBasicMaterial>
      </mesh>
      {/* </Billboard> */}
    </group>
  )
}

const geometry = new SphereGeometry(5)
