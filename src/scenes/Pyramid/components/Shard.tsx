import { Edges } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

import { useBastetStore } from '@/store'

const turnSpeed = 1 / 4
const targetVec = new THREE.Vector3(0, 0, 0)

const luminanceOffset = -0.45

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

  //* Color
  const mainColor = useBastetStore(state => state.mainColor)
  const color = new THREE.Color(mainColor).offsetHSL(0, 0, luminanceOffset)

  const floatingState = useBastetStore(state => state.floatingState)

  //* how to turn towards a point
  const targetQuaternionRef = useRef<THREE.Quaternion | null>(null)
  useFrame((_, delta) => {
    if (!ref.current) return
    const mesh = ref.current

    if (!targetQuaternionRef.current) {
      const rotationMatrix = new THREE.Matrix4()
      rotationMatrix.lookAt(targetVec, mesh.position, mesh.up)

      const quat = new THREE.Quaternion()
      quat.setFromRotationMatrix(rotationMatrix)
      targetQuaternionRef.current = quat
    }

    if (targetQuaternionRef.current && floatingState) {
      if (!mesh.quaternion.equals(targetQuaternionRef.current)) {
        mesh.quaternion.rotateTowards(
          targetQuaternionRef.current,
          turnSpeed * delta
        )
      }
    }
  })

  return (
    <mesh geometry={geom} {...props} ref={ref}>
      <meshStandardMaterial color="black" />
      <Edges threshold={15} color={color} visible={true} />
    </mesh>
  )
}

/* 
<Edges geometry={geom} threshold={15}>
         <meshStandardMaterial color={'white'} /> 
        </Edges>
*/
