import { Effects } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import { GlitchPass } from 'three-stdlib'

extend({ GlitchPass })
type Props = any

export function Effect({ props }: Props) {
  return <Effects>{/* <glitchPass /> */}</Effects>
}
