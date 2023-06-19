import { Icosahedron } from '@react-three/drei'
import { MeshProps, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Group, Mesh, Vector3 } from 'three'

const amount = 10
const radius = 1.2

const headTransformSeconds = 2
const pearlsOutVec = new Vector3(1, 1, 1)

type Props = JSX.IntrinsicElements['group'] & {
  headIsMarging: React.MutableRefObject<boolean>
}

export function Pearls({ headIsMarging, ...group }: Props) {
  const ref = useRef<Group>(null!)

  useFrame(() => {
    ref.current.rotation.y += 0.01

    if (headIsMarging.current) {
      ref.current.scale.lerp(pearlsOutVec, headTransformSeconds / 60)
    }
  })

  const pearls: ReturnType<typeof Pearl>[] = []
  for (let i = 0; i < amount; i++) {
    const x = Math.sin((i * (2 * Math.PI)) / amount) * radius
    const z = Math.cos((i * (2 * Math.PI)) / amount) * radius
    pearls.push(<Pearl position={[x, 4.2, z]} />)
  }

  return (
    <group ref={ref} {...group} scale={0.5}>
      {...pearls}
    </group>
  )
}

function Pearl(props: MeshProps) {
  const ref = useRef<Mesh>(null!)

  useFrame(() => {
    ref.current.rotation.x += 0.01
    ref.current.rotation.z += 0.01
  })

  return (
    <Icosahedron ref={ref} {...props} args={[0.3]}>
      <meshStandardMaterial color="orange" />
    </Icosahedron>
  )
}
