import { useControls } from 'leva'
import { forwardRef, useMemo, useRef } from 'react'
import { Group, Mesh } from 'three'

import { useHexxSelector } from '../shared'
import { Board } from './Board'
import { Pearls } from './Pearls'
import { Rubies } from './Rubies'

type Props = JSX.IntrinsicElements['group']

export const Game = forwardRef<Group, Props>((props, ref) => {
  const { ...groupProps } = props

  const boardRef = useRef<Group>(null!)

  const gameState = useHexxSelector(state => state.gameState)

  return (
    <group ref={ref} name="game" {...groupProps}>
      {/* <Board ref={boardRef} name="board" /> */}
      {/* <Rubies /> */}
      <Pearls />
    </group>
  )
})
Game.displayName = 'Game'

/* 
    <Ruby scale={0.65} visible={contents === 'ruby'} />
      <Pearl scale={0.65} visible={contents === 'pearl'} />
      <Circle args={[0.6]} material-color="black" visible={contents === 'hole'} />

      <Labels data={[...vector, index]} visible={config.labels} />
*/
