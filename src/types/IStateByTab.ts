interface IState {
  isAccordionOpen: boolean
  selectedPage: number
}

export interface IStateByTab {
  get: IState
  post: IState
  delete: IState
}
