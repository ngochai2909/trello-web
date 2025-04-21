import { Routes, Route, Navigate } from 'react-router-dom'

import Board from './pages/Boards/_id'
import NotFound404 from './pages/404'
import Auth from './pages/Auth/Auth'

function App() {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <Navigate to='/boards/67eeca3e644244f0269745f1' replace={true} />
        }
      />
      <Route path='/boards/:boardId' element={<Board />} />
      <Route path='/login' element={<Auth />} />
      <Route path='/register' element={<Auth />} />
      <Route path='*' element={<NotFound404 />} />
    </Routes>
  )
}

export default App
