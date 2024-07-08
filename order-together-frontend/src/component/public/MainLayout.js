import React from 'react'
import { Header } from './Header.js'
import { Footer } from './Footer.js'


export const MainLayout = ({ children }) => {

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      }}
    >
      <Header/>
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          margin: 0,
          marginTop:'60px'
        }}
      >
        {children}
      </div>
      <Footer/>
    </div>
  )
}
