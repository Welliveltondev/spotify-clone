import { useEffect, useRef, useState } from "react";
import { createContext } from "react";
import { songsData } from "../assets/assets";
import axios from 'axios'


export const playerContext = createContext();

const PlayerContextProvider = (props) => {

  useEffect(()=>{setTimeout(()=>{
    audioRef.current.ontimeupdate = () => {
      seekBar.current.style.width = (Math.floor(audioRef.current.currentTime/audioRef.current.duration*100))+"%";
      setTime({
        currentTime: {
          seconds: Math.floor(audioRef.current.currentTime % 60),
          minutes: Math.floor(audioRef.current.currentTime  / 60)
        },
        totalTime: {
          seconds: Math.floor(audioRef.current.duration % 60),
          minutes: Math.floor(audioRef.current.duration / 60)
        }
      })
    }
  },1000)
},[audioRef])
  

  const audioRef = useRef()
  const seekBar = useRef()
  const seekBg = useRef()

  const url = "http://localhost:4000";
  const [songData,setSongData] = useState([])
  const [albumData,setAlbumData] = useState([])

  const [track, setTrack] = useState(songsData[0])
  const [playStatus, setPlayStatus] = useState(false)
  const [time, setTime] = useState({
    currentTime: {
      seconds: 0,
      minutes: 0
    },
    totalTime: {
      seconds: 0,
      minutes: 0
    }
  })

  const play = () => {
    audioRef.current.play() //funcao tocar audio
    setPlayStatus(true)
  }

  const pause = () => {
    audioRef.current.pause() //funcao pausar
    setPlayStatus(false)
  }

  const playWithId = async(id)=>{
    await songsData.map((item) =>{
      if (id === item._id){
        setTrack(item)
      }
    })
    await audioRef.current.play()
    setPlayStatus(true)
  }

  const previous = async()=>{
    songsData.map(async (item,index)=>{
      if (track._id === item._id && index > 0) {
        await setTrack(songsData[index-1])
        await audioRef.current.play()
        setPlayStatus(true)
      }
    })
  }

  const next = async()=>{
    songsData.map(async (item,index)=>{
      if (track._id === item._id && index > songsData.length) {
        await setTrack(songsData[index+1])
        await audioRef.current.play()
        setPlayStatus(true)
      }
    })
  }

  const seekSong = async (e) => {
    audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsettWidth)*audioRef.current.duration)
  }

  const getSongsData = async () => {
    try {
      const response = await axios.get(`${url}/api/song/list`)
      setSongData(response.data.songs)
      setTrack(response.data.songs[0])

    } catch (error) {
      
    }
  }

  const getAlbumData = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`)
      setAlbumData(response.data.albums)
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    getSongsData()
    getAlbumData()
  },[])
  const contextValue = {
  audioRef,
  seekBar,
  seekBg,
  track, setTrack,
  playStatus, setPlayStatus,
  time, setTime,
  play,
  pause,
  playWithId,
  previous,
  next,
  seekSong,
  songData,
  albumData

  }

  return (
    <playerContext.Provider value={contextValue}>
      {props.children}
    </playerContext.Provider>
  )
}

export default PlayerContextProvider