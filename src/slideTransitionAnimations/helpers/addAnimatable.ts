import type {
  IAnimatable,
  TRDurationAndPreTransitionDelay,
  TRSlideAnimations
} from '../types'

export const addAnimatable = (
  slideAnimations: TRSlideAnimations<false> & TRDurationAndPreTransitionDelay
): TRSlideAnimations<false> & IAnimatable & TRDurationAndPreTransitionDelay => {
  slideAnimations.duration.toString()

  throw new Error('Not implemented yet')

  // return {
  //   ...slideAnimations,
  //   animate({ isAutoTransitionStarted, onCancel, ...props }): void {
  //     const onFinish: TAnimationFinished = () => {
  //       props.onFinish()
  //     }

  //     this.slide1.animate({ isAutoTransitionStarted, onCancel, onFinish })
  //     this.slide2.animate({ isAutoTransitionStarted, onCancel, onFinish })
  //     this.slide3.animate({ isAutoTransitionStarted, onCancel, onFinish })
  //   }
  // }
}
