import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Body from './body'
import Profile from './Profile'
import Login from './Login'
function App() {
  console.log("APP UPDATED")
  return (
      <BrowserRouter basename='/'>
        <Routes>
          <Route path='/' element={<Body />}>
            <Route path='login' element={<Login />} />
            <Route path='profile' element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App
