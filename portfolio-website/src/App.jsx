import { useState } from 'react'
import './App.css'
import Background from './components/bg'
import { Navbar } from './components/Navbar'
import { Intro } from './components/intro'
function App() {
  const [count, setCount] = useState(0)

  return (
      <Background>
        <Navbar>
          <Intro>
          
          </Intro>
        </Navbar>
        
      </Background>
  )
}

export default App
