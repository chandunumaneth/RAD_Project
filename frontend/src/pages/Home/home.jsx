import './home.css'
import Header from '../../component/header/header'
import ExploreMenu from '../../component/exploreMenu/exploreMenu'
import FoodDisplay from '../../component/foodDisplay/foodDisplay';
import { useState } from 'react';
import AppDownload from '../../component/AppDownload/appDownload'
import AboutTimeline from "../../component/aboutTimeline/aboutTimeline"
import Testimonial from "../../component/testimonial/testimonial"
function home() {

  const [category,setCategory] = useState ("All");

  return (
    <div>
      <Header/>
      <AboutTimeline/>
      <ExploreMenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category}/>
      <Testimonial/>
      <AppDownload/>
    </div>
  )
}

export default home
