import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const colorSpeed = 2
const dimmedOffset = 0.2

const mainColor1 = new THREE.Color('orange')
const mainColor2 = new THREE.Color('violet')

const dimmedColor1 = new THREE.Color('orange').offsetHSL(0, 0, -dimmedOffset)
const dimmedColor2 = new THREE.Color('violet').offsetHSL(0, 0, -dimmedOffset)

type MaterialWithColor = THREE.Material & { color: THREE.Color }

export function useMaterialColorLerpAnimation(
  ref: React.MutableRefObject<MaterialWithColor>,
  colorType: 'main' | 'dimmed'
) {
  const color1 = colorType === 'main' ? mainColor1 : dimmedColor1
  const color2 = colorType === 'main' ? mainColor2 : dimmedColor2

  useFrame(state => {
    if (!ref.current) return

    ref.current.color.lerpColors(
      color1,
      color2,
      Math.abs(Math.sin(state.clock.elapsedTime / colorSpeed))
    )
  })
}

// this is all really bad
export function useGridColorLerpAnimation(
  ref: React.MutableRefObject<THREE.Mesh>
) {
  useFrame(state => {
    if (!ref.current) return

    const material = ref.current.material as THREE.ShaderMaterial
    const cellColor = material.uniforms.sectionColor.value as THREE.Color

    cellColor.lerpColors(
      dimmedColor1,
      dimmedColor2,
      Math.abs(Math.sin(state.clock.elapsedTime / colorSpeed))
    )
  })
}

/* 
//* how to turn towards a point
const turnSpeed = 1 / 4
const targetVec = new THREE.Vector3(0, 0, 0)

  const targetQuaternionRef = useRef<THREE.Quaternion | null>(null)
  useFrame((_, delta) => {
    if (!ref.current) return
    const mesh = ref.current

    if (!targetQuaternionRef.current) {
      const rotationMatrix = new THREE.Matrix4()
      rotationMatrix.lookAt(targetVec, mesh.position, mesh.up)

      const quat = new THREE.Quaternion()
      quat.setFromRotationMatrix(rotationMatrix)
      targetQuaternionRef.current = quat
    }

    if (targetQuaternionRef.current && floatingState) {
      if (!mesh.quaternion.equals(targetQuaternionRef.current)) {
        mesh.quaternion.rotateTowards(
          targetQuaternionRef.current,
          turnSpeed * delta
        )
      }
    }
  })

*/

/* 
//* fixed bug?
export const FixedGlitch = forwardRef<GlitchEffect, GlitchProps>(
  function Glitch(
    { active = true, ...props }: GlitchProps,
    ref: Ref<GlitchEffect>
  ) {
    const invalidate = useThree(state => state.invalidate)
    const delay = useVector2(props, 'delay')
    const duration = useVector2(props, 'duration')
    const strength = useVector2(props, 'strength')
    const chromaticAberrationOffset = useVector2(
      props,
      'chromaticAberrationOffset'
    )
    const effect = useMemo(() => {
      const eff = new GlitchEffect({
        ...props,
        delay,
        duration,
        strength,
        chromaticAberrationOffset,
      })
      // console.log('create')
      // debugger
      return eff
    }, [delay, duration, props, strength, chromaticAberrationOffset])
    // console.log('effect', effect)
    // console.log('render')
    useLayoutEffect(() => {
      effect.mode = active
        ? props.mode || GlitchMode.SPORADIC
        : GlitchMode.DISABLED
      invalidate()
    }, [active, effect, invalidate, props.mode])
    useEffect(() => {
      return () => {
        // console.log('effect.dispose', effect)
        // debugger
        effect.dispose()
        // console.log('dispose')
      }
    }, [effect])
    return <primitive ref={ref} object={effect} />
  }
)


*/
