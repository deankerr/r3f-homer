import { Cone, Edges } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { dampE } from 'maath/easing'
import { useEffect, useMemo, useRef } from 'react'
import { Euler, Group, Mesh, Vector3 } from 'three'

import { usePyramidStore } from '@/store'

type Props = JSX.IntrinsicElements['mesh']

export function Shard2({ position, scale, rotation }: Props) {
  const ref = useRef<Mesh>(null!)

  const rotationToCenter = useRef<Euler | null>(null)

  //* rotate mesh so that the point faces forward on mount
  useEffect(() => {
    // ref.current.rotateX(-Math.PI / 2)
    const current = ref.current.rotation.clone()
    ref.current.lookAt(0, 0, 0)
    rotationToCenter.current = ref.current.rotation.clone()
    ref.current.rotation.copy(current)
  }, [])

  const mainColor = usePyramidStore(state => state.mainColor)

  const floatingState = usePyramidStore(state => state.floatingState)
  useFrame((_, delta) => {
    if (floatingState && rotationToCenter.current) {
      dampE(ref.current.rotation, rotationToCenter.current, 3, delta)
    }
  })

  return (
    <Cone
      args={[3, 10, 3, 1]}
      position={position}
      rotation={rotation}
      scale={scale}
      ref={ref}
    >
      <meshPhongMaterial color="black" />
      <Edges threshold={15} color={mainColor} />
    </Cone>
  )
}
