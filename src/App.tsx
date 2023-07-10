import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import { StateProvider } from './context'
import './App.css'
import NavBar from './components/NavBar/NavBar'
import PageContent from './components/PageContent/PageContent'

function App (): JSX.Element {
  return (
    <BrowserRouter>
      <StateProvider>
        <div className="flex-container">
          <header>
            <NavBar />
          </header>
          <main>
            <Routes>
              <Route path="/" element={<PageContent tab={'get'} path={'/get_get'} />} />
              <Route path="/get" element={<PageContent tab={'get'} path={'/get_get'} />} />
              <Route path="/post" element={<PageContent tab={'post'} path={'/post_post'} />} />
              <Route path="/delete" element={<PageContent tab={'delete'} path={'/delete_delete'} />} />
            </Routes>
          </main>
          <footer>
            <p>2023</p>
          </footer>
        </div>
      </StateProvider>
    </BrowserRouter>
  )
}

export default App
