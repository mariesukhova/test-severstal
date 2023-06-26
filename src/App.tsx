import React, { useState } from 'react'
import cn from 'classnames'
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from 'react-router-dom'
import { StateProvider } from './context'
import './App.css'
import GetPage from './pages/get/GetPage'
import PostPage from './pages/post/PostPage'
import DeletePage from './pages/delete/DeletePage'

const TABS = ['get', 'post', 'delete']

function App (): JSX.Element {
  const path = window.location.pathname
  const initialActiveTab = path === '/' ? 'get' : path.slice(1)
  const [activeTab, setActiveTab] = useState(initialActiveTab)

  const handleClick = (tab: string) => () => {
    setActiveTab(tab)
  }

  return (
    <BrowserRouter>
      <StateProvider>
        <div className="flex-container">
          <header>
            <nav className="nav">
              {Object.values(TABS).map((tab) => (
                <Link
                  key={tab}
                  to={`/${tab}`}
                  className={cn('.nav-link', {
                    active: activeTab === tab
                  })}
                  onClick={handleClick(tab)}
                >
                  {tab.toUpperCase()}
                </Link>
              ))}
            </nav>
          </header>
          <main className='main'>
            <Routes>
              <Route path="/" element={<GetPage />} />
              <Route path="/get" element={<GetPage />} />
              <Route path="/post" element={<PostPage />} />
              <Route path="/delete" element={<DeletePage />} />
            </Routes>
          </main>
          <footer className="footer">
            <p>2023</p>
          </footer>
        </div>
      </StateProvider>
    </BrowserRouter>
  )
}

export default App
