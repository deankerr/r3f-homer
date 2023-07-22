import { forwardRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DoubleSide, Group, MeshBasicMaterial, Vector3 } from 'three'

import { Hex } from './Hex'
import { Pearl } from './Pearl'
import { Ruby } from './Ruby'
import type { RootState } from './store'
import { decrement, increment } from './store'

type Props = JSX.IntrinsicElements['group']

export const MeshTest = forwardRef<Group, Props>((props, ref) => {
  const { ...groupProps } = props

  const hexmat = new MeshBasicMaterial({ side: DoubleSide })

  const count = useSelector((state: RootState) => state.hexx.value)
  const dispatch = useDispatch()

  return (
    <group ref={ref} {...groupProps}>
      <Hex
        vector={new Vector3(0, 0, 0)}
        selected={true}
        contents="empty"
        index={count}
        material={hexmat}
        position={[-2, 0, 0]}
      />
      <Ruby position={[0, 0, 0]} onClick={() => dispatch(increment())} />
      <Pearl position={[2, 0, 0]} onClick={() => dispatch(decrement())} />
    </group>
  )
})
MeshTest.displayName = 'MeshTest'
