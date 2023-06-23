import { Plane } from '@react-three/drei'

const size = 800

export function Floor() {
  return (
    <>
      <gridHelper args={[size, 40, 'orange', 'orange']} />

      <Plane args={[size, size]} rotation={[-Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="black" />
      </Plane>
    </>
  )
}
