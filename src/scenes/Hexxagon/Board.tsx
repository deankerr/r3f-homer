import { forwardRef, useMemo } from 'react'
import { DoubleSide, Group, MeshMatcapMaterial, Vector3 } from 'three'

import { CellData, Hex } from './Hex'
import { useMatcap } from './Textures'

// board
const columns = [5, 6, 7, 8, 9, 8, 7, 6, 5]

// hex
const hexRadius = 8
const hexWidth = 2 * hexRadius
const hexHeight = Math.sqrt(3) * hexRadius

const boardScale = [0.2, 0.1, 0.1] as const

type Props = JSX.IntrinsicElements['group']
export const Board = forwardRef<Group, Props>((props, ref) => {
  // board layout
  const boardData = useMemo(() => {
    return columns.map((columnSize, i) => {
      const q = i - Math.floor(columns.length / 2)
      const x = 0.75 * hexWidth * q

      return [...new Array<CellData>(columnSize)].map((_, j) => {
        const r = j - Math.floor(columnSize / 2)
        const alternate = (i % 2) * (hexHeight / 2)
        const y = hexHeight * r + alternate

        return { position: new Vector3(x, y, 0), q, r }
      })
    })
  }, [])

  // material
  const matcap = useMatcap()
  const material = useMemo(
    () =>
      new MeshMatcapMaterial({
        matcap,
        flatShading: true,
        side: DoubleSide,
      }),
    [matcap]
  )

  return (
    <group ref={ref} scale={boardScale} {...props}>
      {boardData.flat().map((cell, j) => (
        <Hex material={material} {...cell} key={j} />
      ))}
    </group>
  )
})
Board.displayName = 'Board'

// <group scale={[widthRatio, 1, 1]} ref={ref}>
//   {boardData.flat().map((cell, i) => (
//     <Hex
//       geometry={geometry}
//       material={mats[config.material]}
//       {...cell}
//       key={i}
//     />
//   ))}
// </group>

/*  alternate materials

const materialPhysical = useMemo(() => {
    return new MeshPhysicalMaterial({
      side: BackSide,
      color: 'purple',
      roughness: 0.1,
      metalness: 0.5,
      flatShading: true,
    })
  }, [])

  const materialStandard = useMemo(() => {
    return new MeshStandardMaterial({
      side: BackSide,
      color: 'hotpink',
      roughness: 0.1,
      metalness: 0.5,
      flatShading: true,
    })
  }, [])

  const mats = {
    // matcap: materialMatcap,
    physical: materialPhysical,
    standard: materialStandard,
  } as Record<string, Material>

  const config = useControls({
    material: { options: ['matcap', 'physical', 'standard'] },
  })

*/
