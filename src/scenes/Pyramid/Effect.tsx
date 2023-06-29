import { Effects } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import { GlitchPass } from 'three-stdlib'

extend({ GlitchPass })

export function Effect() {
  return <Effects>{/* <glitchPass /> */}</Effects>
}
