import logo from './logo.svg'
import './App.css'
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms'
import Button from '@mui/material/Button'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React<AccessAlarmsIcon/> //Harry is here1. Qing is here3. Ethan-test is here3. Sijiang is here1.
          <Button variant="contained">Contained</Button>
        </a>
      </header>
    </div>
  );
}

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