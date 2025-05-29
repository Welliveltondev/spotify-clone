import React, { useEffect, useRef } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import DisplayHome from './DisplayHome'
import DisplayAlbum from './DisplayAlbum'
import { useContext } from 'react'
import { playerContext } from '../context/PlayerContext'

const Display = () => {

  const {albumsData} = useContext(playerContext)

  const displayRef = useRef()
  const location = useLocation()
  const isAlbun = location.pathname.includes("album")
  const albumId = isAlbun ? location.pathname.split('/').pop() : ''
  const bgColor = isAlbun && albumsData.length > 0 ? albumsData.find((x)=>(x._id == albumId)).bgColour : '#121212';

  useEffect(()=>{
    if(isAlbun){
      displayRef.current.background = `linear-gradient(${bgColor}, #121212)`
    }else {
      displayRef.current.background = `#121212`
    }
  })


  console.log(location)
  return (
    <div ref={displayRef}  className='w-[100%] m-2 px-6 pt-4 bg-[#121212] text-white overflow-auto lg:w[75%] lg:ml-0'>
      {albumsData.length > 0
      ?
      <Routes>
        <Route path='/' element={<DisplayHome />}/>
        <Route path='/album:id' element={<DisplayAlbum album={albumsData.find((x)=>(x._id==albumId))}/>}/>
      </Routes>
      : null
      }
    </div>
  )
}

export default Display
