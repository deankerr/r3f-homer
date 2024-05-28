import { PositionalAudio } from '@react-three/drei'
import { PositionalAudioProps } from '@react-three/fiber'
import { forwardRef } from 'react'
import { PositionalAudio as PostionalAudio3 } from 'three'

// import { useTaxiStore } from '@/store'

type Props = PositionalAudioProps & {
  url: string
  distance?: number
}

export const AudioReady = forwardRef<PostionalAudio3, Props>(
  function AudioReady(props, ref) {
    // const canStartAudio = useTaxiStore((state) => state.canStartAudio)

    return <PositionalAudio ref={ref} {...props} autoplay={false} />
    // return <Suspense>{canStartAudio && audio}</Suspense>
  }
)
