import { Edges } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

import { useMaterialColorLerpAnimation } from '..'

type Props = JSX.IntrinsicElements['mesh']

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

  return (
    <mesh geometry={geom} {...props} ref={ref}>
      <meshStandardMaterial color={'black'} />
      <Edges>
        <lineBasicMaterial ref={lineRef} color={'white'} />
      </Edges>
    </mesh>
  )
}
