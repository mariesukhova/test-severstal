import React from 'react'
import cn from 'classnames'
import { Link, useLocation } from 'react-router-dom'

export default function NavBar (): JSX.Element {
  const location = useLocation()
  const path = location.pathname
  const activeTab = path === '/' ? 'get' : path.slice(1)

  const TABS = ['get', 'post', 'delete']

  return (
    <nav className="nav">
    {TABS.map((tab) => (
      <Link
        key={tab}
        to={`/${tab}`}
        className={cn('.nav-link', {
          active: activeTab === tab
        })}
      >
        {tab.toUpperCase()}
      </Link>
    ))}
  </nav>
  )
}
