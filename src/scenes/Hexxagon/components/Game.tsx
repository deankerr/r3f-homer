import { forwardRef } from 'react'
import { Group } from 'three'

import { Hexes } from './Hexes'
import { Labels } from './Labels'
import { Pearls } from './Pearls'
import { Rubies } from './Rubies'

type Props = JSX.IntrinsicElements['group']

export const Game = forwardRef<Group, Props>((props, ref) => {
  const { ...groupProps } = props

  return (
    <group ref={ref} name="game" {...groupProps}>
      <Labels />
      <Hexes />
      <Rubies />
      <Pearls />
    </group>
  )
})
Game.displayName = 'Game'
