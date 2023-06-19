import { Center, Text3D } from '@react-three/drei'

type Props = JSX.IntrinsicElements['group'] & { text: string }

export function BigText({ text, ...group }: Props) {
  return (
    <Center {...group}>
      <Text3D font={'font/bigblue.json'} size={20} height={10}>
        {text}
        <meshNormalMaterial />
      </Text3D>
    </Center>
  )
}
