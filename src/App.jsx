import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Hero from './Components/Hero/Hero'
import FeaturedWork from './Components/Featured-work/Featured'
import AboutSection from './Components/About/about'
import SmoothScroll from './Components/SmoothScroll'


const App = () => {
  return (
    <>
    <SmoothScroll />
    <Navbar />
    <Hero />
    <FeaturedWork />
    <AboutSection />
    </>
  )
}

export default App
