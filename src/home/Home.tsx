import React from 'react'
import Navbar from '../components/Navbar'
import Notify from '../components/Notify'
import Slider from '../components/Slider'
import Categories from '../components/CategoryList'
import ProductList from '../components/ProductList'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
    <Notify/>
    <Navbar/>   
    <Slider/>
    <Categories/>
    <ProductList/>
    <Footer/>
    </div>
  )
}

export default Home