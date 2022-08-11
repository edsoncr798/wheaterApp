import { useState, useEffect } from 'react'
import './App.css'
import CardWeather from './components/CardWeather'

function App() {
  const [coords, setCoords] = useState()

  // const url='https://live.staticflickr.com/7540/15367978594_769c6fa7f9_b.jpg'

  // const bgStyle={
  //   backoundImage:url
  // }
  useEffect(()=>{
    
    const success=pos=>{
      // crd: cordenada
      const crd=pos.coords

      const latlon={
        lat: crd.latitude,
        lon: crd.longitude
      }

      setCoords(latlon)
    }
    navigator.geolocation.getCurrentPosition(success)
  },[])
  
  // console.log(coords)
  
  return (
    <div className="App">
      <CardWeather  lat={coords?.lat} lon={coords?.lon}/>
    </div>
  )
}

export default App
