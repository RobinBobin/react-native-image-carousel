import { types } from 'mobx-state-tree'

export const AutoSwitchAnimationParamsModel = types
  .model('AutoSwitchAnimationParamsModel')
  .volatile(() => ({
    duration: 1000,
    preSwitchDelay: 1000
  }))
  .actions(self => ({
    setDuration(this: void, duration: number): void {
      self.duration = duration
    },
    setPreSwitchDelay(this: void, preSwitchDelay: number): void {
      self.preSwitchDelay = preSwitchDelay
    }
  }))
