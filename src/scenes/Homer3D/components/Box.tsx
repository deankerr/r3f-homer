import { Vector3, useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import { Mesh } from 'three'

type Props = {
  position: Vector3
}

export function Box(props: Props) {
  const ref = useRef<Mesh>(null!)

  const [hovered, setHover] = useState(false)
  const [clicked, setClick] = useState(false)

  useFrame((_state, delta) => (ref.current.rotation.x += delta))

  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={() => setClick(!clicked)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}
