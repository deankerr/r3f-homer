import { Edges } from '@react-three/drei'
import { Euler, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { ConeGeometry, LineBasicMaterial, MathUtils, Mesh } from 'three'

import { useMaterialColorLerpAnimation } from '..'

const rotateSpeedRange = [0, 0.15] as const

export function Shard() {
  const ref = useRef<Mesh>(null!)

  //* Align geometry
  const geom = useMemo(() => {
    const geom = new ConeGeometry(3, 10, 3, 1)
    geom.rotateX(-Math.PI / 2)
    geom.rotateY(Math.PI)
    return geom
  }, [])

  //* initial alignment
  const rotation = useMemo(() => {
    const x = MathUtils.randFloat(0, Math.PI * 2)
    const z = MathUtils.randFloat(0, Math.PI * 2)
    return [x, 0, z] as Euler
  }, [])

  //* Line color animation
  const lineRef = useRef<LineBasicMaterial>(null!)
  useMaterialColorLerpAnimation(lineRef, 'dimmed')

  //* random rotation
  const rotate = useMemo(() => {
    return {
      x: MathUtils.randFloat(...rotateSpeedRange),
      y: MathUtils.randFloat(...rotateSpeedRange),
      z: MathUtils.randFloat(...rotateSpeedRange),
    }
  }, [])

  useFrame((_, delta) => {
    ref.current.rotation.x += rotate.x * delta
    ref.current.rotation.y += rotate.y * delta
    ref.current.rotation.z += rotate.z * delta
  })

  return (
    <mesh geometry={geom} ref={ref}>
      <meshStandardMaterial color={'black'} />
      <Edges>
        <lineBasicMaterial ref={lineRef} color={'white'} />
      </Edges>
    </mesh>
  )
}
