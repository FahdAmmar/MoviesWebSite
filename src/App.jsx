import React, { useState } from 'react';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';

function App() {
  const [inp, setInp] = useState("")

  return (
    <main>
      <Navbar inp={inp} setInp={setInp} />
      {/* <Hero /> */}
      <About inp={inp} setInp={setInp} />
    </main>
  )
}

export default App