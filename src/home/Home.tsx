import React from 'react'
import Navbar from '../components/Navbar'
import Notify from '../components/Notify'
import Slider from '../components/Slider'
import Categories from '../components/Categories'

const Home = () => {
  return (
    <div>
    <Notify/>
    <Navbar/>   
    <Slider/>
    <Categories/>
    </div>
  )
}

export default Home