import { PositionalAudio } from '@react-three/drei'
import { PositionalAudioProps } from '@react-three/fiber'
import { Suspense } from 'react'

import { useTaxiStore } from '@/store'

type Props = PositionalAudioProps & {
  url: string
  distance?: number
}

export function AudioReady(props: Props) {
  const canStartAudio = useTaxiStore((state) => state.canStartAudio)

  const audio = <PositionalAudio {...props} load />

  return <Suspense>{canStartAudio && audio}</Suspense>
}
