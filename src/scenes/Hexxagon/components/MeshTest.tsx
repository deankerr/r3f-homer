import { forwardRef } from 'react'
import { DoubleSide, Group, MeshBasicMaterial } from 'three'

import { Hex } from './Hex'
import { Pearl } from './Pearl'
import { Ruby } from './Ruby'

type Props = JSX.IntrinsicElements['group']

export const MeshTest = forwardRef<Group, Props>((props, ref) => {
  const { ...groupProps } = props

  const hexmat = new MeshBasicMaterial({ side: DoubleSide })

  return (
    <group ref={ref} {...groupProps}>
      <Hex vector={[0, 0, 0]} selected={true} contents="empty" index={0} material={hexmat} position={[-2, 0, 0]} />
      <Ruby position={[0, 0, 0]} />
      <Pearl position={[2, 0, 0]} />
    </group>
  )
})
MeshTest.displayName = 'MeshTest'
