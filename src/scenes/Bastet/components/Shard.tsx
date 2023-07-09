import { Edges } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

import { useMaterialColorLerpAnimation } from '..'

type Props = JSX.IntrinsicElements['mesh']

const rotateSpeedRange = [0, 0.15] as const

export function Shard(props: Props) {
  const ref = useRef<THREE.Mesh>(null!)

  //* Align geometry
  const geom = useMemo(() => {
    const geom = new THREE.ConeGeometry(3, 10, 3, 1)
    geom.rotateX(-Math.PI / 2)
    geom.rotateY(Math.PI)
    return geom
  }, [])

  //* Line color animation
  const lineRef = useRef<THREE.LineBasicMaterial>(null!)
  useMaterialColorLerpAnimation(lineRef, 'dimmed')

  //* random rotation
  const rotate = useMemo(() => {
    return {
      x: THREE.MathUtils.randFloat(...rotateSpeedRange),
      y: THREE.MathUtils.randFloat(...rotateSpeedRange),
      z: THREE.MathUtils.randFloat(...rotateSpeedRange),
    }
  }, [])

  useFrame((_, delta) => {
    ref.current.rotation.x += rotate.x * delta
    ref.current.rotation.y += rotate.y * delta
    ref.current.rotation.z += rotate.z * delta
  })

  return (
    <mesh geometry={geom} {...props} ref={ref}>
      <meshStandardMaterial color={'black'} />
      <Edges>
        <lineBasicMaterial ref={lineRef} color={'white'} />
      </Edges>
    </mesh>
  )
}
