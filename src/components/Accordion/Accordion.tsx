import React, { useMemo } from 'react'
import './Accordion.css'
import cn from 'classnames'
import Arrow from './arrow.svg'
import { type IAccordionIsOpenByTab } from '../../types/IAccordionIsOpenByTab'
import { useStateContext } from '../../context'

interface AccordionProps {
  tab: keyof IAccordionIsOpenByTab
}

const PAGE_SIZE = 20

export default function Accordion ({ tab }: AccordionProps): JSX.Element {
  const {
    accordionIsOpenByTab,
    requests,
    toggleAccordionIsOpen,
    selectedPageByTab,
    setSelectedPageBy
  } = useStateContext()
  const currentPageCount = selectedPageByTab[tab]

  const paginatedRequests = useMemo(
    () => requests.slice(currentPageCount * PAGE_SIZE - PAGE_SIZE, currentPageCount * PAGE_SIZE),
    [requests, selectedPageByTab]
  )
  const pages = useMemo(
    () => Math.ceil(requests.length / PAGE_SIZE),
    [requests.length]
  )

  const handleAccordionClick = (): void => { toggleAccordionIsOpen(tab) }

  return (
    <div className="accordion">
      <button
          type="button"
          className="accordion-header"
          disabled={requests.length === 0}
          onClick={handleAccordionClick}
      >
        <p>REQUESTS</p>
        <img
          className={cn('accordion-image', {
            flipped: accordionIsOpenByTab[tab]
          })}
          alt="Arrow"
          src={Arrow}
        />
      </button>
      {accordionIsOpenByTab[tab] && requests.length > 0 && (
        <div className="accordion-and-pagination">
          <div className="accordion-content">
            {paginatedRequests.map((request) => (
              <div className="collapse-item" key={request.id}>
                {request.timestamp}
                {' '}
                -
                {' '}
                {request.url}
              </div>
            ))}
          </div>
          <div className="pagination">
            <button
              disabled={currentPageCount === 1}
              onClick={() => { setSelectedPageBy(tab, currentPageCount - 1) }}>
                Previos
            </button>
            {Array
              .from(Array(pages).keys())
              .map((idx) => {
                const page = idx + 1

                return <button
                  key={idx}
                  className={cn({
                    active: page === currentPageCount
                  })}
                  onClick={() => { setSelectedPageBy(tab, page) }}>
                  {page}
                </button>
              })}
              <button
                disabled={currentPageCount === pages}
                onClick={() => { setSelectedPageBy(tab, currentPageCount + 1) }}>
                Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
