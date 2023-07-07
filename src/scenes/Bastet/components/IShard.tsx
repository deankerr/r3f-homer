import { Edges } from '@react-three/drei'
import { Instance, InstanceProps } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

import { useBastetStore } from '@/store'

const turnSpeed = 1 / 4
const targetVec = new THREE.Vector3(0, 0, 0)

type Props = InstanceProps

export function IShard(props: Props) {
  const mainColor = useBastetStore(state => state.mainColor)
  const ref = useRef<THREE.Mesh>(null!)

  const floatingState = useBastetStore(state => state.floatingState)

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
    <Instance {...props} ref={ref}>
      <Edges threshold={15} color={mainColor} />
    </Instance>
  )
}
