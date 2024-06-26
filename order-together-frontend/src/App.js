import logo from './logo.svg'
import './App.css'
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms'
import Button from '@mui/material/Button'

function App () {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  )
}
// Test

export default App