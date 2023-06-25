import React, { createContext, useContext, useState } from 'react'
import { type IRequest } from '../types/IRequest'
import { type IAccordionIsOpenByTab } from '../types/IAccordionIsOpenByTab'
import { type ISelectedPageByTab } from '../types/ITabSelectedPageMap'

interface IState {
  requests: IRequest[]
  accordionIsOpenByTab: IAccordionIsOpenByTab
  selectedPageByTab: ISelectedPageByTab
  addRequest: (request: IRequest) => void
  toggleAccordionIsOpen: (tab: keyof IAccordionIsOpenByTab) => void
  setSelectedPageBy: (tab: keyof ISelectedPageByTab, page: number) => void
}

interface IStateProvider {
  children: React.ReactElement
}

const StateContext = createContext<IState | null>(null)

const StateProvider = ({ children }: IStateProvider): JSX.Element => {
  const [requests, setRequests] = useState<IRequest[]>([])
  const [accordionIsOpenByTab, setAccordionIsOpenByTab] = useState<IAccordionIsOpenByTab>({
    get: false,
    post: false,
    delete: false
  })
  const [selectedPageByTab, setSelectedPageByTab] = useState<ISelectedPageByTab>({
    get: 1,
    post: 1,
    delete: 1
  })

  const addRequest = (request: IRequest): void => {
    setRequests(prev => prev.concat(request))
  }
  const toggleAccordionIsOpen = (tab: keyof IAccordionIsOpenByTab): void => {
    setAccordionIsOpenByTab(prev => ({ ...prev, [tab]: !prev[tab] }))
  }
  const setSelectedPageBy = (tab: keyof ISelectedPageByTab, page: number): void => {
    setSelectedPageByTab(prev => ({ ...prev, [tab]: page }))
  }

  return (
    <StateContext.Provider value={{
      requests,
      addRequest,
      accordionIsOpenByTab,
      toggleAccordionIsOpen,
      selectedPageByTab,
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
