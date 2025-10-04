import React,{ useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Body from './components/Body'

function App() {

  return (
    <div className='flex flex-col items-center mt-10 gap-5'>
      <div className='font-extrabold text-3xl font-mono text-center'>Calculator</div>
      <Body />
    </div>
  )
}

export default App
