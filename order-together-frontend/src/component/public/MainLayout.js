import React from 'react'


export const MainLayout = ({ children }) => {
  // const dispatch = useDispatch()
  // const location = useLocation()
  // const currentRoute = location.pathname

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      }}
    >
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
