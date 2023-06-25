import React from 'react'
import './PageContent.css'
import Accordion from '../Accordion/Accordion'
import { useStateContext } from '../../context'
import _ from 'lodash'
import { type IAccordionIsOpenByTab } from '../../types/IAccordionIsOpenByTab'

const BASE_URL = 'https://httpbin.org/#/HTTP_Methods'

interface IPageContentProps {
  path: string
  tab: keyof IAccordionIsOpenByTab
}

export default function PageContent ({ path, tab }: IPageContentProps): JSX.Element {
  const { addRequest } = useStateContext()

  const handleRequest = (): void => {
    const url = BASE_URL + path
    const timestamp = new Date().toLocaleTimeString()

    void fetch(url)
      .catch(e => { console.log(e) })
    addRequest({ timestamp, url, id: _.uniqueId() })
  }

  return (
    <div className="container">
      <button className="button" type="submit" onClick={handleRequest}>{tab.toUpperCase()}</button>
      <div className="collapse">
        <Accordion tab={tab} />
      </div>
    </div>
  )
}
