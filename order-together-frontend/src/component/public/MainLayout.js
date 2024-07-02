import React from 'react'
<<<<<<< HEAD


export const MainLayout = ({ children }) => {
  // const dispatch = useDispatch()
  // const location = useLocation()
  // const currentRoute = location.pathname
=======
import { Header } from './Header.js'
import { Footer } from './Footer.js'


export const MainLayout = ({ children }) => {
>>>>>>> f831ed679273405bb7951966510ee921ef4bf035

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      }}
    >
<<<<<<< HEAD
      {/*<Header/>*/}
      {/*<div*/}
      {/*  style={{*/}
      {/*    flex: 1,*/}
      {/*    overflowY: 'auto',*/}
      {/*    margin: 0*/}
      {/*  }}*/}
      {/*>*/}
      {/*  {children}*/}
      {/*</div>*/}
      {/*{currentRoute !== '/login' && currentRoute !== '/signup' && <Footer/>}*/}
    </div>
  )
}
=======
      <Header/>
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          margin: 0
        }}
      >
        {children}
      </div>
      <Footer/>
    </div>
  )
}
>>>>>>> f831ed679273405bb7951966510ee921ef4bf035
