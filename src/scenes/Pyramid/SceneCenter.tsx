import { Orb } from './components/Orb'
import { Pyramid } from './components/Pyramid'
import { Shard } from './components/Shard'

type Props = JSX.IntrinsicElements['group']

export function SceneCenter({ ...group }: Props) {
  return (
    <group {...group}>
      <group position={[0, 0, 0]}>
        <Pyramid position={[0, 0.05, 0]} />
        <Orb position={[0, 80, 0]} />
      </group>

      <Shard
        position={[-100, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
        scale={1.0}
      />
      <Shard
        position={[-150, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
        scale={0.5}
      />

      <Shard
        position={[100, 0, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={1.0}
      />
      <Shard
        position={[150, 0, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={0.5}
      />
    </group>
  )
}
