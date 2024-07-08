import logo from './logo.svg'
import './App.css'
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms'
import Button from '@mui/material/Button'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MainLayout } from './component/public/MainLayout.js'
import { LogIn } from './component/login/LogIn.js'
import { SignUp } from './component/login/SignUp.js'
import { Initiate } from './component/Initiate.js'
import { Homepage } from './component/homepage/Homepage.js'
import { JointOrder } from './component/jointOrder/JointOrder.js'
import { ManageOrder } from './component/manageOrder/ManageOrder.js'
import { Rating } from './component/userInfo/Rating.js'
import { UserInfo } from './component/userInfo/UserInfo.js'

function App () {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="login" element={<LogIn/>}/>
          <Route path="signup" element={<SignUp/>}/>
          <Route path="initiate" element={<Initiate/>}/>
          <Route path="joint/:uid" element={<JointOrder/>}/>
          <Route path="manage" element={<ManageOrder/>}/>
          <Route path="rating" element={<Rating/>}/>
          <Route path="userInfo" element={<UserInfo/>}/>
        </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}

export default App
