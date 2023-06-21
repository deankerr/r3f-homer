import { Cone, Sphere } from '@react-three/drei'

import { useTaxiStore } from '@/store'

import { Arm } from './Arm'

type Props = JSX.IntrinsicElements['group'] & { skinColor: string }

export function Chest({ skinColor, ...group }: Props) {
  const [faceState, setHomerFace] = useTaxiStore((state) => [
    state.homerFace,
    state.setHomerFace,
  ])

  function handleClick() {
    if (!faceState) {
      setHomerFace(true)
    }
  }

  return (
    <group {...group} onClick={handleClick}>
      {/* shirt */}
      <Cone args={[1.75, 4]} position={[0, 3.5, 0]}>
        <meshStandardMaterial color="white" />
      </Cone>
      <Sphere args={[2]} position={[0, 1, 0]}>
        <meshStandardMaterial color="white" />
      </Sphere>

      <Arm
        position={[-1.5, 2.6, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        skinColor={skinColor}
      />
      <Arm
        position={[1.5, 2.6, 0]}
        rotation={[0, Math.PI / 2, 0]}
        skinColor={skinColor}
      />
    </group>
  )
}
