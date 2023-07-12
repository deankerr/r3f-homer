import { Center, Float, Text3D } from '@react-three/drei'

type Props = JSX.IntrinsicElements['group'] & { text: string }

export function BigText({ text, ...group }: Props) {
  return (
    <Float>
      <Center {...group}>
        <Text3D font={'font/bigblue.json'} size={6} height={10}>
          {text}
          <meshNormalMaterial />
          {/* <meshPhongMaterial /> */}
        </Text3D>
      </Center>
    </Float>
  )
}
