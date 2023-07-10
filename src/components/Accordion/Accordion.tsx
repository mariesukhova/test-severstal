import React, { useMemo } from 'react'
import './Accordion.css'
import cn from 'classnames'
import Arrow from './arrow.svg'
import { useStateContext } from '../../context'
import { type IStateByTab } from '../../types/IStateByTab'

const PAGE_SIZE = 20

interface AccordionProps {
  tab: keyof IStateByTab
}

export default function Accordion ({ tab }: AccordionProps): JSX.Element {
  const {
    requests,
    toggleAccordionIsOpen,
    setSelectedPageBy,
    stateByTab
  } = useStateContext()
  const { isAccordionOpen, selectedPage } = stateByTab[tab]

  const paginatedRequests = useMemo(
    () => requests.slice(selectedPage * PAGE_SIZE - PAGE_SIZE, selectedPage * PAGE_SIZE),
    [requests, selectedPage]
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
            flipped: stateByTab[tab].isAccordionOpen
          })}
          alt="Arrow"
          src={Arrow}
        />
      </button>
      {isAccordionOpen && requests.length > 0 && (
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
              disabled={selectedPage === 1}
              onClick={() => { setSelectedPageBy(tab, selectedPage - 1) }}>
                Previos
            </button>
            {Array
              .from(Array(pages).keys())
              .map((idx) => {
                const page = idx + 1

                return <button
                  key={idx}
                  className={cn({
                    active: page === selectedPage
                  })}
                  onClick={() => { setSelectedPageBy(tab, page) }}>
                  {page}
                </button>
              })}
              <button
                disabled={selectedPage === pages}
                onClick={() => { setSelectedPageBy(tab, selectedPage + 1) }}>
                Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
