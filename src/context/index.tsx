import React, { createContext, useContext, useState } from 'react'
import { type IRequest } from '../types/IRequest'
import { type IStateByTab } from '../types/IStateByTab'

interface IState {
  requests: IRequest[]
  stateByTab: IStateByTab
  addRequest: (request: IRequest) => void
  toggleAccordionIsOpen: (tab: keyof IStateByTab) => void
  setSelectedPageBy: (tab: keyof IStateByTab, page: number) => void
}

interface IStateProvider {
  children: React.ReactElement
}

const StateContext = createContext<IState | null>(null)

const StateProvider = ({ children }: IStateProvider): JSX.Element => {
  const [requests, setRequests] = useState<IRequest[]>([])
  const [stateByTab, setStateByTab] = useState<IStateByTab>({
    get: {
      isAccordionOpen: false,
      selectedPage: 1
    },
    post: {
      isAccordionOpen: false,
      selectedPage: 1
    },
    delete: {
      isAccordionOpen: false,
      selectedPage: 1
    }
  })

  const addRequest = (request: IRequest): void => {
    setRequests(prev => prev.concat(request))
  }
  const toggleAccordionIsOpen = (tab: keyof IStateByTab): void => {
    setStateByTab(prev => ({ ...prev, [tab]: { ...prev[tab], isAccordionOpen: !prev[tab].isAccordionOpen } }))
  }
  const setSelectedPageBy = (tab: keyof IStateByTab, page: number): void => {
    setStateByTab(prev => ({ ...prev, [tab]: { ...prev[tab], page } }))
  }

  return (
    <StateContext.Provider value={{
      requests,
      addRequest,
      stateByTab,
      toggleAccordionIsOpen,
      setSelectedPageBy
    }}>
      {children}
    </StateContext.Provider>
  )
}

const useStateContext = (): IState => {
  const state = useContext(StateContext)
  if (state === null) throw new Error('useStateContext must be inside a StateProvider')
  return state
}

export { StateProvider, useStateContext }
