import { forwardRef, useMemo } from 'react'
import {
  DoubleSide,
  Group,
  LatheGeometry,
  MeshMatcapMaterial,
  Vector2,
  Vector3,
} from 'three'

import { CellData, Hex } from './Hex'
import { useMatcap, useNormalMap } from './Textures'

// board
const columns = [5, 6, 7, 8, 9, 8, 7, 6, 5]

// hex
const radius = 16
const width = 2 * radius
const height = Math.sqrt(3) * radius
const widthRatio = 2

const hexPoints = [
  [radius, 0], // outer edge 16
  [radius - 2, 0], // border 14
  [radius - 6, 10], //  slope 10
  [0, 10], // pit
].map(p => new Vector2(...p))

type Props = JSX.IntrinsicElements['group']
export const Board = forwardRef<Group, Props>((props, ref) => {
  const boardData = useMemo(() => {
    return columns.map((columnSize, i) => {
      const q = i - Math.floor(columns.length / 2)
      const x = 0.75 * width * q

      return [...new Array<CellData>(columnSize)].map((_, j) => {
        const r = j - Math.floor(columnSize / 2)
        const alternate = (i % 2) * (height / 2)
        const y = height * r + alternate

        return { position: new Vector3(x, y, 0), q, r }
      })
    })
  }, [])

  const geometry = useMemo(
    () => new LatheGeometry(hexPoints, 6, -Math.PI / 2).rotateX(-Math.PI / 2),
    []
  )

  const matcap = useMatcap()
  const normalMap = useNormalMap()

  const materialMatcap = useMemo(
    () =>
      new MeshMatcapMaterial({
        matcap,
        normalMap,
        flatShading: true,
        side: DoubleSide,
      }),
    [matcap, normalMap]
  )

  return (
    <group scale={[widthRatio, 1, 1]} ref={ref}>
      {boardData.flat().map((cell, i) => (
        <Hex geometry={geometry} material={materialMatcap} {...cell} key={i} />
      ))}
    </group>
  )
})
Board.displayName = 'Board'
