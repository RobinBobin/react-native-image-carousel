import { types } from 'mobx-state-tree'

export const AutoscrollAnimationParamsModel = types
  .model('AutoscrollAnimationParamsModel')
  .volatile(() => ({
    delay: 1000,
    duration: 1000
  }))
  .actions(self => ({
    setDelay(this: void, delay: number): void {
      self.delay = delay
    },
    setDuration(this: void, duration: number): void {
      self.duration = duration
    }
  }))
