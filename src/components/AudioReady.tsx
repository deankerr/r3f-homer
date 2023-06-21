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

    // const audio = 

    return <PositionalAudio ref={ref} {...props} autoplay={false} load />
    // return <Suspense>{canStartAudio && audio}</Suspense>
  }
)
