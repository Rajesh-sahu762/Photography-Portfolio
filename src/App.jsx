import React from 'react'
import SmoothScroll from './Components/SmoothScroll'
import Navbar from './Components/Navbar/Navbar'
import Hero from './Components/Hero/Hero'
import FeaturedWork from './Components/Featured-work/Featured'
import AboutSection from './Components/About/about'
import ReviewsSection from './Components/Review/Review'
import Journey from './Components/Our-journey/Journey'


const App = () => {
  return (
    <>
    <SmoothScroll />
    <Navbar />
    <Hero />
    <FeaturedWork />
    <AboutSection />
    <ReviewsSection />
    <Journey />
    </>
  )
}

export default App
