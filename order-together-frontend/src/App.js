import logo from './logo.svg'
import './App.css'
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms'
import Button from '@mui/material/Button'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MainLayout } from './component/public/MainLayout.js'
import { LogIn } from './component/auth/LogIn.js'

function App () {
  return (
    <BrowserRouter>
      <Routes>
        {/*<Route path="/" element={<MainLayout/>}>*/}
        {/*<Route path="/" element={<LogIn/>}></Route>*/}
          <Route path="login" element={<LogIn/>}/>
          {/*<Route path="signup" element={<SignUp/>} />*/}
        {/*</Route>*/}
      </Routes>
    </BrowserRouter>
  )
}

export default App
