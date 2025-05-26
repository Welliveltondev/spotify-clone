import { useEffect, useRef, useState } from "react";
import { createContext } from "react";
import { songsData } from "../assets/assets";


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
},[])
  

  const audioRef = useRef()
  const seekBar = useRef()
  const seekBg = useRef()

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
    await setTrack(songsData[id]);
    await audioRef.current.play(id);
    setPlayStatus(true);
  }

  const previous = async()=>{
    if(track.id>0){
      await setTrack(songsData[track.id-1]);
      await audioRef.current.play();
      setPlayStatus(true);
    }
  }

  const next = async()=>{
    if(track.id<songsData.length-1){
      await setTrack(songsData[track.id+1]);
      await audioRef.current.play();
      setPlayStatus(true);
    }
  }

  const seekSong = async (e) => {
    audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsettWidth)*audioRef.current.duration)
  }


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
  seekSong

  }

  return (
    <playerContext.Provider value={contextValue}>
      {props.children}
    </playerContext.Provider>
  )
}

export default PlayerContextProvider