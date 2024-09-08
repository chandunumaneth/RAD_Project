import './home.css'
import Header from '../../component/header/header'
import ExploreMenu from '../../component/exploreMenu/exploreMenu'
import FoodDisplay from '../../component/foodDisplay/foodDisplay';
import { useState } from 'react';
import AppDownload from '../../component/AppDownload/appDownload'
function home() {

  const [category,setCategory] = useState ("All");

  return (
    <div>
      <Header/>
      <ExploreMenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category}/>
      <AppDownload/>
    </div>
  )
}

export default home
