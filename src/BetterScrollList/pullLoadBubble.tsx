import { useState } from "react"

const PullLoadBubble = () =>{


  const [width,setWidth] = useState(50)


  const [height,setHeight] = useState(60)
 
  const isServer = () =>{
    return typeof window === 'undefined'
  }

  const getDpr = () =>{
    const dpr = isServer()?1:window.devicePixelRatio 
    return dpr
  }

  const getStyle = () =>{
    return {width:`${width / getDpr()}px`,height:`${height / getDpr()}px`}
  }


  return  <canvas ref="bubble" width={50} height={60} style={getStyle()}></canvas>

}

export default PullLoadBubble