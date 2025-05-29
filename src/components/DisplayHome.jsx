import React from 'react'
import Navbar from './Navbar'
import AlbumItem from './AlbumItem'
import SongItem from './SongItem'
import { useContext } from 'react'
import { playerContext } from '../context/PlayerContext'

const DisplayHome = () => {
  const {songsData, albumsData} = useContext(playerContext)
  return (
    <>
      <Navbar />
      <div className='mb-4'>
        <h2 className='my-5 font-bold text-2xl'>Featured Charts</h2>
        <div className='flex overflow-auto'>
        {albumsData.map((item, index)=>(<AlbumItem key={index} name={item.name} image={item.image} desc={item.desc} id={item._id}/>))}
        </div>
      </div>

      <div className='mb-4'>
        <h2 className='my-5 font-bold text-2xl'>Songs today</h2>
        <div className='flex overflow-auto'>
        {songsData.map((item, index)=>(<SongItem key={index} name={item.name} image={item.image} desc={item.desc} id={item._id}/>))}
        </div>
      </div>
    </>
  )
}

export default DisplayHome
