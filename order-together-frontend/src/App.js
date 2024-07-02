import logo from './logo.svg'
import './App.css'
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms'
import Button from '@mui/material/Button'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MainLayout } from './component/public/MainLayout.js'
import { LogIn } from './component/login/LogIn.js'
import { SignUp } from './component/login/SignUp.js'
import { Initiate } from './component/Initiate.js'
<<<<<<< HEAD
=======
import { Homepage } from './component/homepage/Homepage.js'
import { JointOrder } from './component/jointOrder/JointOrder.js'
>>>>>>> f831ed679273405bb7951966510ee921ef4bf035

function App () {
  return (
    <BrowserRouter>
<<<<<<< HEAD
      <Routes>
        {/*<Route path="/" element={<MainLayout/>}>*/}
        {/*<Route path="/" element={<LogIn/>}></Route>*/}
          <Route path="login" element={<LogIn/>}/>
          {/*<Route path="signup" element={<SignUp/>} />*/}
        {/*</Route>*/}
          {/*sijiang test*/}
          <Route path="signup" element={<SignUp/>}/>
          <Route path="initiate" element={<Initiate/>}/>
      </Routes>
=======
      <MainLayout>
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="login" element={<LogIn/>}/>
          <Route path="signup" element={<SignUp/>}/>
          <Route path="initiate" element={<Initiate/>}/>
          <Route path="joint/:uid" element={<JointOrder/>}/>
        </Routes>
      </MainLayout>
>>>>>>> f831ed679273405bb7951966510ee921ef4bf035
    </BrowserRouter>
  )
}
// Test

export default App